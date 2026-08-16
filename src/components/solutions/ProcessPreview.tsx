import { Button, Container, Heading, Section, Text } from "@/components/ui";

type ProcessStage = {
  number: string;
  title: string;
  body: string;
};

type ProcessPreviewProps = {
  heading: string;
  intro: string;
  stages: readonly ProcessStage[];
  cta: { label: string; href: string };
  analyticsId?: string;
};

export function ProcessPreview({
  heading,
  intro,
  stages,
  cta,
  analyticsId = "cta_process_preview",
}: ProcessPreviewProps) {
  return (
    <Section
      tone="muted"
      spacious
      data-section="process-preview"
      aria-labelledby="process-preview-heading"
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Heading
              id="process-preview-heading"
              level={2}
              className="text-text-primary"
            >
              {heading}
            </Heading>
            <Text size="lead" muted className="mt-4">
              {intro}
            </Text>
          </div>
          <Button
            href={cta.href}
            variant="secondary"
            data-analytics={analyticsId}
          >
            {cta.label}
          </Button>
        </div>

        <ol className="mt-10 space-y-0 border-l border-border-soft pl-6 md:hidden">
          {stages.map((stage) => (
            <li key={stage.number} className="relative pb-8 last:pb-0">
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
