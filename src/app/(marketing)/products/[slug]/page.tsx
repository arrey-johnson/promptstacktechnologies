import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InterestForm } from "@/components/forms/interest-form";
import { getCmsData } from "@/lib/cms/store";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { products } = await getCmsData();
  const product = products.find((item) => item.slug === slug);
  return { title: product?.name || "Product" };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const { products } = await getCmsData();
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  return (
    <article className="site-container py-14">
      <Link href="/products" className="text-sm font-semibold text-brand-purple">
        ← Products
      </Link>
      <p className="mt-6 text-xs font-semibold tracking-wide text-brand-purple uppercase">
        {product.status}
      </p>
      <h1 className="mt-2 heading-xl">{product.name}</h1>
      <p className="mt-4 max-w-2xl body-muted">{product.summary}</p>
      <p className="mt-4 max-w-3xl body-muted">{product.body}</p>
      <div className="mt-8 max-w-3xl">
        <InterestForm productName={product.name} ctaLabel={product.ctaLabel} />
      </div>
    </article>
  );
}
