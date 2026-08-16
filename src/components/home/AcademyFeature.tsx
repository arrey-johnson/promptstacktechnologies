import { Button, Container, Eyebrow, Heading, Section, Text } from "@/components/ui";
import { homepageAcademy } from "@/content/homepage";
import { VisualPlaceholder } from "./VisualPlaceholder";

export function AcademyFeature() {
  const { label, heading, body, cta } = homepageAcademy;

  return (
    <Section
      tone="soft"
      spacious
      className="relative overflow-hidden"
      data-section="academy"
      aria-labelledby="homepage-academy-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_10%,rgba(203,174,211,0.45),transparent_50%)]"
      />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6 xl:col-span-5">
            <Eyebrow className="mb-4">{label}</Eyebrow>
            <Heading
              id="homepage-academy-heading"
              level={2}
              className="text-text-primary"
            >
              {heading}
            </Heading>
            <Text muted className="mt-5 max-w-xl">
              {body}
            </Text>
            <div className="mt-8">
              <Button
                href={cta.href}
                size="lg"
                data-analytics="cta_academy"
              >
                {cta.label}
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6 xl:col-span-7">
            <VisualPlaceholder
              kind="academy"
              className="border border-white/60 shadow-[0_20px_50px_rgba(27,38,59,0.08)]"
              label="Academy learning composition"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
