import { Container, Heading, Section, Text } from "@/components/ui";
import { workCategoriesExplainer, workDocumentation } from "@/content/work";

export function WorkDocumentation() {
  const { heading, intro, steps } = workDocumentation;

  return (
    <Section
      tone="soft"
      spacious
      data-section="work-documentation"
      aria-labelledby="work-documentation-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Heading
              id="work-documentation-heading"
              level={2}
              className="text-text-primary"
            >
              {heading}
            </Heading>
            <Text size="lead" muted className="mt-5">
              {intro}
            </Text>
          </div>

          <ol className="lg:col-span-7 space-y-0">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-3 border-t border-border-soft py-6 first:border-t-0 first:pt-0 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6"
              >
                <span className="text-base font-semibold tracking-[0.1em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-medium text-text-primary md:text-2xl">
                    {step.title}
                  </h3>
                  <Text muted className="mt-2">
                    {step.body}
                  </Text>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 border-t border-border-soft pt-10">
          <Heading level={3} as="h3" className="text-text-primary">
            {workCategoriesExplainer.heading}
          </Heading>
          <Text muted className="mt-4 max-w-3xl">
            {workCategoriesExplainer.intro}
          </Text>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {workCategoriesExplainer.items.map((item) => (
              <li
                key={item}
                className="text-[0.95rem] font-medium text-text-secondary md:text-base"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
