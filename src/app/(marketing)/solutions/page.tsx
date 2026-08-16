import {
  CommercialCTA,
  ExploreByProblem,
  IntegratedCapability,
  ProblemSignals,
  ProcessPreview,
  RelatedWorkPreview,
  SolutionAreaModules,
  SolutionPageHero,
} from "@/components/solutions";
import {
  solutionsExploreByProblem,
  solutionsIntegrated,
  solutionsOverviewAreas,
  solutionsOverviewCta,
  solutionsOverviewHero,
  solutionsOverviewMeta,
  solutionsOverviewProblems,
  solutionsOverviewProcess,
  solutionsOverviewWork,
} from "@/content/solutions/overview";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = createPageMetadata({
  title: solutionsOverviewMeta.title,
  description: solutionsOverviewMeta.description,
  path: "/solutions",
});

export default async function SolutionsOverviewPage() {
  return (
    <main id="main-content">
      <SolutionPageHero
        content={solutionsOverviewHero}
        analyticsPrefix="solutions"
      />
      <ProblemSignals
        heading={solutionsOverviewProblems.heading}
        intro={solutionsOverviewProblems.intro}
        items={solutionsOverviewProblems.items}
      />
      <SolutionAreaModules
        heading={solutionsOverviewAreas.heading}
        intro={solutionsOverviewAreas.intro}
        modules={solutionsOverviewAreas.modules}
      />
      <ExploreByProblem
        id={solutionsExploreByProblem.id}
        heading={solutionsExploreByProblem.heading}
        intro={solutionsExploreByProblem.intro}
        items={solutionsExploreByProblem.items}
      />
      <IntegratedCapability
        heading={solutionsIntegrated.heading}
        intro={solutionsIntegrated.intro}
        example={solutionsIntegrated.example}
        closing={solutionsIntegrated.closing}
      />
      <ProcessPreview
        heading={solutionsOverviewProcess.heading}
        intro={solutionsOverviewProcess.intro}
        stages={solutionsOverviewProcess.stages}
        cta={solutionsOverviewProcess.cta}
        analyticsId="cta_solutions_process"
      />
      <RelatedWorkPreview
        heading={solutionsOverviewWork.heading}
        supporting={solutionsOverviewWork.supporting}
        emptyMessage={solutionsOverviewWork.emptyMessage}
        cta={solutionsOverviewWork.cta}
        featured={solutionsOverviewWork.featured}
        secondary={solutionsOverviewWork.secondary}
        category="multi-disciplinary"
        analyticsPrefix="solutions"
      />
      <CommercialCTA {...solutionsOverviewCta} />
    </main>
  );
}
