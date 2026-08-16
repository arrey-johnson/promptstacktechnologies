import { Container, Heading, Section, Text } from "@/components/ui";
import type { UseCaseItem } from "@/content/solutions/types";

type UseCaseListProps = {
  heading: string;
  intro: string;
  note?: string;
  items: readonly UseCaseItem[];
};

export function UseCaseList({
  heading,
  intro,
  note,
  items,
}: UseCaseListProps) {
  return (
    <Section
      tone="primary"
      spacious
      data-section="use-cases"
      aria-labelledby="use-cases-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Heading
            id="use-cases-heading"
            level={2}
            className="text-text-primary"
          >
            {heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {intro}
          </Text>
          {note ? (
            <p className="mt-4 text-sm font-medium text-text-muted">{note}</p>
          ) : null}
        </div>

        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.title} className="border-t border-border-soft pt-5">
              <h3 className="text-lg font-medium text-text-primary md:text-xl">
                {item.title}
              </h3>
              <Text muted className="mt-3">
                {item.body}
              </Text>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
