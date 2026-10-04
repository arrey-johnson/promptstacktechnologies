import type { ProcessStep } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n/locale";

const PHASE_META = [
  {
    labelEn: "Discover",
    labelFr: "Découvrir",
    Icon: IconDiscover,
  },
  {
    labelEn: "Define",
    labelFr: "Définir",
    Icon: IconDefine,
  },
  {
    labelEn: "Deliver",
    labelFr: "Livrer",
    Icon: IconDeliver,
  },
  {
    labelEn: "Own",
    labelFr: "Transférer",
    Icon: IconOwn,
  },
] as const;

export function ProcessRoadmap({
  steps,
  locale = "en",
}: {
  steps: ProcessStep[];
  locale?: Locale;
}) {
  return (
    <div className="relative mt-12">
      {/* Desktop / tablet horizontal roadmap */}
      <ol className="relative hidden md:grid md:grid-cols-4 md:gap-0">
        <div
          className="pointer-events-none absolute top-[2.75rem] right-[12.5%] left-[12.5%] h-px bg-brand-navy/12"
          aria-hidden="true"
        >
          <div className="roadmap-progress-x h-full w-full origin-left bg-gradient-to-r from-brand-purple via-brand-lavender to-brand-purple" />
        </div>

        {steps.map((step, index) => {
          const meta = PHASE_META[index] ?? PHASE_META[0];
          const label = locale === "fr" ? meta.labelFr : meta.labelEn;
          const Icon = meta.Icon;
          const phaseNum = String(index + 1).padStart(2, "0");

          return (
            <li
              key={step.title}
              className="group relative flex flex-col items-center px-3 text-center"
            >
              <div
                className="roadmap-node relative z-10"
                style={{ animationDelay: `${120 + index * 110}ms` }}
              >
                <div className="relative flex h-[5.5rem] w-[5.5rem] items-center justify-center">
                  <span
                    className="absolute inset-0 rounded-[1.35rem] bg-surface-soft ring-1 ring-brand-navy/8 transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-brand-purple/35 group-hover:shadow-[0_18px_36px_-22px_rgb(168_0_230/0.55)]"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute -top-2 -right-2 flex h-7 min-w-7 items-center justify-center rounded-md bg-brand-purple px-1.5 text-[0.7rem] font-bold tracking-wide text-white shadow-sm"
                    aria-hidden="true"
                  >
                    {phaseNum}
                  </span>
                  <Icon className="relative h-9 w-9 text-brand-purple" />
                </div>
              </div>

              <p className="mt-5 text-[0.68rem] font-semibold tracking-[0.18em] text-brand-purple uppercase">
                Phase {phaseNum}
              </p>
              <p className="mt-1 text-xs font-bold tracking-wide text-brand-navy/70">
                {label}
              </p>
              <h3 className="mt-3 max-w-[14rem] text-lg font-bold tracking-tight text-brand-navy">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-text-muted">
                {step.body}
              </p>
            </li>
          );
        })}
      </ol>

      {/* Mobile vertical roadmap */}
      <ol className="relative space-y-0 md:hidden">
        <div
          className="pointer-events-none absolute top-7 bottom-7 left-[1.7rem] w-px bg-brand-navy/12"
          aria-hidden="true"
        >
          <div className="roadmap-progress-y h-full w-full origin-top bg-gradient-to-b from-brand-purple via-brand-lavender to-brand-purple" />
        </div>

        {steps.map((step, index) => {
          const meta = PHASE_META[index] ?? PHASE_META[0];
          const label = locale === "fr" ? meta.labelFr : meta.labelEn;
          const Icon = meta.Icon;
          const phaseNum = String(index + 1).padStart(2, "0");

          return (
            <li key={step.title} className="relative flex gap-4 py-4 pl-1">
              <div
                className="roadmap-node relative z-10 shrink-0"
                style={{ animationDelay: `${80 + index * 90}ms` }}
              >
                <div className="relative flex h-14 w-14 items-center justify-center">
                  <span
                    className="absolute inset-0 rounded-[0.95rem] bg-surface-soft ring-1 ring-brand-navy/8"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded bg-brand-purple px-1 text-[0.6rem] font-bold text-white"
                    aria-hidden="true"
                  >
                    {phaseNum}
                  </span>
                  <Icon className="relative h-7 w-7 text-brand-purple" />
                </div>
              </div>
              <div className="min-w-0 pt-0.5">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-brand-purple uppercase">
                    Phase {phaseNum}
                  </p>
                  <span className="text-xs font-bold tracking-wide text-brand-navy/70">
                    {label}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-bold tracking-tight text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{step.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function IconDiscover({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M8 20c0-6.627 5.373-12 12-12s12 5.373 12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M11 20c0-4.97 4.03-9 9-9s9 4.03 9 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="20" cy="20" r="5.5" fill="currentColor" />
      <path
        d="M24.2 24.2 31 31"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M20 17.2v5.6M17.2 20h5.6"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconDefine({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect
        x="9"
        y="7"
        width="22"
        height="26"
        rx="3.5"
        fill="currentColor"
        opacity="0.14"
      />
      <rect
        x="9"
        y="7"
        width="22"
        height="26"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M15 14h10M15 20h10M15 26h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="28.5" cy="27.5" r="5.5" fill="currentColor" />
      <path
        d="M26.2 27.6l1.5 1.5 3.2-3.4"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDeliver({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M8 22.5 20 8l12 14.5H8Z"
        fill="currentColor"
        opacity="0.14"
      />
      <path
        d="M8 22.5 20 8l12 14.5H8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M20 16v14"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M14.5 24.5 20 30l5.5-5.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="12" y="31.5" width="16" height="2.5" rx="1.25" fill="currentColor" />
    </svg>
  );
}

function IconOwn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 6.5 30 11.2v8.3c0 6.1-4.1 11.7-10 13-5.9-1.3-10-6.9-10-13v-8.3L20 6.5Z"
        fill="currentColor"
        opacity="0.14"
      />
      <path
        d="M20 6.5 30 11.2v8.3c0 6.1-4.1 11.7-10 13-5.9-1.3-10-6.9-10-13v-8.3L20 6.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14.8 20.2 18.2 23.5 25.4 16"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
