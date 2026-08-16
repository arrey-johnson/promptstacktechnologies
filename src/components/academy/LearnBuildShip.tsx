import { Container, Heading, Section, Text } from "@/components/ui";

type Stage = {
  id: string;
  title: string;
  body: string;
};

type LearnBuildShipProps = {
  heading: string;
  intro: string;
  stages: readonly Stage[];
};

export function LearnBuildShip({
  heading,
  intro,
  stages,
}: LearnBuildShipProps) {
  return (
    <Section
      tone="soft"
      spacious
      data-section="learn-build-ship"
      aria-labelledby="lbs-heading"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(168,0,230,0.08),transparent_40%)]"
      />
      <Container className="relative">
        <div className="max-w-3xl">
          <Heading id="lbs-heading" level={2} className="text-text-primary">
            {heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {intro}
          </Text>
        </div>

        <ol className="mt-12 space-y-0 border-t border-border-soft">
          {stages.map((stage, index) => (
            <li
              key={stage.id}
              className="grid gap-4 border-b border-border-soft py-8 md:grid-cols-[6rem_minmax(0,1fr)] md:gap-10 md:py-10"
            >
              <div className="flex items-baseline gap-3 md:block">
                <span className="text-sm font-semibold tracking-[0.14em] text-accent uppercase">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-2xl font-medium text-text-primary md:mt-3 md:block md:text-3xl">
                  {stage.title}
                </span>
              </div>
              <Text muted className="max-w-2xl self-center text-[1.0625rem] md:text-lg">
                {stage.body}
              </Text>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
