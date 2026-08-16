import { CommercialCTA } from "@/components/solutions";
import {
  HowWeWorkRelatedWork,
  PhilosophySection,
  ProcessJourney,
  TrustPageHero,
  TrustTopicSection,
} from "@/components/trust";
import {
  howWeWorkCollaboration,
  howWeWorkCta,
  howWeWorkExpectations,
  howWeWorkHero,
  howWeWorkMeta,
  howWeWorkQuality,
  howWeWorkStages,
} from "@/content/how-we-work";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = createPageMetadata({
  title: howWeWorkMeta.title,
  description: howWeWorkMeta.description,
  path: "/how-we-work",
});

export default function HowWeWorkPage() {
  return (
    <main id="main-content">
      <TrustPageHero
        {...howWeWorkHero}
        analyticsPrefix="how_we_work"
        visual="process"
      />
      <PhilosophySection />
      <ProcessJourney stages={howWeWorkStages} />
      <TrustTopicSection
        id="collaboration"
        heading={howWeWorkCollaboration.heading}
        intro={howWeWorkCollaboration.intro}
        items={howWeWorkCollaboration.items}
        tone="soft"
      />
      <TrustTopicSection
        id="quality"
        heading={howWeWorkQuality.heading}
        intro={howWeWorkQuality.intro}
        items={howWeWorkQuality.items}
        tone="primary"
      />
      <TrustTopicSection
        id="client-expectations"
        heading={howWeWorkExpectations.heading}
        intro={howWeWorkExpectations.intro}
        items={howWeWorkExpectations.items}
        tone="muted"
      />
      <HowWeWorkRelatedWork />
      <CommercialCTA {...howWeWorkCta} />
    </main>
  );
}
