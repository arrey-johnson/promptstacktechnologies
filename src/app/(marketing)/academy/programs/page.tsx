import {
  AcademyNextStepCTA,
  AcademyPageHero,
  ProgramsGrid,
} from "@/components/academy";
import {
  academyProgramsIndex,
  academyProgramsMeta,
} from "@/content/academy/programs";
import { getAcademyProgramCards } from "@/lib/academy/get-programs";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = createPageMetadata({
  title: academyProgramsMeta.title,
  description: academyProgramsMeta.description,
  path: academyProgramsMeta.path,
});

export default async function AcademyProgramsPage() {
  const programs = await getAcademyProgramCards();

  return (
    <main id="main-content" data-analytics="academy_programs_view">
      <AcademyPageHero
        eyebrow={academyProgramsIndex.eyebrow}
        heading={academyProgramsIndex.heading}
        supporting={academyProgramsIndex.supporting}
        primaryCta={{ label: "How We Teach", href: "/academy/how-we-teach" }}
        secondaryCta={{ label: "Academy Home", href: "/academy" }}
        visual="teach"
        analyticsPrefix="academy_programs"
      />

      <ProgramsGrid
        heading="Available programs"
        intro="Active Promptstack Academy learning paths. Fees, cohort dates and schedules are omitted until verified operational details are supplied."
        programs={programs}
        analyticsPrefix="academy_programs"
      />

      <AcademyNextStepCTA
        heading="Understand the learning model next"
        body="See how Learn · Build · Ship works across instruction, projects, feedback and professional workflows."
        primaryCta={{ label: "How We Teach", href: "/academy/how-we-teach" }}
        secondaryCta={{ label: "Back to Academy", href: "/academy" }}
        preferApplyWhenEnabled
        analyticsPrefix="academy_programs"
        tone="soft"
      />
    </main>
  );
}
