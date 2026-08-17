import { Button, Container, Heading, Text } from "@/components/ui";
import { insightsEmptyState } from "@/content/insights";

export function InsightsEmptyState() {
  const { heading, body, primaryCta, secondaryCta, tertiaryCta } =
    insightsEmptyState;

  return (
    <section
      data-section="insights-empty"
      aria-labelledby="insights-empty-heading"
      className="bg-surface-muted"
    >
      <Container className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Heading
            id="insights-empty-heading"
            level={2}
            className="text-text-primary"
          >
            {heading}
          </Heading>
          <Text size="lead" muted className="mx-auto mt-5">
            {body}
          </Text>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              href={primaryCta.href}
              size="lg"
              data-analytics="cta_insights_empty_solutions"
            >
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              variant="secondary"
              size="lg"
              data-analytics="cta_insights_empty_how_we_work"
            >
              {secondaryCta.label}
            </Button>
            <Button
              href={tertiaryCta.href}
              variant="secondary"
              size="lg"
              data-analytics="cta_insights_empty_start_project"
            >
              {tertiaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
