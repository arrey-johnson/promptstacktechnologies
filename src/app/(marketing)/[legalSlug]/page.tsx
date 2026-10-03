import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCmsData } from "@/lib/cms/store";

const LEGAL_SLUGS = new Set(["privacy-policy", "terms-of-service", "cookie-policy"]);

type Props = { params: Promise<{ legalSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { legalSlug } = await params;
  if (!LEGAL_SLUGS.has(legalSlug)) return {};
  const { legal } = await getCmsData();
  const page = legal.find((item) => item.slug === legalSlug);
  return { title: page?.title || "Legal" };
}

export default async function LegalPage({ params }: Props) {
  const { legalSlug } = await params;
  if (!LEGAL_SLUGS.has(legalSlug)) notFound();
  const { legal } = await getCmsData();
  const page = legal.find((item) => item.slug === legalSlug);
  if (!page) notFound();

  return (
    <article className="site-container py-14">
      <h1 className="heading-xl">{page.title}</h1>
      <p className="mt-8 max-w-3xl whitespace-pre-wrap body-muted">{page.body}</p>
    </article>
  );
}
