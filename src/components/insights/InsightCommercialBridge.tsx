import { Button, Container, Heading, Section, Text } from "@/components/ui";
import {
  insightCategorySolutionHref,
  type InsightCategory,
} from "@/types/insight";

type InsightCommercialBridgeProps = {
  category: InsightCategory | null;
};

export function InsightCommercialBridge({
  category,
}: InsightCommercialBridgeProps) {
  const solution = insightCategorySolutionHref(category);

  return (
    <Section
      tone="dark"
      spacious
      data-section="insight-commercial-bridge"
      aria-labelledby="insight-bridge-heading"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(168,0,230,0.22),transparent_42%),radial-gradient(ellipse_at_90%_100%,rgba(203,174,211,0.14),transparent_48%)]"
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Heading
            id="insight-bridge-heading"
            level={2}
            className="text-white"
          >
            Need help applying this to your business?
          </Heading>
          <Text className="mx-auto mt-5 max-w-2xl text-white/85">
            Promptstack helps businesses turn practical technology decisions into
            software, automation and growth systems that improve how work gets
            done.
          </Text>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              href={solution.href}
              size="lg"
              data-analytics="cta_insight_bridge_solutions"
            >
              {solution.label}
            </Button>
            <Button
              href="/start-a-project"
              variant="secondary"
              tone="inverse"
              size="lg"
              data-analytics="cta_insight_bridge_start_project"
            >
              Start a Project
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
