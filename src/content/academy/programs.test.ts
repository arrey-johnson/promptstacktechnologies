import { describe, expect, it } from "vitest";
import { areAcademyApplicationsEnabled } from "@/config/academy";
import {
  getAcademyProgramBySlug,
  getActiveAcademyPrograms,
  programCards,
} from "./programs";

describe("academy program data", () => {
  it("exposes exactly three active launch programs", () => {
    const programs = getActiveAcademyPrograms();
    expect(programs).toHaveLength(3);
    expect(programs.map((program) => program.slug)).toEqual([
      "software-engineering",
      "artificial-intelligence",
      "cybersecurity",
    ]);
  });

  it("does not fabricate operational fee/date fields", () => {
    for (const program of getActiveAcademyPrograms()) {
      expect(program.feeText).toBeNull();
      expect(program.duration).toBeNull();
      expect(program.scheduleText).toBeNull();
      expect(program.cohortText).toBeNull();
    }
  });

  it("keeps employment language non-guaranteeing in FAQs", () => {
    for (const program of getActiveAcademyPrograms()) {
      const joined = program.faq.map((item) => item.answer).join(" ").toLowerCase();
      expect(
        joined.includes("does not guarantee") ||
          joined.includes("never guaranteed"),
      ).toBe(true);
      expect(joined).not.toContain("guaranteed employment");
      expect(joined).not.toContain("get a job at promptstack");
    }
  });

  it("labels example projects as example types", () => {
    for (const program of getActiveAcademyPrograms()) {
      expect(
        program.projects.every((project) =>
          /example (project|lab|exercise) type/i.test(project.title),
        ),
      ).toBe(true);
    }
  });

  it("resolves program cards to real routes", () => {
    expect(programCards.every((card) => card.href.startsWith("/academy/programs/"))).toBe(
      true,
    );
    expect(getAcademyProgramBySlug("software-engineering")?.title).toBe(
      "Software Engineering",
    );
  });
});

describe("academy applications flag", () => {
  it("defaults to applications closed without env enablement", () => {
    expect(areAcademyApplicationsEnabled({})).toBe(false);
  });
});
