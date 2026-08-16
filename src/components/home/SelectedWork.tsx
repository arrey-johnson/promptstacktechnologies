import { Button, Container, Heading, Section, Text } from "@/components/ui";
import { homepageWork, type WorkProject } from "@/content/homepage";
import {
  allowPlaceholderContent,
  resolveEditorialSet,
} from "@/lib/content-integrity";
import { getHomepageSelectedWork } from "@/lib/work/get-case-studies";
import { DevelopmentPreviewLabel } from "./DevelopmentPreviewLabel";
import { VisualPlaceholder } from "./VisualPlaceholder";

function WorkCard({
  project,
  featured = false,
  preview = false,
}: {
  project: WorkProject;
  featured?: boolean;
  preview?: boolean;
}) {
  const isPreviewPlaceholder = preview && project.isPlaceholder;

  return (
    <article
      className={
        featured
          ? "grid gap-8 lg:grid-cols-12 lg:gap-10"
          : "flex flex-col border-t border-border-soft pt-8"
      }
      data-placeholder={project.isPlaceholder ? "true" : undefined}
    >
      <div className={featured ? "lg:col-span-7" : undefined}>
        <VisualPlaceholder
          kind="work"
          className="border border-border-soft"
          label={`${project.title} visual`}
        />
      </div>

      <div
        className={
          featured
            ? "flex flex-col justify-center lg:col-span-5"
            : "mt-5 flex flex-1 flex-col"
        }
      >
        {isPreviewPlaceholder ? (
          <DevelopmentPreviewLabel noun="case study" />
        ) : null}

        <p className="text-sm font-medium uppercase tracking-[0.11em] text-accent">
          {project.category}
        </p>
        <h3
          className={
            featured
              ? "mt-3 text-2xl font-medium text-text-primary md:text-3xl"
              : "mt-2 text-xl font-medium text-text-primary md:text-2xl"
          }
        >
          {project.title}
        </h3>

        <dl className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed md:text-lg">
          <div>
            <dt className="font-medium text-text-primary">Problem</dt>
            <dd className="mt-1 text-text-secondary">{project.problem}</dd>
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
            <span
              className="font-medium text-text-muted"
              aria-disabled="true"
            >
              View Project
            </span>
          ) : (
            <a
              href={project.href}
              className="font-medium text-text-primary underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
              data-analytics={
                featured ? "cta_work_featured" : `cta_work_${project.id}`
              }
            >
              View Project
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export async function SelectedWork() {
  const { heading, supporting, cta, featured, secondary } = homepageWork;
  const cms = await getHomepageSelectedWork();

  let editorial: {
    mode: "preview" | "publishable";
    featured: WorkProject | null;
    secondary: WorkProject[];
    hasItems: boolean;
  };

  if (cms.source === "sanity") {
    editorial = {
      mode: "publishable",
      featured: cms.featured,
      secondary: cms.secondary,
      hasItems: Boolean(cms.featured) || cms.secondary.length > 0,
    };
  } else if (allowPlaceholderContent()) {
    editorial = resolveEditorialSet(featured, secondary);
  } else {
    editorial = {
      mode: "publishable",
      featured: null,
      secondary: [],
      hasItems: false,
    };
  }

  return (
    <Section
      tone="primary"
      spacious
      data-section="selected-work"
      aria-labelledby="homepage-work-heading"
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Heading
              id="homepage-work-heading"
              level={2}
              className="text-text-primary"
            >
              {heading}
            </Heading>
            <Text size="lead" muted className="mt-4">
              {supporting}
            </Text>
          </div>
          <Button
            href={cta.href}
            variant="secondary"
            data-analytics="cta_work_index"
          >
            {cta.label}
          </Button>
        </div>

        {editorial.hasItems ? (
          <>
            {editorial.featured ? (
              <div className="mt-10 lg:mt-12">
                <WorkCard
                  project={editorial.featured}
                  featured
                  preview={editorial.mode === "preview"}
                />
              </div>
            ) : null}

            {editorial.secondary.length > 0 ? (
              <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
                {editorial.secondary.map((project) => (
                  <WorkCard
                    key={project.id}
                    project={project}
                    preview={editorial.mode === "preview"}
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <p className="mt-10 max-w-2xl text-[1.0625rem] leading-relaxed text-text-secondary md:text-lg">
            Selected project stories will appear here once approved case studies
            are published.
          </p>
        )}
      </Container>
    </Section>
  );
}
