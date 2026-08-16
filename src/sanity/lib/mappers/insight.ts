import type { InsightPreview } from "@/content/homepage";
import { resolveSanityImage } from "../../image";

const insightCategoryLabels: Record<string, string> = {
  software: "Software",
  "ai-automation": "AI & Automation",
  "digital-growth": "Digital Growth",
  "business-operations": "Business Operations",
  "technology-strategy": "Technology Strategy",
};

export type SanityInsightPreviewDoc = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  category?: string | null;
  featuredImage?: Parameters<typeof resolveSanityImage>[0];
};

export function mapSanityInsightPreview(
  doc: SanityInsightPreviewDoc,
): InsightPreview | null {
  if (!doc._id || !doc.title?.trim() || !doc.slug || !doc.excerpt?.trim()) {
    return null;
  }

  const image = resolveSanityImage(doc.featuredImage ?? null, { width: 1200 });
  const categoryKey = doc.category ?? "";
  const category =
    insightCategoryLabels[categoryKey] ??
    (doc.category?.trim() || "Insights");

  return {
    id: doc._id,
    title: doc.title.trim(),
    category,
    excerpt: doc.excerpt.trim(),
    href: `/insights/${doc.slug}`,
    imageSrc: image?.src ?? null,
    imageAlt: image?.alt || doc.title.trim(),
    isPlaceholder: false,
  };
}
