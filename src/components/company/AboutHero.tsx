import { Button, Container, Eyebrow, Heading, Section, Text } from "@/components/ui";
import { aboutPageCopy } from "@/content/company";

export function AboutHero() {
  const { eyebrow, heading, supporting, primaryCta, secondaryCta } =
    aboutPageCopy;

  return (
    <Section
      tone="primary"
      className="pt-10 md:pt-14 lg:pt-16"
      data-section="about-hero"
      aria-labelledby="about-hero-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading
            id="about-hero-heading"
            level={1}
            className="mt-5 text-text-primary"
          >
            {heading}
          </Heading>
          <Text size="lead" muted className="mt-5 max-w-2xl">
            {supporting}
          </Text>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={primaryCta.href}
              size="lg"
              data-analytics="cta_about_hero_solutions"
            >
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              variant="secondary"
              size="lg"
              data-analytics="cta_about_hero_how_we_work"
            >
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
