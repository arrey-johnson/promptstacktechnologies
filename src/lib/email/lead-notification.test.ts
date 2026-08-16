import { describe, expect, it } from "vitest";
import { buildLeadNotificationContent } from "./lead-notification";
import type { NormalizedBusinessLead } from "@/lib/leads/schema";

const lead: NormalizedBusinessLead = {
  submissionId: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
  fullName: "Ada Okoro",
  workEmail: "ada@example.com",
  phone: "+237600000000",
  company: "Example Co",
  helpArea: "software",
  businessProblem: "Manual operations are slowing us down every week.",
  projectDescription: "Need a clearer operations system.",
  timeline: "1-3-months",
  budgetRange: "prefer-to-discuss",
  utmSource: "google",
  landingPage: "/start-a-project",
  privacyAcknowledgedAt: new Date().toISOString(),
};

describe("buildLeadNotificationContent", () => {
  it("includes lead identity and omits full long description dump", () => {
    const content = buildLeadNotificationContent(lead, "lead-123");
    expect(content.subject).toContain("Example Co");
    expect(content.text).toContain("Lead ID: lead-123");
    expect(content.text).toContain("Software");
    expect(content.text).toContain("utm_source: google");
    expect(content.text).not.toContain("Need a clearer operations system.");
  });
});
