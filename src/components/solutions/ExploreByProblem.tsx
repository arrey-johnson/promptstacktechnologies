import Link from "next/link";
import { Container, Heading, Section, Text } from "@/components/ui";

type ExploreItem = {
  id: string;
  title: string;
  body: string;
  related: ReadonlyArray<{ label: string; href: string }>;
};

type ExploreByProblemProps = {
  id: string;
  heading: string;
  intro: string;
  items: readonly ExploreItem[];
};

export function ExploreByProblem({
  id,
  heading,
  intro,
  items,
}: ExploreByProblemProps) {
  return (
    <Section
      id={id}
      tone="soft"
      spacious
      data-section="explore-by-problem"
      aria-labelledby="explore-by-problem-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Heading
            id="explore-by-problem-heading"
            level={2}
            className="text-text-primary"
          >
            {heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {intro}
          </Text>
        </div>

        <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:mt-12">
          {items.map((item) => (
            <li
              key={item.id}
              id={item.id}
              className="border-t border-border-soft pt-5 scroll-mt-28"
            >
              <h3 className="text-xl font-medium text-text-primary md:text-2xl">
                {item.title}
              </h3>
              <Text muted className="mt-3">
                {item.body}
              </Text>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {item.related.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.95rem] font-medium text-text-primary underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
