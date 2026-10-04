import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCmsData } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage() {
  const [cms, locale] = await Promise.all([getCmsData(), getRequestLocale()]);
  const { servicesPage, serviceItems } = cms;
  const learnMore = locale === "fr" ? "Voir le service" : "Explore this service";

  return (
    <>
      <section className="site-container py-14">
        <h1 className="heading-xl">{servicesPage.hero.heading}</h1>
        <p className="mt-4 max-w-2xl body-muted">{servicesPage.hero.body}</p>
      </section>

      <section className="site-container pb-16 grid gap-5 md:grid-cols-2">
        {serviceItems.map((service) => (
          <article
            key={service.id}
            className="flex h-full flex-col overflow-hidden rounded-(--radius-media) border border-brand-navy/10 bg-white"
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
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-xl font-bold text-brand-navy">{service.name}</h2>
              <p className="mt-2 text-sm font-semibold text-brand-purple">{service.summary}</p>
              <p className="mt-3 body-muted">{service.body}</p>
              <Link
                href={service.href || `/services/${service.id}`}
                className="mt-auto pt-5 inline-flex text-sm font-semibold text-brand-purple"
              >
                {learnMore} →
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-brand-purple text-white">
        <div className="site-container section-space text-center">
          <h2 className="text-2xl font-bold sm:text-4xl">{servicesPage.cta.heading}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">{servicesPage.cta.body}</p>
          <Link
            href={servicesPage.cta.cta.href}
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-(--radius-btn) bg-white px-5 text-sm font-semibold text-brand-purple"
          >
            {servicesPage.cta.cta.label}
          </Link>
        </div>
      </section>
    </>
  );
}
