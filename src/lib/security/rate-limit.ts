/**
 * Application-level in-memory rate limiting.
 *
 * Scope:
 * - Local/dev and per-instance backstop only
 * - NOT globally reliable production rate limiting on Vercel
 *   (multiple isolates do not share this Map)
 *
 * Production must also configure a platform/WAF rule. See:
 * - docs/epic-6-operations.md
 * - docs/epic-8-academy-operations.md
 * - docs/13-qa-release-launch.md
 *
 * Keys should be namespaced per funnel, e.g.:
 * - project-inquiry:<ip>
 * - academy-application:<ip>
 *
 * Documented local limits:
 * - 5 submissions per IP fingerprint per 15 minutes
 * - Complements Turnstile; does not replace it
 * - IP is used only as an ephemeral bucket key — not persisted to the database
 */

type RateBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateBucket>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

export type RateLimitResult =
  | { allowed: true; remaining: number }
  | { allowed: false; retryAfterSeconds: number };

export function checkRateLimit(
  key: string,
  now = Date.now(),
): RateLimitResult {
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (existing.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((existing.resetAt - now) / 1000),
      ),
    };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return { allowed: true, remaining: MAX_REQUESTS - existing.count };
}

/** Test helper — clears in-memory buckets. */
export function resetRateLimitBuckets() {
  buckets.clear();
}

export function getRateLimitConfig() {
  return {
    windowMs: WINDOW_MS,
    maxRequests: MAX_REQUESTS,
    strategy: "in-memory-per-instance" as const,
    productionReliable: false,
  };
}
