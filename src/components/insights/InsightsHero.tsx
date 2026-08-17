import { Container, Eyebrow, Heading, Section, Text } from "@/components/ui";
import { insightsIndexCopy } from "@/content/insights";

export function InsightsHero() {
  const { eyebrow, heading, supporting } = insightsIndexCopy;

  return (
    <Section
      tone="primary"
      className="pt-10 md:pt-14 lg:pt-16"
      data-section="insights-hero"
      aria-labelledby="insights-hero-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading
            id="insights-hero-heading"
            level={1}
            className="mt-5 text-text-primary"
          >
            {heading}
          </Heading>
          <Text size="lead" muted className="mt-5 max-w-2xl">
            {supporting}
          </Text>
        </div>
      </Container>
    </Section>
  );
}
