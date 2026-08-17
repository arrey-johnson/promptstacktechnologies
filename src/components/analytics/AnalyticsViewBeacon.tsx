"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics/track";
import type { AnalyticsEventName, AnalyticsEventPayload } from "@/lib/analytics/events";

type ViewBeaconProps<E extends AnalyticsEventName> = {
  event: E;
  payload: AnalyticsEventPayload[E];
};

/** Fire a view event once per mount when analytics is consented. */
export function AnalyticsViewBeacon<E extends AnalyticsEventName>({
  event,
  payload,
}: ViewBeaconProps<E>) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackEvent(event, payload);
  }, [event, payload]);

  return null;
}
