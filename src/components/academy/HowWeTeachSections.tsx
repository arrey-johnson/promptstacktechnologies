import { Container, Heading, Section, Text } from "@/components/ui";
import {
  howWeTeachAssessment,
  howWeTeachCollaboration,
  howWeTeachExpectations,
  howWeTeachFeedback,
  howWeTeachLessons,
  howWeTeachModel,
  howWeTeachProjects,
  howWeTeachTalent,
  howWeTeachWorkflows,
} from "@/content/academy/how-we-teach";
import { AcademyVisual } from "./AcademyVisual";
import { EditorialListSection } from "./EditorialListSection";
import { LearnBuildShip } from "./LearnBuildShip";
import { ProjectFlowSection } from "./ProjectFlowSection";

export function HowWeTeachSections() {
  return (
    <>
      <LearnBuildShip
        heading={howWeTeachModel.heading}
        intro={howWeTeachModel.intro}
        stages={howWeTeachModel.stages.map((stage) => ({
          id: stage.title.toLowerCase(),
          title: stage.title,
          body: stage.body,
        }))}
      />

      <Section
        tone="primary"
        spacious
        data-section="how-lessons-work"
        aria-labelledby="how-lessons-heading"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Heading
                id="how-lessons-heading"
                level={2}
                className="text-text-primary"
              >
                {howWeTeachLessons.heading}
              </Heading>
              <Text size="lead" muted className="mt-5">
                {howWeTeachLessons.intro}
              </Text>
              <ul className="mt-8 space-y-3">
                {howWeTeachLessons.points.map((point) => (
                  <li
                    key={point}
                    className="border-t border-border-soft pt-3 text-[1.0625rem] text-text-secondary"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <AcademyVisual kind="teach" className="min-h-[18rem]" />
            </div>
          </div>
        </Container>
      </Section>

      <ProjectFlowSection
        heading={howWeTeachProjects.heading}
        intro={howWeTeachProjects.intro}
        flow={howWeTeachProjects.flow}
        tone="muted"
        sectionId="how-projects"
      />

      <EditorialListSection
        sectionId="feedback-review"
        heading={howWeTeachFeedback.heading}
        intro={howWeTeachFeedback.intro}
        items={howWeTeachFeedback.points}
        tone="soft"
        columns={1}
      />

      <Section
        tone="primary"
        spacious
        data-section="team-collaboration"
        aria-labelledby="collaboration-heading"
      >
        <Container>
          <div className="max-w-3xl">
            <Heading
              id="collaboration-heading"
              level={2}
              className="text-text-primary"
            >
              {howWeTeachCollaboration.heading}
            </Heading>
            <Text size="lead" muted className="mt-5">
              {howWeTeachCollaboration.intro}
            </Text>
          </div>
        </Container>
      </Section>

      <Section
        tone="muted"
        spacious
        data-section="professional-workflows"
        aria-labelledby="workflows-heading"
      >
        <Container>
          <div className="max-w-3xl">
            <Heading
              id="workflows-heading"
              level={2}
              className="text-text-primary"
            >
              {howWeTeachWorkflows.heading}
            </Heading>
            <Text size="lead" muted className="mt-5">
              {howWeTeachWorkflows.intro}
            </Text>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {howWeTeachWorkflows.themes.map((theme) => (
              <li
                key={theme}
                className="rounded-[var(--radius-card)] border border-border-soft bg-surface-primary px-5 py-4 text-[1.0625rem] text-text-primary"
              >
                {theme}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section
        tone="primary"
        spacious
        data-section="assessment"
        aria-labelledby="assessment-heading"
      >
        <Container>
          <div className="max-w-3xl">
            <Heading
              id="assessment-heading"
              level={2}
              className="text-text-primary"
            >
              {howWeTeachAssessment.heading}
            </Heading>
            <Text size="lead" muted className="mt-5">
              {howWeTeachAssessment.intro}
            </Text>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {howWeTeachAssessment.mayInclude.map((item) => (
              <li
                key={item}
                className="border-t border-border-soft pt-3 text-text-secondary"
              >
                {item}
              </li>
            ))}
          </ul>
          <Text muted className="mt-8 max-w-3xl text-sm">
            {howWeTeachAssessment.note}
          </Text>
        </Container>
      </Section>

      <EditorialListSection
        sectionId="learner-expectations"
        heading={howWeTeachExpectations.heading}
        intro={howWeTeachExpectations.intro}
        items={howWeTeachExpectations.items}
        tone="soft"
      />

      <Section
        tone="muted"
        spacious
        data-section="talent-connection"
        aria-labelledby="talent-connection-heading"
      >
        <Container>
          <div className="max-w-3xl">
            <Heading
              id="talent-connection-heading"
              level={2}
              className="text-text-primary"
            >
              {howWeTeachTalent.heading}
            </Heading>
            <Text size="lead" muted className="mt-5">
              {howWeTeachTalent.body}
            </Text>
          </div>
        </Container>
      </Section>
    </>
  );
}
