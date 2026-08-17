/**
 * Lean typed analytics taxonomy for business funnel insight.
 * Payloads use controlled enums/context only — never PII or free-text form answers.
 */

export const ANALYTICS_EVENTS = [
  "project_cta_click",
  "project_form_start",
  "project_submission_success",
  "academy_program_view",
  "academy_apply_click",
  "academy_application_start",
  "academy_application_success",
  "solution_view",
  "insight_view",
  "contact_path_click",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsEventPayload = {
  project_cta_click: {
    cta_location: string;
  };
  project_form_start: {
    form: "project_inquiry";
  };
  project_submission_success: {
    form: "project_inquiry";
  };
  academy_program_view: {
    program:
      | "software-engineering"
      | "artificial-intelligence"
      | "cybersecurity"
      | string;
  };
  academy_apply_click: {
    cta_location: string;
  };
  academy_application_start: {
    form: "academy_application";
  };
  academy_application_success: {
    form: "academy_application";
  };
  solution_view: {
    solution_type: "software" | "ai-automation" | "digital-marketing" | string;
  };
  insight_view: {
    /** Public slug only — never title/body. */
    slug: string;
  };
  contact_path_click: {
    path: "project" | "academy" | "academy_apply" | "general";
  };
};

/** Fields that must never appear in analytics payloads. */
export const FORBIDDEN_ANALYTICS_KEYS = [
  "email",
  "phone",
  "fullName",
  "full_name",
  "name",
  "company",
  "businessProblem",
  "business_problem",
  "projectDescription",
  "project_description",
  "motivation",
  "desiredOutcome",
  "desired_outcome",
  "turnstileToken",
  "turnstile_token",
  "submissionId",
  "submission_id",
  "leadId",
  "lead_id",
  "applicationId",
  "application_id",
  "ip",
  "ipAddress",
] as const;

export function isAnalyticsEventName(value: string): value is AnalyticsEventName {
  return (ANALYTICS_EVENTS as readonly string[]).includes(value);
}

export function assertNoPiiInPayload(
  payload: Record<string, unknown>,
): boolean {
  const keys = Object.keys(payload);
  return !keys.some((key) =>
    (FORBIDDEN_ANALYTICS_KEYS as readonly string[]).includes(key),
  );
}

/**
 * Map existing data-analytics attribute values to taxonomy events where useful.
 * Unmapped attributes are ignored (no event inflation).
 */
export function mapDataAnalyticsToEvent(
  attribute: string,
): { event: AnalyticsEventName; payload: Record<string, string> } | null {
  if (attribute === "cta_contact_start_project") {
    return {
      event: "contact_path_click",
      payload: { path: "project" },
    };
  }

  if (attribute === "cta_contact_academy") {
    return {
      event: "contact_path_click",
      payload: { path: "academy" },
    };
  }

  if (attribute === "cta_contact_academy_apply") {
    return {
      event: "contact_path_click",
      payload: { path: "academy_apply" },
    };
  }

  if (
    attribute === "cta_hero_start_project" ||
    attribute === "cta_final_start_project" ||
    attribute === "cta_about_final_start_project" ||
    attribute === "cta_insight_bridge_start_project" ||
    attribute === "cta_insights_empty_start_project"
  ) {
    return {
      event: "project_cta_click",
      payload: { cta_location: attribute },
    };
  }

  if (
    attribute === "cta_academy_form_submit" ||
    (attribute.includes("academy") && attribute.includes("apply")) ||
    (attribute.includes("academy") && attribute.endsWith("_next_primary"))
  ) {
    return {
      event: "academy_apply_click",
      payload: { cta_location: attribute },
    };
  }

  if (attribute.startsWith("academy_program_") && attribute.endsWith("_view")) {
    const program = attribute
      .replace(/^academy_program_/, "")
      .replace(/_view$/, "");
    return {
      event: "academy_program_view",
      payload: { program },
    };
  }

  return null;
}
