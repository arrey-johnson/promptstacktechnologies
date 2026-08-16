import { cn } from "@/lib/cn";

export type SolutionVisualKind =
  | "overview"
  | "software"
  | "automation"
  | "marketing";

type SolutionVisualProps = {
  kind: SolutionVisualKind;
  className?: string;
};

/**
 * Division-specific CSS compositions for commercial heroes.
 * TODO_ASSET: Replace with real product/photography assets when available.
 */
export function SolutionVisual({ kind, className }: SolutionVisualProps) {
  return (
    <div
      aria-hidden="true"
      data-todo-asset={`solution-${kind}`}
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-visual)] border border-border-soft",
        className,
      )}
    >
      {kind === "overview" ? <OverviewVisual /> : null}
      {kind === "software" ? <SoftwareVisual /> : null}
      {kind === "automation" ? <AutomationVisual /> : null}
      {kind === "marketing" ? <MarketingVisual /> : null}
    </div>
  );
}

function OverviewVisual() {
  return (
    <div className="relative aspect-[4/5] w-full bg-surface-muted sm:aspect-[5/6] lg:aspect-auto lg:min-h-[26rem] lg:h-full">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_15%,rgba(203,174,211,0.35),transparent_50%),linear-gradient(160deg,#ffffff,#f3eef6_45%,#eef1f5)]" />
      <div className="absolute inset-6 grid grid-rows-3 gap-3 sm:inset-8">
        {["Software", "AI & Automation", "Digital Marketing"].map(
          (label, index) => (
            <div
              key={label}
              className={cn(
                "rounded-[var(--radius-card)] border border-border-soft p-4",
                index === 1 ? "bg-brand-navy text-text-inverse" : "bg-white/90",
              )}
            >
              <div
                className={cn(
                  "mb-3 h-2 w-16 rounded-full",
                  index === 1 ? "bg-brand-lavender" : "bg-accent/60",
                )}
              />
              <div
                className={cn(
                  "h-2.5 w-2/3 rounded-full",
                  index === 1 ? "bg-white/30" : "bg-brand-navy/15",
                )}
              />
              <p
                className={cn(
                  "mt-4 text-sm font-medium",
                  index === 1 ? "text-white" : "text-text-primary",
                )}
              >
                {label}
              </p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function SoftwareVisual() {
  return (
    <div className="relative aspect-[4/5] w-full bg-surface-muted sm:aspect-[5/6] lg:aspect-auto lg:min-h-[26rem] lg:h-full">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#ffffff_0%,#eef1f5_50%,#f3eef6_100%)]" />
      <div className="absolute inset-6 grid grid-cols-4 gap-2 sm:inset-8">
        <div className="col-span-1 space-y-2 rounded-[var(--radius-card)] border border-border-soft bg-brand-navy p-3">
          <div className="h-2 w-10 rounded-full bg-white/30" />
          <div className="h-2 w-8 rounded-full bg-white/15" />
          <div className="h-2 w-12 rounded-full bg-white/15" />
          <div className="mt-4 h-8 rounded bg-accent/80" />
        </div>
        <div className="col-span-3 space-y-2">
          <div className="rounded-[var(--radius-card)] border border-border-soft bg-white p-4">
            <div className="mb-3 flex gap-2">
              <div className="h-2 w-16 rounded-full bg-accent/50" />
              <div className="h-2 w-10 rounded-full bg-brand-navy/10" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-16 rounded bg-surface-soft" />
              <div className="h-16 rounded bg-surface-muted" />
              <div className="h-16 rounded bg-brand-lavender/40" />
            </div>
          </div>
          <div className="rounded-[var(--radius-card)] border border-dashed border-border-strong/40 bg-white/70 p-4">
            <div className="flex items-end gap-2">
              <div className="h-8 w-1/4 rounded-t bg-brand-navy/20" />
              <div className="h-14 w-1/4 rounded-t bg-accent/40" />
              <div className="h-10 w-1/4 rounded-t bg-brand-lavender/70" />
              <div className="h-16 w-1/4 rounded-t bg-brand-navy/35" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AutomationVisual() {
  return (
    <div className="relative aspect-[4/5] w-full bg-brand-navy sm:aspect-[5/6] lg:aspect-auto lg:min-h-[26rem] lg:h-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(203,174,211,0.28),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(168,0,230,0.22),transparent_40%)]" />
      <div className="absolute inset-8 flex flex-col justify-center gap-4">
        {["Input", "Decision", "Action", "Review"].map((step, index) => (
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

function MarketingVisual() {
  return (
    <div className="relative aspect-[4/5] w-full bg-surface-soft sm:aspect-[5/6] lg:aspect-auto lg:min-h-[26rem] lg:h-full">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.75),transparent)]" />
      <div className="absolute inset-6 rounded-[var(--radius-card)] border border-border-soft bg-white/90 p-5 shadow-[0_16px_40px_rgba(27,38,59,0.06)] sm:inset-8">
        <div className="mb-5 flex items-center justify-between">
          <div className="h-2.5 w-28 rounded-full bg-brand-navy/20" />
          <div className="h-8 w-20 rounded-[var(--radius-button)] bg-accent/15" />
        </div>
        <div className="space-y-3">
          {["Reach", "Capture", "Follow-up", "Convert"].map((label, index) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="h-9 flex-1 rounded-[var(--radius-button)]"
                style={{
                  background:
                    index === 0
                      ? "rgba(203,174,211,0.55)"
                      : index === 1
                        ? "rgba(168,0,230,0.18)"
                        : index === 2
                          ? "rgba(27,38,59,0.12)"
                          : "rgba(27,38,59,0.22)",
                }}
              />
              <span className="w-20 text-sm font-medium text-text-primary">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
