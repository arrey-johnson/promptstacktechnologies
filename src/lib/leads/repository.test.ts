import { afterEach, describe, expect, it } from "vitest";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";
import {
  markNotificationSentLocally,
  persistLeadLocally,
} from "./repository";
import type { NormalizedBusinessLead } from "./schema";

const storePath = path.join(process.cwd(), ".data", "business-leads.json");

function lead(submissionId: string): NormalizedBusinessLead {
  return {
    submissionId,
    fullName: "Ada Okoro",
    workEmail: "ada@example.com",
    phone: "+237600000000",
    company: "Example Co",
    helpArea: "software",
    businessProblem:
      "Our operations still depend on spreadsheets and repeated data entry across teams.",
    projectDescription:
      "We need a clearer system for tracking work, customers and follow-up.",
    timeline: "1-3-months",
    privacyAcknowledgedAt: new Date().toISOString(),
  };
}

afterEach(async () => {
  await rm(storePath, { force: true });
});

describe("persistLeadLocally idempotency", () => {
  it("creates only one lead and one history row for duplicate submission_id", async () => {
    const submissionId = "11111111-2222-4333-8444-555555555555";
    const first = await persistLeadLocally(lead(submissionId));
    const second = await persistLeadLocally(lead(submissionId));

    expect(first.ok).toBe(true);
    expect(second.ok).toBe(true);
    if (!first.ok || !second.ok) return;

    expect(second.lead.id).toBe(first.lead.id);
    expect(second.lead.alreadyExisted).toBe(true);

    const raw = await readFile(storePath, "utf8");
    const store = JSON.parse(raw) as {
      leads: unknown[];
      history: Array<{ leadId: string }>;
    };
    expect(store.leads).toHaveLength(1);
    expect(store.history).toHaveLength(1);
    expect(store.history[0]?.leadId).toBe(first.lead.id);
  });

  it("claims notification send only once", async () => {
    const created = await persistLeadLocally(
      lead("aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee"),
    );
    expect(created.ok).toBe(true);
    if (!created.ok) return;

    const firstClaim = await markNotificationSentLocally(created.lead.id);
    const secondClaim = await markNotificationSentLocally(created.lead.id);
    expect(firstClaim).toBe(true);
    expect(secondClaim).toBe(false);
  });
});
