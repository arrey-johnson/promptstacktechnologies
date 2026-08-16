import { Container, Heading, Section, Text } from "@/components/ui";
import type { AcademyProgram } from "@/content/academy/types";
import { AcademyVisual } from "./AcademyVisual";
import { EditorialListSection } from "./EditorialListSection";
import { LearningRoadmap } from "./LearningRoadmap";
import { ProjectFlowSection } from "./ProjectFlowSection";
import { TopicPointsSection } from "./TopicPointsSection";

type ProgramDetailSectionsProps = {
  program: AcademyProgram;
};

export function ProgramDetailSections({ program }: ProgramDetailSectionsProps) {
  return (
    <>
      <Section
        tone="primary"
        spacious
        data-section="program-overview"
        aria-labelledby="program-overview-heading"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Heading
                id="program-overview-heading"
                level={2}
                className="text-text-primary"
              >
                What this program develops
              </Heading>
              <Text size="lead" muted className="mt-5">
                {program.overview}
              </Text>
            </div>
            <div className="lg:col-span-5">
              <AcademyVisual kind={program.visual} />
            </div>
          </div>
        </Container>
      </Section>

      <EditorialListSection
        sectionId="who-for"
        heading={program.whoFor.heading}
        intro={program.whoFor.intro}
        items={program.whoFor.items}
        tone="soft"
        columns={1}
      />

      <EditorialListSection
        sectionId="outcomes"
        heading="What learners should become capable of doing"
        intro="Capability outcomes — the work learners should be able to perform and demonstrate."
        items={program.outcomes}
        tone="primary"
      />

      <LearningRoadmap stages={program.learningRoadmap} />

      <EditorialListSection
        sectionId="practical-skills"
        heading="Practical emphasis"
        intro="Skills and habits the program develops through practice — not a substitute for project completion."
        items={program.practicalSkills}
        tone="primary"
      />

      <Section
        tone="muted"
        spacious
        data-section="example-projects"
        aria-labelledby="example-projects-heading"
      >
        <Container>
          <div className="max-w-3xl">
            <Heading
              id="example-projects-heading"
              level={2}
              className="text-text-primary"
            >
              Project types
            </Heading>
            <Text size="lead" muted className="mt-5">
              Illustrative project architecture for this program. These are
              example project types — not published Promptstack Academy student
              portfolios.
            </Text>
          </div>
          <ul className="mt-10 space-y-6">
            {program.projects.map((project) => (
              <li
                key={project.title}
                className="border-t border-border-soft pt-5"
              >
                <h3 className="text-xl font-medium text-text-primary">
                  {project.title}
                </h3>
                <Text muted className="mt-2 max-w-3xl">
                  {project.body}
                </Text>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <TopicPointsSection
        sectionId="professional-workflows"
        heading="Professional workflows"
        intro={
          program.slug === "artificial-intelligence"
            ? "You learn AI capability in a way that resembles careful professional use — with evaluation and oversight."
            : "You learn the skill in a way that resembles professional work."
        }
        points={program.professionalWorkflows}
        tone="soft"
      />

      {program.slug === "artificial-intelligence" ? (
        <Section
          tone="primary"
          spacious
          data-section="responsible-use"
          aria-labelledby="responsible-use-heading"
        >
          <Container>
            <div className="max-w-3xl">
              <Heading
                id="responsible-use-heading"
                level={2}
                className="text-text-primary"
              >
                Responsible use
              </Heading>
              <Text size="lead" muted className="mt-5">
                Practical AI capability includes knowing when not to trust an
                output. Learners practice verification, privacy awareness and
                human oversight so AI remains a tool under accountable control —
                not an automatic authority.
              </Text>
            </div>
          </Container>
        </Section>
      ) : null}

      {program.slug === "cybersecurity" ? (
        <Section
          tone="primary"
          spacious
          data-section="security-mindset"
          aria-labelledby="security-mindset-heading"
        >
          <Container>
            <div className="max-w-3xl">
              <Heading
                id="security-mindset-heading"
                level={2}
                className="text-text-primary"
              >
                Security mindset
              </Heading>
              <Text size="lead" muted className="mt-5">
                Defensive learning depends on discipline: understand systems,
                recognise risk, practise safely, document carefully and act
                ethically. The program emphasises protective judgement — not
                reckless experimentation.
              </Text>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section
        tone="primary"
        spacious
        data-section="how-training-works"
        aria-labelledby="how-training-works-heading"
      >
        <Container>
          <div className="max-w-3xl">
            <Heading
              id="how-training-works-heading"
              level={2}
              className="text-text-primary"
            >
              How training works
            </Heading>
            <Text size="lead" muted className="mt-5">
              {program.teachingMethod}
            </Text>
          </div>
        </Container>
      </Section>

      <EditorialListSection
        sectionId="demonstrable-outcomes"
        heading="Demonstrable outcomes"
        intro="Evidence of capability should come from finished work — not attendance alone."
        items={program.demonstrableOutcomes}
        tone="muted"
        columns={1}
      />

      <EditorialListSection
        sectionId="prerequisites"
        heading="Prerequisites"
        intro="Entry expectations without fabricated admissions thresholds."
        items={program.prerequisites}
        tone="primary"
        columns={1}
      />

      {/* Operational fields render only when verified values exist */}
      {(program.format ||
        program.duration ||
        program.scheduleText ||
        program.feeText ||
        program.cohortText) && (
        <Section tone="muted" spacious data-section="program-operations">
          <Container>
            <Heading level={2} className="text-text-primary">
              Program details
            </Heading>
            <dl className="mt-8 space-y-4">
              {program.format ? (
                <>
                  <dt className="font-medium text-text-primary">Format</dt>
                  <dd className="text-text-secondary">{program.format}</dd>
                </>
              ) : null}
              {program.duration ? (
                <>
                  <dt className="font-medium text-text-primary">Duration</dt>
                  <dd className="text-text-secondary">{program.duration}</dd>
                </>
              ) : null}
              {program.scheduleText ? (
                <>
                  <dt className="font-medium text-text-primary">Schedule</dt>
                  <dd className="text-text-secondary">{program.scheduleText}</dd>
                </>
              ) : null}
              {program.feeText ? (
                <>
                  <dt className="font-medium text-text-primary">Fees</dt>
                  <dd className="text-text-secondary">{program.feeText}</dd>
                </>
              ) : null}
              {program.cohortText ? (
                <>
                  <dt className="font-medium text-text-primary">Cohorts</dt>
                  <dd className="text-text-secondary">{program.cohortText}</dd>
                </>
              ) : null}
            </dl>
          </Container>
        </Section>
      )}
    </>
  );
}

/** Re-export for pages that want a simple flow strip */
export { ProjectFlowSection };
