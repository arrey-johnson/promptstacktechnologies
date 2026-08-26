import Image from "next/image";
import { Button, Container, Eyebrow, Heading, Text } from "@/components/ui";
import { homepageHero } from "@/content/homepage";

/**
 * Homepage hero — approved copy/layout preserved.
 * Visual: VR / immersive tech portrait in the right-hand panel.
 * Image is atmospheric brand photography (decorative); meaning is in the copy.
 */
export function Hero() {
  const { eyebrow, h1, supporting, primaryCta, secondaryCta } = homepageHero;

  return (
    <section
      aria-labelledby="homepage-hero-heading"
      className="relative overflow-hidden bg-surface-primary"
      data-section="hero"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(203,174,211,0.18),transparent_45%),radial-gradient(ellipse_at_100%_20%,rgba(168,0,230,0.05),transparent_40%)]"
      />
      <Container className="relative py-14 md:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
            <Heading
              id="homepage-hero-heading"
              level={1}
              as="h1"
              className="max-w-[18ch] text-[2rem] leading-[1.12] text-text-primary sm:max-w-none sm:text-4xl md:text-5xl lg:text-[3.25rem]"
            >
              {h1.before}
              <span className="text-accent">{h1.accent}</span>
              {h1.after}
            </Heading>
            <Text size="lead" muted className="mt-6 max-w-xl">
              {supporting}
            </Text>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                href={primaryCta.href}
                size="lg"
                data-analytics="cta_hero_start_project"
              >
                {primaryCta.label}
              </Button>
              <Button
                href={secondaryCta.href}
                variant="secondary"
                size="lg"
                data-analytics="cta_hero_explore_solutions"
              >
                {secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              aria-hidden="true"
              className="relative mx-auto aspect-[5/4] w-full max-h-[16.5rem] overflow-hidden rounded-[var(--radius-visual)] border border-border-soft shadow-[0_24px_60px_rgba(27,38,59,0.08)] sm:aspect-[5/6] sm:max-h-[24rem] lg:mx-0 lg:aspect-[5/6] lg:max-h-none lg:min-h-[28rem]"
            >
              <Image
                src="/images/home/homepage-hero-vr-v2.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 70vw, 40vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
