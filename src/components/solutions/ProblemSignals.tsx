import { Container, Heading, Section, Text } from "@/components/ui";
import type { ProblemSignal } from "@/content/solutions/types";

type ProblemSignalsProps = {
  heading: string;
  intro: string;
  items: readonly ProblemSignal[];
  sectionId?: string;
};

export function ProblemSignals({
  heading,
  intro,
  items,
  sectionId = "problem-signals",
}: ProblemSignalsProps) {
  return (
    <Section
      tone="primary"
      spacious
      data-section={sectionId}
      aria-labelledby={`${sectionId}-heading`}
    >
      <Container>
        <div className="max-w-3xl">
          <Heading
            id={`${sectionId}-heading`}
            level={2}
            className="text-text-primary"
          >
            {heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {intro}
          </Text>
        </div>

        <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="border-t border-border-soft pt-5"
            >
              <p className="text-base font-semibold tracking-[0.1em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2.5 text-xl font-medium text-text-primary md:text-2xl">
                {item.title}
              </h3>
              <Text muted className="mt-3">
                {item.body}
              </Text>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
