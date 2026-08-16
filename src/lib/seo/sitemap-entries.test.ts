import { describe, expect, it } from "vitest";
import {
  buildSitemapEntries,
  isSitemapPathExcluded,
  SITEMAP_STATIC_PATHS,
} from "./sitemap-entries";

describe("sitemap safeguards", () => {
  it("excludes Studio, confirmations, api, and Insights paths", () => {
    expect(isSitemapPathExcluded("/studio")).toBe(true);
    expect(isSitemapPathExcluded("/studio/structure")).toBe(true);
    expect(isSitemapPathExcluded("/api/revalidate")).toBe(true);
    expect(isSitemapPathExcluded("/project-request-received")).toBe(true);
    expect(isSitemapPathExcluded("/academy/application-received")).toBe(true);
    expect(isSitemapPathExcluded("/insights")).toBe(true);
    expect(isSitemapPathExcluded("/insights/example")).toBe(true);
    expect(isSitemapPathExcluded("/work")).toBe(false);
  });

  it("does not include Insight index or detail URLs before Epic 10", () => {
    const entries = buildSitemapEntries({
      baseUrl: "https://example.com",
      workSlugs: ["real-project"],
      academyProgramSlugs: ["software-engineering"],
      insightSlugs: ["should-not-appear"],
    });

    const urls = entries.map((entry) => entry.url);
    expect(urls).toContain("https://example.com/work/real-project");
    expect(urls).toContain(
      "https://example.com/academy/programs/software-engineering",
    );
    expect(urls.some((url) => url.includes("/insights"))).toBe(false);
    expect(SITEMAP_STATIC_PATHS.includes("/insights" as never)).toBe(false);
  });

  it("excludes placeholder-marked work slugs and excluded static paths", () => {
    const entries = buildSitemapEntries({
      baseUrl: "https://example.com",
      workSlugs: ["placeholder-demo", "real-project"],
      academyProgramSlugs: [],
    });
    const urls = entries.map((entry) => entry.url);
    expect(urls).not.toContain("https://example.com/work/placeholder-demo");
    expect(urls).toContain("https://example.com/work/real-project");
    expect(urls.some((url) => url.includes("/studio"))).toBe(false);
    expect(urls.some((url) => url.includes("application-received"))).toBe(
      false,
    );
  });
});
