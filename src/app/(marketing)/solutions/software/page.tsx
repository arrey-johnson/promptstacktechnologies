import {
  CapabilitySection,
  CommercialCTA,
  FAQSection,
  ProblemSignals,
  ProcessPreview,
  RelatedWorkPreview,
  SolutionPageHero,
  UseCaseList,
} from "@/components/solutions";
import {
  softwareCapabilities,
  softwareCta,
  softwareFaqs,
  softwareHero,
  softwareMeta,
  softwareProblems,
  softwareProcess,
  softwareUseCases,
  softwareWork,
} from "@/content/solutions/software";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = createPageMetadata({
  title: softwareMeta.title,
  description: softwareMeta.description,
  path: "/solutions/software",
});

export default async function SoftwareSolutionsPage() {
  return (
    <main id="main-content">
      <SolutionPageHero content={softwareHero} analyticsPrefix="software" />
      <ProblemSignals
        heading={softwareProblems.heading}
        intro={softwareProblems.intro}
        items={softwareProblems.items}
      />
      <CapabilitySection
        heading={softwareCapabilities.heading}
        intro={softwareCapabilities.intro}
        items={softwareCapabilities.items}
      />
      <UseCaseList
        heading={softwareUseCases.heading}
        intro={softwareUseCases.intro}
        note={softwareUseCases.note}
        items={softwareUseCases.items}
      />
      <ProcessPreview
        heading={softwareProcess.heading}
        intro={softwareProcess.intro}
        stages={softwareProcess.stages}
        cta={softwareProcess.cta}
        analyticsId="cta_software_process"
      />
      <RelatedWorkPreview
        heading={softwareWork.heading}
        supporting={softwareWork.supporting}
        emptyMessage={softwareWork.emptyMessage}
        cta={softwareWork.cta}
        featured={softwareWork.featured}
        secondary={softwareWork.secondary}
        category="software"
        analyticsPrefix="software"
      />
      <FAQSection items={softwareFaqs} />
      <CommercialCTA {...softwareCta} />
    </main>
  );
}
