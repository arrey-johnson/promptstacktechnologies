import { Container, Heading, Section, Text } from "@/components/ui";
import { homepageProblems } from "@/content/homepage";

export function BusinessProblems() {
  const { heading, intro, items } = homepageProblems;

  return (
    <Section
      tone="primary"
      spacious
      data-section="business-problems"
      aria-labelledby="homepage-problems-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Heading id="homepage-problems-heading" level={2}>
            {heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {intro}
          </Text>
        </div>

        <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-y-10">
          {items.map((item) => (
            <li
              key={item.number}
              className="border-t border-border-soft pt-5"
            >
              <p className="text-base font-semibold tracking-[0.1em] text-accent">
                {item.number}
              </p>
              <h3 className="mt-2.5 text-xl font-medium text-text-primary md:text-2xl">
                {item.title}
              </h3>
              <Text muted className="mt-3">
                {item.body}
              </Text>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
