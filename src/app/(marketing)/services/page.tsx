import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCmsData } from "@/lib/cms/store";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage() {
  const { servicesPage, serviceItems } = await getCmsData();

  return (
    <>
      <section className="site-container py-14">
        <h1 className="heading-xl">{servicesPage.hero.heading}</h1>
        <p className="mt-4 max-w-2xl body-muted">{servicesPage.hero.body}</p>
      </section>

      <section className="site-container pb-16 grid gap-6">
        {serviceItems.map((service) => (
          <article
            key={service.id}
            id={service.id}
            className="scroll-mt-28 overflow-hidden rounded-(--radius-media) border border-brand-navy/10 lg:grid lg:grid-cols-[0.95fr_1.05fr]"
          >
            {service.imageSrc ? (
              <div className="relative min-h-56 bg-brand-navy/5 lg:min-h-full">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt || service.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            ) : (
              <div className="bg-surface-soft p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-brand-navy">{service.name}</h2>
                <p className="mt-2 text-sm font-semibold text-brand-purple">{service.summary}</p>
              </div>
            )}
            <div className="p-6 lg:p-8">
              {service.imageSrc ? (
                <>
                  <h2 className="text-2xl font-bold text-brand-navy">{service.name}</h2>
                  <p className="mt-2 text-sm font-semibold text-brand-purple">{service.summary}</p>
                </>
              ) : null}
              <p className={`body-muted ${service.imageSrc ? "mt-4" : ""}`}>{service.body}</p>
              <Link href="/contact?subject=Project%20enquiry" className="btn-primary mt-5 inline-flex">
                Book a discovery call
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
