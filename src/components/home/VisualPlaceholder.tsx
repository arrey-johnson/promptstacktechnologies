import { cn } from "@/lib/cn";

export type VisualKind =
  | "hero"
  | "systems"
  | "automation"
  | "growth"
  | "work"
  | "academy"
  | "insight";

type VisualPlaceholderProps = {
  kind: VisualKind;
  className?: string;
  /** Decorative composition — not a real photo/product shot. */
  label?: string;
};

/**
 * Premium CSS composition for missing production imagery.
 * TODO_ASSET: Replace with real Promptstack photography / product UI when available.
 * Do not invent fake client screenshots.
 */
export function VisualPlaceholder({
  kind,
  className,
  label,
}: VisualPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      data-todo-asset={kind}
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-visual)]",
        className,
      )}
    >
      {kind === "hero" ? <HeroComposition /> : null}
      {kind === "systems" ? <SystemsComposition /> : null}
      {kind === "automation" ? <AutomationComposition /> : null}
      {kind === "growth" ? <GrowthComposition /> : null}
      {kind === "work" ? <WorkComposition /> : null}
      {kind === "academy" ? <AcademyComposition /> : null}
      {kind === "insight" ? <InsightComposition /> : null}
      {label ? (
        <span className="sr-only">
          Visual placeholder for {label}. Production imagery pending.
        </span>
      ) : null}
    </div>
  );
}

