import type { Metadata } from "next";
import { FormStartBeacon } from "@/components/analytics";
import { ProjectInquiryForm } from "@/components/forms";
import { Container, Eyebrow, Heading, Section, Text } from "@/components/ui";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Start a Project",
    description:
      "Tell Promptstack what you are trying to improve. You do not need a technical specification — start with the business problem, process or product you need help with.",
    path: "/start-a-project",
  }),
  other: {
    "pst:analytics-event": "start_project_view",
  },
};

const reassurances = [
  {
    title: "No technical specification required",
    body: "Start with the business problem, the process that is slowing you down, or what you are trying to build.",
  },
  {
    title: "We use this to understand the request",
    body: "Your information helps Promptstack determine the most relevant next step for the inquiry.",
  },
  {
    title: "Business-first conversation",
    body: "The goal is clarity about the problem and context — not forcing you to choose a technology stack first.",
  },
] as const;

export default function StartAProjectPage() {
  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || undefined;

  return (
    <main id="main-content" data-analytics="start_project_view">
      <FormStartBeacon kind="project" />
      <Section tone="primary" className="pb-8 pt-14 md:pb-10 md:pt-16">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Start a Project</Eyebrow>
            <Heading
              level={1}
              as="h1"
              className="mt-5 text-[1.9rem] text-text-primary sm:text-4xl md:text-[2.75rem]"
            >
              Tell us what you&apos;re trying to improve.
            </Heading>
            <Text size="lead" muted className="mt-5">
              You do not need a technical specification. Start with the business
              problem, the process that is slowing you down, or what you are
              trying to build.
            </Text>
            <Text muted className="mt-4">
              We use this information to understand the request and determine
              the right next step.
            </Text>
          </div>
        </Container>
      </Section>

      <Section tone="muted" spacious className="pt-0 md:pt-0">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-4">
              <div className="space-y-8 lg:sticky lg:top-28">
                <Heading level={2} className="text-text-primary">
                  What to expect
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
                <ProjectInquiryForm turnstileSiteKey={turnstileSiteKey} />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
