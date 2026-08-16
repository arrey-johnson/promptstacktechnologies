import { Button, Container, Eyebrow, Heading, Text } from "@/components/ui";
import type { AcademyCta } from "@/content/academy/types";
import { AcademyVisual } from "./AcademyVisual";

type AcademyPageHeroProps = {
  eyebrow: string;
  heading: string;
  supporting: string;
  emphasis?: string;
  primaryCta: AcademyCta;
  secondaryCta?: AcademyCta;
  visual?: "hero" | "teach" | "software" | "ai" | "cybersecurity";
  analyticsPrefix: string;
};

export function AcademyPageHero({
  eyebrow,
  heading,
  supporting,
  emphasis,
  primaryCta,
  secondaryCta,
  visual = "hero",
  analyticsPrefix,
}: AcademyPageHeroProps) {
  return (
    <section
      aria-labelledby={`${analyticsPrefix}-hero-heading`}
      className="relative overflow-hidden bg-surface-primary"
      data-section="academy-hero"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(203,174,211,0.28),transparent_46%),radial-gradient(ellipse_at_100%_10%,rgba(168,0,230,0.07),transparent_40%)]"
      />
      <Container className="relative py-14 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
            <Heading
              id={`${analyticsPrefix}-hero-heading`}
              level={1}
              as="h1"
              className="max-w-[18ch] text-[2rem] leading-[1.1] text-text-primary sm:max-w-none sm:text-4xl md:text-[2.85rem] lg:text-[3.25rem]"
            >
              {heading}
            </Heading>
            <Text size="lead" muted className="mt-6 max-w-xl">
              {supporting}
            </Text>
            {emphasis ? (
              <Text muted className="mt-4 max-w-xl font-medium text-text-primary">
                {emphasis}
              </Text>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                href={primaryCta.href}
                size="lg"
                data-analytics={`${analyticsPrefix}_hero_primary`}
              >
                {primaryCta.label}
              </Button>
              {secondaryCta ? (
                <Button
                  href={secondaryCta.href}
                  variant="secondary"
                  size="lg"
                  data-analytics={`${analyticsPrefix}_hero_secondary`}
                >
                  {secondaryCta.label}
                </Button>
              ) : null}
            </div>
          </div>
          <div className="lg:col-span-5">
            <AcademyVisual
              kind={visual}
              className="shadow-[0_24px_60px_rgba(27,38,59,0.08)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
