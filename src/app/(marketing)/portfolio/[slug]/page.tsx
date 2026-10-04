import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCmsData } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { portfolioItems } = await getCmsData();
  const item = portfolioItems.find((entry) => entry.slug === slug);
  return {
    title: item?.title || "Portfolio",
    description: item ? `${item.category} — ${item.title}` : undefined,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const [cms, locale] = await Promise.all([getCmsData(), getRequestLocale()]);
  const item = cms.portfolioItems.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const ui =
    locale === "fr"
      ? {
          back: "Retour au portfolio",
          cta: "Démarrer un projet similaire",
          next: "Projet suivant",
        }
      : {
          back: "Back to portfolio",
          cta: "Start a similar project",
          next: "Next project",
        };

  const index = cms.portfolioItems.findIndex((entry) => entry.id === item.id);
  const next = cms.portfolioItems[(index + 1) % cms.portfolioItems.length];

  return (
    <>
      <section className="site-container py-10 sm:py-14">
        <Link href="/portfolio" className="text-sm font-semibold text-brand-purple">
          ← {ui.back}
        </Link>
        <p className="mt-6 text-xs font-semibold tracking-[0.14em] text-brand-purple uppercase">
          {item.category}
        </p>
        <h1 className="mt-2 heading-xl">{item.title}</h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#book-discovery" className="btn-primary">
            {ui.cta}
          </Link>
          {next && next.id !== item.id ? (
            <Link href={`/portfolio/${next.slug}`} className="btn-secondary">
              {ui.next} →
            </Link>
          ) : null}
        </div>
      </section>

      <section className="border-t border-brand-navy/10 bg-surface-soft">
        <div className="site-container py-10 sm:py-14">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-(--radius-media) border border-brand-navy/10 bg-white shadow-[0_20px_50px_-24px_rgb(27_38_59/0.35)]">
            <Image
              src={item.imageSrc}
              alt={item.imageAlt || item.title}
              width={1200}
              height={2400}
              className="h-auto w-full"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}
