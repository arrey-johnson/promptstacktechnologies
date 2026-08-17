"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics/track";

/**
 * Fire form_start once when the visitor first interacts with the form.
 */
export function FormStartBeacon({
  kind,
}: {
  kind: "project" | "academy";
}) {
  const fired = useRef(false);

  useEffect(() => {
    function onFocusIn(event: FocusEvent) {
      if (fired.current) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const form = target.closest("form");
      if (!form) return;
      const marker =
        kind === "project"
          ? form.getAttribute("data-analytics") === "project_inquiry_form"
          : form.getAttribute("data-analytics") === "academy_application_form";
      if (!marker) return;
      fired.current = true;
      if (kind === "project") {
        trackEvent("project_form_start", { form: "project_inquiry" });
      } else {
        trackEvent("academy_application_start", {
          form: "academy_application",
        });
      }
    }

    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [kind]);

  return null;
}
