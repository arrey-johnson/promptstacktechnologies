import { describe, expect, it } from "vitest";
import {
  getPublishedCaseStudyBySlug,
  getPublishedCaseStudySlugs,
  getWorkListing,
} from "./get-case-studies";

describe("getWorkListing", () => {
  it("returns labeled preview items in development when Sanity is not configured", async () => {
    const result = await getWorkListing({
      nodeEnv: "development",
      vercelEnv: "",
    });
    expect(result.source).toBe("local");
    expect(result.mode).toBe("preview");
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.every((item) => item.isPlaceholder)).toBe(true);
  });

  it("returns an empty publishable set in production when Sanity is not configured", async () => {
    const result = await getWorkListing({
      nodeEnv: "production",
      vercelEnv: "",
    });
    expect(result.source).toBe("local");
    expect(result.mode).toBe("publishable");
    expect(result.items).toEqual([]);
    expect(result.featured).toBeNull();
  });
});

describe("getPublishedCaseStudyBySlug", () => {
  it("never resolves placeholder slugs as published Work", async () => {
    expect(await getPublishedCaseStudyBySlug("business-operations-system")).toBeNull();
  });
});

describe("getPublishedCaseStudySlugs", () => {
  it("returns no static params until real case studies exist", async () => {
    expect(await getPublishedCaseStudySlugs()).toEqual([]);
  });
});
