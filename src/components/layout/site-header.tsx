"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
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
  serviceLinks?: NavLink[];
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

function isServicesNav(item: NavLink) {
  return item.href === "/services" || item.href.startsWith("/services/");
}

export function SiteHeader({
  nav,
  cta,
  locale,
  contactEmail,
  phone,
  location,
  socials,
  serviceLinks = [],
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const menuLabel = locale === "fr" ? "Ouvrir le menu" : "Open menu";
  const closeLabel = locale === "fr" ? "Fermer le menu" : "Close menu";
  const overviewLabel = locale === "fr" ? "Vue d'ensemble" : "Overview";
  const hasServiceMenu = serviceLinks.length > 0;

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!servicesOpen) return;
    function onPointerDown(event: MouseEvent) {
      if (!desktopMenuRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setServicesOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  return (
    <header className="sticky top-0 z-50">
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

      <div className="relative border-b border-brand-navy/10 bg-white/90 backdrop-blur">
        <div className="site-container flex min-h-[4.5rem] items-center justify-between gap-4 py-3">
          <PromptstackLogo className="inline-flex items-center gap-3" />

          <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              const showSubmenu = hasServiceMenu && isServicesNav(item);

              if (showSubmenu) {
                return (
                  <div key={item.href} className="relative" ref={desktopMenuRef}>
                    <button
                      type="button"
                      className={`inline-flex items-center gap-1 text-sm font-semibold ${
                        active ? "text-brand-purple" : "text-brand-navy hover:text-brand-purple"
                      }`}
                      aria-expanded={servicesOpen}
                      aria-controls={menuId}
                      onClick={() => setServicesOpen((value) => !value)}
                      onMouseEnter={() => setServicesOpen(true)}
                    >
                      {item.label}
                      <svg
                        className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {servicesOpen ? (
                      <div
                        id={menuId}
                        className="absolute left-0 top-full z-50 w-64 pt-3"
                        onMouseLeave={() => setServicesOpen(false)}
                      >
                        <div className="rounded-(--radius-media) border border-brand-navy/10 bg-white p-2 shadow-[0_16px_40px_rgba(15,23,42,0.14)]">
                        <Link
                          href="/services"
                          className="block rounded-(--radius-btn) px-3 py-2.5 text-sm font-semibold text-brand-navy hover:bg-surface-soft hover:text-brand-purple"
                          onClick={() => setServicesOpen(false)}
                        >
                          {overviewLabel}
                        </Link>
                        <div className="my-1 border-t border-brand-navy/8" />
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className={`block rounded-(--radius-btn) px-3 py-2.5 text-sm font-semibold hover:bg-surface-soft ${
                              pathname === service.href
                                ? "text-brand-purple"
                                : "text-brand-navy hover:text-brand-purple"
                            }`}
                            onClick={() => setServicesOpen(false)}
                          >
                            {service.label}
                          </Link>
                        ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              }

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
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 bg-brand-navy/45 lg:hidden"
              aria-label={closeLabel}
              onClick={() => setOpen(false)}
            />
            <nav
              id="mobile-nav"
              className="absolute inset-x-0 top-full z-50 border-b border-brand-navy/10 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] lg:hidden"
              aria-label="Mobile"
            >
              <div className="site-container flex max-h-[min(70dvh,28rem)] flex-col gap-1 overflow-y-auto py-3">
                {nav.map((item) => {
                  if (hasServiceMenu && isServicesNav(item)) {
                    return (
                      <div key={item.href} className="rounded-(--radius-btn)">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-(--radius-btn) px-3 py-3 text-left text-sm font-semibold text-brand-navy hover:bg-surface-soft"
                          aria-expanded={mobileServicesOpen}
                          onClick={() => setMobileServicesOpen((value) => !value)}
                        >
                          <span>{item.label}</span>
                          <svg
                            className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {mobileServicesOpen ? (
                          <div className="mb-1 ml-2 border-l border-brand-navy/10 pl-2">
                            <Link
                              href="/services"
                              className="block rounded-(--radius-btn) px-3 py-2.5 text-sm font-semibold text-brand-navy hover:bg-surface-soft"
                              onClick={() => setOpen(false)}
                            >
                              {overviewLabel}
                            </Link>
                            {serviceLinks.map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                className="block rounded-(--radius-btn) px-3 py-2.5 text-sm font-semibold text-brand-navy hover:bg-surface-soft"
                                onClick={() => setOpen(false)}
                              >
                                {service.label}
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-(--radius-btn) px-3 py-3 text-sm font-semibold text-brand-navy hover:bg-surface-soft"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href={cta.href}
                  className="btn-primary mt-2 w-fit"
                  onClick={() => setOpen(false)}
                >
                  {cta.label}
                </Link>
              </div>
            </nav>
          </>
        ) : null}
      </div>
    </header>
  );
}
