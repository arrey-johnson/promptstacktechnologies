import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  ANALYTICS_CONSENT_VALUES,
  type AnalyticsConsentValue,
} from "@/config/analytics";

export type { AnalyticsConsentValue };

export function readAnalyticsConsent(): AnalyticsConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    if (
      raw === ANALYTICS_CONSENT_VALUES.accepted ||
      raw === ANALYTICS_CONSENT_VALUES.rejected
    ) {
      return raw;
    }
    return null;
  } catch {
    return null;
  }
}

export function writeAnalyticsConsent(value: AnalyticsConsentValue): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, value);
  } catch {
    // Storage may be unavailable; preference simply will not persist.
  }
}

export function clearAnalyticsConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(ANALYTICS_CONSENT_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function hasAcceptedAnalytics(): boolean {
  return readAnalyticsConsent() === ANALYTICS_CONSENT_VALUES.accepted;
}
