/**
 * Insight domain types — CMS-ready editorial model (docs/09).
 * Never invent authors, dates, images, or article body in production.
 */

export const INSIGHT_CATEGORIES = [
  "software",
  "ai-automation",
  "digital-growth",
  "business-operations",
  "technology-strategy",
] as const;

export type InsightCategory = (typeof INSIGHT_CATEGORIES)[number];

export const insightCategoryLabels: Record<InsightCategory, string> = {
  software: "Software",
  "ai-automation": "AI & Automation",
  "digital-growth": "Digital Growth",
  "business-operations": "Business Operations",
  "technology-strategy": "Technology Strategy",
};

export function isInsightCategory(value: string): value is InsightCategory {
  return (INSIGHT_CATEGORIES as readonly string[]).includes(value);
}

/** Parse URL/search category; invalid values → null (show all). */
export function parseInsightCategoryParam(
  value: string | string[] | undefined | null,
): InsightCategory | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw?.trim()) return null;
  const normalized = raw.trim().toLowerCase();
  return isInsightCategory(normalized) ? normalized : null;
}

export type InsightSeo = {
  metaTitle: string | null;
  metaDescription: string | null;
  ogImageSrc: string | null;
  noIndex: boolean;
};

export type InsightListItem = {
  id: string;
  title: string;
  slug: string;
  href: string;
  excerpt: string;
  category: InsightCategory | null;
  categoryLabel: string;
  publishedAt: string | null;
  featured: boolean;
  author: string | null;
  imageSrc: string | null;
  imageAlt: string;
  /**
   * Development visual fixtures only — never real published Promptstack work.
   * Must never appear in production, sitemap, or homepage publishable sets.
   */
  isDevelopmentFixture: boolean;
};

export type InsightArticle = InsightListItem & {
  body: unknown[] | null;
  relatedSlugs: string[];
  seo: InsightSeo;
};

/** Category → commercial bridge destination. */
export function insightCategorySolutionHref(
  category: InsightCategory | null,
): { label: string; href: string } {
  switch (category) {
    case "software":
      return { label: "Explore Software Solutions", href: "/solutions/software" };
    case "ai-automation":
      return {
        label: "Explore AI & Automation",
        href: "/solutions/ai-automation",
      };
    case "digital-growth":
      return {
        label: "Explore Digital Marketing",
        href: "/solutions/digital-marketing",
      };
    case "business-operations":
    case "technology-strategy":
      return { label: "Explore Solutions", href: "/solutions" };
    default:
      return { label: "Explore Solutions", href: "/solutions" };
  }
}

export function formatInsightDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
