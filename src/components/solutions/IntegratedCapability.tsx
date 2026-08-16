import { Container, Heading, Section, Text } from "@/components/ui";

type IntegratedCapabilityProps = {
  heading: string;
  intro: string;
  example: {
    title: string;
    body: string;
    parts: ReadonlyArray<{ label: string; role: string }>;
  };
  closing: string;
};

export function IntegratedCapability({
  heading,
  intro,
  example,
  closing,
}: IntegratedCapabilityProps) {
  return (
    <Section
      tone="primary"
      spacious
      data-section="integrated-capability"
      aria-labelledby="integrated-capability-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Heading
              id="integrated-capability-heading"
              level={2}
              className="text-text-primary"
            >
              {heading}
            </Heading>
            <Text size="lead" muted className="mt-5">
              {intro}
            </Text>
            <Text muted className="mt-6">
              {closing}
            </Text>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[var(--radius-visual)] border border-border-soft bg-surface-muted p-6 md:p-8">
              <h3 className="text-xl font-medium text-text-primary md:text-2xl">
                {example.title}
              </h3>
              <Text muted className="mt-4">
                {example.body}
              </Text>
              <ol className="mt-8 space-y-5">
                {example.parts.map((part, index) => (
                  <li key={part.label} className="flex gap-4">
                    <span className="text-base font-semibold tracking-[0.1em] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-lg font-medium text-text-primary">
                        {part.label}
                      </p>
                      <p className="mt-1 text-[1.0625rem] text-text-secondary md:text-lg">
                        {part.role}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
