import { describe, expect, it, vi } from "vitest";
import {
  TURNSTILE_DEV_BYPASS_TOKEN,
  TURNSTILE_PROJECT_INQUIRY_ACTION,
  canUseTurnstileDevBypass,
  parseAllowedHostnames,
  shouldValidateTurnstileHostname,
  verifyTurnstileToken,
} from "./turnstile";

describe("canUseTurnstileDevBypass", () => {
  it("allows bypass only in development without secret", () => {
    expect(
      canUseTurnstileDevBypass({
        nodeEnv: "development",
        secretKey: undefined,
      }),
    ).toBe(true);
    expect(
      canUseTurnstileDevBypass({
        nodeEnv: "development",
        secretKey: "secret",
      }),
    ).toBe(false);
  });

  it("never allows bypass in production", () => {
    expect(
      canUseTurnstileDevBypass({
        siteEnv: "production",
        nodeEnv: "production",
        secretKey: undefined,
      }),
    ).toBe(false);
    expect(
      canUseTurnstileDevBypass({
        vercelEnv: "production",
        nodeEnv: "production",
        secretKey: undefined,
      }),
    ).toBe(false);
  });

  it("never allows bypass in Vercel preview or staging", () => {
    expect(
      canUseTurnstileDevBypass({
        vercelEnv: "preview",
        nodeEnv: "production",
        secretKey: undefined,
      }),
    ).toBe(false);
    expect(
      canUseTurnstileDevBypass({
        siteEnv: "staging",
        nodeEnv: "production",
        secretKey: undefined,
      }),
    ).toBe(false);
  });
});

describe("hostname policy", () => {
  it("requires hostname validation only in production", () => {
    expect(
      shouldValidateTurnstileHostname({ vercelEnv: "production" }),
    ).toBe(true);
    expect(
      shouldValidateTurnstileHostname({ vercelEnv: "preview" }),
    ).toBe(false);
    expect(
      shouldValidateTurnstileHostname({ nodeEnv: "development" }),
    ).toBe(false);
  });

  it("parses allowed hostnames", () => {
    expect(parseAllowedHostnames("promptstack.com, www.promptstack.com")).toEqual([
      "promptstack.com",
      "www.promptstack.com",
    ]);
  });
});

describe("verifyTurnstileToken", () => {
  it("accepts documented development bypass token only in development", async () => {
    const result = await verifyTurnstileToken(TURNSTILE_DEV_BYPASS_TOKEN, {
      env: { nodeEnv: "development", secretKey: "" },
    });
    expect(result).toEqual({
      ok: true,
      action: TURNSTILE_PROJECT_INQUIRY_ACTION,
    });
  });

  it("rejects dev bypass in production even without secret", async () => {
    const result = await verifyTurnstileToken(TURNSTILE_DEV_BYPASS_TOKEN, {
      env: {
        siteEnv: "production",
        nodeEnv: "production",
        secretKey: "",
      },
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      // Bypass must never succeed; production without secret also fails closed.
      expect(["invalid_token", "missing_secret"]).toContain(result.reason);
      expect(result.reason).toBe("invalid_token");
    }
  });

  it("rejects dev bypass in production when a secret is configured", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: false }),
    });

    const result = await verifyTurnstileToken(TURNSTILE_DEV_BYPASS_TOKEN, {
      env: {
        siteEnv: "production",
        nodeEnv: "production",
        secretKey: "secret",
        allowedHostnames: "promptstack.com",
      },
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(result).toEqual({ ok: false, reason: "invalid_token" });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("fails closed in production without secret", async () => {
    const result = await verifyTurnstileToken("anything", {
      env: { siteEnv: "production", nodeEnv: "production", secretKey: "" },
    });
    expect(result).toEqual({ ok: false, reason: "missing_secret" });
  });

  it("sends Siteverify idempotency_key and validates action", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        action: TURNSTILE_PROJECT_INQUIRY_ACTION,
        hostname: "promptstack.com",
      }),
    });

    const result = await verifyTurnstileToken("live-token", {
      env: {
        siteEnv: "production",
        nodeEnv: "production",
        secretKey: "secret",
        allowedHostnames: "promptstack.com",
      },
      idempotencyKey: "11111111-1111-4111-8111-111111111111",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(result.ok).toBe(true);
    const body = fetchImpl.mock.calls[0]?.[1]?.body as URLSearchParams;
    expect(body.get("idempotency_key")).toBe(
      "11111111-1111-4111-8111-111111111111",
    );
  });

  it("fails when Turnstile action mismatches", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        action: "other_form",
        hostname: "promptstack.com",
      }),
    });

    const result = await verifyTurnstileToken("live-token", {
      env: {
        siteEnv: "production",
        nodeEnv: "production",
        secretKey: "secret",
        allowedHostnames: "promptstack.com",
      },
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(result).toEqual({ ok: false, reason: "action_mismatch" });
  });

  it("fails when production hostname mismatches", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        action: TURNSTILE_PROJECT_INQUIRY_ACTION,
        hostname: "evil.example",
      }),
    });

    const result = await verifyTurnstileToken("live-token", {
      env: {
        siteEnv: "production",
        nodeEnv: "production",
        secretKey: "secret",
        allowedHostnames: "promptstack.com",
      },
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(result).toEqual({ ok: false, reason: "hostname_mismatch" });
  });

  it("fails closed in production when allowed hostnames are missing", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        action: TURNSTILE_PROJECT_INQUIRY_ACTION,
        hostname: "promptstack.com",
      }),
    });

    const result = await verifyTurnstileToken("live-token", {
      env: {
        siteEnv: "production",
        nodeEnv: "production",
        secretKey: "secret",
        allowedHostnames: "",
      },
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(result).toEqual({
      ok: false,
      reason: "missing_allowed_hostnames",
    });
  });

  it("rejects unsuccessful Siteverify responses", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: false }),
    });

    const result = await verifyTurnstileToken("bad-token", {
      env: {
        siteEnv: "preview",
        nodeEnv: "production",
        secretKey: "secret",
      },
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(result).toEqual({ ok: false, reason: "invalid_token" });
  });
});
