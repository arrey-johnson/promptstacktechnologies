import { notFound } from "next/navigation";
import {
  AcademyNextStepCTA,
  AcademyPageHero,
  ProgramDetailSections,
} from "@/components/academy";
import { FAQSection } from "@/components/solutions";
import {
  getAcademyProgramBySlug,
  getAcademyProgramSlugs,
} from "@/lib/academy/get-programs";
import { createPageMetadata } from "@/lib/seo/page-metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAcademyProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const program = await getAcademyProgramBySlug(slug);
  if (!program) {
    return {};
  }
  return createPageMetadata({
    title: program.seo.title,
    description: program.seo.description,
    path: `/academy/programs/${program.slug}`,
  });
}

export default async function AcademyProgramPage({ params }: PageProps) {
  const { slug } = await params;
  const program = await getAcademyProgramBySlug(slug);
  if (!program) {
    notFound();
  }

  return (
    <main
      id="main-content"
      data-analytics={`academy_program_${program.slug}_view`}
    >
      <AcademyPageHero
        eyebrow={program.title}
        heading={program.heroHeading}
        supporting={program.shortPromise}
        primaryCta={{ label: "Explore Programs", href: "/academy/programs" }}
        secondaryCta={{ label: "How We Teach", href: "/academy/how-we-teach" }}
        visual={program.visual}
        analyticsPrefix={`program_${program.slug}`}
      />

      <ProgramDetailSections program={program} />

      <FAQSection
        heading={`${program.title} FAQ`}
        items={program.faq.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))}
      />

      <AcademyNextStepCTA
        heading="Ready to take the next step?"
        body="Explore other programs or apply when admissions are open. Submission is not enrolment."
        primaryCta={{ label: "Explore Programs", href: "/academy/programs" }}
        secondaryCta={{ label: "How We Teach", href: "/academy/how-we-teach" }}
        preferApplyWhenEnabled
        programSlug={program.slug}
        analyticsPrefix={`program_${program.slug}`}
        tone="soft"
      />
    </main>
  );
}
