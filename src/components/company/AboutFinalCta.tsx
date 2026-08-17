import { Button, Container, Heading, Section, Text } from "@/components/ui";
import { aboutFinalCta } from "@/content/company";

export function AboutFinalCta() {
  const { heading, body, primaryCta, secondaryCta } = aboutFinalCta;

  return (
    <Section
      tone="dark"
      spacious
      data-section="about-final-cta"
      aria-labelledby="about-final-cta-heading"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(168,0,230,0.22),transparent_42%),radial-gradient(ellipse_at_90%_100%,rgba(203,174,211,0.14),transparent_48%)]"
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Heading
            id="about-final-cta-heading"
            level={2}
            className="text-white"
          >
            {heading}
          </Heading>
          <Text className="mx-auto mt-5 max-w-2xl text-white/85">{body}</Text>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              href={primaryCta.href}
              size="lg"
              data-analytics="cta_about_final_start_project"
            >
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              variant="secondary"
              tone="inverse"
              size="lg"
              data-analytics="cta_about_final_solutions"
            >
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
