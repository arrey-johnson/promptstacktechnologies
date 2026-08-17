"use client";

import { useEffect } from "react";
import { CONVERSION_SESSION_KEYS } from "@/config/analytics";
import { trackEvent } from "@/lib/analytics/track";

type ConversionKind = "project" | "academy";

/**
 * Fires conversion success once per browser session after authoritative
 * server persistence redirected the visitor to a confirmation page.
 * Refresh does not double-count.
 */
export function ConversionSuccessBeacon({ kind }: { kind: ConversionKind }) {
  useEffect(() => {
    const key =
      kind === "project"
        ? CONVERSION_SESSION_KEYS.project
        : CONVERSION_SESSION_KEYS.academy;

    try {
      if (sessionStorage.getItem(key) === "1") {
        return;
      }
      sessionStorage.setItem(key, "1");
    } catch {
      // If sessionStorage is unavailable, still attempt a single mount fire.
    }

    if (kind === "project") {
      trackEvent("project_submission_success", { form: "project_inquiry" });
    } else {
      trackEvent("academy_application_success", {
        form: "academy_application",
      });
    }
  }, [kind]);

  return null;
}
