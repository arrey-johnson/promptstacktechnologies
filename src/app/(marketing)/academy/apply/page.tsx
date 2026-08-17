import type { Metadata } from "next";
import { FormStartBeacon } from "@/components/analytics";
import { AcademyApplicationForm } from "@/components/forms";
import { Button, Container, Eyebrow, Heading, Section, Text } from "@/components/ui";
import {
  areAcademyApplicationsEnabled,
  resolveAcademyApplyProgramQuery,
} from "@/config/academy";
import { ACADEMY_PROGRAM_LABELS } from "@/lib/academy/schema";
import { createPageMetadata } from "@/lib/seo/page-metadata";

type PageProps = {
  searchParams: Promise<{ program?: string | string[] }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const applicationsOpen = areAcademyApplicationsEnabled();
  return {
    ...createPageMetadata({
      title: applicationsOpen
        ? "Apply to Promptstack Academy"
        : "Academy Applications",
      description: applicationsOpen
        ? "Apply to Promptstack Academy. Tell us what you want to learn, your current background and what you hope to achieve through practical training."
        : "Promptstack Academy application information. Online applications open when admissions are enabled.",
      path: "/academy/apply",
      robots: applicationsOpen
        ? undefined
        : { index: false, follow: true },
    }),
  };
}

const reassurances = [
  {
    title: "Beginners are welcome",
    body: "You do not need to arrive as an expert. Be clear about where you are starting and what you want to learn.",
  },
  {
    title: "Application is not admission",
    body: "Submitting this form helps Promptstack Academy understand your interest. It does not guarantee a place on a program.",
  },
  {
    title: "Practical learning first",
    body: "Academy training emphasises Learn · Build · Ship — capability demonstrated through finished work, not passive lessons alone.",
  },
] as const;

function ApplicationsUnavailable() {
  return (
    <Section tone="muted" spacious className="pt-0 md:pt-0">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="rounded-[var(--radius-visual)] border border-border-soft bg-brand-lavender/25 p-6 sm:p-8 md:p-10">
              <p className="text-sm font-semibold tracking-[0.12em] text-accent uppercase">
                Admissions pathway
              </p>
              <Heading level={2} className="mt-4 text-text-primary">
                Online applications are not open yet
              </Heading>
              <Text muted className="mt-5">
                Promptstack Academy is preparing the public admissions pathway.
                When applications are enabled, this page will accept
                submissions directly.
              </Text>
              <Text muted className="mt-4">
                In the meantime, explore programs and how we teach so you can
                choose the path that fits your goals. A reopening date has not
                been published.
              </Text>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/academy/programs" size="lg">
                  Explore Programs
                </Button>
                <Button
                  href="/academy/how-we-teach"
                  variant="secondary"
                  size="lg"
                >
                  How We Teach
                </Button>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <Heading level={2} className="text-text-primary">
              Meanwhile
            </Heading>
            <ul className="mt-6 space-y-6">
              {reassurances.map((item) => (
                <li
                  key={item.title}
                  className="border-t border-border-soft pt-5"
                >
                  <h3 className="text-lg font-medium text-text-primary">
                    {item.title}
                  </h3>
                  <Text muted className="mt-2">
                    {item.body}
                  </Text>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </Section>
  );
}

export default async function AcademyApplyPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const applicationsOpen = areAcademyApplicationsEnabled();
  const initialProgramSlug = resolveAcademyApplyProgramQuery(params.program);
  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || undefined;

  return (
    <main id="main-content" data-analytics="academy_apply_view">
      {applicationsOpen ? <FormStartBeacon kind="academy" /> : null}
      <Section tone="primary" className="pb-8 pt-14 md:pb-10 md:pt-16">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Apply to Promptstack Academy</Eyebrow>
            <Heading
              level={1}
              as="h1"
              className="mt-5 text-[1.9rem] text-text-primary sm:text-4xl md:text-[2.75rem]"
            >
              Tell us what you want to learn and where you want it to take you.
            </Heading>
            <Text size="lead" muted className="mt-5">
              You do not need to arrive as an expert. We want to understand your
              current background, the program you are interested in and what you
              hope to achieve through practical training.
            </Text>
            {initialProgramSlug && applicationsOpen ? (
              <Text muted className="mt-4 font-medium text-text-primary">
                Program interest: {ACADEMY_PROGRAM_LABELS[initialProgramSlug]}
              </Text>
            ) : null}
          </div>
        </Container>
      </Section>

      {!applicationsOpen ? (
        <ApplicationsUnavailable />
      ) : (
        <Section tone="muted" spacious className="pt-0 md:pt-0">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <aside className="lg:col-span-4">
                <div className="space-y-8 lg:sticky lg:top-28">
                  <Heading level={2} className="text-text-primary">
                    Before you apply
                  </Heading>
                  <ul className="space-y-6">
                    {reassurances.map((item) => (
                      <li
                        key={item.title}
                        className="border-t border-border-soft pt-5"
                      >
                        <h3 className="text-lg font-medium text-text-primary">
                          {item.title}
                        </h3>
                        <Text muted className="mt-2">
                          {item.body}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <div className="lg:col-span-8">
                <div className="rounded-[var(--radius-visual)] border border-border-soft bg-surface-primary p-5 shadow-[0_18px_50px_rgba(27,38,59,0.06)] sm:p-8 md:p-10">
                  <AcademyApplicationForm
                    turnstileSiteKey={turnstileSiteKey}
                    initialProgramSlug={initialProgramSlug}
                  />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </main>
  );
}
