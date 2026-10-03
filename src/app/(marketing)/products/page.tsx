import type { Metadata } from "next";
import Link from "next/link";
import { getCmsData } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";

export const metadata: Metadata = { title: "Products" };

export default async function ProductsPage() {
  const [cms, locale] = await Promise.all([getCmsData(), getRequestLocale()]);
  const { productsPage } = cms;
  const primaryCta = locale === "fr" ? "Réserver un appel découverte" : "Book a discovery call";
  const secondaryCta = locale === "fr" ? "Voir nos services" : "See our services";

  return (
    <>
      <section className="site-container flex min-h-[min(70dvh,40rem)] flex-col justify-center py-20 text-center">
        <p className="pill mx-auto">{productsPage.hero.eyebrow ?? "Products"}</p>
        <h1 className="mt-4 heading-xl">{productsPage.hero.heading}</h1>
        <p className="mx-auto mt-4 max-w-2xl body-muted">{productsPage.hero.body}</p>
        <p className="mx-auto mt-8 max-w-xl text-lg font-semibold text-brand-navy">
          {productsPage.emptyState}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="#book-discovery" className="btn-primary">
            {primaryCta}
          </Link>
          <Link href="/services" className="btn-secondary">
            {secondaryCta}
          </Link>
        </div>
      </section>

      {/* Product cards — restore when ready to publish
      <section className="site-container pb-20">
        ...
      </section>
      */}
    </>
  );
}
