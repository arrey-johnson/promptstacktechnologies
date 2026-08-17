import { isAnalyticsConfigured } from "@/config/analytics";
import { hasAcceptedAnalytics } from "@/lib/analytics/consent";
import {
  assertNoPiiInPayload,
  type AnalyticsEventName,
  type AnalyticsEventPayload,
} from "@/lib/analytics/events";

type DataLayerEvent = {
  event: AnalyticsEventName;
} & Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function pushDataLayer(entry: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(entry);
}

/**
 * Fire a typed business event only when analytics is configured and consented.
 * Never throws; never includes PII.
 */
export function trackEvent<E extends AnalyticsEventName>(
  event: E,
  payload: AnalyticsEventPayload[E],
): boolean {
  if (!isAnalyticsConfigured()) return false;
  if (!hasAcceptedAnalytics()) return false;

  const safePayload = { ...payload } as Record<string, unknown>;
  if (!assertNoPiiInPayload(safePayload)) {
    console.error("[analytics] blocked payload with forbidden keys", { event });
    return false;
  }

  const entry: DataLayerEvent = {
    event,
    ...safePayload,
  };
  pushDataLayer(entry);
  return true;
}

export function trackPageView(path: string): void {
  if (!isAnalyticsConfigured()) return;
  if (!hasAcceptedAnalytics()) return;
  pushDataLayer({
    event: "virtual_page_view",
    page_path: path,
  });
}
