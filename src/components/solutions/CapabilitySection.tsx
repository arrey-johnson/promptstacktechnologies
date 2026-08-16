import { Container, Heading, Section, Text } from "@/components/ui";
import type { CapabilityItem } from "@/content/solutions/types";

type CapabilitySectionProps = {
  heading: string;
  intro: string;
  items: readonly CapabilityItem[];
  note?: { heading: string; body: string };
  tone?: "primary" | "muted" | "soft";
};

export function CapabilitySection({
  heading,
  intro,
  items,
  note,
  tone = "muted",
}: CapabilitySectionProps) {
  return (
    <Section
      tone={tone}
      spacious
      data-section="capabilities"
      aria-labelledby="capabilities-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Heading
            id="capabilities-heading"
            level={2}
            className="text-text-primary"
          >
            {heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {intro}
          </Text>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-12 lg:gap-8">
          {items.map((item) => (
            <li
              key={item.title}
              className="border-t border-border-soft pt-5"
            >
              <h3 className="text-xl font-medium text-text-primary md:text-2xl">
                {item.title}
              </h3>
              <Text muted className="mt-3">
                {item.body}
              </Text>
            </li>
          ))}
        </ul>

        {note ? (
          <div className="mt-12 max-w-3xl border-l-2 border-accent pl-5 md:mt-14">
            <h3 className="text-lg font-medium text-text-primary md:text-xl">
              {note.heading}
            </h3>
            <Text muted className="mt-3">
              {note.body}
            </Text>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
