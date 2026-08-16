import { cn } from "@/lib/cn";

type AcademyVisualKind =
  | "hero"
  | "human"
  | "software"
  | "ai"
  | "cybersecurity"
  | "teach";

type AcademyVisualProps = {
  kind: AcademyVisualKind;
  className?: string;
  label?: string;
};

/**
 * Polished composition areas for future Academy photography.
 * TODO_ASSET: Replace with real Promptstack Academy imagery when available.
 */
export function AcademyVisual({
  kind,
  className,
  label,
}: AcademyVisualProps) {
  const captions: Record<AcademyVisualKind, string> = {
    hero: "Learners · projects · collaboration",
    human: "Classroom · devices · demonstrations",
    software: "Interfaces · systems · delivery",
    ai: "Workflow · evaluation · applied AI",
    cybersecurity: "Systems · defence · documentation",
    teach: "Instruction · practice · feedback",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-card)] border border-border-soft bg-surface-muted",
        className,
      )}
      data-placeholder="true"
      data-asset-kind={`academy-${kind}`}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0",
          kind === "hero" &&
            "bg-[radial-gradient(ellipse_at_20%_20%,rgba(203,174,211,0.55),transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(168,0,230,0.14),transparent_45%),linear-gradient(160deg,#f7f4f8,#ffffff_55%,#eef2f7)]",
          kind === "human" &&
            "bg-[radial-gradient(circle_at_30%_30%,rgba(203,174,211,0.45),transparent_48%),linear-gradient(180deg,#f8f6fa,#ffffff)]",
          kind === "software" &&
            "bg-[linear-gradient(135deg,#1b263b_0%,#243447_45%,#3a2a4d_100%)]",
          kind === "ai" &&
            "bg-[radial-gradient(ellipse_at_70%_20%,rgba(168,0,230,0.28),transparent_40%),linear-gradient(160deg,#f4eef8,#ffffff_50%,#ebe4f2)]",
          kind === "cybersecurity" &&
            "bg-[linear-gradient(160deg,#152033,#1b263b_50%,#243447)]",
          kind === "teach" &&
            "bg-[radial-gradient(ellipse_at_10%_80%,rgba(203,174,211,0.4),transparent_45%),linear-gradient(180deg,#ffffff,#f5f1f7)]",
        )}
      />
      {(kind === "software" || kind === "cybersecurity") && (
        <div
          aria-hidden="true"
          className="absolute inset-6 rounded-[calc(var(--radius-card)-0.35rem)] border border-white/10"
        />
      )}
      <div className="relative flex min-h-[16rem] flex-col justify-end p-6 md:min-h-[18rem] md:p-8">
        <p
          className={cn(
            "text-sm font-medium tracking-[0.08em] uppercase",
            kind === "software" || kind === "cybersecurity"
              ? "text-brand-lavender"
              : "text-accent",
          )}
        >
          {label ?? "Promptstack Academy"}
        </p>
        <p
          className={cn(
            "mt-2 max-w-sm text-lg font-medium md:text-xl",
            kind === "software" || kind === "cybersecurity"
              ? "text-white"
              : "text-text-primary",
          )}
        >
          {captions[kind]}
        </p>
      </div>
    </div>
  );
}
