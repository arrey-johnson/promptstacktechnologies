import { Button, Container, Heading, Section } from "@/components/ui";
import { homepageFinalCta } from "@/content/homepage";

export function FinalCTA() {
  const { heading, subheading, body, cta } = homepageFinalCta;

  return (
    <Section
      tone="dark"
      spacious
      data-section="final-cta"
      aria-labelledby="homepage-final-cta-heading"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(168,0,230,0.22),transparent_42%),radial-gradient(ellipse_at_90%_100%,rgba(203,174,211,0.14),transparent_48%)]"
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Heading
            id="homepage-final-cta-heading"
            level={2}
            className="text-white"
          >
            {heading}
          </Heading>
          <p className="mt-5 text-xl font-medium text-brand-lavender md:text-2xl lg:text-[1.75rem]">
            {subheading}
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/85 md:text-lg">
            {body}
          </p>
          <div className="mt-10">
            <Button
              href={cta.href}
              size="lg"
              data-analytics="cta_final_start_project"
            >
              {cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
