import { headers } from "next/headers";
import { areAcademyApplicationsEnabled } from "@/config/academy";
import {
  claimAcademyNotification,
  clearAcademyNotificationClaim,
  findAcademyApplicationBySubmissionId,
  persistAcademyApplication,
} from "@/lib/academy/repository";
import {
  formDataToAcademyApplicationInput,
  normalizeAcademyApplication,
  academyApplicationFormSchema,
} from "@/lib/academy/schema";
import { sendAcademyApplicationNotification } from "@/lib/email/academy-notification";
import { checkRateLimit } from "@/lib/security/rate-limit";
import {
  TURNSTILE_ACADEMY_APPLICATION_ACTION,
  verifyTurnstileToken,
} from "@/lib/security/turnstile";

export type FieldErrors = Record<string, string[]>;

export type SubmitAcademyApplicationResult =
  | {
      ok: true;
      applicationId: string;
      submissionId: string;
      notification: "sent" | "skipped" | "failed" | "idempotent";
      idempotent: boolean;
    }
  | {
      ok: false;
      code:
        | "applications_closed"
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

function flattenZodErrors(error: import("zod").ZodError): FieldErrors {
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
  application: ReturnType<typeof normalizeAcademyApplication>,
  applicationId: string,
): Promise<"sent" | "skipped" | "failed"> {
  const claimed = await claimAcademyNotification(applicationId);
  if (!claimed) return "skipped";

  const notification = await sendAcademyApplicationNotification(
    application,
    applicationId,
  );

  if (!notification.ok) {
    await clearAcademyNotificationClaim(applicationId);
    console.error("[academy] notification failed after persist", {
      applicationId,
      reason: notification.reason,
    });
    return "failed";
  }

  if (notification.skipped) {
    await clearAcademyNotificationClaim(applicationId);
    return "skipped";
  }

  return "sent";
}

/**
 * Authoritative Academy application pipeline.
 * Separate from business project inquiries.
 */
export async function submitAcademyApplication(
  formData: FormData,
): Promise<SubmitAcademyApplicationResult> {
  if (!areAcademyApplicationsEnabled()) {
    return {
      ok: false,
      code: "applications_closed",
      message:
        "Academy applications are not currently accepting submissions online.",
    };
  }

  const raw = formDataToAcademyApplicationInput(formData);

  if (typeof raw.website === "string" && raw.website.length > 0) {
    console.info("[academy] honeypot triggered");
    return {
      ok: false,
      code: "honeypot",
      message: "Unable to submit this application. Please try again.",
    };
  }

  const parsed = academyApplicationFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      code: "validation",
      message: "Please correct the highlighted fields and try again.",
      fieldErrors: flattenZodErrors(parsed.error),
    };
  }

  const ip = await getClientIp();
  const rate = checkRateLimit(`academy-application:${ip}`);
  if (!rate.allowed) {
    return {
      ok: false,
      code: "rate_limited",
      message:
        "Too many applications were submitted. Please wait a few minutes and try again.",
      retryAfterSeconds: rate.retryAfterSeconds,
    };
  }

  const existing = await findAcademyApplicationBySubmissionId(
    parsed.data.submissionId,
  );
  if (existing) {
    console.info("[academy] idempotent replay", {
      applicationId: existing.id,
      submissionId: existing.submissionId,
    });
    return {
      ok: true,
      applicationId: existing.id,
      submissionId: existing.submissionId,
      notification: "idempotent",
      idempotent: true,
    };
  }

  const turnstile = await verifyTurnstileToken(parsed.data.turnstileToken, {
    remoteIp: ip,
    idempotencyKey: parsed.data.submissionId,
    expectedAction: TURNSTILE_ACADEMY_APPLICATION_ACTION,
  });

  if (!turnstile.ok) {
    const message = turnstileMessage(turnstile.reason);
    console.error("[academy] turnstile rejected", { reason: turnstile.reason });
    return {
      ok: false,
      code: "turnstile",
      message,
      fieldErrors: { turnstileToken: [message] },
    };
  }

  const normalized = normalizeAcademyApplication(parsed.data);
  const persisted = await persistAcademyApplication(normalized);

  if (!persisted.ok) {
    if (persisted.error === "not_configured") {
      return {
        ok: false,
        code: "not_configured",
        message:
          "Academy applications are temporarily unavailable. Please try again later.",
      };
    }
    return {
      ok: false,
      code: "persist_failed",
      message:
        "We could not save your application just now. Please try again in a moment.",
    };
  }

  if (persisted.application.alreadyExisted) {
    console.info("[academy] idempotent race resolved", {
      applicationId: persisted.application.id,
      submissionId: persisted.application.submissionId,
    });
    return {
      ok: true,
      applicationId: persisted.application.id,
      submissionId: persisted.application.submissionId,
      notification: "idempotent",
      idempotent: true,
    };
  }

  const notificationState = await notifyOnce(
    normalized,
    persisted.application.id,
  );

  console.info("[academy] application accepted", {
    applicationId: persisted.application.id,
    submissionId: persisted.application.submissionId,
    adapter: persisted.adapter,
    notification: notificationState,
  });

  return {
    ok: true,
    applicationId: persisted.application.id,
    submissionId: persisted.application.submissionId,
    notification: notificationState,
    idempotent: false,
  };
}
