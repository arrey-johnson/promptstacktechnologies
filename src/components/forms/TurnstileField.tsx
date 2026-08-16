"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  TURNSTILE_DEV_BYPASS_TOKEN,
  TURNSTILE_PROJECT_INQUIRY_ACTION,
} from "@/lib/security/turnstile";

type TurnstileFieldProps = {
  siteKey?: string;
  name?: string;
  error?: string;
  action?: string;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      remove: (widgetId?: string) => void;
    };
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadTurnstileScript() {
  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Turnstile script failed to load"));
    document.head.appendChild(script);
  });
}

/**
 * Renders Cloudflare Turnstile when a site key is configured.
 * Local development without a site key uses the documented development-only bypass.
 * Prefer Cloudflare official test keys when exercising Siteverify locally.
 */
export function TurnstileField({
  siteKey,
  name = "turnstileToken",
  error,
  action = TURNSTILE_PROJECT_INQUIRY_ACTION,
}: TurnstileFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const inputId = useId();
  const useBypass = !siteKey;
  const [token, setToken] = useState(() =>
    useBypass ? TURNSTILE_DEV_BYPASS_TOKEN : "",
  );

  useEffect(() => {
    if (useBypass) {
      return;
    }

    let cancelled = false;

    async function mount() {
      try {
        await loadTurnstileScript();
        if (cancelled || !containerRef.current || !window.turnstile || !siteKey) {
          return;
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          callback: (value) => setToken(value),
          "expired-callback": () => setToken(""),
          "error-callback": () => setToken(""),
        });
      } catch {
        if (!cancelled) {
          setToken("");
        }
      }
    }

    void mount();

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [siteKey, useBypass, action]);

  return (
    <div className="space-y-2">
      <p className="text-[0.95rem] font-medium text-text-primary">
        Security check
        <span className="text-accent" aria-hidden="true">
          {" "}
          *
        </span>
      </p>
      {useBypass ? (
        <p className="rounded-[var(--radius-field)] border border-border-soft bg-surface-muted px-3 py-3 text-sm text-text-secondary">
          Local development security bypass is active. Preview, staging, and
          production require Cloudflare Turnstile (prefer official test keys
          locally when validating Siteverify).
        </p>
      ) : (
        <div ref={containerRef} />
      )}
      <input id={inputId} type="hidden" name={name} value={token} readOnly />
      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
