import { beforeEach, describe, expect, it, vi } from "vitest";

const fetchSanityData = vi.fn();
const isSanityConfigured = vi.fn();

vi.mock("@/sanity/lib/fetch", () => ({
  fetchSanityData: (...args: unknown[]) => fetchSanityData(...args),
}));

vi.mock("@/sanity/env", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/sanity/env")>();
  return {
    ...actual,
    isSanityConfigured: (...args: unknown[]) => isSanityConfigured(...args),
  };
});

import {
  getInsightBySlug,
  getInsightsListing,
  getPublishedInsightSlugs,
  getRelatedInsights,
} from "./get-insights";

describe("getInsightsListing", () => {
  beforeEach(() => {
    fetchSanityData.mockReset();
    isSanityConfigured.mockReset();
  });

  it("returns truthful empty state with zero published Insights", async () => {
    isSanityConfigured.mockReturnValue(true);
    fetchSanityData.mockResolvedValue([]);

    const listing = await getInsightsListing({
      env: { nodeEnv: "production", insightsDevFixtures: "true" },
    });

    expect(listing.source).toBe("empty");
    expect(listing.mode).toBe("publishable");
    expect(listing.items).toEqual([]);
    expect(listing.featured).toBeNull();
  });

  it("maps one published Insight", async () => {
    isSanityConfigured.mockReturnValue(true);
    fetchSanityData.mockResolvedValue([
      {
        _id: "i1",
        title: "When systems clarify operations",
        slug: "systems-clarify-operations",
        excerpt:
          "A practical look at choosing systems work that reduces operational friction for growing teams.",
        category: "software",
        featured: false,
        publishedAt: "2026-02-01T12:00:00.000Z",
      },
    ]);

    const listing = await getInsightsListing();
    expect(listing.source).toBe("sanity");
    expect(listing.items).toHaveLength(1);
    expect(listing.items[0]?.href).toBe(
      "/insights/systems-clarify-operations",
    );
  });

  it("selects most recently published featured Insight", async () => {
    isSanityConfigured.mockReturnValue(true);
    fetchSanityData.mockResolvedValue([
      {
        _id: "old",
        title: "Older featured article title here",
        slug: "older-featured",
        excerpt:
          "Older featured excerpt that is long enough for listing validation rules.",
        category: "software",
        featured: true,
        publishedAt: "2026-01-01T12:00:00.000Z",
      },
      {
        _id: "new",
        title: "Newer featured article title here",
        slug: "newer-featured",
        excerpt:
          "Newer featured excerpt that is long enough for listing validation rules.",
        category: "software",
        featured: true,
        publishedAt: "2026-03-01T12:00:00.000Z",
      },
    ]);

    const listing = await getInsightsListing();
    expect(listing.featured?.slug).toBe("newer-featured");
  });

  it("falls back to all Insights for invalid category", async () => {
    isSanityConfigured.mockReturnValue(true);
    fetchSanityData.mockResolvedValue([
      {
        _id: "i1",
        title: "When systems clarify operations",
        slug: "systems-clarify-operations",
        excerpt:
          "A practical look at choosing systems work that reduces operational friction for growing teams.",
        category: "software",
        publishedAt: "2026-02-01T12:00:00.000Z",
      },
    ]);

    const listing = await getInsightsListing({ category: "not-a-category" });
    expect(listing.category).toBeNull();
    expect(fetchSanityData).toHaveBeenCalledWith(
      expect.anything(),
      { category: "" },
      expect.anything(),
    );
  });

  it("uses development fixtures only when explicitly enabled outside production", async () => {
    isSanityConfigured.mockReturnValue(false);

    const listing = await getInsightsListing({
      env: { nodeEnv: "development", insightsDevFixtures: "true" },
    });

    expect(listing.source).toBe("fixtures");
    expect(listing.mode).toBe("development-fixtures");
    expect(listing.items.length).toBeGreaterThan(0);
    expect(
      listing.items.every((item) => item.isDevelopmentFixture),
    ).toBe(true);
  });
});

describe("getInsightBySlug", () => {
  beforeEach(() => {
    fetchSanityData.mockReset();
    isSanityConfigured.mockReset();
  });

  it("resolves a published slug", async () => {
    isSanityConfigured.mockReturnValue(true);
    fetchSanityData.mockResolvedValue({
      _id: "i1",
      title: "When systems clarify operations",
      slug: "systems-clarify-operations",
      excerpt:
        "A practical look at choosing systems work that reduces operational friction for growing teams.",
      category: "software",
      body: [],
      publishedAt: "2026-02-01T12:00:00.000Z",
      relatedSlugs: [],
    });

    const article = await getInsightBySlug("systems-clarify-operations");
    expect(article?.slug).toBe("systems-clarify-operations");
    expect(article?.isDevelopmentFixture).toBe(false);
  });

  it("returns null for unknown public slug", async () => {
    isSanityConfigured.mockReturnValue(true);
    fetchSanityData.mockResolvedValue(null);

    await expect(getInsightBySlug("missing-article")).resolves.toBeNull();
  });

  it("excludes fixtures in production even when flag is set", async () => {
    isSanityConfigured.mockReturnValue(false);

    await expect(
      getInsightBySlug("development-preview-software-systems", {
        env: { nodeEnv: "production", insightsDevFixtures: "true" },
      }),
    ).resolves.toBeNull();
  });
});

describe("getPublishedInsightSlugs", () => {
  beforeEach(() => {
    fetchSanityData.mockReset();
    isSanityConfigured.mockReset();
  });

  it("never returns development fixture slugs", async () => {
    isSanityConfigured.mockReturnValue(true);
    fetchSanityData.mockResolvedValue([
      { slug: "real-article" },
      { slug: "development-preview-software-systems" },
    ]);

    await expect(getPublishedInsightSlugs()).resolves.toEqual(["real-article"]);
  });
});

describe("getRelatedInsights", () => {
  beforeEach(() => {
    fetchSanityData.mockReset();
    isSanityConfigured.mockReset();
  });

  it("excludes the current article", async () => {
    isSanityConfigured.mockReturnValue(true);
    fetchSanityData.mockResolvedValue([
      {
        _id: "other",
        title: "Another systems article title here",
        slug: "another-systems-article",
        excerpt:
          "Another excerpt that is long enough for listing validation rules here.",
        category: "software",
        publishedAt: "2026-02-02T12:00:00.000Z",
      },
      {
        _id: "self",
        title: "When systems clarify operations",
        slug: "systems-clarify-operations",
        excerpt:
          "A practical look at choosing systems work that reduces operational friction for growing teams.",
        category: "software",
        publishedAt: "2026-02-01T12:00:00.000Z",
      },
    ]);

    const related = await getRelatedInsights({
      id: "self",
      title: "When systems clarify operations",
      slug: "systems-clarify-operations",
      href: "/insights/systems-clarify-operations",
      excerpt:
        "A practical look at choosing systems work that reduces operational friction for growing teams.",
      category: "software",
      categoryLabel: "Software",
      publishedAt: "2026-02-01T12:00:00.000Z",
      featured: false,
      author: null,
      imageSrc: null,
      imageAlt: "When systems clarify operations",
      isDevelopmentFixture: false,
      body: [],
      relatedSlugs: [
        "another-systems-article",
        "systems-clarify-operations",
      ],
      seo: {
        metaTitle: null,
        metaDescription: null,
        ogImageSrc: null,
        noIndex: false,
      },
    });

    expect(related.every((item) => item.slug !== "systems-clarify-operations")).toBe(
      true,
    );
  });
});
