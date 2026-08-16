import { Container, Heading, Section, Text } from "@/components/ui";

type TrustTopicSectionProps = {
  id: string;
  heading: string;
  intro: string;
  items: ReadonlyArray<{ title: string; body: string }>;
  tone?: "primary" | "muted" | "soft";
};

export function TrustTopicSection({
  id,
  heading,
  intro,
  items,
  tone = "primary",
}: TrustTopicSectionProps) {
  return (
    <Section
      tone={tone}
      spacious
      data-section={id}
      aria-labelledby={`${id}-heading`}
    >
      <Container>
        <div className="max-w-3xl">
          <Heading
            id={`${id}-heading`}
            level={2}
            className="text-text-primary"
          >
            {heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {intro}
          </Text>
        </div>

        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-12">
          {items.map((item) => (
            <li key={item.title} className="border-t border-border-soft pt-5">
              <h3 className="text-xl font-medium text-text-primary md:text-2xl">
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
