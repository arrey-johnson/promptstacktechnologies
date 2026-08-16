import { Container, Heading, Section, Text } from "@/components/ui";
import { homepageWhy } from "@/content/homepage";

export function WhyPromptstack() {
  const { heading, statement, items } = homepageWhy;

  return (
    <Section
      tone="primary"
      spacious
      data-section="why-promptstack"
      aria-labelledby="homepage-why-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Heading
              id="homepage-why-heading"
              level={2}
              className="text-text-primary"
            >
              {heading}
            </Heading>
            <Text size="lead" muted className="mt-5 max-w-md">
              {statement}
            </Text>
          </div>

          <div className="lg:col-span-7">
            <ul className="space-y-0">
              {items.map((item, index) => (
                <li
                  key={item.title}
                  className="grid gap-3 border-t border-border-soft pt-7 pb-7 first:border-t-0 first:pt-0 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6"
                >
                  <span className="text-base font-semibold tracking-[0.1em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium text-text-primary md:text-2xl">
                      {item.title}
                    </h3>
                    <Text muted className="mt-3">
                      {item.body}
                    </Text>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
