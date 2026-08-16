import { Container, Heading, Section, Text } from "@/components/ui";

type TopicPoint = {
  title: string;
  body: string;
};

type TopicPointsSectionProps = {
  heading: string;
  intro: string;
  points: readonly TopicPoint[];
  tone?: "primary" | "muted" | "soft";
  sectionId: string;
  note?: string;
};

export function TopicPointsSection({
  heading,
  intro,
  points,
  tone = "muted",
  sectionId,
  note,
}: TopicPointsSectionProps) {
  return (
    <Section
      tone={tone}
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
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {points.map((point) => (
            <li key={point.title} className="border-t border-border-soft pt-5">
              <h3 className="text-xl font-medium text-text-primary">
                {point.title}
              </h3>
              <Text muted className="mt-3">
                {point.body}
              </Text>
            </li>
          ))}
        </ul>
        {note ? (
          <Text muted className="mt-10 max-w-3xl text-sm">
            {note}
          </Text>
        ) : null}
      </Container>
    </Section>
  );
}
