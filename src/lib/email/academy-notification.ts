import { Resend } from "resend";
import {
  ACADEMY_PROGRAM_LABELS,
  EXPERIENCE_LEVEL_LABELS,
  type NormalizedAcademyApplication,
} from "@/lib/academy/schema";

export type AcademyNotificationResult =
  | { ok: true; skipped?: false }
  | { ok: true; skipped: true; reason: "not_configured" | "development_skip" }
  | { ok: false; reason: "send_failed" | "not_configured" };

function getFromAddress() {
  return (
    process.env.EMAIL_FROM_ADDRESS?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    ""
  );
}

function getAcademyNotificationEmail() {
  return (
    process.env.ACADEMY_APPLICATION_NOTIFICATION_EMAIL?.trim() ||
    process.env.ACADEMY_ADMISSIONS_NOTIFY_EMAIL?.trim() ||
    ""
  );
}

export function isAcademyNotificationConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      getFromAddress() &&
      getAcademyNotificationEmail(),
  );
}

function truncate(value: string, max: number) {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}

export function buildAcademyNotificationContent(
  application: NormalizedAcademyApplication,
  applicationId: string,
) {
  const subject = `New Academy application — ${ACADEMY_PROGRAM_LABELS[application.programSlug]}`;
  const lines = [
    "New Academy application",
    "",
    `Application ID: ${applicationId}`,
    `Name: ${application.fullName}`,
    `Email: ${application.email}`,
    `Phone: ${application.phone}`,
    `City: ${application.city}`,
    `Program: ${ACADEMY_PROGRAM_LABELS[application.programSlug]}`,
    `Experience: ${EXPERIENCE_LEVEL_LABELS[application.experienceLevel]}`,
    `Education / occupation: ${application.currentOccupationEducation}`,
    application.cohort
      ? `Cohort: ${application.cohort}`
      : "Cohort: (not provided)",
    application.referralSource
      ? `Referral source: ${application.referralSource}`
      : "Referral source: (not provided)",
    "",
    "Motivation summary:",
    truncate(application.motivation, 500),
    "",
    "Desired outcome:",
    truncate(application.desiredOutcome, 500),
    "",
    "Attribution:",
    `utm_source: ${application.utmSource ?? "-"}`,
    `utm_medium: ${application.utmMedium ?? "-"}`,
    `utm_campaign: ${application.utmCampaign ?? "-"}`,
    `landing_page: ${application.landingPage ?? "-"}`,
  ];

  return { subject, text: lines.join("\n") };
}

/**
 * Notify the Academy admissions owner after DB persistence.
 * Failures must not undo a successfully stored application.
 * Uses ACADEMY_APPLICATION_NOTIFICATION_EMAIL — not LEAD_NOTIFICATION_EMAIL.
 */
export async function sendAcademyApplicationNotification(
  application: NormalizedAcademyApplication,
  applicationId: string,
): Promise<AcademyNotificationResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = getFromAddress();
  const to = getAcademyNotificationEmail();

  if (!apiKey || !from || !to) {
    if (process.env.NODE_ENV === "development") {
      console.info("[academy] notification skipped — not configured", {
        applicationId,
      });
      return { ok: true, skipped: true, reason: "not_configured" };
    }
    console.error("[academy] notification not configured in non-development", {
      applicationId,
    });
    return { ok: false, reason: "not_configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const content = buildAcademyNotificationContent(application, applicationId);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: content.subject,
      text: content.text,
    });

    if (error) {
      console.error("[academy] notification send failed", {
        applicationId,
        name: error.name,
      });
      return { ok: false, reason: "send_failed" };
    }

    return { ok: true };
  } catch {
    console.error("[academy] notification send exception", { applicationId });
    return { ok: false, reason: "send_failed" };
  }
}
