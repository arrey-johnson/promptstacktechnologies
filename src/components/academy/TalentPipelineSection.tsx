import { Container, Heading, Section, Text } from "@/components/ui";

type TalentPipelineSectionProps = {
  heading: string;
  intro: string;
  emphasis: string;
};

export function TalentPipelineSection({
  heading,
  intro,
  emphasis,
}: TalentPipelineSectionProps) {
  return (
    <Section
      tone="muted"
      spacious
      data-section="talent-pipeline"
      aria-labelledby="talent-pipeline-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Heading
              id="talent-pipeline-heading"
              level={2}
              className="text-text-primary"
            >
              {heading}
            </Heading>
          </div>
          <div className="lg:col-span-7">
            <Text size="lead" muted>
              {intro}
            </Text>
            <p className="mt-6 border-l-2 border-accent pl-5 text-[1.0625rem] text-text-primary md:text-lg">
              {emphasis}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
