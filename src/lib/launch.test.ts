import { describe, expect, it } from "vitest";
import {
  getTimeRemaining,
  isComingSoonBypassPath,
  isComingSoonLockActive,
  padUnit,
} from "./launch";

describe("getTimeRemaining", () => {
  const launchAt = Date.parse("2026-10-01T00:00:00+01:00");

  it("splits a full day into units", () => {
    const remaining = getTimeRemaining(launchAt - 90_610_000, launchAt);
    expect(remaining).toMatchObject({
      days: 1,
      hours: 1,
      minutes: 10,
      seconds: 10,
      expired: false,
    });
  });

  it("clamps to zero after launch", () => {
    const remaining = getTimeRemaining(launchAt + 5_000, launchAt);
    expect(remaining).toEqual({
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    });
  });
});

describe("padUnit", () => {
  it("pads single digits", () => {
    expect(padUnit(4)).toBe("04");
    expect(padUnit(12)).toBe("12");
  });
});

describe("isComingSoonLockActive", () => {
  const launchAt = Date.parse("2026-10-01T00:00:00+01:00");

  it("locks before launch when the env flag is unset", () => {
    expect(
      isComingSoonLockActive({ nowMs: launchAt - 1, env: undefined }),
    ).toBe(true);
  });

  it("opens at launch when the env flag is unset", () => {
    expect(isComingSoonLockActive({ nowMs: launchAt, env: undefined })).toBe(
      false,
    );
  });

  it("can be forced off or on with COMING_SOON", () => {
    expect(
      isComingSoonLockActive({ nowMs: launchAt - 1, env: "false" }),
    ).toBe(false);
    expect(
      isComingSoonLockActive({ nowMs: launchAt + 1, env: "true" }),
    ).toBe(true);
  });
});

describe("isComingSoonBypassPath", () => {
  it("allows the homepage, studio, APIs and static files", () => {
    expect(isComingSoonBypassPath("/")).toBe(true);
    expect(isComingSoonBypassPath("/studio")).toBe(true);
    expect(isComingSoonBypassPath("/studio/structure")).toBe(true);
    expect(isComingSoonBypassPath("/api/draft-mode/enable")).toBe(true);
    expect(isComingSoonBypassPath("/favicon.ico")).toBe(true);
  });

  it("locks marketing routes", () => {
    expect(isComingSoonBypassPath("/academy")).toBe(false);
    expect(isComingSoonBypassPath("/solutions/software")).toBe(false);
    expect(isComingSoonBypassPath("/company/about/")).toBe(false);
    expect(isComingSoonBypassPath("/contact")).toBe(false);
  });
});
