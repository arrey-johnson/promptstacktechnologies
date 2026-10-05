"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/locale";

export const COOKIE_CONSENT_KEY = "pst_cookie_consent";
export type CookieConsentValue = "accepted" | "essential";

export function getCookieConsent(): CookieConsentValue | null {
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === "accepted" || value === "essential") return value;
  } catch {
    /* private mode */
  }
  return null;
}

const copy = {
  en: {
    title: "Cookies & privacy",
    body: "We use essential cookies to run the site and, with your permission, first-party analytics to understand which pages help visitors. See our",
    cookieLink: "Cookie Policy",
    and: "and",
    privacyLink: "Privacy Policy",
    accept: "Accept all",
    essential: "Essential only",
  },
  fr: {
    title: "Cookies et confidentialité",
    body: "Nous utilisons des cookies essentiels pour faire fonctionner le site et, avec votre accord, une analytique first-party pour comprendre les pages utiles. Voir notre",
    cookieLink: "Politique cookies",
    and: "et notre",
    privacyLink: "Politique de confidentialité",
    accept: "Tout accepter",
    essential: "Essentiel uniquement",
  },
} as const;

export function CookieConsentBanner({ locale = "en" }: { locale?: Locale }) {
  const [visible, setVisible] = useState(false);
  const t = copy[locale === "fr" ? "fr" : "en"];

  useEffect(() => {
    setVisible(getCookieConsent() === null);
  }, []);

  function choose(value: CookieConsentValue) {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
    window.dispatchEvent(new CustomEvent("pst:cookie-consent", { detail: value }));
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.title}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-navy/10 bg-white/95 p-4 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur-md"
    >
      <div className="site-container flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-bold text-brand-navy">{t.title}</p>
          <p className="mt-1 text-sm text-text-muted">
            {t.body}{" "}
            <Link href="/cookie-policy" className="font-semibold text-brand-purple underline-offset-2 hover:underline">
              {t.cookieLink}
            </Link>{" "}
            {t.and}{" "}
            <Link href="/privacy-policy" className="font-semibold text-brand-purple underline-offset-2 hover:underline">
              {t.privacyLink}
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="min-h-11 rounded-(--radius-btn) border border-brand-navy/15 px-4 text-sm font-semibold text-brand-navy hover:bg-surface-soft"
          >
            {t.essential}
          </button>
          <button type="button" onClick={() => choose("accepted")} className="btn-primary min-h-11 px-4 text-sm">
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
