import { Button, Container, Eyebrow, Heading, Section, Text } from "@/components/ui";
import { CommercialCTA } from "@/components/solutions";
import {
  contentTypeLabel,
  type CaseStudy,
} from "@/types/case-study";

type CaseStudyDetailProps = {
  caseStudy: CaseStudy;
};

/**
 * Reusable case-study detail presentation for future real CMS records.
 * Only render with non-placeholder published data.
 */
export function CaseStudyDetail({ caseStudy }: CaseStudyDetailProps) {
  const {
    title,
    categoryLabel,
    contentType,
    clientName,
    industry,
    summary,
    businessProblem,
    whyItMattered,
    approach,
    solution,
    implementation,
    outcome,
    outcomeMetrics,
    services,
    technologies,
    testimonial,
  } = caseStudy;

  return (
    <>
      <section
        aria-labelledby="case-study-heading"
        className="bg-surface-primary"
        data-section="case-study-hero"
      >
        <Container className="py-14 md:py-16 lg:py-20">
          <Eyebrow className="mb-4">{categoryLabel}</Eyebrow>
          <p className="text-sm text-text-muted">
            {contentTypeLabel(contentType)}
            {clientName ? ` · ${clientName}` : null}
            {industry ? ` · ${industry}` : null}
          </p>
          <Heading
            id="case-study-heading"
            level={1}
            as="h1"
            className="mt-4 max-w-4xl text-text-primary"
          >
            {title}
          </Heading>
          <Text size="lead" muted className="mt-6 max-w-3xl">
            {summary}
          </Text>
        </Container>
      </section>

      <CaseStudyBlock heading="Business problem" body={businessProblem} />
      {whyItMattered ? (
        <CaseStudyBlock
          heading="Why it mattered"
          body={whyItMattered}
          tone="muted"
        />
      ) : null}
      {approach ? (
        <CaseStudyBlock heading="Approach" body={approach} />
      ) : null}
      <CaseStudyBlock heading="Solution" body={solution} tone="soft" />
      {implementation ? (
        <CaseStudyBlock heading="Implementation" body={implementation} />
      ) : null}
      {outcome ? (
        <CaseStudyBlock heading="Outcome" body={outcome} tone="muted" />
      ) : null}

      {outcomeMetrics.length > 0 ? (
        <Section tone="primary" spacious data-section="case-study-metrics">
          <Container>
            <Heading level={2} className="text-text-primary">
              Verified results
            </Heading>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {outcomeMetrics.map((metric) => (
                <li
                  key={metric.label}
                  className="border-t border-border-soft pt-5"
                >
                  <p className="text-2xl font-medium text-text-primary">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-text-secondary">{metric.label}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {(services.length > 0 || technologies.length > 0) && (
        <Section tone="primary" spacious data-section="case-study-services">
          <Container>
            <div className="grid gap-10 md:grid-cols-2">
              {services.length > 0 ? (
                <div>
                  <Heading level={2} className="text-text-primary">
                    Services
                  </Heading>
                  <ul className="mt-5 space-y-2">
                    {services.map((service) => (
                      <li key={service} className="text-text-secondary">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {technologies.length > 0 ? (
                <div>
                  <Heading level={2} className="text-text-primary">
                    Technologies
                  </Heading>
                  <ul className="mt-5 space-y-2">
                    {technologies.map((tech) => (
                      <li key={tech} className="text-text-secondary">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      )}

      {testimonial ? (
        <Section tone="soft" spacious data-section="case-study-testimonial">
          <Container>
            <blockquote className="mx-auto max-w-3xl">
              <p className="text-xl font-medium text-text-primary md:text-2xl">
                “{testimonial.quote}”
              </p>
              <footer className="mt-6 text-text-secondary">
                <cite className="not-italic font-medium text-text-primary">
                  {testimonial.person}
                </cite>
                {testimonial.role || testimonial.organization ? (
                  <span>
                    {" "}
                    — {[testimonial.role, testimonial.organization]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                ) : null}
              </footer>
            </blockquote>
          </Container>
        </Section>
      ) : null}

      <Section tone="muted" className="py-10">
        <Container>
          <div className="flex flex-wrap gap-3">
            <Button href="/work" variant="secondary">
              Back to Work
            </Button>
            <Button href="/start-a-project">Start a Project</Button>
          </div>
        </Container>
      </Section>

      <CommercialCTA
        heading="Ready to improve something in your business?"
        subheading="Tell us the problem. You do not need to know the technical solution."
        body="Explain what is slowing the business down, what you want to improve or what you are trying to build."
        cta={{ label: "Start a Project", href: "/start-a-project" }}
        analyticsId="cta_case_study_final"
      />
    </>
  );
}

function CaseStudyBlock({
  heading,
  body,
  tone = "primary",
}: {
  heading: string;
  body: string;
  tone?: "primary" | "muted" | "soft";
}) {
  return (
    <Section tone={tone} spacious>
      <Container>
        <div className="max-w-3xl">
          <Heading level={2} className="text-text-primary">
            {heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {body}
          </Text>
        </div>
      </Container>
    </Section>
  );
}
