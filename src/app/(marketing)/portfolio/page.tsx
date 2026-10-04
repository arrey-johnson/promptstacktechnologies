import type { Metadata } from "next";
import Link from "next/link";
import { getCmsData } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";

export const metadata: Metadata = { title: "Portfolio" };

export default async function PortfolioPage() {
  const [cms, locale] = await Promise.all([getCmsData(), getRequestLocale()]);
  const { portfolioPage, portfolioItems } = cms;
  const exploreLabel = locale === "fr" ? "Explorer" : "Explore";

  return (
    <>
      <section className="relative overflow-hidden bg-surface-soft">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(27 38 59 / 0.07) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden="true"
        />
        <div className="relative site-container section-space">
          {portfolioPage.hero.eyebrow ? (
            <p className="pill">{portfolioPage.hero.eyebrow}</p>
          ) : null}
          <h1 className="mt-4 max-w-3xl heading-xl">{portfolioPage.hero.heading}</h1>
          <p className="mt-4 max-w-2xl body-muted">{portfolioPage.hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={portfolioPage.hero.primaryCta.href} className="btn-primary">
              {portfolioPage.hero.primaryCta.label}
            </Link>
            <Link href={portfolioPage.hero.secondaryCta.href} className="btn-secondary">
              {portfolioPage.hero.secondaryCta.label}
            </Link>
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
                      className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent px-4 pb-4 pt-16"
                      aria-hidden="true"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                      <p className="text-xs font-semibold tracking-[0.14em] text-brand-lavender uppercase">
                        {item.category}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-white/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
