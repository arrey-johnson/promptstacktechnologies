import { Container, Heading, Section, Text } from "@/components/ui";

type MeasurementPointsProps = {
  heading: string;
  intro: string;
  points: ReadonlyArray<{ title: string; body: string }>;
};

export function MeasurementPoints({
  heading,
  intro,
  points,
}: MeasurementPointsProps) {
  return (
    <Section
      tone="primary"
      spacious
      data-section="measurement"
      aria-labelledby="measurement-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Heading
              id="measurement-heading"
              level={2}
              className="text-text-primary"
            >
              {heading}
            </Heading>
            <Text size="lead" muted className="mt-5">
              {intro}
            </Text>
          </div>
          <ul className="lg:col-span-7 divide-y divide-border-soft border-y border-border-soft">
            {points.map((point) => (
              <li key={point.title} className="py-6">
                <h3 className="text-xl font-medium text-text-primary md:text-2xl">
                  {point.title}
                </h3>
                <Text muted className="mt-3">
                  {point.body}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
