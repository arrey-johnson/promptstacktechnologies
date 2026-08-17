import Link from "next/link";
import { Container, Heading, Section, Text } from "@/components/ui";
import {
  aboutAcademy,
  aboutDivisions,
  aboutFounder,
  aboutMarket,
  aboutPhilosophy,
  aboutProblems,
  aboutProcessBridge,
  aboutStory,
} from "@/content/company";

export function AboutStory() {
  return (
    <Section
      tone="soft"
      spacious
      data-section="about-story"
      aria-labelledby="about-story-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Heading id="about-story-heading" level={2} className="text-text-primary">
            {aboutStory.heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {aboutStory.intro}
          </Text>
          <Text muted className="mt-4">
            {aboutStory.body}
          </Text>
        </div>
      </Container>
    </Section>
  );
}

export function AboutProblems() {
  return (
    <Section
      tone="primary"
      spacious
      data-section="about-problems"
      aria-labelledby="about-problems-heading"
    >
      <Container>
        <Heading
          id="about-problems-heading"
          level={2}
          className="max-w-3xl text-text-primary"
        >
          {aboutProblems.heading}
        </Heading>
        <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {aboutProblems.items.map((item, index) => (
            <li key={item.title} className="border-t border-border-soft pt-5">
              <p className="text-sm font-medium uppercase tracking-[0.11em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-xl font-medium text-text-primary">
                {item.title}
              </h3>
              <Text muted className="mt-3">
                {item.body}
              </Text>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function AboutDivisions() {
  return (
    <Section
      tone="muted"
      spacious
      data-section="about-divisions"
      aria-labelledby="about-divisions-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Heading
            id="about-divisions-heading"
            level={2}
            className="text-text-primary"
          >
            {aboutDivisions.heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {aboutDivisions.intro}
          </Text>
        </div>
        <ul className="mt-12 space-y-0 divide-y divide-border-soft border-y border-border-soft">
          {aboutDivisions.items.map((item) => (
            <li
              key={item.id}
              className="grid gap-4 py-8 md:grid-cols-12 md:items-start md:gap-10 md:py-10"
            >
              <div className="md:col-span-5">
                <h3 className="text-xl font-medium text-text-primary md:text-2xl">
                  {item.title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <Text muted>{item.body}</Text>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex text-sm font-medium text-accent transition-colors hover:text-brand-navy"
                  data-analytics={`cta_about_division_${item.id}`}
                >
                  {item.cta}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function AboutPhilosophy() {
  return (
    <Section
      tone="primary"
      spacious
      data-section="about-philosophy"
      aria-labelledby="about-philosophy-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Heading
            id="about-philosophy-heading"
            level={2}
            className="text-text-primary"
          >
            {aboutPhilosophy.heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {aboutPhilosophy.intro}
          </Text>
          <Text muted className="mt-4">
            {aboutPhilosophy.body}
          </Text>
        </div>
      </Container>
    </Section>
  );
}

export function AboutMarket() {
  return (
    <Section
      tone="soft"
      spacious
      data-section="about-market"
      aria-labelledby="about-market-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Heading
            id="about-market-heading"
            level={2}
            className="text-text-primary"
          >
            {aboutMarket.heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {aboutMarket.intro}
          </Text>
          <Text muted className="mt-4">
            {aboutMarket.body}
          </Text>
        </div>
      </Container>
    </Section>
  );
}

export function AboutFounder() {
  return (
    <Section
      tone="primary"
      spacious
      data-section="about-founder"
      aria-labelledby="about-founder-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div className="lg:col-span-4">
            <div
              className="flex aspect-[4/5] items-end bg-surface-muted p-6"
              data-todo-asset="founder-photography"
              role="img"
              aria-label={aboutFounder.imageAlt}
            >
              <p className="text-sm text-text-muted">
                TODO_ASSET: Approved founder photography
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Heading
              id="about-founder-heading"
              level={2}
              className="text-text-primary"
            >
              {aboutFounder.heading}
            </Heading>
            <p className="mt-6 text-2xl font-medium text-text-primary">
              {aboutFounder.name}
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.11em] text-accent">
              {aboutFounder.role}
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              {aboutFounder.organization}
            </p>
            <Text muted className="mt-5">
              {aboutFounder.body}
            </Text>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function AboutAcademy() {
  return (
    <Section
      tone="muted"
      spacious
      data-section="about-academy"
      aria-labelledby="about-academy-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Heading
            id="about-academy-heading"
            level={2}
            className="text-text-primary"
          >
            {aboutAcademy.heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {aboutAcademy.intro}
          </Text>
          <Text muted className="mt-4">
            {aboutAcademy.body}
          </Text>
          <Link
            href={aboutAcademy.cta.href}
            className="mt-6 inline-flex text-sm font-medium text-accent transition-colors hover:text-brand-navy"
            data-analytics="cta_about_academy"
          >
            {aboutAcademy.cta.label}
          </Link>
        </div>
      </Container>
    </Section>
  );
}

export function AboutProcessBridge() {
  return (
    <Section
      tone="primary"
      spacious
      data-section="about-process"
      aria-labelledby="about-process-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Heading
            id="about-process-heading"
            level={2}
            className="text-text-primary"
          >
            {aboutProcessBridge.heading}
          </Heading>
          <Text muted className="mt-5">
            {aboutProcessBridge.body}
          </Text>
          <Link
            href={aboutProcessBridge.cta.href}
            className="mt-6 inline-flex text-sm font-medium text-accent transition-colors hover:text-brand-navy"
            data-analytics="cta_about_how_we_work"
          >
            {aboutProcessBridge.cta.label}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
