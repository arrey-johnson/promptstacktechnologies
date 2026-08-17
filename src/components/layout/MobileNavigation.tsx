"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  companyNavLinks,
  mobileSolutionsLinks,
  primaryCta,
  primaryNavLinks,
} from "@/config/navigation";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { NavChevron } from "./NavChevron";
import { SiteLogo } from "./SiteLogo";

type MobileNavigationProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Accordion = "solutions" | "company" | null;

/**
 * Mobile menu trigger stays in the header.
 * The drawer is portaled to document.body so it is NOT trapped by the sticky
 * header's `backdrop-filter` containing block (which would shrink `fixed`
 * descendants to the header height and clip the navigation list).
 */
export function MobileNavigation({ open, onOpenChange }: MobileNavigationProps) {
  const panelId = useId();
  const solutionsPanelId = useId();
  const companyPanelId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [openAccordion, setOpenAccordion] = useState<Accordion>(null);
  // Client-only portal target (SSR-safe); avoids setState-in-effect lint.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const closeMenu = () => {
    setOpenAccordion(null);
    onOpenChange(false);
  };

  const toggleAccordion = (panel: Exclude<Accordion, null>) => {
    setOpenAccordion((current) => (current === panel ? null : panel));
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const previouslyFocused = document.activeElement as HTMLElement | null;
    // Focus after portal paint.
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpenAccordion(null);
        onOpenChange(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onOpenChange]);

  const itemClass =
    "flex w-full items-center justify-between rounded-[var(--radius-button)] px-1 py-3.5 text-left text-base font-medium text-text-primary transition-colors duration-200 hover:text-accent";

  const drawer =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[100]"
            data-mobile-nav-drawer="true"
          >
            <button
              type="button"
              className="absolute inset-0 bg-brand-navy/45"
              aria-label="Close menu overlay"
              onClick={closeMenu}
            />

            <div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="absolute inset-y-0 right-0 flex h-[100dvh] max-h-[100dvh] w-full max-w-md flex-col bg-surface-primary shadow-[-12px_0_40px_rgba(27,38,59,0.16)]"
            >
              <div className="flex h-[var(--header-height-mobile)] shrink-0 items-center justify-between border-b border-border-soft px-4">
                <SiteLogo density="header" />
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-button)] text-text-primary transition-colors duration-200 hover:bg-surface-muted"
                  aria-label="Close menu"
                  onClick={closeMenu}
                >
                  <span aria-hidden="true" className="text-2xl leading-none">
                    ×
                  </span>
                </button>
              </div>

              {/*
                Single scrollable body: primary nav + CTA.
                Avoids sticky-footer flex height bugs on short viewports.
              */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                <nav aria-label="Mobile" className="px-5 py-5">
                  <ul className="space-y-1">
                    <li>
                      <button
                        type="button"
                        className={itemClass}
                        aria-expanded={openAccordion === "solutions"}
                        aria-controls={solutionsPanelId}
                        onClick={() => toggleAccordion("solutions")}
                      >
                        Solutions
                        <NavChevron open={openAccordion === "solutions"} />
                      </button>
                      {openAccordion === "solutions" ? (
                        <ul
                          id={solutionsPanelId}
                          className="mb-2 ml-1 space-y-1 border-l border-border-soft pl-4"
                        >
                          {mobileSolutionsLinks.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={closeMenu}
                                className="block py-2.5 text-[0.95rem] text-text-primary transition-colors duration-200 hover:text-accent"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>

                    {primaryNavLinks.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className={itemClass}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}

                    <li>
                      <button
                        type="button"
                        className={itemClass}
                        aria-expanded={openAccordion === "company"}
                        aria-controls={companyPanelId}
                        onClick={() => toggleAccordion("company")}
                      >
                        Company
                        <NavChevron open={openAccordion === "company"} />
                      </button>
                      {openAccordion === "company" ? (
                        <ul
                          id={companyPanelId}
                          className="mb-2 ml-1 space-y-1 border-l border-border-soft pl-4"
                        >
                          {companyNavLinks.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={closeMenu}
                                className="block py-2.5 text-[0.95rem] text-text-primary transition-colors duration-200 hover:text-accent"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  </ul>
                </nav>

                <div className="border-t border-border-soft px-5 py-5 pb-8">
                  <Button
                    href={primaryCta.href}
                    className="w-full"
                    size="lg"
                    onClick={closeMenu}
                  >
                    {primaryCta.label}
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="nav:hidden">
      <button
        type="button"
        className="inline-flex h-11 min-w-11 items-center justify-center rounded-[var(--radius-button)] px-2 text-text-primary transition-colors duration-200 hover:bg-surface-muted"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => {
          if (open) {
            closeMenu();
          } else {
            onOpenChange(true);
          }
        }}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="relative block h-4 w-5">
          <span
            className={cn(
              "absolute left-0 top-0 block h-0.5 w-5 bg-current transition-transform duration-200",
              open && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-[7px] block h-0.5 w-5 bg-current transition-opacity duration-200",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-[14px] block h-0.5 w-5 bg-current transition-transform duration-200",
              open && "-translate-y-[7px] -rotate-45",
            )}
          />
        </span>
      </button>
      {drawer}
    </div>
  );
}
