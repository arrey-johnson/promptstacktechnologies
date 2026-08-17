"use client";

import { useId } from "react";
import {
  ANALYTICS_CONSENT_VALUES,
  isAnalyticsConfigured,
} from "@/config/analytics";
import {
  writeAnalyticsConsent,
  type AnalyticsConsentValue,
} from "@/lib/analytics/consent";
import { pushDataLayer } from "@/lib/analytics/track";
import { useAnalyticsConsent } from "@/lib/analytics/use-analytics-consent";

type ConsentBannerProps = {
  /** When true, force the banner open (Cookies page “manage preference”). */
  forceOpen?: boolean;
  onResolved?: (value: AnalyticsConsentValue) => void;
};

/**
 * Restrained first-party analytics consent UI.
 * Necessary/security mechanisms remain operational regardless of choice.
 */
export function ConsentBanner({ forceOpen = false, onResolved }: ConsentBannerProps) {
  const titleId = useId();
  const configured = isAnalyticsConfigured();
  const consent = useAnalyticsConsent();
  const visible = configured && (forceOpen || consent === null);

  if (!visible) {
    return null;
  }

  function resolve(value: AnalyticsConsentValue) {
    writeAnalyticsConsent(value);
    pushDataLayer({
      event: "pst_analytics_consent_update",
      analytics_consent: value,
    });
    if (value === ANALYTICS_CONSENT_VALUES.accepted) {
      pushDataLayer({
        event: "pst_analytics_consent_granted",
      });
    }
    window.dispatchEvent(
      new CustomEvent("pst:analytics-consent", { detail: value }),
    );
    onResolved?.(value);
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border-soft bg-surface-primary/95 p-4 shadow-[0_-8px_30px_rgba(27,38,59,0.08)] backdrop-blur-sm md:p-5"
    >
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="max-w-2xl">
          <h2
            id={titleId}
            className="text-base font-medium text-text-primary md:text-lg"
          >
            Analytics cookies
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary md:text-[0.95rem]">
            We use optional analytics (via Google Tag Manager / Google Analytics)
            to understand how the website is used. Essential security features
            such as form protection continue to work either way.{" "}
            <a
              href="/cookies"
              className="text-text-primary underline underline-offset-2 hover:text-accent"
            >
              Cookie details
            </a>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-button)] border border-border-strong bg-surface-primary px-5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-muted"
            onClick={() => resolve(ANALYTICS_CONSENT_VALUES.rejected)}
          >
            Continue without analytics
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-button)] border border-transparent bg-accent px-5 text-sm font-medium text-text-inverse transition-colors hover:bg-accent-hover"
            onClick={() => resolve(ANALYTICS_CONSENT_VALUES.accepted)}
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
