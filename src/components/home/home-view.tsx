import Image from "next/image";
import Link from "next/link";
import { AccentHeading } from "@/components/ui/accent-heading";
import type { Locale } from "@/lib/i18n/locale";
import type { HomeContent, ProductItem, ServiceItem } from "@/lib/cms/types";

export function HomeView({
  home,
  services,
  products,
  locale = "en",
}: {
  home: HomeContent;
  services: ServiceItem[];
  products: ProductItem[];
  locale?: Locale;
}) {
  const videoSrc = home.hero.videoSrc || "/brand/hero-background.mp4";
  const ui = {
    learnMore: locale === "fr" ? "Voir le détail" : "See details",
    viewProducts: locale === "fr" ? "Voir tous les produits" : "Browse products",
    aboutCta: locale === "fr" ? "À propos" : "About us",
  };

  return (
    <>
      <section className="relative isolate min-h-[min(88dvh,52rem)] overflow-hidden bg-brand-navy text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/70 to-brand-navy/35"
          aria-hidden="true"
        />
        <div className="relative site-container flex min-h-[min(88dvh,52rem)] items-center py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="inline-flex items-center rounded-(--radius-pill) bg-white/12 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-brand-lavender uppercase">
              {home.hero.eyebrow}
            </p>
            <div className="mt-5">
              <AccentHeading
                text={home.hero.heading}
                accentWords={home.hero.accentWords}
                className="heading-xl text-white"
              />
            </div>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85">
              {home.hero.supporting}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={home.hero.primaryCta.href} className="btn-primary">
                {home.hero.primaryCta.label}
              </Link>
              <Link
                href={home.hero.secondaryCta.href}
                className="inline-flex min-h-11 items-center justify-center rounded-(--radius-btn) border border-white/70 px-5 text-sm font-semibold text-white hover:bg-white/10"
              >
                {home.hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-soft">
        <div className="site-container section-space max-w-3xl text-center">
          <p className="pill">{home.purpose.eyebrow}</p>
          <h2 className="mt-4 heading-lg">{home.purpose.heading}</h2>
          {home.purpose.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-4 body-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="site-container section-space">
        <div className="max-w-2xl">
          <p className="pill">{home.servicesIntro.eyebrow}</p>
          <h2 className="mt-4 heading-lg">{home.servicesIntro.heading}</h2>
          <p className="mt-4 body-muted">{home.servicesIntro.body}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="overflow-hidden rounded-(--radius-media) border border-brand-navy/10 bg-white"
            >
              {service.imageSrc ? (
                <div className="relative aspect-[16/10] bg-brand-navy/5">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt || service.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ) : null}
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-navy">{service.name}</h3>
                <p className="mt-2 text-sm font-semibold text-brand-purple">{service.summary}</p>
                <p className="mt-3 body-muted">{service.body}</p>
                <Link
                  href={service.href}
                  className="mt-5 inline-flex text-sm font-semibold text-brand-purple"
                >
                  {ui.learnMore}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-navy text-white">
        <div className="site-container section-space">
          <p className="inline-flex rounded-(--radius-pill) bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-brand-lavender uppercase">
            {home.featuredWork.eyebrow}
          </p>
          <h2 className="mt-4 text-2xl font-bold sm:text-4xl">{home.featuredWork.heading}</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {home.featuredWork.items.map((item) => (
              <article key={item.title} className="rounded-(--radius-media) border border-white/15 p-6">
                <p className="text-xs font-semibold tracking-wide text-brand-lavender uppercase">
                  {item.industry}
                </p>
                <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                <p className="mt-4 text-sm text-white/80">{item.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.services.map((service) => (
                    <li
                      key={service}
                      className="rounded-(--radius-pill) bg-white/10 px-3 py-1 text-xs font-semibold"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container section-space">
        <div className="max-w-2xl">
          <p className="pill">{home.process.eyebrow}</p>
          <h2 className="mt-4 heading-lg">{home.process.heading}</h2>
          <p className="mt-4 body-muted">{home.process.body}</p>
        </div>
        <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {home.process.steps.map((step, index) => (
            <li key={step.title} className="rounded-(--radius-media) border border-brand-navy/10 p-5">
              <p className="text-sm font-bold text-brand-purple">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg font-bold text-brand-navy">{step.title}</h3>
              <p className="mt-2 body-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* In the lab / products teaser — temporarily hidden
      <section className="bg-surface-soft">
        <div className="site-container section-space">
          <div className="max-w-2xl">
            <p className="pill">{home.productsTeaser.eyebrow}</p>
            <h2 className="mt-4 heading-lg">{home.productsTeaser.heading}</h2>
            <p className="mt-4 body-muted">{home.productsTeaser.body}</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {products.slice(0, 3).map((product) => (
              <article key={product.id} className="rounded-(--radius-media) bg-white p-6 border border-brand-navy/10">
                <p className="text-xs font-semibold tracking-wide text-brand-purple uppercase">
                  {product.status}
                </p>
                <h3 className="mt-2 text-xl font-bold text-brand-navy">{product.name}</h3>
                <p className="mt-2 body-muted">{product.summary}</p>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-4 inline-flex text-sm font-semibold text-brand-purple"
                >
                  {ui.learnMore}
                </Link>
              </article>
            ))}
          </div>
          <Link href="/products" className="btn-secondary mt-8 inline-flex">
            {ui.viewProducts}
          </Link>
        </div>
      </section>
      */}

      <section className="site-container section-space grid gap-8 lg:grid-cols-2">
        <div>
          <p className="pill">{home.aboutTeaser.eyebrow}</p>
          <h2 className="mt-4 heading-lg">{home.aboutTeaser.heading}</h2>
          {home.aboutTeaser.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-4 body-muted">
              {paragraph}
            </p>
          ))}
          <Link href="/about" className="btn-primary mt-6 inline-flex">
            {ui.aboutCta}
          </Link>
        </div>
        <div>
          <p className="pill">{home.whyUs.eyebrow}</p>
          <h2 className="mt-4 heading-lg">{home.whyUs.heading}</h2>
          <div className="mt-6 space-y-4">
            {home.whyUs.items.slice(0, 4).map((item) => (
              <div key={item.title}>
                <h3 className="font-bold text-brand-navy">{item.title}</h3>
                <p className="mt-1 body-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-purple text-white">
        <div className="site-container section-space text-center">
          <h2 className="text-2xl font-bold sm:text-4xl">{home.finalCta.heading}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">{home.finalCta.body}</p>
          <Link
            href={home.finalCta.cta.href}
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-(--radius-btn) bg-white px-5 text-sm font-semibold text-brand-purple"
          >
            {home.finalCta.cta.label}
          </Link>
        </div>
      </section>
    </>
  );
}
