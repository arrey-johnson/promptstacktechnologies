import type { ProcessStep } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n/locale";

const PHASE_META = [
  {
    labelEn: "Discover",
    labelFr: "Découvrir",
    accent: "from-[#a800e6] to-[#6b21a8]",
    Icon: IconDiscover,
  },
  {
    labelEn: "Define",
    labelFr: "Définir",
    accent: "from-[#7c3aed] to-[#1b263b]",
    Icon: IconDefine,
  },
  {
    labelEn: "Deliver",
    labelFr: "Livrer",
    accent: "from-[#c026d3] to-[#a800e6]",
    Icon: IconDeliver,
  },
  {
    labelEn: "Own",
    labelFr: "Transférer",
    accent: "from-[#1b263b] to-[#a800e6]",
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
      <div
        className="pointer-events-none absolute -inset-x-8 -top-6 h-40 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(168_0_230/0.12),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      {/* Desktop / tablet horizontal roadmap */}
      <ol className="relative hidden md:grid md:grid-cols-4 md:gap-0">
        <div
          className="pointer-events-none absolute top-[2.65rem] right-[12.5%] left-[12.5%] h-[3px] overflow-hidden rounded-full bg-brand-navy/10"
          aria-hidden="true"
        >
          <div className="roadmap-progress-x h-full w-full origin-left rounded-full bg-gradient-to-r from-brand-purple via-brand-lavender to-brand-purple" />
        </div>

        {steps.map((step, index) => {
          const meta = PHASE_META[index] ?? PHASE_META[0];
          const label = locale === "fr" ? meta.labelFr : meta.labelEn;
          const Icon = meta.Icon;
          const phase = `Phase ${String(index + 1).padStart(2, "0")}`;

          return (
            <li
              key={step.title}
              className="group relative flex flex-col items-center px-3 text-center"
            >
              <div
                className="roadmap-node relative z-10 flex h-[5.5rem] w-[5.5rem] items-center justify-center"
                style={{ animationDelay: `${120 + index * 110}ms` }}
              >
                <span
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${meta.accent} opacity-90 shadow-[0_12px_28px_-10px_rgb(168_0_230/0.55)] transition-transform duration-300 group-hover:scale-105`}
                />
                <span className="absolute inset-[3px] rounded-full bg-white/15" />
                <Icon className="relative h-8 w-8 text-white" />
              </div>

              <p className="mt-5 text-[0.68rem] font-semibold tracking-[0.18em] text-brand-purple uppercase">
                {phase}
              </p>
              <p className="mt-1 inline-flex items-center rounded-(--radius-pill) bg-brand-lavender/30 px-2.5 py-0.5 text-xs font-bold text-brand-navy">
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
          className="pointer-events-none absolute top-6 bottom-6 left-[1.65rem] w-[3px] rounded-full bg-brand-navy/10"
          aria-hidden="true"
        >
          <div className="roadmap-progress-y h-full w-full origin-top rounded-full bg-gradient-to-b from-brand-purple via-brand-lavender to-brand-purple" />
        </div>

        {steps.map((step, index) => {
          const meta = PHASE_META[index] ?? PHASE_META[0];
          const label = locale === "fr" ? meta.labelFr : meta.labelEn;
          const Icon = meta.Icon;
          const phase = `Phase ${String(index + 1).padStart(2, "0")}`;

          return (
            <li key={step.title} className="relative flex gap-4 py-4 pl-1">
              <div
                className="roadmap-node relative z-10 flex h-14 w-14 shrink-0 items-center justify-center"
                style={{ animationDelay: `${80 + index * 90}ms` }}
              >
                <span
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${meta.accent} shadow-[0_10px_22px_-8px_rgb(168_0_230/0.5)]`}
                />
                <Icon className="relative h-6 w-6 text-white" />
              </div>
              <div className="min-w-0 pt-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-brand-purple uppercase">
                    {phase}
                  </p>
                  <span className="rounded-(--radius-pill) bg-brand-lavender/30 px-2 py-0.5 text-xs font-bold text-brand-navy">
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
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="2.2" />
      <path d="M19.5 19.5 26 26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M11 14h6M14 11v6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconDefine({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="16" cy="16" r="3.2" fill="currentColor" />
      <path
        d="M16 5v3.2M16 23.8V27M5 16h3.2M23.8 16H27"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconDeliver({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M7 20.5 16 6l9 14.5H7Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M16 13v11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M11.5 26h9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconOwn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M9 15.5V12a7 7 0 0 1 14 0v3.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect
        x="7"
        y="15.5"
        width="18"
        height="11"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <circle cx="16" cy="20.5" r="1.6" fill="currentColor" />
    </svg>
  );
}
