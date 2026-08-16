import { describe, expect, it } from "vitest";
import { buildAcademyNotificationContent } from "./academy-notification";
import type { NormalizedAcademyApplication } from "@/lib/academy/schema";

const application: NormalizedAcademyApplication = {
  submissionId: "ffffffff-ffff-4fff-8fff-ffffffffffff",
  fullName: "Ada Okoro",
  email: "ada@example.com",
  phone: "+237600000000",
  city: "Douala",
  programSlug: "software-engineering",
  currentOccupationEducation: "Student",
  experienceLevel: "complete-beginner",
  motivation: "I want practical software skills for real problems.",
  desiredOutcome: "I want to finish projects I can demonstrate.",
  utmSource: "instagram",
  landingPage: "/academy/apply",
  privacyAcknowledgedAt: new Date().toISOString(),
};

describe("buildAcademyNotificationContent", () => {
  it("includes identity and omits full long dumps beyond summary", () => {
    const content = buildAcademyNotificationContent(application, "app-123");
    expect(content.subject).toContain("Software Engineering");
    expect(content.text).toContain("Application ID: app-123");
    expect(content.text).toContain("utm_source: instagram");
    expect(content.text).toContain("Complete beginner");
  });
});
