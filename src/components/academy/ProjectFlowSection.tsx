import { Container, Heading, Section, Text } from "@/components/ui";

type ProjectFlowSectionProps = {
  heading: string;
  intro: string;
  flow: readonly string[];
  note?: string;
  tone?: "primary" | "muted" | "soft" | "dark";
  sectionId?: string;
};

export function ProjectFlowSection({
  heading,
  intro,
  flow,
  note,
  tone = "primary",
  sectionId = "project-flow",
}: ProjectFlowSectionProps) {
  const dark = tone === "dark";

  return (
    <Section
      tone={tone}
      spacious
      data-section={sectionId}
      aria-labelledby={`${sectionId}-heading`}
    >
      <Container>
        <div className="max-w-3xl">
          <Heading
            id={`${sectionId}-heading`}
            level={2}
            className={dark ? "text-white" : "text-text-primary"}
          >
            {heading}
          </Heading>
          <Text
            size="lead"
            muted={!dark}
            className={dark ? "mt-5 text-white/85" : "mt-5"}
          >
            {intro}
          </Text>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {flow.map((step, index) => (
            <li
              key={step}
              className={
                dark
                  ? "rounded-[var(--radius-card)] border border-white/15 bg-white/5 px-5 py-5"
                  : "rounded-[var(--radius-card)] border border-border-soft bg-surface-primary px-5 py-5"
              }
            >
              <span
                className={
                  dark
                    ? "text-sm font-semibold tracking-[0.12em] text-brand-lavender"
                    : "text-sm font-semibold tracking-[0.12em] text-accent"
                }
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p
                className={
                  dark
                    ? "mt-3 text-lg font-medium text-white"
                    : "mt-3 text-lg font-medium text-text-primary"
                }
              >
                {step}
              </p>
            </li>
          ))}
        </ol>
        {note ? (
          <p
            className={
              dark
                ? "mt-8 max-w-3xl text-sm text-white/70"
                : "mt-8 max-w-3xl text-sm text-text-muted"
            }
          >
            {note}
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
