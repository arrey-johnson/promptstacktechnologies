import {
  CapabilitySection,
  CommercialCTA,
  FAQSection,
  FlowDiagram,
  MeasurementPoints,
  ProblemSignals,
  ProcessPreview,
  RelatedWorkPreview,
  SolutionPageHero,
  UseCaseList,
} from "@/components/solutions";
import {
  digitalMarketingCapabilities,
  digitalMarketingCta,
  digitalMarketingFaqs,
  digitalMarketingGrowthSystem,
  digitalMarketingHero,
  digitalMarketingMeasurement,
  digitalMarketingMeta,
  digitalMarketingProblems,
  digitalMarketingProcess,
  digitalMarketingUseCases,
  digitalMarketingWork,
} from "@/content/solutions/digital-marketing";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = createPageMetadata({
  title: digitalMarketingMeta.title,
  description: digitalMarketingMeta.description,
  path: "/solutions/digital-marketing",
});

export default async function DigitalMarketingPage() {
  return (
    <main id="main-content">
      <SolutionPageHero
        content={digitalMarketingHero}
        analyticsPrefix="digital_marketing"
      />
      <ProblemSignals
        heading={digitalMarketingProblems.heading}
        intro={digitalMarketingProblems.intro}
        items={digitalMarketingProblems.items}
      />
      <CapabilitySection
        heading={digitalMarketingCapabilities.heading}
        intro={digitalMarketingCapabilities.intro}
        items={digitalMarketingCapabilities.items}
        note={digitalMarketingCapabilities.connectionNote}
        tone="muted"
      />
      <FlowDiagram
        id={digitalMarketingGrowthSystem.id}
        heading={digitalMarketingGrowthSystem.heading}
        intro={digitalMarketingGrowthSystem.intro}
        label={digitalMarketingGrowthSystem.label}
        steps={digitalMarketingGrowthSystem.steps}
        tone="soft"
      />
      <UseCaseList
        heading={digitalMarketingUseCases.heading}
        intro={digitalMarketingUseCases.intro}
        note={digitalMarketingUseCases.note}
        items={digitalMarketingUseCases.items}
      />
      <MeasurementPoints
        heading={digitalMarketingMeasurement.heading}
        intro={digitalMarketingMeasurement.intro}
        points={digitalMarketingMeasurement.points}
      />
      <ProcessPreview
        heading={digitalMarketingProcess.heading}
        intro={digitalMarketingProcess.intro}
        stages={digitalMarketingProcess.stages}
        cta={digitalMarketingProcess.cta}
        analyticsId="cta_digital_marketing_process"
      />
      <RelatedWorkPreview
        heading={digitalMarketingWork.heading}
        supporting={digitalMarketingWork.supporting}
        emptyMessage={digitalMarketingWork.emptyMessage}
        cta={digitalMarketingWork.cta}
        featured={digitalMarketingWork.featured}
        secondary={digitalMarketingWork.secondary}
        category="digital-marketing"
        analyticsPrefix="digital_marketing"
      />
      <FAQSection items={digitalMarketingFaqs} />
      <CommercialCTA {...digitalMarketingCta} />
    </main>
  );
}
