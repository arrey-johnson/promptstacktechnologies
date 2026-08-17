/**
 * Operational recovery for leads/applications where DB persistence succeeded
 * but notification email failed (notification_sent_at IS NULL).
 *
 * Not a public endpoint — CLI / operator use only.
 */

import { sendAcademyApplicationNotification } from "@/lib/email/academy-notification";
import { sendLeadNotification } from "@/lib/email/lead-notification";
import {
  claimAcademyNotification,
  clearAcademyNotificationClaim,
} from "@/lib/academy/repository";
import type { NormalizedAcademyApplication } from "@/lib/academy/schema";
import {
  claimLeadNotification,
  clearLeadNotificationClaim,
} from "@/lib/leads/repository";
import type { NormalizedBusinessLead } from "@/lib/leads/schema";
import {
  createSupabaseServiceClient,
  getSupabaseServerConfig,
} from "@/lib/database/supabase";
import { HELP_AREAS, TIMELINES, BUDGET_RANGES } from "@/lib/leads/schema";
import {
  ACADEMY_PROGRAM_SLUGS,
  EXPERIENCE_LEVELS,
} from "@/lib/academy/schema";

export type PendingLeadSummary = {
  id: string;
  submissionId: string;
  createdAt: string;
  company: string;
  workEmail: string;
};

export type PendingApplicationSummary = {
  id: string;
  submissionId: string;
  createdAt: string;
  programSlug: string;
  email: string;
};

type LeadRow = {
  id: string;
  submission_id: string;
  created_at: string;
  full_name: string;
  work_email: string;
  phone: string;
  company: string;
  help_area: string;
  business_problem: string;
  project_description: string;
  timeline: string;
  budget_range: string | null;
  referral_source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  landing_page: string | null;
  privacy_acknowledged_at: string;
  notification_sent_at: string | null;
};

type ApplicationRow = {
  id: string;
  submission_id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  program_slug: string;
  current_occupation_education: string;
  experience_level: string;
  motivation: string;
  desired_outcome: string;
  cohort: string | null;
  referral_source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  landing_page: string | null;
  privacy_acknowledged_at: string;
  notification_sent_at: string | null;
};

function requireSupabase() {
  const config = getSupabaseServerConfig();
  if (!config) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  return createSupabaseServiceClient(config);
}

function mapLeadRow(row: LeadRow): NormalizedBusinessLead {
  const helpArea = HELP_AREAS.includes(row.help_area as never)
    ? (row.help_area as (typeof HELP_AREAS)[number])
    : "not-sure-yet";
  const timeline = TIMELINES.includes(row.timeline as never)
    ? (row.timeline as (typeof TIMELINES)[number])
    : "exploring";
  const budgetRange =
    row.budget_range && BUDGET_RANGES.includes(row.budget_range as never)
      ? (row.budget_range as (typeof BUDGET_RANGES)[number])
      : undefined;

  return {
    submissionId: row.submission_id,
    fullName: row.full_name,
    workEmail: row.work_email,
    phone: row.phone,
    company: row.company,
    helpArea,
    businessProblem: row.business_problem,
    projectDescription: row.project_description,
    timeline,
    budgetRange,
    referralSource: row.referral_source ?? undefined,
    utmSource: row.utm_source ?? undefined,
    utmMedium: row.utm_medium ?? undefined,
    utmCampaign: row.utm_campaign ?? undefined,
    utmContent: row.utm_content ?? undefined,
    utmTerm: row.utm_term ?? undefined,
    landingPage: row.landing_page ?? undefined,
    privacyAcknowledgedAt: row.privacy_acknowledged_at,
  };
}

function mapApplicationRow(row: ApplicationRow): NormalizedAcademyApplication {
  const programSlug = ACADEMY_PROGRAM_SLUGS.includes(row.program_slug as never)
    ? (row.program_slug as (typeof ACADEMY_PROGRAM_SLUGS)[number])
    : "software-engineering";
  const experienceLevel = EXPERIENCE_LEVELS.includes(
    row.experience_level as never,
  )
    ? (row.experience_level as (typeof EXPERIENCE_LEVELS)[number])
    : "complete-beginner";

  return {
    submissionId: row.submission_id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    city: row.city,
    programSlug,
    currentOccupationEducation: row.current_occupation_education,
    experienceLevel,
    motivation: row.motivation,
    desiredOutcome: row.desired_outcome,
    cohort: row.cohort ?? undefined,
    referralSource: row.referral_source ?? undefined,
    utmSource: row.utm_source ?? undefined,
    utmMedium: row.utm_medium ?? undefined,
    utmCampaign: row.utm_campaign ?? undefined,
    utmContent: row.utm_content ?? undefined,
    utmTerm: row.utm_term ?? undefined,
    landingPage: row.landing_page ?? undefined,
    privacyAcknowledgedAt: row.privacy_acknowledged_at,
  };
}

export async function listPendingLeadNotifications(
  limit = 50,
): Promise<PendingLeadSummary[]> {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from("business_leads")
    .select("id, submission_id, created_at, company, work_email")
    .is("notification_sent_at", null)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to list pending lead notifications: ${error.code}`);
  }

  return (data ?? []).map((row) => ({
    id: row.id as string,
    submissionId: row.submission_id as string,
    createdAt: row.created_at as string,
    company: row.company as string,
    workEmail: row.work_email as string,
  }));
}

export async function listPendingAcademyNotifications(
  limit = 50,
): Promise<PendingApplicationSummary[]> {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from("academy_applications")
    .select("id, submission_id, created_at, program_slug, email")
    .is("notification_sent_at", null)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) {
    throw new Error(
      `Failed to list pending academy notifications: ${error.code}`,
    );
  }

  return (data ?? []).map((row) => ({
    id: row.id as string,
    submissionId: row.submission_id as string,
    createdAt: row.created_at as string,
    programSlug: row.program_slug as string,
    email: row.email as string,
  }));
}

export async function recoverLeadNotification(
  leadId: string,
): Promise<"sent" | "skipped" | "failed" | "not_found"> {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from("business_leads")
    .select("*")
    .eq("id", leadId)
    .maybeSingle();

  if (error || !data) {
    return "not_found";
  }

  const row = data as LeadRow;
  if (row.notification_sent_at) {
    return "skipped";
  }

  const claimed = await claimLeadNotification(leadId);
  if (!claimed) {
    return "skipped";
  }

  const lead = mapLeadRow(row);
  const result = await sendLeadNotification(lead, leadId);
  if (!result.ok || result.skipped) {
    await clearLeadNotificationClaim(leadId);
    return result.ok && result.skipped ? "skipped" : "failed";
  }

  return "sent";
}

export async function recoverAcademyNotification(
  applicationId: string,
): Promise<"sent" | "skipped" | "failed" | "not_found"> {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from("academy_applications")
    .select("*")
    .eq("id", applicationId)
    .maybeSingle();

  if (error || !data) {
    return "not_found";
  }

  const row = data as ApplicationRow;
  if (row.notification_sent_at) {
    return "skipped";
  }

  const claimed = await claimAcademyNotification(applicationId);
  if (!claimed) {
    return "skipped";
  }

  const application = mapApplicationRow(row);
  const result = await sendAcademyApplicationNotification(
    application,
    applicationId,
  );
  if (!result.ok || result.skipped) {
    await clearAcademyNotificationClaim(applicationId);
    return result.ok && result.skipped ? "skipped" : "failed";
  }

  return "sent";
}
