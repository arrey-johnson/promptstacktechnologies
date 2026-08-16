import { describe, expect, it } from "vitest";
import {
  formDataToInquiryInput,
  normalizeProjectInquiry,
  projectInquiryFormSchema,
} from "./schema";

function validInput(overrides: Record<string, unknown> = {}) {
  return {
    submissionId: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
    fullName: "Ada Okoro",
    workEmail: "Ada@Example.com ",
    phone: "+237 600 000 000",
    company: "Example Co",
    helpArea: "software",
    businessProblem:
      "Our operations still depend on spreadsheets and repeated data entry across teams.",
    projectDescription:
      "We need a clearer system for tracking work, customers and follow-up across the business.",
    timeline: "1-3-months",
    budgetRange: "prefer-to-discuss",
    referralSource: "Referral",
    privacyAcknowledged: true,
    turnstileToken: "token-abc",
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "brand",
    utmContent: "",
    utmTerm: "",
    landingPage: "/solutions/software",
    website: "",
    ...overrides,
  };
}

describe("projectInquiryFormSchema", () => {
  it("accepts a valid payload and normalizes email", () => {
    const result = projectInquiryFormSchema.safeParse(validInput());
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.workEmail).toBe("ada@example.com");
      expect(result.data.budgetRange).toBe("prefer-to-discuss");
      expect(result.data.utmContent).toBeUndefined();
    }
  });

  it("rejects missing required fields", () => {
    const result = projectInquiryFormSchema.safeParse(
      validInput({ fullName: "", company: "" }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects invalid help area and timeline enums", () => {
    const result = projectInquiryFormSchema.safeParse(
      validInput({ helpArea: "blockchain", timeline: "yesterday" }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects missing privacy acknowledgement", () => {
    const result = projectInquiryFormSchema.safeParse(
      validInput({ privacyAcknowledged: false }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects honeypot values", () => {
    const result = projectInquiryFormSchema.safeParse(
      validInput({ website: "https://spam.example" }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects invalid submissionId", () => {
    const result = projectInquiryFormSchema.safeParse(
      validInput({ submissionId: "not-a-uuid" }),
    );
    expect(result.success).toBe(false);
  });
});

describe("normalizeProjectInquiry", () => {
  it("preserves attribution fields", () => {
    const parsed = projectInquiryFormSchema.parse(validInput());
    const normalized = normalizeProjectInquiry(parsed);
    expect(normalized.utmSource).toBe("google");
    expect(normalized.landingPage).toBe("/solutions/software");
    expect(normalized.privacyAcknowledgedAt).toBeTruthy();
  });
});

describe("formDataToInquiryInput", () => {
  it("maps FormData including privacy checkbox", () => {
    const formData = new FormData();
    formData.set("fullName", "Ada");
    formData.set("privacyAcknowledged", "on");
    formData.set("cf-turnstile-response", "tok");
    const input = formDataToInquiryInput(formData);
    expect(input.privacyAcknowledged).toBe(true);
    expect(input.turnstileToken).toBe("tok");
  });
});
