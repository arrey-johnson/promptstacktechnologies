/**
 * Config-driven analytics. Absent GTM ID → analytics stays disabled.
 * Never hardcode live container IDs in source.
 */

export const ANALYTICS_CONSENT_STORAGE_KEY = "pst_analytics_consent_v1";
export const ANALYTICS_CONSENT_VALUES = {
  accepted: "accepted",
  rejected: "rejected",
} as const;

export type AnalyticsConsentValue =
  (typeof ANALYTICS_CONSENT_VALUES)[keyof typeof ANALYTICS_CONSENT_VALUES];

/** One-time conversion markers (sessionStorage) — not PII. */
export const CONVERSION_SESSION_KEYS = {
  project: "pst_conversion_project_v1",
  academy: "pst_conversion_academy_v1",
} as const;

export function getGtmId(
  env: Record<string, string | undefined> = process.env,
): string | null {
  const id = env.NEXT_PUBLIC_GTM_ID?.trim();
  if (!id) return null;
  // GTM-XXXXXXX
  if (!/^GTM-[A-Z0-9]+$/i.test(id)) return null;
  return id;
}

export function isAnalyticsConfigured(
  env: Record<string, string | undefined> = process.env,
): boolean {
  return getGtmId(env) !== null;
}

/**
 * Optional GA4 measurement ID for documentation / GTM configuration guidance.
 * Runtime measurement is expected to load through GTM — this ID is not injected
 * as a second gtag loader to avoid duplicate pageviews.
 */
export function getGaMeasurementId(
  env: Record<string, string | undefined> = process.env,
): string | null {
  const id = env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!id) return null;
  if (!/^G-[A-Z0-9]+$/i.test(id)) return null;
  return id;
}
