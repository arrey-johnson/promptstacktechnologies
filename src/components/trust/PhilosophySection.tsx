import { Container, Heading, Section, Text } from "@/components/ui";
import { howWeWorkPhilosophy } from "@/content/how-we-work";

export function PhilosophySection() {
  const { heading, intro, points } = howWeWorkPhilosophy;

  return (
    <Section
      tone="soft"
      spacious
      data-section="philosophy"
      aria-labelledby="philosophy-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Heading
              id="philosophy-heading"
              level={2}
              className="text-text-primary"
            >
              {heading}
            </Heading>
            <Text size="lead" muted className="mt-5">
              {intro}
            </Text>
          </div>
          <ol className="lg:col-span-7 space-y-0 divide-y divide-border-soft border-y border-border-soft">
            {points.map((point, index) => (
              <li
                key={point.title}
                className="grid gap-2 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6"
              >
                <span className="text-base font-semibold tracking-[0.1em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-medium text-text-primary md:text-2xl">
                    {point.title}
                  </h3>
                  <Text muted className="mt-2">
                    {point.body}
                  </Text>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
