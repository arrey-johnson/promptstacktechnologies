import type { Metadata } from "next";
import { Button, Container, Eyebrow, Heading, Section, Text } from "@/components/ui";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Application received",
    description:
      "Promptstack Academy has received your application and will review the information you submitted.",
    path: "/academy/application-received",
    robots: {
      index: false,
      follow: false,
    },
  }),
};

export default function AcademyApplicationReceivedPage() {
  return (
    <main id="main-content">
      <Section tone="soft" spacious>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Application received</Eyebrow>
            <Heading level={1} as="h1" className="mt-5 text-text-primary">
              Thanks. We&apos;ve received your application.
            </Heading>
            <Text size="lead" muted className="mx-auto mt-5">
              Promptstack Academy will review the information you submitted and
              determine the appropriate next step.
            </Text>
          </div>
        </Container>
      </Section>

      <Section tone="primary" spacious>
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading level={2} className="text-text-primary">
              What happens next
            </Heading>
            <ol className="mt-8 space-y-6">
              {[
                "We review your application and program interest.",
                "We consider your current background, goals and readiness for the learning path.",
                "If appropriate, the next step will provide further information about the program or admissions process.",
              ].map((step, index) => (
                <li
                  key={step}
                  className="grid gap-3 border-t border-border-soft pt-5 sm:grid-cols-[3.5rem_minmax(0,1fr)]"
                >
                  <span className="text-base font-semibold tracking-[0.1em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[1.0625rem] text-text-secondary md:text-lg">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
            <Text muted className="mt-8">
              Receiving an application does not mean automatic admission, a
              reserved seat, or employment. Next steps depend on fit, readiness
              and program capacity.
            </Text>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/academy/programs" variant="secondary">
                Explore Programs
              </Button>
              <Button href="/academy/how-we-teach" variant="secondary">
                How We Teach
              </Button>
              <Button href="/">Return Home</Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
