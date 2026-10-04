import Image from "next/image";
import Link from "next/link";
import { PartnersMarquee } from "@/components/home/partners-marquee";
import { ProcessRoadmap } from "@/components/home/process-roadmap";
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
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="flex h-full flex-col overflow-hidden rounded-(--radius-media) border border-brand-navy/10 bg-white"
            >
              {service.imageSrc ? (
                <div className="relative aspect-[5/3] bg-brand-navy/5">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt || service.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="text-base font-bold leading-snug text-brand-navy sm:text-lg">
                  {service.name}
                </h3>
                <p className="mt-1.5 text-xs font-semibold leading-snug text-brand-purple sm:text-sm">
                  {service.summary}
                </p>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted">
                  {service.body}
                </p>
                <Link
                  href={service.href}
                  className="mt-auto pt-4 inline-flex text-sm font-semibold text-brand-purple"
                >
                  {ui.learnMore}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface-soft">
        <div className="site-container section-space">
          <div className="max-w-2xl">
            <p className="pill">{home.partners.eyebrow}</p>
            <h2 className="mt-4 heading-lg">{home.partners.heading}</h2>
            <p className="mt-4 body-muted">{home.partners.body}</p>
          </div>
          <PartnersMarquee partners={home.partners.items} />
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(203_174_211/0.28),transparent_55%)]"
          aria-hidden="true"
        />
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
          <div className="max-w-2xl">
            <p className="pill">{home.process.eyebrow}</p>
            <h2 className="mt-4 heading-lg">{home.process.heading}</h2>
            <p className="mt-4 body-muted">{home.process.body}</p>
          </div>
          <ProcessRoadmap steps={home.process.steps} locale={locale} />
        </div>
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

      <section className="relative isolate min-h-[22rem] overflow-hidden text-white sm:min-h-[26rem]">
        <Image
          src={home.finalCta.imageSrc || "/brand/cta-next-step.jpg"}
          alt=""
          fill
          className="object-cover object-[70%_center] sm:object-[75%_center] lg:object-right"
          sizes="100vw"
          priority={false}
        />
        {/* Heavy purple over the copy; clear through where the subject sits */}
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgb(168_0_230/0.94)_0%,rgb(168_0_230/0.9)_34%,rgb(168_0_230/0.55)_58%,rgb(168_0_230/0.18)_78%,rgb(168_0_230/0.06)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgb(168_0_230/0.55)_0%,transparent_55%)] sm:hidden"
          aria-hidden="true"
        />
        <div className="relative site-container flex min-h-[22rem] items-center section-space sm:min-h-[26rem]">
          <div className="max-w-md text-left sm:max-w-lg lg:max-w-xl">
            <h2 className="text-2xl font-bold drop-shadow-sm sm:text-4xl">
              {home.finalCta.heading}
            </h2>
            <p className="mt-4 text-white/95 drop-shadow-sm">{home.finalCta.body}</p>
            <Link
              href={home.finalCta.cta.href}
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-(--radius-btn) bg-white px-5 text-sm font-semibold text-brand-purple hover:bg-white/95"
            >
              {home.finalCta.cta.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
