import { Container, Heading, Section, Text } from "@/components/ui";
import type { RoadmapStage } from "@/content/academy/types";

type LearningRoadmapProps = {
  stages: readonly RoadmapStage[];
  heading?: string;
  intro?: string;
};

export function LearningRoadmap({
  stages,
  heading = "Learning roadmap",
  intro = "A practical progression — not a promise of exact weekly schedules or lesson counts.",
}: LearningRoadmapProps) {
  return (
    <Section
      tone="muted"
      spacious
      data-section="learning-roadmap"
      aria-labelledby="roadmap-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Heading id="roadmap-heading" level={2} className="text-text-primary">
            {heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {intro}
          </Text>
        </div>

        <ol className="mt-12 space-y-0">
          {stages.map((stage, index) => (
            <li
              key={stage.id}
              className="grid gap-4 border-t border-border-soft py-8 md:grid-cols-[5.5rem_minmax(0,1fr)] md:gap-10"
            >
              <span className="text-sm font-semibold tracking-[0.14em] text-accent uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl font-medium text-text-primary md:text-2xl">
                  {stage.title}
                </h3>
                <Text muted className="mt-2 max-w-2xl">
                  {stage.summary}
                </Text>
                <ul className="mt-4 space-y-2">
                  {stage.items.map((item) => (
                    <li
                      key={item}
                      className="text-[1.0625rem] text-text-secondary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
