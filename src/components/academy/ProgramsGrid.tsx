import { Button, Container, Heading, Section, Text } from "@/components/ui";
import type { ProgramCard } from "@/content/academy/types";

type ProgramsGridProps = {
  heading: string;
  intro: string;
  programs: readonly ProgramCard[];
  analyticsPrefix?: string;
};

export function ProgramsGrid({
  heading,
  intro,
  programs,
  analyticsPrefix = "academy",
}: ProgramsGridProps) {
  return (
    <Section
      tone="primary"
      spacious
      data-section="academy-programs"
      aria-labelledby="academy-programs-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Heading
            id="academy-programs-heading"
            level={2}
            className="text-text-primary"
          >
            {heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {intro}
          </Text>
        </div>

        <ul className="mt-12 divide-y divide-border-soft border-y border-border-soft">
          {programs.map((program) => (
            <li
              key={program.slug}
              className="grid gap-6 py-8 lg:grid-cols-12 lg:items-end lg:gap-10 lg:py-10"
            >
              <div className="lg:col-span-4">
                <h3 className="text-2xl font-medium text-text-primary md:text-[1.75rem]">
                  {program.title}
                </h3>
                <p className="mt-3 text-[1.0625rem] text-text-secondary md:text-lg">
                  {program.shortPromise}
                </p>
              </div>
              <div className="space-y-3 lg:col-span-5">
                <p className="text-sm font-medium tracking-[0.08em] text-accent uppercase">
                  Practical focus
                </p>
                <p className="text-text-secondary">{program.practicalFocus}</p>
                <p className="text-text-secondary">
                  <span className="font-medium text-text-primary">
                    May build:{" "}
                  </span>
                  {program.mayBuild}
                </p>
                <p className="text-text-secondary">
                  <span className="font-medium text-text-primary">
                    Suited for:{" "}
                  </span>
                  {program.suitedFor}
                </p>
              </div>
              <div className="lg:col-span-3 lg:justify-self-end">
                <Button
                  href={program.href}
                  variant="secondary"
                  data-analytics={`${analyticsPrefix}_program_${program.slug}`}
                >
                  Explore Program
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
