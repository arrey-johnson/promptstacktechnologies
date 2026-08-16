import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  createSupabaseServiceClient,
  getSupabaseServerConfig,
} from "@/lib/database/supabase";
import type { NormalizedBusinessLead } from "./schema";

export type PersistedLead = {
  id: string;
  submissionId: string;
  status: "NEW";
  createdAt: string;
  notificationSentAt: string | null;
  alreadyExisted: boolean;
};

export type LeadPersistResult =
  | {
      ok: true;
      lead: PersistedLead;
      adapter: "supabase" | "local-file";
    }
  | { ok: false; error: "not_configured" | "persist_failed"; adapter: string };

type LocalLead = NormalizedBusinessLead & {
  id: string;
  submissionId: string;
  status: "NEW";
  createdAt: string;
  updatedAt: string;
  notificationSentAt: string | null;
};

type LocalStore = {
  leads: LocalLead[];
  history: Array<{
    id: string;
    leadId: string;
    previousStatus: null;
    newStatus: "NEW";
    changedAt: string;
    note: string;
  }>;
};

function localStorePath() {
  return path.join(process.cwd(), ".data", "business-leads.json");
}

async function readLocalStore(): Promise<LocalStore> {
  try {
    const raw = await readFile(localStorePath(), "utf8");
    return JSON.parse(raw) as LocalStore;
  } catch {
    return { leads: [], history: [] };
  }
}

async function writeLocalStore(store: LocalStore) {
  const dir = path.dirname(localStorePath());
  await mkdir(dir, { recursive: true });
  await writeFile(localStorePath(), JSON.stringify(store, null, 2), "utf8");
}

function toPersisted(lead: LocalLead, alreadyExisted: boolean): PersistedLead {
  return {
    id: lead.id,
    submissionId: lead.submissionId,
    status: "NEW",
    createdAt: lead.createdAt,
    notificationSentAt: lead.notificationSentAt,
    alreadyExisted,
  };
}

/**
 * Local-file adapter for development when Supabase is not configured.
 * Supports submission_id idempotency for local testing.
 */
export async function persistLeadLocally(
  lead: NormalizedBusinessLead,
): Promise<LeadPersistResult> {
  try {
    const store = await readLocalStore();
    const existing = store.leads.find(
      (row) => row.submissionId === lead.submissionId,
    );
    if (existing) {
      return {
        ok: true,
        lead: toPersisted(existing, true),
        adapter: "local-file",
      };
    }

    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const row: LocalLead = {
      ...lead,
      id,
      submissionId: lead.submissionId,
      status: "NEW",
      createdAt,
      updatedAt: createdAt,
      notificationSentAt: null,
    };

    store.leads.push(row);
    store.history.push({
      id: randomUUID(),
      leadId: id,
      previousStatus: null,
      newStatus: "NEW",
      changedAt: createdAt,
      note: "Initial submission",
    });

    await writeLocalStore(store);
    return {
      ok: true,
      lead: toPersisted(row, false),
      adapter: "local-file",
    };
  } catch {
    return { ok: false, error: "persist_failed", adapter: "local-file" };
  }
}

export async function findLeadBySubmissionIdLocally(
  submissionId: string,
): Promise<PersistedLead | null> {
  const store = await readLocalStore();
  const existing = store.leads.find((row) => row.submissionId === submissionId);
  return existing ? toPersisted(existing, true) : null;
}

export async function markNotificationSentLocally(
  leadId: string,
): Promise<boolean> {
  const store = await readLocalStore();
  const lead = store.leads.find((row) => row.id === leadId);
  if (!lead || lead.notificationSentAt) {
    return false;
  }
  lead.notificationSentAt = new Date().toISOString();
  lead.updatedAt = lead.notificationSentAt;
  await writeLocalStore(store);
  return true;
}

export async function clearNotificationSentLocally(leadId: string) {
  const store = await readLocalStore();
  const lead = store.leads.find((row) => row.id === leadId);
  if (!lead) return;
  lead.notificationSentAt = null;
  lead.updatedAt = new Date().toISOString();
  await writeLocalStore(store);
}

