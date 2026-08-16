import { Button, Container, Eyebrow, Heading, Text } from "@/components/ui";
import { homepageHero } from "@/content/homepage";
import { VisualPlaceholder } from "./VisualPlaceholder";

export function Hero() {
  const { eyebrow, h1, supporting, primaryCta, secondaryCta } = homepageHero;

  return (
    <section
      aria-labelledby="homepage-hero-heading"
      className="relative overflow-hidden bg-surface-primary"
      data-section="hero"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(203,174,211,0.18),transparent_45%),radial-gradient(ellipse_at_100%_20%,rgba(168,0,230,0.05),transparent_40%)]"
      />
      <Container className="relative py-14 md:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
            <Heading
              id="homepage-hero-heading"
              level={1}
              as="h1"
              className="max-w-[18ch] text-[2rem] leading-[1.12] text-text-primary sm:max-w-none sm:text-4xl md:text-5xl lg:text-[3.25rem]"
            >
              {h1.before}
              <span className="text-accent">{h1.accent}</span>
              {h1.after}
            </Heading>
            <Text size="lead" muted className="mt-6 max-w-xl">
              {supporting}
            </Text>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                href={primaryCta.href}
                size="lg"
                data-analytics="cta_hero_start_project"
              >
                {primaryCta.label}
              </Button>
              <Button
                href={secondaryCta.href}
                variant="secondary"
                size="lg"
                data-analytics="cta_hero_explore_solutions"
              >
                {secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <VisualPlaceholder
              kind="hero"
              className="border border-border-soft shadow-[0_24px_60px_rgba(27,38,59,0.08)]"
              label="hero product composition"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
