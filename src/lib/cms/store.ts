import { promises as fs } from "fs";
import path from "path";
import { getRequestLocale, normalizeLocale, type Locale } from "@/lib/i18n/locale";
import { cmsSeed } from "./seed";
import { cmsSeedFr } from "./seed-fr";
import type { CmsCollection, CmsData } from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "cms");

function seedFor(locale: Locale): CmsData {
  return locale === "fr" ? cmsSeedFr : cmsSeed;
}

function fileFor(locale: Locale) {
  return path.join(DATA_DIR, `content.${locale}.json`);
}

async function ensureStore(locale: Locale): Promise<CmsData> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Ignore on read-only filesystems — reads can still succeed from the bundle.
  }

  const target = fileFor(locale);
  const legacy = path.join(DATA_DIR, "content.json");
  const seed = seedFor(locale);

  try {
    const raw = await fs.readFile(target, "utf8");
    const parsed = JSON.parse(raw) as CmsData;
    return { ...seed, ...parsed };
  } catch {
    // One-time migrate: English content.json → content.en.json
    if (locale === "en") {
      try {
        const legacyRaw = await fs.readFile(legacy, "utf8");
        const parsed = JSON.parse(legacyRaw) as CmsData;
        const merged = { ...cmsSeed, ...parsed };
        try {
          await fs.writeFile(target, JSON.stringify(merged, null, 2), "utf8");
        } catch {
          /* read-only host */
        }
        return merged;
      } catch {
        // fall through to seed
      }
    }

    const data = structuredClone(seed);
    try {
      await fs.writeFile(target, JSON.stringify(data, null, 2), "utf8");
    } catch {
      /* read-only host — serve seed in memory */
    }
    return data;
  }
}

export async function getCmsData(locale?: Locale): Promise<CmsData> {
  const resolved = locale ?? (await getRequestLocale());
  return ensureStore(resolved);
}

export async function getCollection<K extends CmsCollection>(
  key: K,
  locale?: Locale,
): Promise<CmsData[K]> {
  const data = await getCmsData(locale);
  return data[key];
}

export async function saveCmsData(data: CmsData, locale: Locale = "en"): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(fileFor(locale), JSON.stringify(data, null, 2), "utf8");
}

export async function updateCollection<K extends CmsCollection>(
  key: K,
  value: CmsData[K],
  locale: Locale = "en",
): Promise<CmsData> {
  const data = await ensureStore(locale);
  const next = { ...data, [key]: value };
  await saveCmsData(next, locale);
  return next;
}

export async function resetCmsToSeed(locale: Locale = "en"): Promise<CmsData> {
  const data = structuredClone(seedFor(normalizeLocale(locale)));
  await saveCmsData(data, locale);
  return data;
}
