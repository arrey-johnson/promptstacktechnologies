import { describe, expect, it } from "vitest";
import {
  getGaMeasurementId,
  getGtmId,
  isAnalyticsConfigured,
} from "@/config/analytics";
import {
  assertNoPiiInPayload,
  FORBIDDEN_ANALYTICS_KEYS,
  isAnalyticsEventName,
  mapDataAnalyticsToEvent,
} from "@/lib/analytics/events";
import { normalizeSiteUrl, CANONICAL_PRODUCTION_ORIGIN } from "@/config/env";

describe("analytics config", () => {
  it("disables analytics when GTM id is absent", () => {
    expect(isAnalyticsConfigured({})).toBe(false);
    expect(getGtmId({})).toBeNull();
  });

  it("accepts a valid GTM id only", () => {
    expect(getGtmId({ NEXT_PUBLIC_GTM_ID: "GTM-ABC123" })).toBe("GTM-ABC123");
    expect(getGtmId({ NEXT_PUBLIC_GTM_ID: "not-valid" })).toBeNull();
  });

  it("does not treat GA id alone as runtime analytics enablement", () => {
    expect(
      isAnalyticsConfigured({ NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-ABCDEFG" }),
    ).toBe(false);
    expect(
      getGaMeasurementId({ NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-ABCDEFG" }),
    ).toBe("G-ABCDEFG");
  });
});

describe("analytics events", () => {
  it("recognizes taxonomy events only", () => {
    expect(isAnalyticsEventName("project_submission_success")).toBe(true);
    expect(isAnalyticsEventName("random_click")).toBe(false);
  });

  it("blocks PII keys in payloads", () => {
    expect(assertNoPiiInPayload({ cta_location: "hero" })).toBe(true);
    for (const key of FORBIDDEN_ANALYTICS_KEYS) {
      expect(assertNoPiiInPayload({ [key]: "secret" })).toBe(false);
    }
  });

  it("maps contact and CTA attributes without inventing events for everything", () => {
    expect(mapDataAnalyticsToEvent("cta_contact_start_project")).toEqual({
      event: "contact_path_click",
      payload: { path: "project" },
    });
    expect(mapDataAnalyticsToEvent("cta_hero_start_project")).toEqual({
      event: "project_cta_click",
      payload: { cta_location: "cta_hero_start_project" },
    });
    expect(mapDataAnalyticsToEvent("nav_capability_solutions")).toBeNull();
  });
});

describe("canonical production URL normalization", () => {
  it("forces https www for Promptstack production hosts", () => {
    expect(normalizeSiteUrl("http://www.promptstacktechnologies.com")).toBe(
      CANONICAL_PRODUCTION_ORIGIN,
    );
    expect(normalizeSiteUrl("https://promptstacktechnologies.com/")).toBe(
      CANONICAL_PRODUCTION_ORIGIN,
    );
    expect(normalizeSiteUrl("http://localhost:3000")).toBe(
      "http://localhost:3000",
    );
  });
});
