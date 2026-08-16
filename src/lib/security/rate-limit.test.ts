import { describe, expect, it } from "vitest";
import { checkRateLimit, resetRateLimitBuckets } from "./rate-limit";

describe("checkRateLimit", () => {
  it("allows a burst then blocks", () => {
    resetRateLimitBuckets();
    const key = "test-ip";

    for (let i = 0; i < 5; i += 1) {
      expect(checkRateLimit(key).allowed).toBe(true);
    }

    const blocked = checkRateLimit(key);
    expect(blocked.allowed).toBe(false);
    if (!blocked.allowed) {
      expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
    }
  });
});
