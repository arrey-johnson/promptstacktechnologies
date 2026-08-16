import { Container, Heading, Section, Text } from "@/components/ui";

type EditorialListSectionProps = {
  heading: string;
  intro: string;
  items: readonly string[];
  tone?: "primary" | "muted" | "soft";
  sectionId: string;
  columns?: 1 | 2;
};

export function EditorialListSection({
  heading,
  intro,
  items,
  tone = "primary",
  sectionId,
  columns = 2,
}: EditorialListSectionProps) {
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
        <ul
          className={
            columns === 2
              ? "mt-10 grid gap-4 sm:grid-cols-2"
              : "mt-10 space-y-3"
          }
        >
          {items.map((item) => (
            <li
              key={item}
              className="border-t border-border-soft pt-4 text-[1.0625rem] text-text-secondary md:text-lg"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
