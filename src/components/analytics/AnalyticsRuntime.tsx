"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ANALYTICS_CONSENT_VALUES,
  getGtmId,
  isAnalyticsConfigured,
} from "@/config/analytics";
import { hasAcceptedAnalytics } from "@/lib/analytics/consent";
import { mapDataAnalyticsToEvent } from "@/lib/analytics/events";
import { useAnalyticsConsent } from "@/lib/analytics/use-analytics-consent";
import { pushDataLayer, trackEvent, trackPageView } from "@/lib/analytics/track";
import { ConsentBanner } from "./ConsentBanner";

/**
 * Client analytics island:
 * - consent banner when GTM configured and preference unset
 * - GTM container only after accept
 * - click bridge for mapped data-analytics attributes
 * - App Router virtual page views after consent
 */
export function AnalyticsRuntime() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const consent = useAnalyticsConsent();
  const gtmId = getGtmId();
  const configured = isAnalyticsConfigured();
  const accepted = consent === ANALYTICS_CONSENT_VALUES.accepted;

  useEffect(() => {
    if (!configured || !accepted) {
      return;
    }
    const qs = searchParams?.toString();
    const path = qs ? `${pathname}?${qs}` : pathname;
    trackPageView(path);
  }, [configured, accepted, pathname, searchParams]);

  useEffect(() => {
    if (!configured) return;

    function onClick(event: MouseEvent) {
      if (!hasAcceptedAnalytics()) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const el = target.closest("[data-analytics]");
      if (!(el instanceof HTMLElement)) return;
      const attr = el.getAttribute("data-analytics");
      if (!attr) return;
      const mapped = mapDataAnalyticsToEvent(attr);
      if (!mapped) return;
      trackEvent(mapped.event, mapped.payload as never);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [configured]);

  if (!configured || !gtmId) {
    return null;
  }

  return (
    <>
      <ConsentBanner />
      {accepted ? (
        <>
          <Script id="pst-gtm-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`}
          </Script>
          <Script
            id="pst-gtm"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
            onLoad={() => {
              pushDataLayer({ event: "pst_gtm_loaded" });
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        </>
      ) : null}
    </>
  );
}
