import { Button, Container, Eyebrow, Heading, Text } from "@/components/ui";
import type { SolutionHeroContent } from "@/content/solutions/types";
import { SolutionVisual } from "./SolutionVisual";

type SolutionPageHeroProps = {
  content: SolutionHeroContent;
  analyticsPrefix: string;
};

export function SolutionPageHero({
  content,
  analyticsPrefix,
}: SolutionPageHeroProps) {
  const { eyebrow, heading, supporting, primaryCta, secondaryCta, visual } =
    content;

  return (
    <section
      aria-labelledby="solution-hero-heading"
      className="relative overflow-hidden bg-surface-primary"
      data-section="solution-hero"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(203,174,211,0.16),transparent_45%),radial-gradient(ellipse_at_100%_20%,rgba(168,0,230,0.05),transparent_40%)]"
      />
      <Container className="relative py-14 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
            <Heading
              id="solution-hero-heading"
              level={1}
              as="h1"
              className="max-w-[20ch] text-[1.9rem] leading-[1.12] text-text-primary sm:max-w-none sm:text-4xl md:text-[2.75rem] lg:text-[3.1rem]"
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
          <div className="lg:col-span-5">
            <SolutionVisual
              kind={visual}
              className="shadow-[0_24px_60px_rgba(27,38,59,0.08)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
