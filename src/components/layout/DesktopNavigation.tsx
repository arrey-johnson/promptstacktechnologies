"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { primaryNavLinks } from "@/config/navigation";
import { cn } from "@/lib/cn";
import { CompanyDropdown } from "./CompanyDropdown";
import { NavChevron } from "./NavChevron";
import { SolutionsMegaMenu } from "./SolutionsMegaMenu";

type OpenMenu = "solutions" | "company" | null;

const navTriggerClasses = cn(
  "inline-flex shrink-0 items-center whitespace-nowrap rounded-[var(--radius-button)] py-2 text-[0.9375rem] font-medium text-text-primary transition-colors duration-200 hover:text-accent",
  "gap-1 nav:gap-1 nav-md:gap-1.5",
  "px-1.5 nav-md:px-2 xl:px-2.5",
);

export function DesktopNavigation() {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const solutionsId = useId();
  const companyId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const open = (menu: OpenMenu) => {
    clearCloseTimer();
    setOpenMenu(menu);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    };

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      clearCloseTimer();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn(
        "flex items-center",
        "gap-0 nav-md:gap-0.5 xl:gap-1 wide:gap-1.5",
      )}
    >
      <div
        className="relative"
        onMouseEnter={() => open("solutions")}
        onMouseLeave={scheduleClose}
      >
        <button
          type="button"
          className={cn(
            navTriggerClasses,
            openMenu === "solutions" && "text-accent",
          )}
          aria-expanded={openMenu === "solutions"}
          aria-controls={solutionsId}
          aria-haspopup="true"
          onClick={() =>
            setOpenMenu((current) =>
              current === "solutions" ? null : "solutions",
            )
          }
          onFocus={() => open("solutions")}
        >
          Solutions
          <NavChevron open={openMenu === "solutions"} />
        </button>
        <SolutionsMegaMenu
          id={solutionsId}
          open={openMenu === "solutions"}
          onNavigate={() => setOpenMenu(null)}
        />
      </div>

      {primaryNavLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={navTriggerClasses}
          onFocus={() => setOpenMenu(null)}
        >
          {item.label}
        </Link>
      ))}

      <div
        className="relative"
        onMouseEnter={() => open("company")}
        onMouseLeave={scheduleClose}
      >
        <button
          type="button"
          className={cn(
            navTriggerClasses,
            openMenu === "company" && "text-accent",
          )}
          aria-expanded={openMenu === "company"}
          aria-controls={companyId}
          aria-haspopup="true"
          onClick={() =>
            setOpenMenu((current) => (current === "company" ? null : "company"))
          }
          onFocus={() => open("company")}
        >
          Company
          <NavChevron open={openMenu === "company"} />
        </button>
        <CompanyDropdown
          id={companyId}
          open={openMenu === "company"}
          onNavigate={() => setOpenMenu(null)}
        />
      </div>
    </div>
  );
}
