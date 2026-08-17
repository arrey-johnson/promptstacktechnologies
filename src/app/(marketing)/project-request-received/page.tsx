import type { Metadata } from "next";
import { ConversionSuccessBeacon } from "@/components/analytics";
import { Button, Container, Eyebrow, Heading, Section, Text } from "@/components/ui";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Project request received",
    description:
      "Promptstack has received your project request and will review the information you shared.",
    path: "/project-request-received",
    robots: {
      index: false,
      follow: false,
    },
  }),
};

export default function ProjectRequestReceivedPage() {
  return (
    <main id="main-content">
      <ConversionSuccessBeacon kind="project" />
      <Section tone="primary" spacious>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Request received</Eyebrow>
            <Heading
              level={1}
              as="h1"
              className="mt-5 text-text-primary"
            >
              Thanks. We&apos;ve received your project request.
            </Heading>
            <Text size="lead" muted className="mx-auto mt-5">
              Our team will review the information you shared and determine the
              appropriate next step.
            </Text>
          </div>
        </Container>
      </Section>

      <Section tone="muted" spacious>
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading level={2} className="text-text-primary">
              What happens next
            </Heading>
            <ol className="mt-8 space-y-6">
              {[
                "We review the request.",
                "We identify the most relevant Promptstack capability.",
                "If the opportunity is a fit, the next conversation focuses on understanding the problem and project context in more detail.",
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
              Receiving a request does not automatically mean the project is
              qualified. The next step depends on fit, timing and context.
            </Text>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/work" variant="secondary">
                View Our Work
              </Button>
              <Button href="/how-we-work" variant="secondary">
                How We Work
              </Button>
              <Button href="/">Return Home</Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
