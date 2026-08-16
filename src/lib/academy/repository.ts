import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  createSupabaseServiceClient,
  getSupabaseServerConfig,
} from "@/lib/database/supabase";
import type { NormalizedAcademyApplication } from "./schema";

export type PersistedAcademyApplication = {
  id: string;
  submissionId: string;
  status: "SUBMITTED";
  createdAt: string;
  notificationSentAt: string | null;
  alreadyExisted: boolean;
};

export type AcademyPersistResult =
  | {
      ok: true;
      application: PersistedAcademyApplication;
      adapter: "supabase" | "local-file";
    }
  | { ok: false; error: "not_configured" | "persist_failed"; adapter: string };

type LocalApplication = NormalizedAcademyApplication & {
  id: string;
  status: "SUBMITTED";
  createdAt: string;
  updatedAt: string;
  notificationSentAt: string | null;
};

type LocalStore = {
  applications: LocalApplication[];
  history: Array<{
    id: string;
    applicationId: string;
    previousStatus: null;
    newStatus: "SUBMITTED";
    changedAt: string;
    note: string;
  }>;
};

function localStorePath() {
  return path.join(process.cwd(), ".data", "academy-applications.json");
}

async function readLocalStore(): Promise<LocalStore> {
  try {
    const raw = await readFile(localStorePath(), "utf8");
    return JSON.parse(raw) as LocalStore;
  } catch {
    return { applications: [], history: [] };
  }
}

async function writeLocalStore(store: LocalStore) {
  const dir = path.dirname(localStorePath());
  await mkdir(dir, { recursive: true });
  await writeFile(localStorePath(), JSON.stringify(store, null, 2), "utf8");
}

function toPersisted(
  row: LocalApplication,
  alreadyExisted: boolean,
): PersistedAcademyApplication {
  return {
    id: row.id,
    submissionId: row.submissionId,
    status: "SUBMITTED",
    createdAt: row.createdAt,
    notificationSentAt: row.notificationSentAt,
    alreadyExisted,
  };
}

export async function persistAcademyApplicationLocally(
  application: NormalizedAcademyApplication,
): Promise<AcademyPersistResult> {
  try {
    const store = await readLocalStore();
    const existing = store.applications.find(
      (row) => row.submissionId === application.submissionId,
    );
    if (existing) {
      return {
        ok: true,
        application: toPersisted(existing, true),
        adapter: "local-file",
      };
    }

    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const row: LocalApplication = {
      ...application,
      id,
      status: "SUBMITTED",
      createdAt,
      updatedAt: createdAt,
      notificationSentAt: null,
    };

    store.applications.push(row);
    store.history.push({
      id: randomUUID(),
      applicationId: id,
      previousStatus: null,
      newStatus: "SUBMITTED",
      changedAt: createdAt,
      note: "Initial application submission",
    });

    await writeLocalStore(store);
    return {
      ok: true,
      application: toPersisted(row, false),
      adapter: "local-file",
    };
  } catch {
    return { ok: false, error: "persist_failed", adapter: "local-file" };
  }
}

export async function findAcademyApplicationBySubmissionIdLocally(
  submissionId: string,
): Promise<PersistedAcademyApplication | null> {
  const store = await readLocalStore();
  const existing = store.applications.find(
    (row) => row.submissionId === submissionId,
  );
  return existing ? toPersisted(existing, true) : null;
}

export async function markAcademyNotificationSentLocally(
  applicationId: string,
): Promise<boolean> {
  const store = await readLocalStore();
  const row = store.applications.find((item) => item.id === applicationId);
  if (!row || row.notificationSentAt) return false;
  row.notificationSentAt = new Date().toISOString();
  row.updatedAt = row.notificationSentAt;
  await writeLocalStore(store);
  return true;
}

export async function clearAcademyNotificationSentLocally(
  applicationId: string,
) {
  const store = await readLocalStore();
  const row = store.applications.find((item) => item.id === applicationId);
  if (!row) return;
  row.notificationSentAt = null;
  row.updatedAt = new Date().toISOString();
  await writeLocalStore(store);
}

