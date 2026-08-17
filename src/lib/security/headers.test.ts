import { describe, expect, it } from "vitest";
import {
  buildMarketingContentSecurityPolicy,
  buildStudioContentSecurityPolicy,
  getMarketingSecurityHeaders,
} from "@/lib/security/headers";
import {
  getPublicStorageInventory,
  hasMarketingAnalyticsCookies,
} from "@/lib/legal/storage-inventory";

describe("security headers", () => {
  it("includes CSP for GTM, Turnstile and Sanity images", () => {
    const csp = buildMarketingContentSecurityPolicy();
    expect(csp).toContain("https://www.googletagmanager.com");
    expect(csp).toContain("https://challenges.cloudflare.com");
    expect(csp).toContain("https://cdn.sanity.io");
    expect(csp).toContain("upgrade-insecure-requests");
    expect(csp).not.toContain("'unsafe-eval'");
  });

  it("may allow unsafe-eval for local development React tooling", () => {
    expect(
      buildMarketingContentSecurityPolicy({ allowUnsafeEval: true }),
    ).toContain("'unsafe-eval'");
  });

  it("gives Studio a distinct CSP with unsafe-eval for Sanity tooling", () => {
    const studio = buildStudioContentSecurityPolicy();
    expect(studio).toContain("'unsafe-eval'");
    expect(studio).toContain("https://*.api.sanity.io");
  });

  it("emits HSTS only when production HTTPS flag is set", () => {
    const withHsts = getMarketingSecurityHeaders(true);
    const without = getMarketingSecurityHeaders(false);
    expect(
      withHsts.some((h) => h.key === "Strict-Transport-Security"),
    ).toBe(true);
    expect(
      without.some((h) => h.key === "Strict-Transport-Security"),
    ).toBe(false);
  });
});

describe("cookie inventory", () => {
  it("does not claim analytics storage when GTM is unconfigured", () => {
    expect(hasMarketingAnalyticsCookies()).toBe(false);
    expect(
      getPublicStorageInventory().some((item) => item.id === "gtm-ga"),
    ).toBe(false);
  });
});
