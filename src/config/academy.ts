/**
 * Academy admissions availability configuration.
 *
 * Production must not silently claim applications are open.
 * Prefer ACADEMY_APPLICATIONS_ENABLED=true|false for operational control.
 * Static default remains false until Promptstack explicitly enables admissions.
 */

export const academyConfig = {
  applyPath: "/academy/apply",
  applyReceivedPath: "/academy/application-received",
} as const;

/**
 * Resolve whether Academy applications are accepting submissions.
 * Env override wins when set; otherwise defaults to closed.
 */
export function areAcademyApplicationsEnabled(
  env: Record<string, string | undefined> = process.env,
): boolean {
  const raw = env.ACADEMY_APPLICATIONS_ENABLED?.trim().toLowerCase();
  if (raw === "true" || raw === "1" || raw === "yes") return true;
  if (raw === "false" || raw === "0" || raw === "no") return false;
  return false;
}

/** Approved program slugs eligible for apply preselection. */
export const ACADEMY_APPLY_PROGRAM_SLUGS = [
  "software-engineering",
  "artificial-intelligence",
  "cybersecurity",
] as const;

export type AcademyApplyProgramSlug =
  (typeof ACADEMY_APPLY_PROGRAM_SLUGS)[number];

export function isAcademyApplyProgramSlug(
  value: string | null | undefined,
): value is AcademyApplyProgramSlug {
  return (
    typeof value === "string" &&
    (ACADEMY_APPLY_PROGRAM_SLUGS as readonly string[]).includes(value)
  );
}

/**
 * Sanitize ?program= query values. Invalid values become undefined
 * (never arbitrary submitted program values).
 */
export function resolveAcademyApplyProgramQuery(
  value: string | string[] | undefined | null,
): AcademyApplyProgramSlug | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  const trimmed = raw.trim();
  return isAcademyApplyProgramSlug(trimmed) ? trimmed : undefined;
}

/** Central Apply href helper — returns null when applications are closed. */
export function getAcademyApplyHref(
  programSlug?: string,
): string | null {
  if (!areAcademyApplicationsEnabled()) return null;
  if (programSlug && isAcademyApplyProgramSlug(programSlug)) {
    return `${academyConfig.applyPath}?program=${programSlug}`;
  }
  return academyConfig.applyPath;
}
