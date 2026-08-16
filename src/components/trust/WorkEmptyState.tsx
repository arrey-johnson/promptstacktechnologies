import { Button, Container, Heading, Text } from "@/components/ui";
import { workEmptyState } from "@/content/work";

export function WorkEmptyState() {
  const { heading, body, primaryCta, secondaryCta } = workEmptyState;

  return (
    <section
      data-section="work-empty"
      aria-labelledby="work-empty-heading"
      className="bg-surface-muted"
    >
      <Container className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Heading
            id="work-empty-heading"
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
              data-analytics="cta_work_empty_primary"
            >
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              variant="secondary"
              size="lg"
              data-analytics="cta_work_empty_secondary"
            >
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
