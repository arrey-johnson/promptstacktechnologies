import { describe, expect, it } from "vitest";
import {
  areInsightsDevFixturesEnabled,
} from "./dev-fixtures";
import {
  parseInsightCategoryParam,
  insightCategorySolutionHref,
} from "@/types/insight";

describe("areInsightsDevFixturesEnabled", () => {
  it("requires explicit flag", () => {
    expect(
      areInsightsDevFixturesEnabled({
        nodeEnv: "development",
        insightsDevFixtures: "",
      }),
    ).toBe(false);
  });

  it("enables in development when flagged", () => {
    expect(
      areInsightsDevFixturesEnabled({
        nodeEnv: "development",
        insightsDevFixtures: "true",
      }),
    ).toBe(true);
  });

  it("never enables in production node env", () => {
    expect(
      areInsightsDevFixturesEnabled({
        nodeEnv: "production",
        vercelEnv: "",
        insightsDevFixtures: "true",
      }),
    ).toBe(false);
  });

  it("never enables on Vercel production", () => {
    expect(
      areInsightsDevFixturesEnabled({
        nodeEnv: "production",
        vercelEnv: "production",
        insightsDevFixtures: "true",
      }),
    ).toBe(false);
  });

  it("allows Vercel preview when flagged", () => {
    expect(
      areInsightsDevFixturesEnabled({
        nodeEnv: "production",
        vercelEnv: "preview",
        insightsDevFixtures: "true",
      }),
    ).toBe(true);
  });
});

describe("parseInsightCategoryParam", () => {
  it("accepts approved categories", () => {
    expect(parseInsightCategoryParam("software")).toBe("software");
    expect(parseInsightCategoryParam("ai-automation")).toBe("ai-automation");
  });

  it("falls back safely for invalid values", () => {
    expect(parseInsightCategoryParam("hacks")).toBeNull();
    expect(parseInsightCategoryParam(["nope"])).toBeNull();
    expect(parseInsightCategoryParam(undefined)).toBeNull();
  });
});

describe("insightCategorySolutionHref", () => {
  it("maps categories to solution paths", () => {
    expect(insightCategorySolutionHref("software").href).toBe(
      "/solutions/software",
    );
    expect(insightCategorySolutionHref("ai-automation").href).toBe(
      "/solutions/ai-automation",
    );
    expect(insightCategorySolutionHref("digital-growth").href).toBe(
      "/solutions/digital-marketing",
    );
    expect(insightCategorySolutionHref("business-operations").href).toBe(
      "/solutions",
    );
    expect(insightCategorySolutionHref(null).href).toBe("/solutions");
  });
});
