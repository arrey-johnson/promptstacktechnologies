"use client";

import Link from "next/link";
import { companyNavLinks } from "@/config/navigation";
import { cn } from "@/lib/cn";

type CompanyDropdownProps = {
  id: string;
  open: boolean;
  onNavigate?: () => void;
};

export function CompanyDropdown({
  id,
  open,
  onNavigate,
}: CompanyDropdownProps) {
  return (
    <div
      id={id}
      hidden={!open}
      className={cn(
        "absolute right-0 top-full z-50 min-w-[12.5rem] pt-3",
        !open && "pointer-events-none",
      )}
    >
      <ul
        className={cn(
          "rounded-[var(--radius-card)] border border-border-soft bg-surface-primary py-2 shadow-[0_12px_32px_rgba(27,38,59,0.12)] transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
        )}
      >
        {companyNavLinks.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="block px-4 py-2.5 text-sm text-text-primary transition-colors duration-200 hover:bg-surface-muted hover:text-accent"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
