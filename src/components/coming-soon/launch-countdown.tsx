"use client";

import { useEffect, useState } from "react";
import { comingSoonCopy } from "@/content/coming-soon";
import {
  getTimeRemaining,
  LAUNCH_AT_MS,
  padUnit,
  type TimeRemaining,
} from "@/lib/launch";

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

function CountdownSkeleton() {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
      aria-hidden="true"
    >
      {units.map((unit) => (
        <div
          key={unit.key}
          className="rounded-[var(--radius-card)] border border-border-soft bg-surface-primary px-3 py-4 text-center shadow-[0_18px_48px_rgba(27,38,59,0.08)] sm:px-4 sm:py-5"
        >
          <div className="mx-auto h-9 w-14 animate-pulse rounded bg-surface-muted sm:h-10" />
          <p className="mt-3 text-[0.68rem] font-semibold tracking-[0.14em] text-accent uppercase">
            {unit.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function LaunchCountdown() {
  const [remaining, setRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(getTimeRemaining(Date.now(), LAUNCH_AT_MS));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!remaining) {
    return <CountdownSkeleton />;
  }

  if (remaining.expired) {
    return (
      <div
        className="rounded-[var(--radius-card)] border border-border-soft bg-surface-soft px-5 py-5 text-center"
        role="status"
      >
        <p className="text-xl font-bold text-text-primary sm:text-2xl">
          {comingSoonCopy.launchedHeading}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">
          {comingSoonCopy.launchedSupporting}
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
      role="timer"
      aria-live="polite"
      aria-label="Time remaining until 1 October 2026"
    >
      {units.map((unit) => (
        <div
          key={unit.key}
          className="rounded-[var(--radius-card)] border border-border-soft bg-surface-primary px-3 py-4 text-center shadow-[0_18px_48px_rgba(27,38,59,0.08)] sm:px-4 sm:py-5"
        >
          <p className="text-[1.75rem] leading-none font-bold tracking-tight text-text-primary tabular-nums sm:text-4xl md:text-[2.5rem]">
            {padUnit(remaining[unit.key])}
          </p>
          <p className="mt-3 text-[0.68rem] font-semibold tracking-[0.14em] text-accent uppercase">
            {unit.label}
          </p>
        </div>
      ))}
    </div>
  );
}
