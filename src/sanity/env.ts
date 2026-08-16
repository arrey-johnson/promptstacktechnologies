/**
 * Sanity public/server environment helpers.
 * Public identifiers may ship to the browser; tokens must stay server-only.
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-02-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "";

/** True when public project identifiers are present. */
export function isSanityConfigured(
  env: Record<string, string | undefined> = process.env,
): boolean {
  const id = env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const ds = env.NEXT_PUBLIC_SANITY_DATASET?.trim();
  return Boolean(id && ds);
}

/**
 * Academy editorial source selection.
 * Default: local approved TypeScript content.
 * Set ACADEMY_CONTENT_SOURCE=sanity only after programs are imported & verified.
 */
export type AcademyContentSource = "local" | "sanity";

export function getAcademyContentSource(
  env: Record<string, string | undefined> = process.env,
): AcademyContentSource {
  const raw = env.ACADEMY_CONTENT_SOURCE?.trim().toLowerCase();
  if (raw === "sanity") {
    if (!isSanityConfigured(env)) {
      console.warn(
        "[sanity] ACADEMY_CONTENT_SOURCE=sanity but Sanity is not configured; using local.",
      );
      return "local";
    }
    return "sanity";
  }
  return "local";
}

/** Studio may boot with a placeholder id so the route compiles without credentials. */
export function getStudioProjectId(): string {
  return projectId || "unconfigured";
}

export function getSanityReadToken(): string | undefined {
  return process.env.SANITY_API_READ_TOKEN?.trim() || undefined;
}

export function getDraftModeSecret(): string | undefined {
  return (
    process.env.SANITY_PREVIEW_SECRET?.trim() ||
    process.env.DRAFT_MODE_SECRET?.trim() ||
    undefined
  );
}

export function getRevalidateSecret(): string | undefined {
  return process.env.SANITY_REVALIDATE_SECRET?.trim() || undefined;
}

/** True when Sanity project + publication webhook secret are both present. */
export function isPublicationWebhookConfigured(
  env: Record<string, string | undefined> = process.env,
): boolean {
  return (
    isSanityConfigured(env) &&
    Boolean(env.SANITY_REVALIDATE_SECRET?.trim())
  );
}
