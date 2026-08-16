import { Container, Heading, Section, Text } from "@/components/ui";
import { AcademyVisual } from "./AcademyVisual";

type HumanChapterSectionProps = {
  heading: string;
  intro: string;
  note: string;
};

export function HumanChapterSection({
  heading,
  intro,
  note,
}: HumanChapterSectionProps) {
  return (
    <Section
      tone="soft"
      spacious
      data-section="human-chapter"
      aria-labelledby="human-chapter-heading"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Heading
              id="human-chapter-heading"
              level={2}
              className="text-text-primary"
            >
              {heading}
            </Heading>
            <Text size="lead" muted className="mt-5">
              {intro}
            </Text>
            <Text muted className="mt-5 text-sm">
              {note}
            </Text>
          </div>
          <div className="lg:col-span-7">
            <AcademyVisual kind="human" className="min-h-[18rem] md:min-h-[22rem]" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
