import { Container, Heading, Text } from "@/components/ui";
import type { DeliveryStage } from "@/content/how-we-work";
import { cn } from "@/lib/cn";

type ProcessJourneyProps = {
  stages: readonly DeliveryStage[];
};

export function ProcessJourney({ stages }: ProcessJourneyProps) {
  return (
    <section
      aria-labelledby="delivery-model-heading"
      data-section="delivery-model"
      className="bg-surface-primary"
    >
      <Container className="pt-16 md:pt-20 lg:pt-24">
        <div className="max-w-3xl">
          <Heading
            id="delivery-model-heading"
            level={2}
            className="text-text-primary"
          >
            A structured path from problem to solution
          </Heading>
          <Text size="lead" muted className="mt-5">
            Each stage expands the same delivery model used across Promptstack
            projects. The depth of documentation and ceremony scales to the
            engagement — the discipline does not disappear.
          </Text>
        </div>
      </Container>

      <ol className="mt-4">
        {stages.map((stage, index) => (
          <li
            key={stage.number}
            id={`stage-${stage.title.toLowerCase()}`}
            className={cn(
              "scroll-mt-28 border-t border-border-soft",
              index % 2 === 0 ? "bg-surface-primary" : "bg-surface-muted",
            )}
          >
            <Container className="py-12 md:py-16 lg:py-20">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-4">
                  <p className="text-base font-semibold tracking-[0.12em] text-accent">
                    {stage.number}
                  </p>
                  <Heading
                    level={3}
                    as="h3"
                    className="mt-3 text-text-primary"
                  >
                    {stage.title}
                  </Heading>
                  <Text muted className="mt-4">
                    {stage.summary}
                  </Text>
                </div>

                <div className="space-y-8 lg:col-span-8">
                  <div>
                    <h4 className="text-lg font-medium text-text-primary">
                      What happens
                    </h4>
                    <Text muted className="mt-2">
                      {stage.whatHappens}
                    </Text>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-text-primary">
                      Why it matters
                    </h4>
                    <Text muted className="mt-2">
                      {stage.whyItMatters}
                    </Text>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-text-primary">
                      What Promptstack does
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {stage.whatWeDo.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[1.0625rem] text-text-secondary md:text-lg"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="border-t border-border-soft pt-5">
                      <h4 className="text-lg font-medium text-text-primary">
                        Client involvement
                      </h4>
                      <Text muted className="mt-2">
                        {stage.clientInvolvement}
                      </Text>
                    </div>
                    <div className="border-t border-border-soft pt-5">
                      <h4 className="text-lg font-medium text-text-primary">
                        Stage outcome
                      </h4>
                      <Text muted className="mt-2">
                        {stage.outcome}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </li>
        ))}
      </ol>
    </section>
  );
}
