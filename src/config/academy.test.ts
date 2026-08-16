import { describe, expect, it } from "vitest";
import {
  areAcademyApplicationsEnabled,
  getAcademyApplyHref,
  isAcademyApplyProgramSlug,
  resolveAcademyApplyProgramQuery,
} from "./academy";

describe("areAcademyApplicationsEnabled", () => {
  it("defaults to closed when env is unset", () => {
    expect(areAcademyApplicationsEnabled({})).toBe(false);
  });

  it("enables when ACADEMY_APPLICATIONS_ENABLED is true", () => {
    expect(
      areAcademyApplicationsEnabled({ ACADEMY_APPLICATIONS_ENABLED: "true" }),
    ).toBe(true);
    expect(
      areAcademyApplicationsEnabled({ ACADEMY_APPLICATIONS_ENABLED: "1" }),
    ).toBe(true);
  });

  it("stays closed when explicitly false", () => {
    expect(
      areAcademyApplicationsEnabled({ ACADEMY_APPLICATIONS_ENABLED: "false" }),
    ).toBe(false);
  });
});

describe("program query preselection", () => {
  it("accepts only approved program slugs", () => {
    expect(isAcademyApplyProgramSlug("software-engineering")).toBe(true);
    expect(isAcademyApplyProgramSlug("blockchain")).toBe(false);
    expect(resolveAcademyApplyProgramQuery("artificial-intelligence")).toBe(
      "artificial-intelligence",
    );
    expect(resolveAcademyApplyProgramQuery("not-a-program")).toBeUndefined();
    expect(resolveAcademyApplyProgramQuery(["cybersecurity", "x"])).toBe(
      "cybersecurity",
    );
  });

  it("returns Apply href only when applications are enabled", () => {
    // Depends on process.env; without override, default is closed.
    // Absolute path shape is tested via helper when forced through enabled path.
    const href = getAcademyApplyHref("software-engineering");
    if (areAcademyApplicationsEnabled()) {
      expect(href).toBe("/academy/apply?program=software-engineering");
    } else {
      expect(href).toBeNull();
    }
  });
});
