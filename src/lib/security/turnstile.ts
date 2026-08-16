/**
 * Cloudflare Turnstile server-side verification.
 * Never store or log raw tokens. Never trust client-only widget state.
 */

import { resolveDeploymentEnvironment } from "@/config/indexing";

export const TURNSTILE_PROJECT_INQUIRY_ACTION = "project_inquiry";
export const TURNSTILE_ACADEMY_APPLICATION_ACTION = "academy_application";

/**
 * Documented development-only bypass token.
 * Production / preview / staging must never accept this.
 */
export const TURNSTILE_DEV_BYPASS_TOKEN = "dev-turnstile-bypass";

/**
 * Cloudflare official always-passes test keys (for local/manual testing).
 * Prefer these over the custom bypass when exercising Siteverify.
 * @see https://developers.cloudflare.com/turnstile/troubleshooting/testing/
 */
export const TURNSTILE_OFFICIAL_TEST_SITE_KEY =
  "1x00000000000000000000AA";
export const TURNSTILE_OFFICIAL_TEST_SECRET_KEY =
  "1x0000000000000000000000000000000AA";

export type TurnstileVerifyReason =
  | "missing_secret"
  | "invalid_token"
  | "request_failed"
  | "action_mismatch"
  | "hostname_mismatch"
  | "missing_allowed_hostnames";

export type TurnstileVerifyResult =
  | { ok: true; action?: string; hostname?: string }
  | { ok: false; reason: TurnstileVerifyReason };

type TurnstileEnv = {
  secretKey?: string;
  nodeEnv?: string;
  vercelEnv?: string;
  siteEnv?: string;
  allowedHostnames?: string;
};

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function envSignals(env: TurnstileEnv) {
  return {
    NODE_ENV: env.nodeEnv ?? process.env.NODE_ENV,
    VERCEL_ENV: env.vercelEnv ?? process.env.VERCEL_ENV,
    SITE_ENV: env.siteEnv ?? process.env.SITE_ENV,
  };
}

/**
 * Custom bypass is allowed ONLY when:
 * - deployment environment resolves to development
 * - TURNSTILE_SECRET_KEY is unset
 *
 * Impossible in production, Vercel preview, and staging.
 */
export function canUseTurnstileDevBypass(env: TurnstileEnv = {}): boolean {
  const secret = (env.secretKey ?? process.env.TURNSTILE_SECRET_KEY)?.trim();
  if (secret) return false;

  const environment = resolveDeploymentEnvironment(envSignals(env));
  return environment === "development";
}

export function parseAllowedHostnames(
  raw: string | undefined = process.env.TURNSTILE_ALLOWED_HOSTNAMES,
): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function shouldValidateTurnstileHostname(
  env: TurnstileEnv = {},
): boolean {
  const environment = resolveDeploymentEnvironment(envSignals(env));
  return environment === "production";
}

type SiteverifyResponse = {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

/**
 * Verify a Turnstile token via Siteverify.
 * Pass submission UUID as idempotencyKey for safe Siteverify retries.
 */
export async function verifyTurnstileToken(
  token: string,
  options?: {
    remoteIp?: string;
    idempotencyKey?: string;
    expectedAction?: string;
    env?: TurnstileEnv;
    fetchImpl?: typeof fetch;
  },
): Promise<TurnstileVerifyResult> {
  const trimmed = token.trim();
  if (!trimmed) {
    return { ok: false, reason: "invalid_token" };
  }

  const env = options?.env ?? {};
  const secret = (env.secretKey ?? process.env.TURNSTILE_SECRET_KEY)?.trim();
  const expectedAction =
    options?.expectedAction ?? TURNSTILE_PROJECT_INQUIRY_ACTION;

  if (canUseTurnstileDevBypass(env)) {
    if (trimmed === TURNSTILE_DEV_BYPASS_TOKEN) {
      return { ok: true, action: expectedAction };
    }
    return { ok: false, reason: "invalid_token" };
  }

  // Explicitly reject the custom bypass outside development, even if somehow submitted.
  if (trimmed === TURNSTILE_DEV_BYPASS_TOKEN) {
    return { ok: false, reason: "invalid_token" };
  }

  if (!secret) {
    return { ok: false, reason: "missing_secret" };
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: trimmed,
    });
    if (options?.remoteIp) {
      body.set("remoteip", options.remoteIp);
    }
    if (options?.idempotencyKey) {
      body.set("idempotency_key", options.idempotencyKey);
    }

    const fetchImpl = options?.fetchImpl ?? fetch;
    const response = await fetchImpl(SITEVERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) {
      return { ok: false, reason: "request_failed" };
    }

    const data = (await response.json()) as SiteverifyResponse;
    if (data.success !== true) {
      return { ok: false, reason: "invalid_token" };
    }

    if (expectedAction && data.action !== expectedAction) {
      console.error("[turnstile] action mismatch", {
        expected: expectedAction,
        received: data.action ?? null,
      });
      return { ok: false, reason: "action_mismatch" };
    }

    if (shouldValidateTurnstileHostname(env)) {
      const allowed = parseAllowedHostnames(
        env.allowedHostnames ?? process.env.TURNSTILE_ALLOWED_HOSTNAMES,
      );
      if (allowed.length === 0) {
        console.error("[turnstile] production missing TURNSTILE_ALLOWED_HOSTNAMES");
        return { ok: false, reason: "missing_allowed_hostnames" };
      }
      const hostname = (data.hostname ?? "").trim().toLowerCase();
      if (!hostname || !allowed.includes(hostname)) {
        console.error("[turnstile] hostname mismatch", {
          received: hostname || null,
        });
        return { ok: false, reason: "hostname_mismatch" };
      }
    }

    return {
      ok: true,
      action: data.action,
      hostname: data.hostname,
    };
  } catch {
    return { ok: false, reason: "request_failed" };
  }
}
