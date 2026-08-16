import { afterEach, describe, expect, it } from "vitest";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";
import {
  markAcademyNotificationSentLocally,
  persistAcademyApplicationLocally,
} from "./repository";
import type { NormalizedAcademyApplication } from "./schema";

const storePath = path.join(
  process.cwd(),
  ".data",
  "academy-applications.json",
);

function application(
  submissionId: string,
): NormalizedAcademyApplication {
  return {
    submissionId,
    fullName: "Ada Okoro",
    email: "ada@example.com",
    phone: "+237600000000",
    city: "Douala",
    programSlug: "software-engineering",
    currentOccupationEducation: "Student",
    experienceLevel: "complete-beginner",
    motivation:
      "I want practical software skills so I can build useful tools for businesses.",
    desiredOutcome:
      "I want to finish projects I can demonstrate and explain clearly.",
    privacyAcknowledgedAt: new Date().toISOString(),
  };
}

afterEach(async () => {
  await rm(storePath, { force: true });
});

describe("persistAcademyApplicationLocally idempotency", () => {
  it("creates only one application and one history row for duplicate submission_id", async () => {
    const submissionId = "dddddddd-dddd-4ddd-8ddd-dddddddddddd";
    const first = await persistAcademyApplicationLocally(
      application(submissionId),
    );
    const second = await persistAcademyApplicationLocally(
      application(submissionId),
    );

    expect(first.ok).toBe(true);
    expect(second.ok).toBe(true);
    if (!first.ok || !second.ok) return;

    expect(second.application.id).toBe(first.application.id);
    expect(second.application.alreadyExisted).toBe(true);

    const raw = await readFile(storePath, "utf8");
    const store = JSON.parse(raw) as {
      applications: unknown[];
      history: Array<{ applicationId: string }>;
    };
    expect(store.applications).toHaveLength(1);
    expect(store.history).toHaveLength(1);
    expect(store.history[0]?.applicationId).toBe(first.application.id);
  });

  it("claims notification send only once", async () => {
    const created = await persistAcademyApplicationLocally(
      application("eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee"),
    );
    expect(created.ok).toBe(true);
    if (!created.ok) return;

    const firstClaim = await markAcademyNotificationSentLocally(
      created.application.id,
    );
    const secondClaim = await markAcademyNotificationSentLocally(
      created.application.id,
    );
    expect(firstClaim).toBe(true);
    expect(secondClaim).toBe(false);
  });
});
