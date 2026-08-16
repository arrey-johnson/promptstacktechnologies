import { Button, Container, Heading, Section, Text } from "@/components/ui";
import { homepageProcess } from "@/content/homepage";

export function ProcessSection() {
  const { heading, cta, stages } = homepageProcess;

  return (
    <Section
      tone="muted"
      spacious
      data-section="how-we-work"
      aria-labelledby="homepage-process-heading"
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Heading
            id="homepage-process-heading"
            level={2}
            className="max-w-2xl text-text-primary"
          >
            {heading}
          </Heading>
          <Button
            href={cta.href}
            variant="secondary"
            data-analytics="cta_how_we_work"
          >
            {cta.label}
          </Button>
        </div>

        {/* Mobile: clear vertical sequence */}
        <ol className="mt-10 space-y-0 border-l border-border-soft pl-6 md:hidden">
          {stages.map((stage) => (
            <li key={stage.number} className="relative pb-9 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-surface-muted"
              />
              <p className="text-base font-semibold tracking-[0.1em] text-accent">
                {stage.number}
              </p>
              <h3 className="mt-2 text-xl font-medium text-text-primary">
                {stage.title}
              </h3>
              <Text muted className="mt-2">
                {stage.body}
              </Text>
            </li>
          ))}
        </ol>

        {/*
          Desktop: readable 3 × 2 editorial grid.
          Avoid cramped six-across columns that shrink body copy.
        */}
        <ol className="mt-12 hidden gap-x-10 gap-y-10 md:grid md:grid-cols-3">
          {stages.map((stage) => (
            <li
              key={stage.number}
              className="border-t border-border-soft pt-6"
            >
              <p className="text-base font-semibold tracking-[0.1em] text-accent">
                {stage.number}
              </p>
              <h3 className="mt-3 text-xl font-medium text-text-primary lg:text-2xl">
                {stage.title}
              </h3>
              <Text muted className="mt-3">
                {stage.body}
              </Text>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}