function HeroComposition() {
  return (
    <div className="relative aspect-[4/5] w-full bg-surface-muted sm:aspect-[5/6] lg:aspect-auto lg:min-h-[28rem] lg:h-full">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(203,174,211,0.35),transparent_55%),radial-gradient(ellipse_at_80%_70%,rgba(168,0,230,0.08),transparent_50%),linear-gradient(160deg,#f7f5f8_0%,#ffffff_45%,#eef1f5_100%)]" />
      <div className="absolute -right-8 top-10 h-40 w-40 rounded-full border border-brand-lavender/50" />
      <div className="absolute bottom-16 left-6 h-24 w-24 rounded-[var(--radius-visual)] border border-border-soft bg-white/70" />
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 space-y-3 sm:inset-x-8">
        <div className="rounded-[var(--radius-card)] border border-border-soft bg-white/90 p-4 shadow-[0_18px_50px_rgba(27,38,59,0.08)]">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="h-2 w-16 rounded-full bg-brand-navy/15" />
          </div>
          <div className="space-y-2">
            <div className="h-2.5 w-3/4 rounded-full bg-brand-navy/20" />
            <div className="h-2.5 w-1/2 rounded-full bg-brand-navy/12" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="h-14 rounded-[var(--radius-button)] bg-surface-soft" />
              <div className="h-14 rounded-[var(--radius-button)] bg-surface-muted" />
              <div className="h-14 rounded-[var(--radius-button)] bg-brand-lavender/40" />
            </div>
          </div>
        </div>
        <div className="ml-auto w-[85%] rounded-[var(--radius-card)] border border-border-soft bg-brand-navy p-4 text-text-inverse shadow-[0_18px_40px_rgba(27,38,59,0.18)]">
          <div className="mb-3 h-2 w-20 rounded-full bg-white/35" />
          <div className="space-y-2">
            <div className="h-2 w-full rounded-full bg-white/20" />
            <div className="h-2 w-2/3 rounded-full bg-white/15" />
          </div>
          <div className="mt-4 flex gap-2">
            <div className="h-8 flex-1 rounded-[var(--radius-button)] bg-accent/90" />
            <div className="h-8 w-8 rounded-[var(--radius-button)] bg-white/15" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemsComposition() {
  return (
    <div className="relative aspect-[4/3] w-full bg-surface-muted lg:aspect-[5/4]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff_0%,#f3eef6_50%,#e8edf3_100%)]" />
      <div className="absolute inset-6 grid grid-cols-2 gap-3 sm:inset-8">
        <div className="rounded-[var(--radius-card)] border border-border-soft bg-white p-4 shadow-sm">
          <div className="mb-4 h-2 w-16 rounded-full bg-accent/70" />
          <div className="space-y-2">
            <div className="h-2 w-full rounded-full bg-brand-navy/15" />
            <div className="h-2 w-4/5 rounded-full bg-brand-navy/10" />
            <div className="h-2 w-3/5 rounded-full bg-brand-navy/10" />
          </div>
        </div>
        <div className="rounded-[var(--radius-card)] border border-border-soft bg-brand-navy p-4">
          <div className="mb-4 h-2 w-12 rounded-full bg-brand-lavender" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-10 rounded bg-white/10" />
            <div className="h-10 rounded bg-white/10" />
            <div className="col-span-2 h-16 rounded bg-white/8" />
          </div>
        </div>
        <div className="col-span-2 rounded-[var(--radius-card)] border border-dashed border-border-strong/40 bg-white/60 p-4">
          <div className="flex items-end gap-2">
            <div className="h-8 w-1/4 rounded-t bg-brand-lavender/70" />
            <div className="h-14 w-1/4 rounded-t bg-accent/50" />
            <div className="h-10 w-1/4 rounded-t bg-brand-navy/25" />
            <div className="h-16 w-1/4 rounded-t bg-brand-navy/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AutomationComposition() {
  return (
    <div className="relative aspect-[4/3] w-full bg-brand-navy lg:aspect-[5/4]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(203,174,211,0.25),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(168,0,230,0.2),transparent_40%)]" />
      <div className="absolute inset-8 flex flex-col justify-center gap-4">
        {["Intake", "Route", "Act", "Review"].map((step, index) => (
          <div key={step} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-xs font-medium text-text-inverse">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="h-px flex-1 bg-white/20" />
            <div className="rounded-[var(--radius-button)] border border-white/20 bg-white/10 px-3 py-2 text-sm text-text-inverse">
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GrowthComposition() {
  return (
    <div className="relative aspect-[4/3] w-full bg-surface-soft lg:aspect-[5/4]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),transparent)]" />
      <div className="absolute inset-6 rounded-[var(--radius-card)] border border-border-soft bg-white/85 p-5 shadow-[0_16px_40px_rgba(27,38,59,0.06)] sm:inset-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-2.5 w-28 rounded-full bg-brand-navy/20" />
          <div className="h-8 w-20 rounded-[var(--radius-button)] bg-accent/15" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-3">
            <div className="h-24 rounded-[var(--radius-button)] bg-[linear-gradient(135deg,rgba(168,0,230,0.12),rgba(203,174,211,0.35))]" />
            <div className="h-2 w-4/5 rounded-full bg-brand-navy/12" />
            <div className="h-2 w-3/5 rounded-full bg-brand-navy/10" />
          </div>
          <div className="space-y-3">
            <div className="h-10 rounded-[var(--radius-button)] bg-surface-muted" />
            <div className="h-10 rounded-[var(--radius-button)] bg-surface-muted" />
            <div className="h-10 rounded-[var(--radius-button)] bg-brand-lavender/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkComposition() {
  return (
    <div className="relative aspect-[16/10] w-full bg-surface-muted">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#eef1f5_0%,#ffffff_40%,#f3eef6_100%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[78%] rounded-[var(--radius-card)] border border-border-soft bg-white/90 p-5 shadow-[0_20px_50px_rgba(27,38,59,0.08)]">
          <div className="mb-4 flex gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-navy/30" />
            <span className="h-2 w-2 rounded-full bg-brand-navy/20" />
            <span className="h-2 w-2 rounded-full bg-accent/60" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-1 space-y-2">
              <div className="h-2 rounded-full bg-brand-navy/15" />
              <div className="h-2 rounded-full bg-brand-navy/10" />
              <div className="h-2 rounded-full bg-brand-navy/10" />
            </div>
            <div className="col-span-3 h-28 rounded-[var(--radius-button)] bg-surface-soft" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AcademyComposition() {
  return (
    <div className="relative aspect-[4/5] w-full bg-brand-lavender/35 sm:aspect-[5/4] lg:aspect-auto lg:min-h-[22rem] lg:h-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.65),transparent_40%),linear-gradient(160deg,rgba(203,174,211,0.55),rgba(255,255,255,0.4)_55%,rgba(27,38,59,0.08))]" />
      <div className="absolute inset-6 space-y-3 sm:inset-8">
        <div className="rounded-[var(--radius-card)] border border-white/70 bg-white/80 p-4 shadow-sm">
          <div className="mb-3 h-2 w-24 rounded-full bg-accent/50" />
          <div className="space-y-2">
            <div className="h-2.5 w-full rounded-full bg-brand-navy/15" />
            <div className="h-2.5 w-4/5 rounded-full bg-brand-navy/10" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="aspect-square rounded-[var(--radius-card)] border border-white/60 bg-brand-navy/90" />
          <div className="flex flex-col justify-between rounded-[var(--radius-card)] border border-white/70 bg-white/75 p-4">
            <div className="h-2 w-16 rounded-full bg-brand-lavender" />
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-brand-navy/12" />
              <div className="h-2 w-3/4 rounded-full bg-brand-navy/10" />
            </div>
          </div>
        </div>
        <div className="rounded-[var(--radius-card)] border border-white/70 bg-white/70 px-4 py-3 text-sm font-medium text-text-primary">
          Learn · Build · Ship.
        </div>
      </div>
    </div>
  );
}

function InsightComposition() {
  return (
    <div className="relative aspect-[16/10] w-full bg-surface-muted">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#f7f5f8,#eef1f5_50%,#f3eef6)]" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-navy/10 to-transparent" />
      <div className="absolute left-5 top-5 h-10 w-10 rounded-full border border-border-soft bg-white/80" />
      <div className="absolute bottom-5 left-5 right-5 space-y-2">
        <div className="h-2 w-20 rounded-full bg-accent/40" />
        <div className="h-3 w-3/4 rounded-full bg-brand-navy/20" />
        <div className="h-2 w-1/2 rounded-full bg-brand-navy/12" />
      </div>
    </div>
  );
}
