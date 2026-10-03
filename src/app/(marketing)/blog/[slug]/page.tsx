import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCmsData } from "@/lib/cms/store";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { posts } = await getCmsData();
  const post = posts.find((item) => item.slug === slug && item.published);
  return { title: post?.title || "Blog" };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { posts } = await getCmsData();
  const post = posts.find((item) => item.slug === slug && item.published);
  if (!post) notFound();

  return (
    <article className="site-container py-14">
      <Link href="/blog" className="text-sm font-semibold text-brand-purple">
        ← Blog
      </Link>
      <p className="mt-6 text-xs font-semibold tracking-wide text-brand-purple uppercase">
        {post.category}
      </p>
      <h1 className="mt-2 heading-xl">{post.title}</h1>
      <p className="mt-3 text-sm text-text-muted">{post.publishedAt}</p>
      <p className="mt-8 max-w-3xl whitespace-pre-wrap body-muted">{post.body}</p>
    </article>
  );
}
