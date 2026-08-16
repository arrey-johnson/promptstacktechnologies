import { homepageInsights, type InsightPreview } from "@/content/homepage";
import {
  allowPlaceholderContent,
  type ContentIntegrityEnv,
} from "@/lib/content-integrity";
import { isSanityConfigured } from "@/sanity/env";
import { fetchSanityData } from "@/sanity/lib/fetch";
import {
  mapSanityInsightPreview,
  type SanityInsightPreviewDoc,
} from "@/sanity/lib/mappers/insight";
import { homepageInsightsQuery } from "@/sanity/queries";
import { insightTag } from "@/sanity/lib/tags";

/**
 * Homepage Insights preview.
 * Sanity configured → real published insights only (zero → empty, never fake).
 * Not configured → local integrity placeholders in non-production only.
 */
export async function getHomepageInsights(overrides?: ContentIntegrityEnv): Promise<{
  source: "sanity" | "local";
  featured: InsightPreview | null;
  secondary: InsightPreview[];
  mode: "preview" | "publishable";
}> {
  if (isSanityConfigured()) {
    const docs = await fetchSanityData<SanityInsightPreviewDoc[]>(
      homepageInsightsQuery,
      {},
      { tags: insightTag() },
    );
    const items = (docs ?? [])
      .map(mapSanityInsightPreview)
      .filter((item): item is InsightPreview => item !== null);

    const [first, ...rest] = items;
    return {
      source: "sanity",
      featured: first ?? null,
      secondary: rest.slice(0, 2),
      mode: "publishable",
    };
  }

  if (allowPlaceholderContent(overrides)) {
    return {
      source: "local",
      featured: homepageInsights.featured,
      secondary: [...homepageInsights.supporting],
      mode: "preview",
    };
  }

  return {
    source: "local",
    featured: null,
    secondary: [],
    mode: "publishable",
  };
}
