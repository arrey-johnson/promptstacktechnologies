import { describe, expect, it } from "vitest";
import { schemaTypes } from "@/sanity/schemas";

describe("CMS schema boundary", () => {
  it("does not store transactional leads or academy applications", () => {
    const names = schemaTypes.map((type) => type.name);
    expect(names).toContain("caseStudy");
    expect(names).toContain("insight");
    expect(names).toContain("academyProgram");
    expect(names).toContain("siteSettings");
    expect(names).not.toContain("businessLead");
    expect(names).not.toContain("academyApplication");
    expect(names).not.toContain("lead");
    expect(names).not.toContain("application");
  });

  it("does not expose an applicationOpen admissions toggle on academyProgram", () => {
    const academy = schemaTypes.find((type) => type.name === "academyProgram");
    expect(academy).toBeDefined();
    if (academy && academy.type === "document" && "fields" in academy) {
      const fields = (academy.fields as Array<{ name: string }>).map(
        (field) => field.name,
      );
      expect(fields).not.toContain("applicationOpen");
    }
  });
});
