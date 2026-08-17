"use client";

import { useSyncExternalStore } from "react";
import {
  readAnalyticsConsent,
  type AnalyticsConsentValue,
} from "@/lib/analytics/consent";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }
  const handler = () => onStoreChange();
  window.addEventListener("pst:analytics-consent", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("pst:analytics-consent", handler);
    window.removeEventListener("storage", handler);
  };
}

function getSnapshot(): AnalyticsConsentValue | null {
  return readAnalyticsConsent();
}

function getServerSnapshot(): AnalyticsConsentValue | null {
  return null;
}

export function useAnalyticsConsent(): AnalyticsConsentValue | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
