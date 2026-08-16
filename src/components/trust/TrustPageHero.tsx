import { Button, Container, Eyebrow, Heading, Text } from "@/components/ui";
import { cn } from "@/lib/cn";

type TrustPageHeroProps = {
  eyebrow: string;
  heading: string;
  supporting: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  analyticsPrefix: string;
  /** Optional right-side composition for How We Work journey feel. */
  visual?: "process" | "work";
};

export function TrustPageHero({
  eyebrow,
  heading,
  supporting,
  primaryCta,
  secondaryCta,
  analyticsPrefix,
  visual,
}: TrustPageHeroProps) {
  return (
    <section
      aria-labelledby="trust-hero-heading"
      className="relative overflow-hidden bg-surface-primary"
      data-section="trust-hero"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(203,174,211,0.16),transparent_45%),radial-gradient(ellipse_at_100%_20%,rgba(168,0,230,0.05),transparent_40%)]"
      />
      <Container className="relative py-14 md:py-16 lg:py-20">
        <div
          className={cn(
            "grid items-center gap-10",
            visual && "lg:grid-cols-12 lg:gap-12 xl:gap-16",
          )}
        >
          <div className={visual ? "lg:col-span-7" : "max-w-3xl"}>
            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
            <Heading
              id="trust-hero-heading"
              level={1}
              as="h1"
              className="text-[1.9rem] leading-[1.12] text-text-primary sm:text-4xl md:text-[2.75rem] lg:text-[3.1rem]"
            >
              {heading}
            </Heading>
            <Text size="lead" muted className="mt-6 max-w-xl">
              {supporting}
            </Text>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                href={primaryCta.href}
                size="lg"
                data-analytics={`${analyticsPrefix}_hero_primary`}
              >
                {primaryCta.label}
              </Button>
              <Button
                href={secondaryCta.href}
                variant="secondary"
                size="lg"
                data-analytics={`${analyticsPrefix}_hero_secondary`}
              >
                {secondaryCta.label}
              </Button>
            </div>
          </div>

          {visual ? (
            <div className="lg:col-span-5" aria-hidden="true">
              {visual === "process" ? <ProcessHeroVisual /> : <WorkHeroVisual />}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

function ProcessHeroVisual() {
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-visual)] border border-border-soft bg-surface-muted shadow-[0_24px_60px_rgba(27,38,59,0.08)]">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#ffffff,#f3eef6_50%,#eef1f5)]" />
      <ol className="relative space-y-3 p-6 sm:p-8">
        {["Discover", "Define", "Design", "Build", "Launch", "Improve"].map(
          (step, index) => (
            <li key={step} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-white text-xs font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              {index < 5 ? (
                <span className="h-px flex-1 bg-border-soft" />
              ) : (
                <span className="flex-1" />
              )}
              <span className="w-20 text-sm font-medium text-text-primary">
                {step}
              </span>
            </li>
          ),
        )}
      </ol>
    </div>
  );
}

function WorkHeroVisual() {
  return (
    <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-visual)] border border-border-soft bg-surface-muted shadow-[0_24px_60px_rgba(27,38,59,0.08)] lg:aspect-auto lg:min-h-[22rem]">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#ffffff_0%,#eef1f5_45%,#f3eef6_100%)]" />
      <div className="absolute inset-6 rounded-[var(--radius-card)] border border-border-soft bg-white/90 p-5">
        <div className="mb-4 h-2 w-24 rounded-full bg-accent/50" />
        <div className="space-y-2">
          <div className="h-2.5 w-4/5 rounded-full bg-brand-navy/15" />
          <div className="h-2.5 w-3/5 rounded-full bg-brand-navy/10" />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="h-20 rounded-[var(--radius-button)] bg-surface-soft" />
          <div className="h-20 rounded-[var(--radius-button)] bg-surface-muted" />
          <div className="h-20 rounded-[var(--radius-button)] bg-brand-lavender/40" />
        </div>
        <div className="mt-4 h-2 w-1/2 rounded-full bg-brand-navy/10" />
      </div>
    </div>
  );
}
