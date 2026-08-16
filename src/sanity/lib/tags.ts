/**
 * Deliberate CMS cache tags for webhook-driven public publication.
 *
 * Type-level tags refresh shared surfaces (indexes, homepage, solutions).
 * Slug-level tags refresh detail pages without needing path enumeration.
 */

export const CMS_TAGS = {
  caseStudy: "case-study",
  insight: "insight",
  academyProgram: "academy-program",
  siteSettings: "site-settings",
  /** Shared tag for sitemap CMS-derived entries. */
  sitemap: "sitemap",
} as const;

export function caseStudyTag(slug?: string | null): string[] {
  const tags: string[] = [CMS_TAGS.caseStudy, CMS_TAGS.sitemap];
  if (slug) tags.push(`${CMS_TAGS.caseStudy}:${slug}`);
  return tags;
}

export function insightTag(slug?: string | null): string[] {
  const tags: string[] = [CMS_TAGS.insight];
  if (slug) tags.push(`${CMS_TAGS.insight}:${slug}`);
  return tags;
}

export function academyProgramTag(slug?: string | null): string[] {
  const tags: string[] = [CMS_TAGS.academyProgram, CMS_TAGS.sitemap];
  if (slug) tags.push(`${CMS_TAGS.academyProgram}:${slug}`);
  return tags;
}

export function siteSettingsTag(): string[] {
  return [CMS_TAGS.siteSettings];
}

export type SanityWebhookBody = {
  _type?: string;
  _id?: string;
  slug?: string | { current?: string | null } | null;
};

function readSlug(body: SanityWebhookBody): string | undefined {
  if (typeof body.slug === "string" && body.slug.trim()) {
    return body.slug.trim();
  }
  if (
    body.slug &&
    typeof body.slug === "object" &&
    typeof body.slug.current === "string" &&
    body.slug.current.trim()
  ) {
    return body.slug.current.trim();
  }
  return undefined;
}

/**
 * Map a Sanity webhook document payload to Next.js cache tags to invalidate.
 * Does not touch admissions / transactional config.
 */
export function resolveRevalidateTags(body: SanityWebhookBody): string[] {
  const type = body._type?.trim();
  if (!type) return [];

  const slug = readSlug(body);

  switch (type) {
    case "caseStudy":
      return caseStudyTag(slug);
    case "insight":
      // Homepage Insights preview only until Epic 10 routes exist.
      return insightTag(slug);
    case "academyProgram":
      return academyProgramTag(slug);
    case "siteSettings":
      return siteSettingsTag();
    default:
      return [];
  }
}
