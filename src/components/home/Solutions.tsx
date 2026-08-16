import { Container, Heading, Text } from "@/components/ui";
import { homepageSolutions } from "@/content/homepage";
import { SolutionFeature } from "./SolutionFeature";

export function Solutions() {
  const { heading, intro, modules } = homepageSolutions;

  return (
    <section
      aria-labelledby="homepage-solutions-heading"
      data-section="solutions"
      className="bg-surface-primary"
    >
      <Container className="pb-2 pt-16 md:pt-20 lg:pt-24">
        <div className="max-w-3xl">
          <Heading
            id="homepage-solutions-heading"
            level={2}
            className="text-text-primary"
          >
            {heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {intro}
          </Text>
        </div>
      </Container>

      {modules.map((module, index) => (
        <SolutionFeature
          key={module.id}
          label={module.label}
          outcome={module.outcome}
          body={module.body}
          capabilities={module.capabilities}
          cta={module.cta}
          align={module.align}
          visual={module.visual}
          analyticsId={`cta_solution_${module.id}`}
          tone={index % 2 === 1 ? "muted" : "primary"}
        />
      ))}
    </section>
  );
}