export async function findAcademyApplicationBySubmissionId(
  submissionId: string,
): Promise<PersistedAcademyApplication | null> {
  const config = getSupabaseServerConfig();
  if (!config) {
    if (process.env.NODE_ENV === "development") {
      return findAcademyApplicationBySubmissionIdLocally(submissionId);
    }
    return null;
  }

  try {
    const supabase = createSupabaseServiceClient(config);
    const { data, error } = await supabase
      .from("academy_applications")
      .select("id, status, created_at, submission_id, notification_sent_at")
      .eq("submission_id", submissionId)
      .maybeSingle();

    if (error || !data) return null;

    return {
      id: data.id as string,
      submissionId: data.submission_id as string,
      status: "SUBMITTED",
      createdAt: data.created_at as string,
      notificationSentAt: (data.notification_sent_at as string | null) ?? null,
      alreadyExisted: true,
    };
  } catch {
    return null;
  }
}

export async function persistAcademyApplicationToSupabase(
  application: NormalizedAcademyApplication,
): Promise<AcademyPersistResult> {
  const config = getSupabaseServerConfig();
  if (!config) {
    return { ok: false, error: "not_configured", adapter: "supabase" };
  }

  try {
    const supabase = createSupabaseServiceClient(config);
    const { data, error } = await supabase.rpc(
      "create_academy_application_with_history",
      {
        p_submission_id: application.submissionId,
        p_full_name: application.fullName,
        p_email: application.email,
        p_phone: application.phone,
        p_city: application.city,
        p_program_slug: application.programSlug,
        p_current_occupation_education: application.currentOccupationEducation,
        p_experience_level: application.experienceLevel,
        p_motivation: application.motivation,
        p_desired_outcome: application.desiredOutcome,
        p_cohort: application.cohort ?? null,
        p_referral_source: application.referralSource ?? null,
        p_utm_source: application.utmSource ?? null,
        p_utm_medium: application.utmMedium ?? null,
        p_utm_campaign: application.utmCampaign ?? null,
        p_utm_content: application.utmContent ?? null,
        p_utm_term: application.utmTerm ?? null,
        p_landing_page: application.landingPage ?? null,
        p_privacy_acknowledged_at: application.privacyAcknowledgedAt,
      },
    );

    if (error || !data || !Array.isArray(data) || data.length === 0) {
      console.error("[academy] supabase rpc failed", {
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
      application: {
        id: row.id,
        submissionId: application.submissionId,
        status: "SUBMITTED",
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

export async function claimAcademyNotification(
  applicationId: string,
): Promise<boolean> {
  const config = getSupabaseServerConfig();
  if (!config) {
    if (process.env.NODE_ENV === "development") {
      return markAcademyNotificationSentLocally(applicationId);
    }
    return false;
  }

  try {
    const supabase = createSupabaseServiceClient(config);
    const { data, error } = await supabase.rpc(
      "claim_academy_application_notification",
      { p_application_id: applicationId },
    );
    if (error) {
      console.error("[academy] notification claim failed", {
        applicationId,
        code: error.code,
      });
      return false;
    }
    return data === true;
  } catch {
    return false;
  }
}

export async function clearAcademyNotificationClaim(
  applicationId: string,
): Promise<void> {
  const config = getSupabaseServerConfig();
  if (!config) {
    if (process.env.NODE_ENV === "development") {
      await clearAcademyNotificationSentLocally(applicationId);
    }
    return;
  }

  try {
    const supabase = createSupabaseServiceClient(config);
    await supabase
      .from("academy_applications")
      .update({ notification_sent_at: null })
      .eq("id", applicationId);
  } catch {
    console.error("[academy] failed to clear notification claim", {
      applicationId,
    });
  }
}

export async function persistAcademyApplication(
  application: NormalizedAcademyApplication,
): Promise<AcademyPersistResult> {
  if (getSupabaseServerConfig()) {
    return persistAcademyApplicationToSupabase(application);
  }

  if (process.env.NODE_ENV === "development") {
    return persistAcademyApplicationLocally(application);
  }

  return { ok: false, error: "not_configured", adapter: "supabase" };
}
