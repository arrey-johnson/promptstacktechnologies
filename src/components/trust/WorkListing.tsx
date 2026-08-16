import { Container, Heading, Section, Text } from "@/components/ui";
import { DevelopmentPreviewLabel } from "@/components/home/DevelopmentPreviewLabel";
import { contentTypeLabel, type CaseStudy } from "@/types/case-study";

type WorkListingProps = {
  featured: CaseStudy | null;
  items: CaseStudy[];
  mode: "preview" | "publishable";
};

function WorkCard({
  project,
  featured = false,
  preview = false,
}: {
  project: CaseStudy;
  featured?: boolean;
  preview?: boolean;
}) {
  const isPreviewPlaceholder = preview && project.isPlaceholder;

  return (
    <article
      className={
        featured
          ? "border-t border-border-soft pt-8 lg:border-t-0 lg:pt-0"
          : "border-t border-border-soft pt-8"
      }
      data-placeholder={project.isPlaceholder ? "true" : undefined}
    >
      {isPreviewPlaceholder ? (
        <DevelopmentPreviewLabel noun="case study" />
      ) : null}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <p className="text-sm font-medium uppercase tracking-[0.11em] text-accent">
          {project.categoryLabel}
        </p>
        <span aria-hidden="true" className="text-border-strong">
          ·
        </span>
        <p className="text-sm text-text-muted">
          {contentTypeLabel(project.contentType)}
        </p>
      </div>

      <h3
        className={
          featured
            ? "mt-3 text-2xl font-medium text-text-primary md:text-3xl"
            : "mt-2 text-xl font-medium text-text-primary md:text-2xl"
        }
      >
        {project.title}
      </h3>

      <Text muted className="mt-3">
        {project.summary}
      </Text>

      <dl className="mt-5 space-y-3 text-[1.0625rem] leading-relaxed md:text-lg">
        <div>
          <dt className="font-medium text-text-primary">Problem</dt>
          <dd className="mt-1 text-text-secondary">{project.businessProblem}</dd>
        </div>
        <div>
          <dt className="font-medium text-text-primary">Solution</dt>
          <dd className="mt-1 text-text-secondary">{project.solution}</dd>
        </div>
        {project.outcome ? (
          <div>
            <dt className="font-medium text-text-primary">Outcome</dt>
            <dd className="mt-1 text-text-secondary">{project.outcome}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-6">
        {isPreviewPlaceholder ? (
          <span className="font-medium text-text-muted" aria-disabled="true">
            View case study
          </span>
        ) : (
          <a
            href={`/work/${project.slug}`}
            className="font-medium text-text-primary underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
            data-analytics="cta_work_case_study"
          >
            View case study
          </a>
        )}
      </div>
    </article>
  );
}

export function WorkListing({ featured, items, mode }: WorkListingProps) {
  const secondary = items.filter((item) => item.id !== featured?.id);

  return (
    <Section
      tone="primary"
      spacious
      data-section="work-listing"
      aria-labelledby="work-listing-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Heading
            id="work-listing-heading"
            level={2}
            className="text-text-primary"
          >
            Selected Work
          </Heading>
          <Text size="lead" muted className="mt-4">
            {mode === "preview"
              ? "Development preview layout only. These records are not published Promptstack case studies."
              : "Selected engagements that show how business problems became working solutions."}
          </Text>
        </div>

        {featured ? (
          <div className="mt-10 lg:mt-12">
            <WorkCard
              project={featured}
              featured
              preview={mode === "preview"}
            />
          </div>
        ) : null}

        {secondary.length > 0 ? (
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {secondary.map((project) => (
              <WorkCard
                key={project.id}
                project={project}
                preview={mode === "preview"}
              />
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
