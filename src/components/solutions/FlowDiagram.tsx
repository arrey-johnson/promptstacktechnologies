import { Container, Heading, Section, Text } from "@/components/ui";
import type { FlowStep } from "@/content/solutions/types";
import { cn } from "@/lib/cn";

type FlowDiagramProps = {
  id?: string;
  heading: string;
  intro: string;
  label: string;
  steps: readonly FlowStep[];
  tone?: "primary" | "soft" | "muted" | "dark";
};

export function FlowDiagram({
  id = "flow-diagram",
  heading,
  intro,
  label,
  steps,
  tone = "soft",
}: FlowDiagramProps) {
  const isDark = tone === "dark";

  return (
    <Section
      id={id}
      tone={tone}
      spacious
      data-section="flow-diagram"
      aria-labelledby={`${id}-heading`}
    >
      <Container>
        <div className="max-w-3xl">
          <Heading
            id={`${id}-heading`}
            level={2}
            className={isDark ? "text-white" : "text-text-primary"}
          >
            {heading}
          </Heading>
          <Text
            size="lead"
            muted={!isDark}
            className={cn("mt-5", isDark && "text-white/80")}
          >
            {intro}
          </Text>
          <p
            className={cn(
              "mt-4 text-sm font-medium",
              isDark ? "text-brand-lavender" : "text-text-muted",
            )}
          >
            {label}
          </p>
        </div>

        <ol className="mt-10 space-y-0 md:mt-12">
          {steps.map((step, index) => (
            <li key={step.label} className="relative flex gap-4 md:gap-6">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                    isDark
                      ? "border-white/30 bg-white/10 text-white"
                      : "border-accent/40 bg-surface-primary text-accent",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "my-1 w-px flex-1 min-h-8",
                      isDark ? "bg-white/20" : "bg-border-strong/40",
                    )}
                  />
                ) : null}
              </div>
              <div className={cn("pb-8", index === steps.length - 1 && "pb-0")}>
                <h3
                  className={cn(
                    "text-xl font-medium md:text-2xl",
                    isDark ? "text-white" : "text-text-primary",
                  )}
                >
                  {step.label}
                </h3>
                {step.detail ? (
                  <p
                    className={cn(
                      "mt-2 max-w-2xl text-[1.0625rem] leading-relaxed md:text-lg",
                      isDark ? "text-white/75" : "text-text-secondary",
                    )}
                  >
                    {step.detail}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
