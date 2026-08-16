import { Container, Heading, Section, Text } from "@/components/ui";
import { homepageOutcomes } from "@/content/homepage";

export function BusinessOutcomes() {
  const { heading, intro, items } = homepageOutcomes;

  return (
    <Section
      tone="soft"
      spacious
      data-section="business-outcomes"
      aria-labelledby="homepage-outcomes-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Heading
              id="homepage-outcomes-heading"
              level={2}
              className="text-text-primary"
            >
              {heading}
            </Heading>
            <Text size="lead" muted className="mt-5">
              {intro}
            </Text>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-border-soft border-y border-border-soft">
              {items.map((item) => (
                <li
                  key={item.title}
                  className="grid gap-2 py-6 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] sm:gap-8 sm:py-7"
                >
                  <h3 className="text-xl font-medium text-text-primary md:text-2xl">
                    {item.title}
                  </h3>
                  <Text muted className="sm:pt-0.5">
                    {item.body}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
