import type { MetadataRoute } from "next";

/**
 * Sitemap entry builder — inclusion requires:
 * 1) published legitimate content, and
 * 2) a real implemented public route.
 *
 * Insight index + published detail slugs are included (Epic 10).
 * Development fixtures and drafts never enter the sitemap.
 */

export const SITEMAP_STATIC_PATHS = [
  "",
  "/solutions",
  "/solutions/software",
  "/solutions/ai-automation",
  "/solutions/digital-marketing",
  "/work",
  "/how-we-work",
  "/academy",
  "/academy/programs",
  "/academy/how-we-teach",
  "/insights",
  "/company/about",
  "/contact",
  "/start-a-project",
] as const;

/** Routes that must never appear in the sitemap. */
export const SITEMAP_EXCLUDED_PATH_PREFIXES = [
  "/studio",
  "/api/",
  "/project-request-received",
  "/academy/application-received",
  "/privacy",
  "/terms",
  "/cookies",
] as const;

export type SitemapContentInput = {
  baseUrl: string;
  /** Real published Work slugs only (never placeholders). */
  workSlugs: string[];
  /** Active Academy program slugs with implemented routes. */
  academyProgramSlugs: string[];
  /** Real published Insight slugs only (never development fixtures). */
  insightSlugs?: string[];
  now?: Date;
};

export function isSitemapPathExcluded(path: string): boolean {
  return SITEMAP_EXCLUDED_PATH_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`) || path.startsWith(prefix),
  );
}

export function buildSitemapEntries(
  input: SitemapContentInput,
): MetadataRoute.Sitemap {
  const base = input.baseUrl.replace(/\/$/, "");
  const now = input.now ?? new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of SITEMAP_STATIC_PATHS) {
    if (isSitemapPathExcluded(path)) continue;
    entries.push({
      url: `${base}${path || "/"}`,
      lastModified: now,
    });
  }

  for (const slug of input.workSlugs) {
    if (!slug || slug.includes("placeholder")) continue;
    const path = `/work/${slug}`;
    if (isSitemapPathExcluded(path)) continue;
    entries.push({ url: `${base}${path}`, lastModified: now });
  }

  for (const slug of input.academyProgramSlugs) {
    if (!slug) continue;
    const path = `/academy/programs/${slug}`;
    if (isSitemapPathExcluded(path)) continue;
    entries.push({ url: `${base}${path}`, lastModified: now });
  }

  for (const slug of input.insightSlugs ?? []) {
    if (!slug || slug.startsWith("development-preview-")) continue;
    const path = `/insights/${slug}`;
    if (isSitemapPathExcluded(path)) continue;
    entries.push({ url: `${base}${path}`, lastModified: now });
  }

  return entries;
}
