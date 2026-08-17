"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { primaryCta } from "@/config/navigation";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { SiteLogo } from "./SiteLogo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-header-hydrated={hydrated ? "true" : "false"}
      className={cn(
        "sticky top-0 z-40 bg-surface-primary/95 backdrop-blur-[2px] transition-[border-color,box-shadow] duration-200",
        scrolled
          ? "border-b border-border-soft shadow-[0_1px_0_rgba(27,38,59,0.04)]"
          : "border-b border-transparent",
      )}
    >
      {/*
        Mobile (< 1024): Logo + Menu only — no header CTA.
        Desktop (1024+): full horizontal nav + Start a Project.
      */}
      <div
        className={cn(
          "mx-auto flex w-full max-w-[var(--container-max)] items-center justify-between",
          "h-[var(--header-height-mobile)] nav:h-[var(--header-height)]",
          "px-4 nav:px-5 nav-md:px-6 xl:px-8",
          "gap-4 nav:gap-4 nav-md:gap-5 xl:gap-6",
        )}
      >
        <div
          className={cn(
            "flex min-w-0 items-center",
            "gap-4 nav:gap-4 nav-md:gap-5 xl:gap-6 wide:gap-8",
          )}
        >
          <SiteLogo priority density="header" />
          <nav aria-label="Primary" className="hidden nav:block">
            <DesktopNavigation />
          </nav>
        </div>

        <div className="flex shrink-0 items-center">
          {/* Desktop-only CTA — never rendered into the mobile header row. */}
          <div className="max-nav:hidden nav:block">
            <Button
              href={primaryCta.href}
              className="nav:px-3.5 nav-md:px-4 xl:px-5"
              size="md"
            >
              {primaryCta.label}
            </Button>
          </div>
          <MobileNavigation open={mobileOpen} onOpenChange={setMobileOpen} />
        </div>
      </div>
    </header>
  );
}
