import { Button, Container, Eyebrow, Heading, Text } from "@/components/ui";
import { cn } from "@/lib/cn";
import { SolutionVisual, type SolutionVisualKind } from "./SolutionVisual";

type AreaModule = {
  id: string;
  label: string;
  situation: string;
  change: string;
  capabilities: readonly string[];
  cta: { label: string; href: string };
  visual: Extract<SolutionVisualKind, "software" | "automation" | "marketing">;
  align: "text-first" | "visual-first";
};

type SolutionAreaModulesProps = {
  heading: string;
  intro: string;
  modules: readonly AreaModule[];
};

export function SolutionAreaModules({
  heading,
  intro,
  modules,
}: SolutionAreaModulesProps) {
  return (
    <section
      aria-labelledby="solution-areas-heading"
      data-section="solution-areas"
      className="bg-surface-primary"
    >
      <Container className="pb-2 pt-16 md:pt-20 lg:pt-24">
        <div className="max-w-3xl">
          <Heading
            id="solution-areas-heading"
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
        <div
          key={module.id}
          className={cn(
            "py-12 md:py-16 lg:py-20",
            index % 2 === 1 ? "bg-surface-muted" : "bg-surface-primary",
          )}
        >
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div
                className={cn(module.align === "visual-first" && "lg:order-2")}
              >
                <Eyebrow className="mb-4">{module.label}</Eyebrow>
                <Heading level={3} as="h3" className="text-text-primary">
                  {module.situation}
                </Heading>
                <Text muted className="mt-5 max-w-xl">
                  {module.change}
                </Text>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {module.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-start gap-2.5 text-[0.95rem] text-text-secondary md:text-base"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    href={module.cta.href}
                    variant="secondary"
                    size="lg"
                    data-analytics={`cta_solutions_area_${module.id}`}
                  >
                    {module.cta.label}
                  </Button>
                </div>
              </div>
              <div
                className={cn(module.align === "visual-first" && "lg:order-1")}
              >
                <SolutionVisual kind={module.visual} />
              </div>
            </div>
          </Container>
        </div>
      ))}
    </section>
  );
}