export async function findLeadBySubmissionId(
  submissionId: string,
): Promise<PersistedLead | null> {
  const config = getSupabaseServerConfig();
  if (!config) {
    if (process.env.NODE_ENV === "development") {
      return findLeadBySubmissionIdLocally(submissionId);
    }
    return null;
  }

  try {
    const supabase = createSupabaseServiceClient(config);
    const { data, error } = await supabase
      .from("business_leads")
      .select("id, status, created_at, submission_id, notification_sent_at")
      .eq("submission_id", submissionId)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id as string,
      submissionId: data.submission_id as string,
      status: "NEW",
      createdAt: data.created_at as string,
      notificationSentAt: (data.notification_sent_at as string | null) ?? null,
      alreadyExisted: true,
    };
  } catch {
    return null;
  }
}

export async function persistLeadToSupabase(
  lead: NormalizedBusinessLead,
): Promise<LeadPersistResult> {
  const config = getSupabaseServerConfig();
  if (!config) {
    return { ok: false, error: "not_configured", adapter: "supabase" };
  }

  try {
    const supabase = createSupabaseServiceClient(config);
    const { data, error } = await supabase.rpc(
      "create_business_lead_with_history",
      {
        p_submission_id: lead.submissionId,
        p_full_name: lead.fullName,
        p_work_email: lead.workEmail,
        p_phone: lead.phone,
        p_company: lead.company,
        p_help_area: lead.helpArea,
        p_business_problem: lead.businessProblem,
        p_project_description: lead.projectDescription,
        p_timeline: lead.timeline,
        p_budget_range: lead.budgetRange ?? null,
        p_referral_source: lead.referralSource ?? null,
        p_utm_source: lead.utmSource ?? null,
        p_utm_medium: lead.utmMedium ?? null,
        p_utm_campaign: lead.utmCampaign ?? null,
        p_utm_content: lead.utmContent ?? null,
        p_utm_term: lead.utmTerm ?? null,
        p_landing_page: lead.landingPage ?? null,
        p_privacy_acknowledged_at: lead.privacyAcknowledgedAt,
      },
    );

    if (error || !data || !Array.isArray(data) || data.length === 0) {
      console.error("[leads] supabase rpc failed", {
        code: error?.code ?? "unknown",
      });
      return { ok: false, error: "persist_failed", adapter: "supabase" };
    }

    const row = data[0] as {
      id: string;
      status: string;
      created_at: string;
      notification_sent_at: string | null;
      already_existed: boolean;
    };

    return {
      ok: true,
      lead: {
        id: row.id,
        submissionId: lead.submissionId,
        status: "NEW",
        createdAt: row.created_at,
        notificationSentAt: row.notification_sent_at,
        alreadyExisted: Boolean(row.already_existed),
      },
      adapter: "supabase",
    };
  } catch {
    return { ok: false, error: "persist_failed", adapter: "supabase" };
  }
}

/**
 * Claim the right to send the notification email once.
 * Returns true only for the first claimer. On send failure, clear the claim.
 */
export async function claimLeadNotification(leadId: string): Promise<boolean> {
  const config = getSupabaseServerConfig();
  if (!config) {
    if (process.env.NODE_ENV === "development") {
      return markNotificationSentLocally(leadId);
    }
    return false;
  }

  try {
    const supabase = createSupabaseServiceClient(config);
    const { data, error } = await supabase.rpc(
      "claim_business_lead_notification",
      { p_lead_id: leadId },
    );
    if (error) {
      console.error("[leads] notification claim failed", {
        leadId,
        code: error.code,
      });
      return false;
    }
    return data === true;
  } catch {
    return false;
  }
}

export async function clearLeadNotificationClaim(
  leadId: string,
): Promise<void> {
  const config = getSupabaseServerConfig();
  if (!config) {
    if (process.env.NODE_ENV === "development") {
      await clearNotificationSentLocally(leadId);
    }
    return;
  }

  try {
    const supabase = createSupabaseServiceClient(config);
    await supabase
      .from("business_leads")
      .update({ notification_sent_at: null })
      .eq("id", leadId);
  } catch {
    console.error("[leads] failed to clear notification claim", { leadId });
  }
}

export async function persistBusinessLead(
  lead: NormalizedBusinessLead,
): Promise<LeadPersistResult> {
  const supabaseConfigured = Boolean(getSupabaseServerConfig());

  if (supabaseConfigured) {
    return persistLeadToSupabase(lead);
  }

  if (process.env.NODE_ENV === "development") {
    return persistLeadLocally(lead);
  }

  return { ok: false, error: "not_configured", adapter: "supabase" };
}
