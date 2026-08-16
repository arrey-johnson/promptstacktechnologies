import {
  CapabilitySection,
  CommercialCTA,
  FAQSection,
  FlowDiagram,
  ProblemSignals,
  ProcessPreview,
  RelatedWorkPreview,
  SolutionPageHero,
  UseCaseList,
} from "@/components/solutions";
import {
  aiAutomationCapabilities,
  aiAutomationCta,
  aiAutomationFaqs,
  aiAutomationHero,
  aiAutomationMeta,
  aiAutomationProblems,
  aiAutomationProcess,
  aiAutomationUseCases,
  aiAutomationWork,
  aiAutomationWorkflow,
} from "@/content/solutions/ai-automation";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = createPageMetadata({
  title: aiAutomationMeta.title,
  description: aiAutomationMeta.description,
  path: "/solutions/ai-automation",
});

export default async function AiAutomationPage() {
  return (
    <main id="main-content">
      <SolutionPageHero
        content={aiAutomationHero}
        analyticsPrefix="ai_automation"
      />
      <ProblemSignals
        heading={aiAutomationProblems.heading}
        intro={aiAutomationProblems.intro}
        items={aiAutomationProblems.items}
      />
      <CapabilitySection
        heading={aiAutomationCapabilities.heading}
        intro={aiAutomationCapabilities.intro}
        items={aiAutomationCapabilities.items}
      />
      <UseCaseList
        heading={aiAutomationUseCases.heading}
        intro={aiAutomationUseCases.intro}
        note={aiAutomationUseCases.note}
        items={aiAutomationUseCases.items}
      />
      <FlowDiagram
        id="automation-workflow"
        heading={aiAutomationWorkflow.heading}
        intro={aiAutomationWorkflow.intro}
        label={aiAutomationWorkflow.label}
        steps={aiAutomationWorkflow.steps}
        tone="soft"
      />
      <ProcessPreview
        heading={aiAutomationProcess.heading}
        intro={aiAutomationProcess.intro}
        stages={aiAutomationProcess.stages}
        cta={aiAutomationProcess.cta}
        analyticsId="cta_ai_automation_process"
      />
      <RelatedWorkPreview
        heading={aiAutomationWork.heading}
        supporting={aiAutomationWork.supporting}
        emptyMessage={aiAutomationWork.emptyMessage}
        cta={aiAutomationWork.cta}
        featured={aiAutomationWork.featured}
        secondary={aiAutomationWork.secondary}
        category="ai-automation"
        analyticsPrefix="ai_automation"
      />
      <FAQSection items={aiAutomationFaqs} />
      <CommercialCTA {...aiAutomationCta} />
    </main>
  );
}
