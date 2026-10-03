"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Locale } from "@/lib/i18n/locale";

function FlagGB({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 40" aria-hidden="true">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0 V40 M0 20 H60" stroke="#fff" strokeWidth="14" />
      <path d="M30 0 V40 M0 20 H60" stroke="#C8102E" strokeWidth="8" />
    </svg>
  );
}

function FlagFR({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 40" aria-hidden="true">
      <rect width="20" height="40" x="0" fill="#002395" />
      <rect width="20" height="40" x="20" fill="#fff" />
      <rect width="20" height="40" x="40" fill="#ED2939" />
    </svg>
  );
}

const OPTIONS: Array<{
  code: Locale;
  label: string;
  Flag: typeof FlagGB;
}> = [
  { code: "en", label: "English", Flag: FlagGB },
  { code: "fr", label: "Français", Flag: FlagFR },
];

export function LanguageSwitcher({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const router = useRouter();
  const [current, setCurrent] = useState<Locale>(locale);
  const [pending, startTransition] = useTransition();

  async function select(next: Locale) {
    if (next === current || pending) return;
    const res = await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: next }),
    });
    if (!res.ok) return;
    setCurrent(next);
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div
      className={`inline-flex items-center rounded-(--radius-btn) border border-brand-navy/15 p-0.5 ${pending ? "opacity-70" : ""}`}
      role="group"
      aria-label={current === "fr" ? "Choisir la langue" : "Select language"}
    >
      {OPTIONS.map(({ code, label, Flag }) => {
        const active = current === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => select(code)}
            disabled={pending}
            className={`inline-flex items-center gap-1.5 rounded-[6px] px-2 py-1.5 text-xs font-semibold transition-colors ${
              active
                ? "bg-brand-purple text-white"
                : "text-brand-navy hover:bg-surface-soft"
            }`}
            aria-pressed={active}
            aria-label={label}
            title={label}
          >
            <Flag className="h-3.5 w-5 overflow-hidden rounded-[2px] shadow-sm" />
            {!compact ? <span>{code.toUpperCase()}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
