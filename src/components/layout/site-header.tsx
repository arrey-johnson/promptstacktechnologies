"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PromptstackLogo } from "@/components/brand/promptstack-logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { SocialIconLinks } from "@/components/layout/social-icons";
import type { Locale } from "@/lib/i18n/locale";
import type { Cta, NavLink } from "@/lib/cms/types";

type SiteHeaderProps = {
  nav: NavLink[];
  cta: Cta;
  locale: Locale;
  contactEmail: string;
  phone: string;
  location: string;
  socials: NavLink[];
};

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function IconPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 21s7-5.33 7-11a7 7 0 10-14 0c0 5.67 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function SiteHeader({
  nav,
  cta,
  locale,
  contactEmail,
  phone,
  location,
  socials,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuLabel = locale === "fr" ? "Ouvrir le menu" : "Open menu";
  const closeLabel = locale === "fr" ? "Fermer le menu" : "Close menu";

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-brand-navy text-white">
        <div className="site-container flex min-h-10 flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2 text-xs sm:text-[0.8rem]">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-1.5 text-white/90">
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex min-w-0 items-center gap-1.5 hover:text-white"
            >
              <IconMail className="h-3.5 w-3.5 shrink-0 opacity-80" />
              <span className="truncate">{contactEmail}</span>
            </a>
            <a
              href={phoneHref(phone)}
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <IconPhone className="h-3.5 w-3.5 shrink-0 opacity-80" />
              <span>{phone}</span>
            </a>
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <IconPin className="h-3.5 w-3.5 shrink-0 opacity-80" />
              <span className="truncate">{location}</span>
            </span>
          </div>
          <SocialIconLinks socials={socials} className="shrink-0" />
        </div>
      </div>

      <div className="border-b border-brand-navy/10 bg-white/90 backdrop-blur">
        <div className="site-container flex min-h-[4.5rem] items-center justify-between gap-4 py-3">
          <PromptstackLogo className="inline-flex items-center gap-3" />

          <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-semibold ${active ? "text-brand-purple" : "text-brand-navy hover:text-brand-purple"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher locale={locale} />
            <Link href={cta.href} className="btn-primary">
              {cta.label}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher locale={locale} compact />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-(--radius-btn) border border-brand-navy/15 text-brand-navy"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? closeLabel : menuLabel}
            >
              {open ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {open ? (
          <nav
            id="mobile-nav"
            className="border-t border-brand-navy/10 bg-white lg:hidden"
            aria-label="Mobile"
          >
            <div className="site-container flex flex-col gap-3 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold text-brand-navy"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link href={cta.href} className="btn-primary w-fit" onClick={() => setOpen(false)}>
                {cta.label}
              </Link>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
