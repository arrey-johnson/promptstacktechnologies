import {
  AcademyNextStepCTA,
  AcademyPageHero,
  HowWeTeachSections,
} from "@/components/academy";
import { FAQSection } from "@/components/solutions";
import {
  howWeTeachFaqs,
  howWeTeachHero,
  howWeTeachMeta,
  howWeTeachNextStep,
} from "@/content/academy/how-we-teach";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = createPageMetadata({
  title: howWeTeachMeta.title,
  description: howWeTeachMeta.description,
  path: howWeTeachMeta.path,
});

export default function HowWeTeachPage() {
  return (
    <main id="main-content" data-analytics="academy_how_we_teach_view">
      <AcademyPageHero
        eyebrow={howWeTeachHero.eyebrow}
        heading={howWeTeachHero.heading}
        supporting={howWeTeachHero.supporting}
        primaryCta={howWeTeachHero.primaryCta}
        visual="teach"
        analyticsPrefix="how_we_teach"
      />

      <HowWeTeachSections />

      <FAQSection
        heading="Teaching model FAQ"
        intro="How Promptstack Academy approaches instruction, practice and demonstration."
        items={[...howWeTeachFaqs]}
      />

      <AcademyNextStepCTA
        heading={howWeTeachNextStep.heading}
        body={howWeTeachNextStep.body}
        primaryCta={howWeTeachNextStep.primaryCta}
        preferApplyWhenEnabled
        analyticsPrefix="how_we_teach"
      />
    </main>
  );
}
