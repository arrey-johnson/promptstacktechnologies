import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCmsData } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";

export const metadata: Metadata = { title: "Portfolio" };

export default async function PortfolioPage() {
  const [cms, locale] = await Promise.all([getCmsData(), getRequestLocale()]);
  const { portfolioPage, portfolioItems } = cms;
  const exploreLabel = locale === "fr" ? "Explorer" : "Explore";
  const heroImage = portfolioPage.hero.imageSrc || "/brand/portfolio-hero.jpg?v=3";

  return (
    <>
      <section className="relative isolate min-h-[22rem] overflow-hidden text-white sm:min-h-[26rem]">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          quality={95}
          className="object-cover object-[78%_center] sm:object-right"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgb(168_0_230/0.92)_0%,rgb(168_0_230/0.82)_38%,rgb(168_0_230/0.35)_68%,rgb(168_0_230/0.12)_100%)]"
          aria-hidden="true"
        />
        <div className="relative site-container flex min-h-[22rem] items-center section-space sm:min-h-[26rem]">
          <div className="max-w-xl">
            {portfolioPage.hero.eyebrow ? (
              <p className="inline-flex items-center rounded-(--radius-pill) bg-white/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-white uppercase">
                {portfolioPage.hero.eyebrow}
              </p>
            ) : null}
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              {portfolioPage.hero.heading}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/92">
              {portfolioPage.hero.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={portfolioPage.hero.primaryCta.href}
                className="inline-flex min-h-11 items-center justify-center rounded-(--radius-btn) bg-white px-5 text-sm font-semibold text-brand-purple hover:bg-white/95"
              >
                {portfolioPage.hero.primaryCta.label}
              </Link>
              <Link
                href={portfolioPage.hero.secondaryCta.href}
                className="inline-flex min-h-11 items-center justify-center rounded-(--radius-btn) border border-white/70 px-5 text-sm font-semibold text-white hover:bg-white/10"
              >
                {portfolioPage.hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio-grid" className="site-container section-space scroll-mt-28">
        <p className="pill">{portfolioPage.grid.eyebrow}</p>
        <h2 className="mt-4 heading-lg">{portfolioPage.grid.heading}</h2>
        <p className="mt-4 max-w-2xl body-muted">{portfolioPage.grid.body}</p>

        {portfolioItems.length === 0 ? (
          <p className="mt-10 body-muted">{portfolioPage.emptyState}</p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item) => {
              const href = item.href || `/portfolio/${item.slug}`;
              const external = href.startsWith("http");

              return (
                <article key={item.id}>
                  <Link
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="portfolio-preview group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
                  >
                    {/* Native img so tall screenshots can scroll on hover */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt || item.title}
                      className="portfolio-preview-image"
                      loading="lazy"
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy via-brand-navy/75 to-transparent px-4 pb-4 pt-20"
                      aria-hidden="true"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-(--radius-pill) bg-white/95 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-brand-purple uppercase shadow-sm backdrop-blur-sm">
                          {item.category}
                        </span>
                        {item.challenge || item.role ? (
                          <span className="inline-flex items-center rounded-(--radius-pill) bg-brand-purple px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-white uppercase shadow-sm">
                            {locale === "fr" ? "Étude de cas" : "Case study"}
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-white drop-shadow-sm">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {exploreLabel} →
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="bg-brand-navy text-white">
        <div className="site-container section-space text-center">
          <h2 className="mx-auto max-w-3xl text-2xl font-bold sm:text-4xl">
            {portfolioPage.cta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/88">{portfolioPage.cta.body}</p>
          <Link
            href={portfolioPage.cta.cta.href}
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-(--radius-btn) bg-white px-5 text-sm font-semibold text-brand-purple hover:bg-white/95"
          >
            {portfolioPage.cta.cta.label}
          </Link>
        </div>
      </section>
    </>
  );
}
