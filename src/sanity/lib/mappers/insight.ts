import type { InsightPreview } from "@/content/homepage";
import {
  insightCategoryLabels,
  isInsightCategory,
  type InsightArticle,
  type InsightListItem,
  type InsightSeo,
} from "@/types/insight";
import { resolveSanityImage } from "../../image";

export type SanityInsightPreviewDoc = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  category?: string | null;
  featured?: boolean | null;
  featuredImage?: Parameters<typeof resolveSanityImage>[0];
  publishedAt?: string | null;
  author?: string | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    ogImage?: Parameters<typeof resolveSanityImage>[0];
    noIndex?: boolean | null;
  } | null;
};

export type SanityInsightDoc = SanityInsightPreviewDoc & {
  body?: unknown[] | null;
  relatedSlugs?: Array<string | null> | null;
};

function mapCategory(raw: string | null | undefined): {
  category: InsightListItem["category"];
  categoryLabel: string;
} {
  if (raw && isInsightCategory(raw)) {
    return { category: raw, categoryLabel: insightCategoryLabels[raw] };
  }
  return {
    category: null,
    categoryLabel: raw?.trim() || "Insights",
  };
}

function mapSeo(
  seo: SanityInsightPreviewDoc["seo"],
  fallbackImageSrc: string | null,
): InsightSeo {
  const og = resolveSanityImage(seo?.ogImage ?? null, { width: 1200 });
  return {
    metaTitle: seo?.metaTitle?.trim() || null,
    metaDescription: seo?.metaDescription?.trim() || null,
    ogImageSrc: og?.src || fallbackImageSrc,
    noIndex: Boolean(seo?.noIndex),
  };
}

export function mapSanityInsightListItem(
  doc: SanityInsightPreviewDoc,
): InsightListItem | null {
  if (!doc._id || !doc.title?.trim() || !doc.slug || !doc.excerpt?.trim()) {
    return null;
  }

  const image = resolveSanityImage(doc.featuredImage ?? null, { width: 1200 });
  const { category, categoryLabel } = mapCategory(doc.category);

  return {
    id: doc._id,
    title: doc.title.trim(),
    slug: doc.slug,
    href: `/insights/${doc.slug}`,
    excerpt: doc.excerpt.trim(),
    category,
    categoryLabel,
    publishedAt: doc.publishedAt?.trim() || null,
    featured: Boolean(doc.featured),
    author: doc.author?.trim() || null,
    imageSrc: image?.src ?? null,
    imageAlt: image?.alt || doc.title.trim(),
    isDevelopmentFixture: false,
  };
}

export function mapSanityInsightArticle(
  doc: SanityInsightDoc,
): InsightArticle | null {
  const list = mapSanityInsightListItem(doc);
  if (!list) return null;

  const relatedSlugs = (doc.relatedSlugs ?? [])
    .filter((slug): slug is string => Boolean(slug?.trim()))
    .map((slug) => slug.trim());

  return {
    ...list,
    body: Array.isArray(doc.body) ? doc.body : null,
    relatedSlugs,
    seo: mapSeo(doc.seo, list.imageSrc),
  };
}

export function mapSanityInsightPreview(
  doc: SanityInsightPreviewDoc,
): InsightPreview | null {
  const list = mapSanityInsightListItem(doc);
  if (!list) return null;

  return {
    id: list.id,
    title: list.title,
    category: list.categoryLabel,
    excerpt: list.excerpt,
    href: list.href,
    imageSrc: list.imageSrc,
    imageAlt: list.imageAlt,
    isPlaceholder: false,
  };
}
