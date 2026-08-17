"use client";

import { useState } from "react";
import { clearAnalyticsConsent } from "@/lib/analytics/consent";
import { isAnalyticsConfigured } from "@/config/analytics";
import { ConsentBanner } from "@/components/analytics";

/**
 * Cookies-page control to revisit analytics preference.
 */
export function ManageAnalyticsPreference() {
  const [open, setOpen] = useState(false);

  if (!isAnalyticsConfigured()) {
    return (
      <p className="mt-6">
        Optional analytics is not configured on this deployment, so no analytics
        preference control is active.
      </p>
    );
  }

  return (
    <div className="mt-8 border-t border-border-soft pt-6">
      <h2 className="text-xl font-medium text-text-primary md:text-2xl">
        Manage analytics preference
      </h2>
      <p className="mt-4">
        You can change whether optional analytics is allowed on this browser.
      </p>
      <button
        type="button"
        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-[var(--radius-button)] border border-border-strong bg-surface-primary px-5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-muted"
        onClick={() => {
          clearAnalyticsConsent();
          setOpen(true);
          window.dispatchEvent(
            new CustomEvent("pst:analytics-consent", { detail: null }),
          );
        }}
      >
        Change analytics preference
      </button>
      {open ? (
        <ConsentBanner
          forceOpen
          onResolved={() => {
            setOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}
