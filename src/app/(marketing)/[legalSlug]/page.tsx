import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCmsData } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";

type Props = { params: Promise<{ legalSlug: string }> };

export async function generateStaticParams() {
  const { legal } = await getCmsData("en");
  return legal.map((page) => ({ legalSlug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { legalSlug } = await params;
  const { legal } = await getCmsData();
  const page = legal.find((item) => item.slug === legalSlug);
  if (!page) return {};
  return {
    title: page.title,
    description: `${page.title} — Promptstack Technologies`,
  };
}

function renderBody(body: string) {
  const blocks = body.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);

  return blocks.map((block, index) => {
    const lines = block.split("\n");
    const first = lines[0] || "";

    if (index === 0 && /^Last updated:|^Dernière mise à jour/i.test(first) && lines.length === 1) {
      return (
        <p key={index} className="text-sm font-medium text-brand-purple">
          {first}
        </p>
      );
    }

    if (/^\d+\.\s/.test(first) && lines.length === 1) {
      return (
        <h2 key={index} className="mt-10 text-xl font-bold tracking-tight text-brand-navy">
          {first}
        </h2>
      );
    }

    return (
      <p key={index} className="mt-4 whitespace-pre-wrap body-muted">
        {block}
      </p>
    );
  });
}

export default async function LegalPage({ params }: Props) {
  const { legalSlug } = await params;
  const locale = await getRequestLocale();
  const { legal } = await getCmsData(locale);
  const page = legal.find((item) => item.slug === legalSlug);
  if (!page) notFound();

  const others = legal.filter((item) => item.slug !== legalSlug);
  const isFr = locale === "fr";

  return (
    <article className="site-container py-14">
      <p className="text-xs font-semibold tracking-[0.14em] text-brand-purple uppercase">
        {isFr ? "Légal" : "Legal"}
      </p>
      <h1 className="mt-3 heading-xl">{page.title}</h1>
      <div className="mt-8 max-w-3xl">{renderBody(page.body)}</div>

      {others.length ? (
        <nav
          className="mt-14 max-w-3xl border-t border-brand-navy/10 pt-8"
          aria-label={isFr ? "Autres pages légales" : "Other legal pages"}
        >
          <p className="text-sm font-bold text-brand-navy">
            {isFr ? "Politiques associées" : "Related policies"}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={`/${item.slug}`} className="text-sm font-semibold text-brand-purple hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </article>
  );
}
