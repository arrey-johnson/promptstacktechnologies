import { describe, expect, it } from "vitest";
import { getActiveAcademyPrograms } from "./get-programs";
import { getAcademyContentSource } from "@/sanity/env";

describe("Academy content source adapter", () => {
  it("uses local approved programs by default", async () => {
    expect(getAcademyContentSource({})).toBe("local");
    const programs = await getActiveAcademyPrograms();
    expect(programs.map((p) => p.slug)).toEqual([
      "software-engineering",
      "artificial-intelligence",
      "cybersecurity",
    ]);
    // Operational fabrications remain absent on local content.
    expect(programs.every((p) => p.feeText == null)).toBe(true);
  });
});
