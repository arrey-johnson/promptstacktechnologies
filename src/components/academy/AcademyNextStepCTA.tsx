import { Button, Container, Heading, Section, Text } from "@/components/ui";
import {
  areAcademyApplicationsEnabled,
  getAcademyApplyHref,
} from "@/config/academy";
import type { AcademyCta } from "@/content/academy/types";

type AcademyNextStepCTAProps = {
  heading: string;
  body: string;
  primaryCta: AcademyCta;
  secondaryCta?: AcademyCta;
  /** When applications are enabled, optionally promote Apply as primary. */
  preferApplyWhenEnabled?: boolean;
  /** Preserve program preselection on Apply when provided. */
  programSlug?: string;
  analyticsPrefix: string;
  tone?: "soft" | "dark";
};

export function AcademyNextStepCTA({
  heading,
  body,
  primaryCta,
  secondaryCta,
  preferApplyWhenEnabled = false,
  programSlug,
  analyticsPrefix,
  tone = "dark",
}: AcademyNextStepCTAProps) {
  const applyHref = getAcademyApplyHref(programSlug);
  const applicationsEnabled =
    preferApplyWhenEnabled &&
    areAcademyApplicationsEnabled() &&
    Boolean(applyHref);

  const resolvedPrimary = applicationsEnabled
    ? {
        label: "Apply to Promptstack Academy",
        href: applyHref!,
      }
    : primaryCta;

  const resolvedSecondary = applicationsEnabled ? primaryCta : secondaryCta;

  return (
    <Section
      tone={tone}
      spacious
      data-section="academy-next-step"
      aria-labelledby={`${analyticsPrefix}-next-step-heading`}
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className={
          tone === "dark"
            ? "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(168,0,230,0.22),transparent_42%),radial-gradient(ellipse_at_90%_100%,rgba(203,174,211,0.16),transparent_48%)]"
            : "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(168,0,230,0.08),transparent_40%)]"
        }
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Heading
            id={`${analyticsPrefix}-next-step-heading`}
            level={2}
            className={tone === "dark" ? "text-white" : "text-text-primary"}
          >
            {heading}
          </Heading>
          <Text
            muted={tone !== "dark"}
            className={
              tone === "dark"
                ? "mx-auto mt-5 max-w-2xl text-[1.0625rem] text-white/85 md:text-lg"
                : "mx-auto mt-5 max-w-2xl"
            }
          >
            {body}
          </Text>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={resolvedPrimary.href}
              size="lg"
              data-analytics={`${analyticsPrefix}_next_primary`}
            >
              {resolvedPrimary.label}
            </Button>
            {resolvedSecondary ? (
              <Button
                href={resolvedSecondary.href}
                variant="secondary"
                size="lg"
                tone={tone === "dark" ? "inverse" : "default"}
                data-analytics={`${analyticsPrefix}_next_secondary`}
              >
                {resolvedSecondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
