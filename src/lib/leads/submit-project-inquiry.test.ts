import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
  headers: async () =>
    new Map([["x-forwarded-for", "203.0.113.10"]]) as unknown as Headers,
}));

vi.mock("@/lib/leads/repository", () => ({
  persistBusinessLead: vi.fn(),
  findLeadBySubmissionId: vi.fn(),
  claimLeadNotification: vi.fn(),
  clearLeadNotificationClaim: vi.fn(),
}));

vi.mock("@/lib/email/lead-notification", () => ({
  sendLeadNotification: vi.fn(),
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

import { sendLeadNotification } from "@/lib/email/lead-notification";
import {
  claimLeadNotification,
  clearLeadNotificationClaim,
  findLeadBySubmissionId,
  persistBusinessLead,
} from "@/lib/leads/repository";
import { submitProjectInquiry } from "@/lib/leads/submit-project-inquiry";
import { resetRateLimitBuckets } from "@/lib/security/rate-limit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";

const SUBMISSION_ID = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";

function validFormData(overrides: Record<string, string> = {}) {
  const formData = new FormData();
  const values = {
    submissionId: SUBMISSION_ID,
    fullName: "Ada Okoro",
    workEmail: "ada@example.com",
    phone: "+237 600 000 000",
    company: "Example Co",
    helpArea: "software",
    businessProblem:
      "Our operations still depend on spreadsheets and repeated data entry across teams.",
    projectDescription:
      "We need a clearer system for tracking work, customers and follow-up.",
    timeline: "1-3-months",
    budgetRange: "prefer-to-discuss",
    privacyAcknowledged: "true",
    turnstileToken: "token",
    website: "",
    utmSource: "google",
    landingPage: "/start-a-project",
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
});

describe("submitProjectInquiry", () => {
  it("returns validation errors without persisting", async () => {
    const result = await submitProjectInquiry(
      validFormData({ fullName: "", privacyAcknowledged: "" }),
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("validation");
    }
    expect(persistBusinessLead).not.toHaveBeenCalled();
  });

  it("succeeds when persist works even if notification fails", async () => {
    vi.mocked(findLeadBySubmissionId).mockResolvedValue(null);
    vi.mocked(verifyTurnstileToken).mockResolvedValue({ ok: true });
    vi.mocked(persistBusinessLead).mockResolvedValue({
      ok: true,
      lead: {
        id: "lead-1",
        submissionId: SUBMISSION_ID,
        status: "NEW",
        createdAt: new Date().toISOString(),
        notificationSentAt: null,
        alreadyExisted: false,
      },
      adapter: "local-file",
    });
    vi.mocked(claimLeadNotification).mockResolvedValue(true);
    vi.mocked(sendLeadNotification).mockResolvedValue({
      ok: false,
      reason: "send_failed",
    });

    const result = await submitProjectInquiry(validFormData());
    expect(result).toEqual({
      ok: true,
      leadId: "lead-1",
      submissionId: SUBMISSION_ID,
      notification: "failed",
      idempotent: false,
    });
    expect(clearLeadNotificationClaim).toHaveBeenCalledWith("lead-1");
  });

  it("rejects invalid turnstile before persist", async () => {
    vi.mocked(findLeadBySubmissionId).mockResolvedValue(null);
    vi.mocked(verifyTurnstileToken).mockResolvedValue({
      ok: false,
      reason: "invalid_token",
    });

    const result = await submitProjectInquiry(validFormData());
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("turnstile");
    }
    expect(persistBusinessLead).not.toHaveBeenCalled();
  });

  it("returns idempotent success without second persist or email", async () => {
    vi.mocked(findLeadBySubmissionId).mockResolvedValue({
      id: "lead-1",
      submissionId: SUBMISSION_ID,
      status: "NEW",
      createdAt: new Date().toISOString(),
      notificationSentAt: new Date().toISOString(),
      alreadyExisted: true,
    });

    const result = await submitProjectInquiry(validFormData());
    expect(result).toEqual({
      ok: true,
      leadId: "lead-1",
      submissionId: SUBMISSION_ID,
      notification: "idempotent",
      idempotent: true,
    });
    expect(verifyTurnstileToken).not.toHaveBeenCalled();
    expect(persistBusinessLead).not.toHaveBeenCalled();
    expect(sendLeadNotification).not.toHaveBeenCalled();
  });

  it("does not notify when concurrent persist reports already existed", async () => {
    vi.mocked(findLeadBySubmissionId).mockResolvedValue(null);
    vi.mocked(verifyTurnstileToken).mockResolvedValue({ ok: true });
    vi.mocked(persistBusinessLead).mockResolvedValue({
      ok: true,
      lead: {
        id: "lead-1",
        submissionId: SUBMISSION_ID,
        status: "NEW",
        createdAt: new Date().toISOString(),
        notificationSentAt: null,
        alreadyExisted: true,
      },
      adapter: "supabase",
    });

    const result = await submitProjectInquiry(validFormData());
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.idempotent).toBe(true);
      expect(result.notification).toBe("idempotent");
    }
    expect(sendLeadNotification).not.toHaveBeenCalled();
  });

  it("passes submission id as Turnstile idempotency key for new submissions", async () => {
    vi.mocked(findLeadBySubmissionId).mockResolvedValue(null);
    vi.mocked(verifyTurnstileToken).mockResolvedValue({ ok: true });
    vi.mocked(persistBusinessLead).mockResolvedValue({
      ok: true,
      lead: {
        id: "lead-1",
        submissionId: SUBMISSION_ID,
        status: "NEW",
        createdAt: new Date().toISOString(),
        notificationSentAt: null,
        alreadyExisted: false,
      },
      adapter: "local-file",
    });
    vi.mocked(claimLeadNotification).mockResolvedValue(true);
    vi.mocked(sendLeadNotification).mockResolvedValue({ ok: true });

    await submitProjectInquiry(validFormData());
    expect(verifyTurnstileToken).toHaveBeenCalledWith(
      "token",
      expect.objectContaining({
        idempotencyKey: SUBMISSION_ID,
        expectedAction: "project_inquiry",
      }),
    );
    expect(sendLeadNotification).toHaveBeenCalledOnce();
  });
});
