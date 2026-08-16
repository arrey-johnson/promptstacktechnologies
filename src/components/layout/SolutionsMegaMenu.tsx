"use client";

import Link from "next/link";
import { isNavLink, solutionsMegaMenu } from "@/config/navigation";
import { cn } from "@/lib/cn";

type SolutionsMegaMenuProps = {
  id: string;
  open: boolean;
  onNavigate?: () => void;
};

export function SolutionsMegaMenu({
  id,
  open,
  onNavigate,
}: SolutionsMegaMenuProps) {
  return (
    <div
      id={id}
      role="region"
      aria-label="Solutions"
      hidden={!open}
      className={cn(
        "absolute left-1/2 top-full z-50 w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2 pt-3",
        !open && "pointer-events-none",
      )}
    >
      <div
        className={cn(
          "rounded-[var(--radius-visual)] border border-border-soft bg-surface-primary shadow-[0_18px_48px_rgba(27,38,59,0.12)] transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="grid gap-8 p-6 lg:grid-cols-[1fr_1fr_1fr_0.9fr] lg:gap-6 lg:p-8">
          {solutionsMegaMenu.columns.map((column) => (
            <div key={column.title}>
              <Link
                href={column.href}
                onClick={onNavigate}
                className="text-sm font-medium uppercase tracking-[0.12em] text-accent transition-colors duration-200 hover:text-accent-hover"
              >
                {column.title}
              </Link>
              <ul className="mt-4 space-y-2.5">
                {column.items.map((item) => (
                  <li key={item.label}>
                    {isNavLink(item) ? (
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        className="text-[0.95rem] text-text-primary transition-colors duration-200 hover:text-accent"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-[0.95rem] text-text-secondary">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="rounded-[var(--radius-card)] bg-surface-soft p-5 lg:p-4">
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-text-primary">
              {solutionsMegaMenu.problemExploration.title}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              Problem-led guides will publish when content is ready.
            </p>
            <ul className="mt-4 space-y-2">
              {solutionsMegaMenu.problemExploration.items.map((item) => (
                <li
                  key={item.label}
                  className="text-sm text-text-secondary"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border-soft px-6 py-4 lg:px-8">
          <p className="text-sm text-text-secondary">
            Explore how Promptstack solves operational and growth problems.
          </p>
          <Link
            href="/solutions"
            onClick={onNavigate}
            className="shrink-0 text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-hover"
          >
            View all solutions
          </Link>
        </div>
      </div>
    </div>
  );
}
