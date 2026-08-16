import { Resend } from "resend";
import {
  BUDGET_RANGE_LABELS,
  HELP_AREA_LABELS,
  TIMELINE_LABELS,
  type NormalizedBusinessLead,
} from "@/lib/leads/schema";

export type NotificationResult =
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

function getLeadNotificationEmail() {
  return (
    process.env.LEAD_NOTIFICATION_EMAIL?.trim() ||
    process.env.BUSINESS_LEAD_NOTIFY_EMAIL?.trim() ||
    ""
  );
}

export function isLeadNotificationConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      getFromAddress() &&
      getLeadNotificationEmail(),
  );
}

function truncate(value: string, max: number) {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}

export function buildLeadNotificationContent(
  lead: NormalizedBusinessLead,
  leadId: string,
) {
  const subject = `New project inquiry — ${lead.company}`;
  const lines = [
    "New project inquiry",
    "",
    `Lead ID: ${leadId}`,
    `Name: ${lead.fullName}`,
    `Company: ${lead.company}`,
    `Email: ${lead.workEmail}`,
    `Phone: ${lead.phone}`,
    `Help area: ${HELP_AREA_LABELS[lead.helpArea]}`,
    `Timeline: ${TIMELINE_LABELS[lead.timeline]}`,
    lead.budgetRange
      ? `Budget context: ${BUDGET_RANGE_LABELS[lead.budgetRange]}`
      : "Budget context: (not provided)",
    lead.referralSource
      ? `Referral source: ${lead.referralSource}`
      : "Referral source: (not provided)",
    "",
    "Problem summary:",
    truncate(lead.businessProblem, 500),
    "",
    "Attribution:",
    `utm_source: ${lead.utmSource ?? "-"}`,
    `utm_medium: ${lead.utmMedium ?? "-"}`,
    `utm_campaign: ${lead.utmCampaign ?? "-"}`,
    `landing_page: ${lead.landingPage ?? "-"}`,
  ];

  return { subject, text: lines.join("\n") };
}

/**
 * Notify the lead owner after DB persistence.
 * Failures must not undo a successfully stored lead.
 */
export async function sendLeadNotification(
  lead: NormalizedBusinessLead,
  leadId: string,
): Promise<NotificationResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = getFromAddress();
  const to = getLeadNotificationEmail();

  if (!apiKey || !from || !to) {
    if (process.env.NODE_ENV === "development") {
      console.info("[leads] notification skipped — not configured", {
        leadId,
      });
      return { ok: true, skipped: true, reason: "not_configured" };
    }
    console.error("[leads] notification not configured in non-development", {
      leadId,
    });
    return { ok: false, reason: "not_configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const content = buildLeadNotificationContent(lead, leadId);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: content.subject,
      text: content.text,
    });

    if (error) {
      console.error("[leads] notification send failed", {
        leadId,
        name: error.name,
      });
      return { ok: false, reason: "send_failed" };
    }

    return { ok: true };
  } catch {
    console.error("[leads] notification send exception", { leadId });
    return { ok: false, reason: "send_failed" };
  }
}
