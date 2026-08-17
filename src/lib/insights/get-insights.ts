import {
  insightListItemFromArticle,
  insightsDevFixtures,
} from "@/content/insights";
import { areInsightsDevFixturesEnabled } from "@/lib/insights/dev-fixtures";
import type { ContentIntegrityEnv } from "@/lib/content-integrity";
import { isSanityConfigured } from "@/sanity/env";
import { fetchSanityData } from "@/sanity/lib/fetch";
import {
  mapSanityInsightArticle,
  mapSanityInsightListItem,
  type SanityInsightDoc,
  type SanityInsightPreviewDoc,
} from "@/sanity/lib/mappers/insight";
import {
  featuredInsightQuery,
  insightBySlugQuery,
  insightSlugsQuery,
  insightsBySlugsQuery,
  insightsIndexQuery,
  relatedInsightsByCategoryQuery,
} from "@/sanity/queries";
import { insightTag } from "@/sanity/lib/tags";
import {
  parseInsightCategoryParam,
  type InsightArticle,
  type InsightCategory,
  type InsightListItem,
} from "@/types/insight";

export type InsightsListingResult = {
  source: "sanity" | "fixtures" | "empty";
  mode: "publishable" | "development-fixtures";
  category: InsightCategory | null;
  featured: InsightListItem | null;
  items: InsightListItem[];
};

function fixtureEnv(
  overrides?: ContentIntegrityEnv & { insightsDevFixtures?: string },
): boolean {
  return areInsightsDevFixturesEnabled(overrides);
}

function fixturesAsList(
  category: InsightCategory | null,
): InsightsListingResult {
  const all = insightsDevFixtures.map(insightListItemFromArticle);
  const filtered = category
    ? all.filter((item) => item.category === category)
    : all;
  const featured =
    filtered.find((item) => item.featured) ??
    all.find((item) => item.featured) ??
    null;

  return {
    source: "fixtures",
    mode: "development-fixtures",
    category,
    featured:
      featured && (!category || featured.category === category)
        ? featured
        : null,
    items: filtered,
  };
}

/**
 * Insights index listing.
 * Real Sanity content wins. Dev fixtures only when explicitly enabled and
 * there is nothing publishable to show.
 */
export async function getInsightsListing(options?: {
  category?: string | string[] | null;
  env?: ContentIntegrityEnv & { insightsDevFixtures?: string };
}): Promise<InsightsListingResult> {
  const category = parseInsightCategoryParam(options?.category ?? null);

  if (isSanityConfigured()) {
    const docs = await fetchSanityData<SanityInsightPreviewDoc[]>(
      insightsIndexQuery,
      { category: category ?? "" },
      { tags: insightTag() },
    );
    const items = (docs ?? [])
      .map(mapSanityInsightListItem)
      .filter((item): item is InsightListItem => item !== null);

    if (items.length > 0) {
      const featuredCandidates = items.filter((item) => item.featured);
      const featured =
        featuredCandidates.sort((a, b) => {
          const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0;
          const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0;
          return bTime - aTime;
        })[0] ?? null;

      return {
        source: "sanity",
        mode: "publishable",
        category,
        featured,
        items,
      };
    }

    if (fixtureEnv(options?.env)) {
      return fixturesAsList(category);
    }

    return {
      source: "empty",
      mode: "publishable",
      category,
      featured: null,
      items: [],
    };
  }

  if (fixtureEnv(options?.env)) {
    return fixturesAsList(category);
  }

  return {
    source: "empty",
    mode: "publishable",
    category,
    featured: null,
    items: [],
  };
}

export async function getFeaturedInsight(options?: {
  env?: ContentIntegrityEnv & { insightsDevFixtures?: string };
}): Promise<InsightListItem | null> {
  if (isSanityConfigured()) {
    const doc = await fetchSanityData<SanityInsightPreviewDoc | null>(
      featuredInsightQuery,
      {},
      { tags: insightTag() },
    );
    if (doc) {
      return mapSanityInsightListItem(doc);
    }
  }

  if (fixtureEnv(options?.env)) {
    return (
      insightsDevFixtures
        .map(insightListItemFromArticle)
        .find((item) => item.featured) ?? null
    );
  }

  return null;
}

export async function getInsightBySlug(
  slug: string,
  options?: {
    env?: ContentIntegrityEnv & { insightsDevFixtures?: string };
  },
): Promise<InsightArticle | null> {
  const normalized = slug.trim();
  if (!normalized) return null;

  if (isSanityConfigured()) {
    const doc = await fetchSanityData<SanityInsightDoc | null>(
      insightBySlugQuery,
      { slug: normalized },
      { tags: insightTag(normalized) },
    );
    const mapped = doc ? mapSanityInsightArticle(doc) : null;
    if (mapped) return mapped;
  }

  if (fixtureEnv(options?.env)) {
    return (
      insightsDevFixtures.find((item) => item.slug === normalized) ?? null
    );
  }

  return null;
}

/** Published Sanity slugs only — never development fixtures. */
export async function getPublishedInsightSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) return [];

  const docs = await fetchSanityData<Array<{ slug?: string | null }> | null>(
    insightSlugsQuery,
    {},
    { tags: insightTag() },
  );

  return (docs ?? [])
    .map((doc) => doc.slug?.trim())
    .filter((slug): slug is string => Boolean(slug))
    .filter((slug) => !slug.startsWith("development-preview-"));
}

export async function getRelatedInsights(
  article: InsightArticle,
  options?: { limit?: number },
): Promise<InsightListItem[]> {
  const limit = options?.limit ?? 3;

  if (article.isDevelopmentFixture) {
    return insightsDevFixtures
      .map(insightListItemFromArticle)
      .filter(
        (item) =>
          item.slug !== article.slug &&
          (!article.category || item.category === article.category),
      )
      .slice(0, limit);
  }

  if (!isSanityConfigured()) return [];

  if (article.relatedSlugs.length > 0) {
    const docs = await fetchSanityData<SanityInsightPreviewDoc[] | null>(
      insightsBySlugsQuery,
      { slugs: article.relatedSlugs },
      { tags: insightTag() },
    );
    const related = (docs ?? [])
      .map(mapSanityInsightListItem)
      .filter((item): item is InsightListItem => item !== null)
      .filter((item) => item.slug !== article.slug)
      .slice(0, limit);
    if (related.length > 0) return related;
  }

  if (article.category) {
    const docs = await fetchSanityData<SanityInsightPreviewDoc[] | null>(
      relatedInsightsByCategoryQuery,
      { category: article.category, excludeSlug: article.slug },
      { tags: insightTag() },
    );
    return (docs ?? [])
      .map(mapSanityInsightListItem)
      .filter((item): item is InsightListItem => item !== null)
      .slice(0, limit);
  }

  return [];
}
