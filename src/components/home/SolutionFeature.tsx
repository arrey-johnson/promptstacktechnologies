import { Button, Container, Eyebrow, Heading, Text } from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  VisualPlaceholder,
  type VisualKind,
} from "./VisualPlaceholder";

type SolutionFeatureProps = {
  label: string;
  outcome: string;
  body: string;
  capabilities: readonly string[];
  cta: { label: string; href: string };
  align: "text-first" | "visual-first";
  visual: Extract<VisualKind, "systems" | "automation" | "growth">;
  analyticsId: string;
  tone?: "primary" | "muted";
};

export function SolutionFeature({
  label,
  outcome,
  body,
  capabilities,
  cta,
  align,
  visual,
  analyticsId,
  tone = "primary",
}: SolutionFeatureProps) {
  const textBlock = (
    <div className="flex flex-col justify-center">
      <Eyebrow className="mb-4">{label}</Eyebrow>
      <Heading level={3} as="h3" className="max-w-xl text-text-primary">
        {outcome}
      </Heading>
      <Text muted className="mt-5 max-w-xl">
        {body}
      </Text>
      <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
        {capabilities.map((capability) => (
          <li
            key={capability}
            className="flex items-start gap-2.5 text-[0.95rem] text-text-secondary md:text-base"
          >
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            />
            <span>{capability}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button
          href={cta.href}
          variant="secondary"
          size="lg"
          data-analytics={analyticsId}
        >
          {cta.label}
        </Button>
      </div>
    </div>
  );

  const visualBlock = (
    <VisualPlaceholder
      kind={visual}
      className="border border-border-soft"
      label={`${label} composition`}
    />
  );

  return (
    <div
      className={cn(
        "py-12 md:py-16 lg:py-20",
        tone === "muted" ? "bg-surface-muted" : "bg-surface-primary",
      )}
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div
            className={cn(
              align === "visual-first" && "lg:order-2",
            )}
          >
            {textBlock}
          </div>
          <div
            className={cn(
              align === "visual-first" && "lg:order-1",
            )}
          >
            {visualBlock}
          </div>
        </div>
      </Container>
    </div>
  );
}
