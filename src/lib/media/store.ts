import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);
const MAX_BYTES = 8 * 1024 * 1024;

export type MediaItem = {
  name: string;
  url: string;
  size: number;
  updatedAt: string;
};

async function ensureDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

function safeExt(fileName: string) {
  const ext = path.extname(fileName).toLowerCase();
  return ALLOWED_EXT.has(ext) ? ext : "";
}

async function collectImages(dir: string, urlPrefix: string, items: MediaItem[]) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectImages(full, `${urlPrefix}/${entry.name}`, items);
      continue;
    }
    if (!entry.isFile() || entry.name.startsWith(".")) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (!ALLOWED_EXT.has(ext)) continue;
    const stat = await fs.stat(full);
    items.push({
      name: entry.name,
      url: `${urlPrefix}/${entry.name}`,
      size: stat.size,
      updatedAt: stat.mtime.toISOString(),
    });
  }
}

export async function listMedia(): Promise<MediaItem[]> {
  await ensureDir();
  const items: MediaItem[] = [];
  await collectImages(UPLOAD_DIR, "/uploads", items);
  await collectImages(path.join(process.cwd(), "public", "brand"), "/brand", items);
  return items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function saveUploadedImage(input: {
  fileName: string;
  bytes: Buffer;
}): Promise<MediaItem> {
  await ensureDir();
  if (input.bytes.length > MAX_BYTES) {
    throw new Error("Image is too large. Please use a file under 8 MB.");
  }
  const ext = safeExt(input.fileName);
  if (!ext) {
    throw new Error("Please upload a JPG, PNG, WebP, GIF, or SVG image.");
  }

  const base = path
    .basename(input.fileName, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  const name = `${base || "image"}-${Date.now().toString(36)}-${randomUUID().slice(0, 6)}${ext}`;
  await fs.writeFile(path.join(UPLOAD_DIR, name), input.bytes);
  const stat = await fs.stat(path.join(UPLOAD_DIR, name));

  return {
    name,
    url: `/uploads/${name}`,
    size: stat.size,
    updatedAt: stat.mtime.toISOString(),
  };
}

export async function deleteMedia(fileName: string): Promise<boolean> {
  const safe = path.basename(fileName);
  if (safe !== fileName || safe.includes("..")) return false;
  // Only uploaded files can be deleted from the admin UI (not brand assets).
  const full = path.join(UPLOAD_DIR, safe);
  try {
    await fs.unlink(full);
    return true;
  } catch {
    return false;
  }
}
