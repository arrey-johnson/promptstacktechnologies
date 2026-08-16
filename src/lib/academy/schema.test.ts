import { describe, expect, it } from "vitest";
import {
  academyApplicationFormSchema,
  formDataToAcademyApplicationInput,
  normalizeAcademyApplication,
} from "./schema";

function validInput(overrides: Record<string, unknown> = {}) {
  return {
    submissionId: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    fullName: "Ada Okoro",
    email: "Ada@Example.com ",
    phone: "+237 600 000 000",
    city: "Douala",
    programSlug: "software-engineering",
    currentOccupationEducation: "University student",
    experienceLevel: "some-basic-experience",
    motivation:
      "I want to learn how to build software that solves real operational problems for businesses.",
    desiredOutcome:
      "I want to complete practical projects and develop skills I can demonstrate clearly.",
    privacyAcknowledged: true,
    turnstileToken: "token-abc",
    website: "",
    ...overrides,
  };
}

describe("academyApplicationFormSchema", () => {
  it("accepts a valid payload and normalizes email", () => {
    const result = academyApplicationFormSchema.safeParse(validInput());
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("ada@example.com");
      expect(result.data.programSlug).toBe("software-engineering");
    }
  });

  it("rejects missing required values", () => {
    const result = academyApplicationFormSchema.safeParse(
      validInput({ fullName: "", city: "", motivation: "short" }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects invalid program and experience enums", () => {
    const result = academyApplicationFormSchema.safeParse(
      validInput({
        programSlug: "blockchain",
        experienceLevel: "wizard",
      }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects missing privacy acknowledgement", () => {
    const result = academyApplicationFormSchema.safeParse(
      validInput({ privacyAcknowledged: false }),
    );
    expect(result.success).toBe(false);
  });
});

describe("normalizeAcademyApplication", () => {
  it("preserves submission id and attribution", () => {
    const parsed = academyApplicationFormSchema.parse(
      validInput({ utmSource: "ig", landingPage: "/academy" }),
    );
    const normalized = normalizeAcademyApplication(parsed);
    expect(normalized.submissionId).toBe(
      "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    );
    expect(normalized.utmSource).toBe("ig");
    expect(normalized.landingPage).toBe("/academy");
  });
});

describe("formDataToAcademyApplicationInput", () => {
  it("maps FormData including privacy checkbox", () => {
    const formData = new FormData();
    formData.set("fullName", "Ada");
    formData.set("privacyAcknowledged", "on");
    formData.set("cf-turnstile-response", "tok");
    const input = formDataToAcademyApplicationInput(formData);
    expect(input.privacyAcknowledged).toBe(true);
    expect(input.turnstileToken).toBe("tok");
  });
});
