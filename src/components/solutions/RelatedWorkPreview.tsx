import { Button, Container, Heading, Section, Text } from "@/components/ui";
import { DevelopmentPreviewLabel } from "@/components/home/DevelopmentPreviewLabel";
import type { RelatedWorkItem } from "@/content/solutions/types";
import {
  allowPlaceholderContent,
  resolveEditorialSet,
} from "@/lib/content-integrity";
import { getRelatedWorkForCategory } from "@/lib/work/get-case-studies";
import type { CaseStudyCategory } from "@/types/case-study";

type RelatedWorkPreviewProps = {
  heading: string;
  supporting: string;
  emptyMessage: string;
  cta: { label: string; href: string };
  /** Local integrity placeholders used only when Sanity is not the source. */
  featured: RelatedWorkItem;
  secondary: RelatedWorkItem[];
  analyticsPrefix: string;
  /** When set, prefer real Sanity case studies for this category. */
  category?: CaseStudyCategory;
  /** Pre-resolved CMS items (e.g. homepage Work reuse). */
  resolved?: {
    featured: RelatedWorkItem | null;
    secondary: RelatedWorkItem[];
    mode?: "preview" | "publishable";
  };
};

function WorkPreviewCard({
  project,
  featured = false,
  preview = false,
}: {
  project: RelatedWorkItem;
  featured?: boolean;
  preview?: boolean;
}) {
  const isPreviewPlaceholder = preview && project.isPlaceholder;

  return (
    <article
      className="border-t border-border-soft pt-8"
      data-placeholder={project.isPlaceholder ? "true" : undefined}
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
            : "mt-2 text-xl font-medium text-text-primary"
        }
      >
        {project.title}
      </h3>
      <dl className="mt-4 space-y-3 text-[1.0625rem] leading-relaxed md:text-lg">
        <div>
          <dt className="font-medium text-text-primary">Problem</dt>
          <dd className="mt-1 text-text-secondary">{project.problem}</dd>
        </div>
        <div>
          <dt className="font-medium text-text-primary">Solution</dt>
          <dd className="mt-1 text-text-secondary">{project.solution}</dd>
        </div>
      </dl>
      <div className="mt-5">
        {isPreviewPlaceholder ? (
          <span className="font-medium text-text-muted" aria-disabled="true">
            View Project
          </span>
        ) : (
          <a
            href={project.href}
            className="font-medium text-text-primary underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
          >
            View Project
          </a>
        )}
      </div>
    </article>
  );
}

export async function RelatedWorkPreview({
  heading,
  supporting,
  emptyMessage,
  cta,
  featured,
  secondary,
  analyticsPrefix,
  category,
  resolved,
}: RelatedWorkPreviewProps) {
  let editorial: {
    mode: "preview" | "publishable";
    featured: RelatedWorkItem | null;
    secondary: RelatedWorkItem[];
    hasItems: boolean;
  };

  if (resolved) {
    editorial = {
      mode: resolved.mode ?? "publishable",
      featured: resolved.featured,
      secondary: resolved.secondary,
      hasItems:
        Boolean(resolved.featured) || resolved.secondary.length > 0,
    };
  } else if (category) {
    const cms = await getRelatedWorkForCategory(category);
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
  } else if (allowPlaceholderContent()) {
    editorial = resolveEditorialSet(featured, secondary);
  } else {
    editorial = {
      mode: "publishable",
      featured: featured.isPlaceholder ? null : featured,
      secondary: secondary.filter((item) => !item.isPlaceholder),
      hasItems: false,
    };
    editorial.hasItems =
      Boolean(editorial.featured) || editorial.secondary.length > 0;
  }

  return (
    <Section
      tone="primary"
      spacious
      data-section="related-work"
      aria-labelledby="related-work-heading"
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Heading
              id="related-work-heading"
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
            data-analytics={`${analyticsPrefix}_work_index`}
          >
            {cta.label}
          </Button>
        </div>

        {editorial.hasItems ? (
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {editorial.featured ? (
              <WorkPreviewCard
                project={editorial.featured}
                featured
                preview={editorial.mode === "preview"}
              />
            ) : null}
            {editorial.secondary.map((project) => (
              <WorkPreviewCard
                key={project.id}
                project={project}
                preview={editorial.mode === "preview"}
              />
            ))}
          </div>
        ) : (
          <p className="mt-10 max-w-2xl text-[1.0625rem] leading-relaxed text-text-secondary md:text-lg">
            {emptyMessage}
          </p>
        )}
      </Container>
    </Section>
  );
}
