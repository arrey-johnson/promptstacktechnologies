import { describe, expect, it } from "vitest";
import { DESKTOP_NAV_MIN_WIDTH, breakpoints } from "./breakpoints";

describe("breakpoints", () => {
  it("exposes a desktop-nav minimum below the previous xl-only cutoff", () => {
    expect(DESKTOP_NAV_MIN_WIDTH).toBe(1024);
    expect(DESKTOP_NAV_MIN_WIDTH).toBeLessThan(breakpoints.xl);
  });

  it("keeps progressive desktop density steps ordered", () => {
    expect(breakpoints.nav).toBeLessThan(breakpoints.navMd);
    expect(breakpoints.navMd).toBeLessThan(breakpoints.xl);
    expect(breakpoints.xl).toBeLessThan(breakpoints.wide);
  });
});
