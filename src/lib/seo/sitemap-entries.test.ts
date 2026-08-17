import { describe, expect, it } from "vitest";
import {
  buildSitemapEntries,
  isSitemapPathExcluded,
  SITEMAP_STATIC_PATHS,
} from "./sitemap-entries";

describe("sitemap safeguards", () => {
  it("excludes Studio, confirmations, api, and interim legal paths", () => {
    expect(isSitemapPathExcluded("/studio")).toBe(true);
    expect(isSitemapPathExcluded("/api/revalidate")).toBe(true);
    expect(isSitemapPathExcluded("/project-request-received")).toBe(true);
    expect(isSitemapPathExcluded("/academy/application-received")).toBe(true);
    expect(isSitemapPathExcluded("/privacy")).toBe(true);
    expect(isSitemapPathExcluded("/terms")).toBe(true);
    expect(isSitemapPathExcluded("/cookies")).toBe(true);
    expect(isSitemapPathExcluded("/insights")).toBe(false);
    expect(isSitemapPathExcluded("/company/about")).toBe(false);
    expect(isSitemapPathExcluded("/contact")).toBe(false);
  });

  it("includes corporate About/Contact and Insight index after Epic 10/11", () => {
    const entries = buildSitemapEntries({
      baseUrl: "https://example.com",
      workSlugs: ["real-project"],
      academyProgramSlugs: ["software-engineering"],
      insightSlugs: ["real-insight", "development-preview-software-systems"],
    });

    const urls = entries.map((entry) => entry.url);
    expect(urls).toContain("https://example.com/company/about");
    expect(urls).toContain("https://example.com/contact");
    expect(urls).toContain("https://example.com/insights");
    expect(urls).toContain("https://example.com/insights/real-insight");
    expect(urls).not.toContain(
      "https://example.com/insights/development-preview-software-systems",
    );
    expect(urls).not.toContain("https://example.com/privacy");
    expect(urls).not.toContain("https://example.com/terms");
    expect(urls).not.toContain("https://example.com/cookies");
    expect(SITEMAP_STATIC_PATHS.includes("/company/about")).toBe(true);
    expect(SITEMAP_STATIC_PATHS.includes("/contact")).toBe(true);
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
