import { headers } from "next/headers";
import { sendLeadNotification } from "@/lib/email/lead-notification";
import {
  claimLeadNotification,
  clearLeadNotificationClaim,
  findLeadBySubmissionId,
  persistBusinessLead,
} from "@/lib/leads/repository";
import {
  formDataToInquiryInput,
  normalizeProjectInquiry,
  projectInquiryFormSchema,
} from "@/lib/leads/schema";
import { checkRateLimit } from "@/lib/security/rate-limit";
import {
  TURNSTILE_PROJECT_INQUIRY_ACTION,
  verifyTurnstileToken,
} from "@/lib/security/turnstile";

export type FieldErrors = Record<string, string[]>;

export type SubmitProjectInquiryResult =
  | {
      ok: true;
      leadId: string;
      submissionId: string;
      notification: "sent" | "skipped" | "failed" | "idempotent";
      idempotent: boolean;
    }
  | {
      ok: false;
      code:
        | "validation"
        | "turnstile"
        | "rate_limited"
        | "persist_failed"
        | "not_configured"
        | "honeypot";
      message: string;
      fieldErrors?: FieldErrors;
      retryAfterSeconds?: number;
    };

function flattenZodErrors(
  error: import("zod").ZodError,
): FieldErrors {
  const fieldErrors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key !== "string") continue;
    fieldErrors[key] = fieldErrors[key] ?? [];
    fieldErrors[key].push(issue.message);
  }
  return fieldErrors;
}

async function getClientIp() {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return headerStore.get("x-real-ip")?.trim() || "unknown";
}

function turnstileMessage(reason: string) {
  if (reason === "missing_secret" || reason === "missing_allowed_hostnames") {
    return "Security verification is not configured. Please try again later.";
  }
  return "Security verification failed. Please try again.";
}

async function notifyOnce(
  lead: ReturnType<typeof normalizeProjectInquiry>,
  leadId: string,
): Promise<"sent" | "skipped" | "failed"> {
  const claimed = await claimLeadNotification(leadId);
  if (!claimed) {
    // Another worker already claimed/sent, or claim unavailable.
    return "skipped";
  }

  const notification = await sendLeadNotification(lead, leadId);
  if (!notification.ok) {
    await clearLeadNotificationClaim(leadId);
    console.error("[leads] notification failed after persist", {
      leadId,
      reason: notification.reason,
    });
    return "failed";
  }

  if (notification.skipped) {
    // Keep claim cleared so a configured environment can send later if needed.
    await clearLeadNotificationClaim(leadId);
    return "skipped";
  }

  return "sent";
}

/**
 * Authoritative Start a Project submission pipeline.
 *
 * Order:
 * honeypot → schema → rate limit → submission idempotency lookup →
 * Turnstile (new only) → normalize → atomic persist → notify once → success
 */
export async function submitProjectInquiry(
  formData: FormData,
): Promise<SubmitProjectInquiryResult> {
  const raw = formDataToInquiryInput(formData);

  if (typeof raw.website === "string" && raw.website.length > 0) {
    console.info("[leads] honeypot triggered");
    return {
      ok: false,
      code: "honeypot",
      message: "Unable to submit this request. Please try again.",
    };
  }

  const parsed = projectInquiryFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      code: "validation",
      message: "Please correct the highlighted fields and try again.",
      fieldErrors: flattenZodErrors(parsed.error),
    };
  }

  const ip = await getClientIp();
  const rate = checkRateLimit(`project-inquiry:${ip}`);
  if (!rate.allowed) {
    return {
      ok: false,
      code: "rate_limited",
      message:
        "Too many requests were submitted. Please wait a few minutes and try again.",
      retryAfterSeconds: rate.retryAfterSeconds,
    };
  }

  const existing = await findLeadBySubmissionId(parsed.data.submissionId);
  if (existing) {
    console.info("[leads] idempotent replay", {
      leadId: existing.id,
      submissionId: existing.submissionId,
    });
    return {
      ok: true,
      leadId: existing.id,
      submissionId: existing.submissionId,
      notification: "idempotent",
      idempotent: true,
    };
  }

  const turnstile = await verifyTurnstileToken(parsed.data.turnstileToken, {
    remoteIp: ip,
    idempotencyKey: parsed.data.submissionId,
    expectedAction: TURNSTILE_PROJECT_INQUIRY_ACTION,
  });

  if (!turnstile.ok) {
    const message = turnstileMessage(turnstile.reason);
    console.error("[leads] turnstile rejected", { reason: turnstile.reason });
    return {
      ok: false,
      code: "turnstile",
      message,
      fieldErrors: {
        turnstileToken: [message],
      },
    };
  }

  const normalized = normalizeProjectInquiry(parsed.data);
  const persisted = await persistBusinessLead(normalized);

  if (!persisted.ok) {
    if (persisted.error === "not_configured") {
      return {
        ok: false,
        code: "not_configured",
        message:
          "Project intake is temporarily unavailable. Please try again later.",
      };
    }
    return {
      ok: false,
      code: "persist_failed",
      message:
        "We could not save your request just now. Please try again in a moment.",
    };
  }

  // Concurrent race: unique submission_id already created by another request.
  if (persisted.lead.alreadyExisted) {
    console.info("[leads] idempotent race resolved", {
      leadId: persisted.lead.id,
      submissionId: persisted.lead.submissionId,
    });
    return {
      ok: true,
      leadId: persisted.lead.id,
      submissionId: persisted.lead.submissionId,
      notification: "idempotent",
      idempotent: true,
    };
  }

  // Database is system of record — notification failures do not fail the user.
  const notificationState = await notifyOnce(normalized, persisted.lead.id);

  console.info("[leads] submission accepted", {
    leadId: persisted.lead.id,
    submissionId: persisted.lead.submissionId,
    adapter: persisted.adapter,
    notification: notificationState,
  });

  return {
    ok: true,
    leadId: persisted.lead.id,
    submissionId: persisted.lead.submissionId,
    notification: notificationState,
    idempotent: false,
  };
}
