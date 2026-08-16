import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
  headers: async () =>
    new Map([["x-forwarded-for", "203.0.113.20"]]) as unknown as Headers,
}));

vi.mock("@/config/academy", async () => {
  const actual = await vi.importActual<typeof import("@/config/academy")>(
    "@/config/academy",
  );
  return {
    ...actual,
    areAcademyApplicationsEnabled: vi.fn(() => true),
  };
});

vi.mock("@/lib/academy/repository", () => ({
  persistAcademyApplication: vi.fn(),
  findAcademyApplicationBySubmissionId: vi.fn(),
  claimAcademyNotification: vi.fn(),
  clearAcademyNotificationClaim: vi.fn(),
}));

vi.mock("@/lib/email/academy-notification", () => ({
  sendAcademyApplicationNotification: vi.fn(),
}));

vi.mock("@/lib/security/turnstile", async () => {
  const actual = await vi.importActual<typeof import("@/lib/security/turnstile")>(
    "@/lib/security/turnstile",
  );
  return {
    ...actual,
    verifyTurnstileToken: vi.fn(),
  };
});

import { areAcademyApplicationsEnabled } from "@/config/academy";
import { sendAcademyApplicationNotification } from "@/lib/email/academy-notification";
import {
  claimAcademyNotification,
  clearAcademyNotificationClaim,
  findAcademyApplicationBySubmissionId,
  persistAcademyApplication,
} from "@/lib/academy/repository";
import { submitAcademyApplication } from "@/lib/academy/submit-application";
import { resetRateLimitBuckets } from "@/lib/security/rate-limit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";

const SUBMISSION_ID = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";

function validFormData(overrides: Record<string, string> = {}) {
  const formData = new FormData();
  const values = {
    submissionId: SUBMISSION_ID,
    fullName: "Ada Okoro",
    email: "ada@example.com",
    phone: "+237 600 000 000",
    city: "Douala",
    programSlug: "software-engineering",
    currentOccupationEducation: "University student",
    experienceLevel: "complete-beginner",
    motivation:
      "I want to learn practical software skills so I can build useful tools.",
    desiredOutcome:
      "I want to finish projects I can demonstrate and explain clearly.",
    privacyAcknowledged: "true",
    turnstileToken: "token",
    website: "",
    ...overrides,
  };
  for (const [key, value] of Object.entries(values)) {
    formData.set(key, value);
  }
  return formData;
}

afterEach(() => {
  vi.clearAllMocks();
  resetRateLimitBuckets();
  vi.mocked(areAcademyApplicationsEnabled).mockReturnValue(true);
});

describe("submitAcademyApplication", () => {
  it("rejects when applications are closed", async () => {
    vi.mocked(areAcademyApplicationsEnabled).mockReturnValue(false);
    const result = await submitAcademyApplication(validFormData());
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("applications_closed");
    expect(persistAcademyApplication).not.toHaveBeenCalled();
  });

  it("returns validation errors without persisting", async () => {
    const result = await submitAcademyApplication(
      validFormData({ fullName: "", privacyAcknowledged: "" }),
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("validation");
    expect(persistAcademyApplication).not.toHaveBeenCalled();
  });

  it("succeeds when persist works even if notification fails", async () => {
    vi.mocked(findAcademyApplicationBySubmissionId).mockResolvedValue(null);
    vi.mocked(verifyTurnstileToken).mockResolvedValue({ ok: true });
    vi.mocked(persistAcademyApplication).mockResolvedValue({
      ok: true,
      application: {
        id: "app-1",
        submissionId: SUBMISSION_ID,
        status: "SUBMITTED",
        createdAt: new Date().toISOString(),
        notificationSentAt: null,
        alreadyExisted: false,
      },
      adapter: "local-file",
    });
    vi.mocked(claimAcademyNotification).mockResolvedValue(true);
    vi.mocked(sendAcademyApplicationNotification).mockResolvedValue({
      ok: false,
      reason: "send_failed",
    });

    const result = await submitAcademyApplication(validFormData());
    expect(result).toEqual({
      ok: true,
      applicationId: "app-1",
      submissionId: SUBMISSION_ID,
      notification: "failed",
      idempotent: false,
    });
    expect(clearAcademyNotificationClaim).toHaveBeenCalledWith("app-1");
  });

  it("returns idempotent success without second persist or email", async () => {
    vi.mocked(findAcademyApplicationBySubmissionId).mockResolvedValue({
      id: "app-1",
      submissionId: SUBMISSION_ID,
      status: "SUBMITTED",
      createdAt: new Date().toISOString(),
      notificationSentAt: new Date().toISOString(),
      alreadyExisted: true,
    });

    const result = await submitAcademyApplication(validFormData());
    expect(result).toEqual({
      ok: true,
      applicationId: "app-1",
      submissionId: SUBMISSION_ID,
      notification: "idempotent",
      idempotent: true,
    });
    expect(verifyTurnstileToken).not.toHaveBeenCalled();
    expect(persistAcademyApplication).not.toHaveBeenCalled();
    expect(sendAcademyApplicationNotification).not.toHaveBeenCalled();
  });

  it("passes academy_application Turnstile action for new submissions", async () => {
    vi.mocked(findAcademyApplicationBySubmissionId).mockResolvedValue(null);
    vi.mocked(verifyTurnstileToken).mockResolvedValue({ ok: true });
    vi.mocked(persistAcademyApplication).mockResolvedValue({
      ok: true,
      application: {
        id: "app-1",
        submissionId: SUBMISSION_ID,
        status: "SUBMITTED",
        createdAt: new Date().toISOString(),
        notificationSentAt: null,
        alreadyExisted: false,
      },
      adapter: "local-file",
    });
    vi.mocked(claimAcademyNotification).mockResolvedValue(true);
    vi.mocked(sendAcademyApplicationNotification).mockResolvedValue({
      ok: true,
    });

    await submitAcademyApplication(validFormData());
    expect(verifyTurnstileToken).toHaveBeenCalledWith(
      "token",
      expect.objectContaining({
        idempotencyKey: SUBMISSION_ID,
        expectedAction: "academy_application",
      }),
    );
  });
});
