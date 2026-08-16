import { FAQSection } from "@/components/solutions";
import {
  AcademyNextStepCTA,
  AcademyPageHero,
  HumanChapterSection,
  LearnBuildShip,
  ProgramsGrid,
  ProjectFlowSection,
  TalentPipelineSection,
  TopicPointsSection,
} from "@/components/academy";
import { Container, Heading, Section, Text } from "@/components/ui";
import {
  academyHomeFaqs,
  academyHomeHero,
  academyHomeMeta,
  academyHomeNextStep,
  academyHumanChapter,
  academyLearnBuildShip,
  academyPracticalExperience,
  academyProgramsSection,
  academyProjectsSection,
  academyTalentPipeline,
  academyWhatItIs,
  academyWorkflowsSection,
} from "@/content/academy/home";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = createPageMetadata({
  title: academyHomeMeta.title,
  description: academyHomeMeta.description,
  path: academyHomeMeta.path,
});

export default function AcademyHomePage() {
  return (
    <main id="main-content" data-analytics="academy_home_view">
      <AcademyPageHero
        eyebrow={academyHomeHero.eyebrow}
        heading={academyHomeHero.heading}
        supporting={academyHomeHero.supporting}
        emphasis={academyHomeHero.emphasis}
        primaryCta={academyHomeHero.primaryCta}
        secondaryCta={academyHomeHero.secondaryCta}
        visual="hero"
        analyticsPrefix="academy"
      />

      <Section
        tone="primary"
        spacious
        data-section="what-academy-is"
        aria-labelledby="what-academy-heading"
      >
        <Container>
          <div className="max-w-3xl">
            <Heading
              id="what-academy-heading"
              level={2}
              className="text-text-primary"
            >
              {academyWhatItIs.heading}
            </Heading>
            <Text size="lead" muted className="mt-5">
              {academyWhatItIs.intro}
            </Text>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {academyWhatItIs.capabilities.map((item) => (
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

      <LearnBuildShip
        heading={academyLearnBuildShip.heading}
        intro={academyLearnBuildShip.intro}
        stages={academyLearnBuildShip.stages}
      />

      <ProgramsGrid
        heading={academyProgramsSection.heading}
        intro={academyProgramsSection.intro}
        programs={academyProgramsSection.programs}
        analyticsPrefix="academy_home"
      />

      <TopicPointsSection
        sectionId="practical-experience"
        heading={academyPracticalExperience.heading}
        intro={academyPracticalExperience.intro}
        points={academyPracticalExperience.points}
        tone="muted"
      />

      <ProjectFlowSection
        heading={academyProjectsSection.heading}
        intro={academyProjectsSection.intro}
        flow={academyProjectsSection.flow}
        note={academyProjectsSection.note}
        tone="dark"
        sectionId="projects-outcomes"
      />

      <TopicPointsSection
        sectionId="professional-workflows"
        heading={academyWorkflowsSection.heading}
        intro={academyWorkflowsSection.intro}
        points={academyWorkflowsSection.themes}
        tone="primary"
      />

      <TalentPipelineSection
        heading={academyTalentPipeline.heading}
        intro={academyTalentPipeline.intro}
        emphasis={academyTalentPipeline.emphasis}
      />

      <HumanChapterSection
        heading={academyHumanChapter.heading}
        intro={academyHumanChapter.intro}
        note={academyHumanChapter.note}
      />

      <FAQSection
        heading="Academy FAQ"
        intro="Practical answers about Promptstack Academy. Operational details such as fees, schedules and admissions windows are published only when verified."
        items={[...academyHomeFaqs]}
      />

      <AcademyNextStepCTA
        heading={academyHomeNextStep.heading}
        body={academyHomeNextStep.body}
        primaryCta={academyHomeNextStep.primaryCta}
        secondaryCta={academyHomeNextStep.secondaryCta}
        preferApplyWhenEnabled
        analyticsPrefix="academy_home"
      />
    </main>
  );
}
