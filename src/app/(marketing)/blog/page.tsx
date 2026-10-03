import type { Metadata } from "next";
import Link from "next/link";
import { getCmsData } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";

export const metadata: Metadata = { title: "Blog" };

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const locale = await getRequestLocale();
  const { posts } = await getCmsData(locale);
  const published = posts.filter((post) => post.published);
  const categories = Array.from(new Set(published.map((post) => post.category)));
  const allLabel = locale === "fr" ? "Tous" : "All";
  const emptyCopy =
    locale === "fr"
      ? "Aucun article pour le moment. Revenez bientôt pour des insights Promptstack."
      : "No posts yet. Check back soon for Promptstack insights.";

  const filtered = published.filter((post) => {
    const matchesCategory = !category || category === "All" || post.category === category;
    const query = (q || "").trim().toLowerCase();
    const matchesQuery =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  if (published.length === 0) {
    return (
      <section className="site-container flex min-h-[min(70dvh,40rem)] flex-col justify-center py-20 text-center">
        <h1 className="heading-xl">Blog</h1>
        <p className="mx-auto mt-4 max-w-2xl body-muted">
          {locale === "fr"
            ? "Réflexions sur le logiciel, l'IA, le marketing, l'Academy et la construction pour de vrais opérateurs."
            : "Thoughts on software, AI, marketing systems, Academy, and building for real operators."}
        </p>
        <p className="mx-auto mt-8 max-w-xl text-lg font-semibold text-brand-navy">{emptyCopy}</p>
        <div className="mt-10">
          <Link href="/" className="btn-secondary">
            {locale === "fr" ? "Retour à l'accueil" : "Back to home"}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="site-container py-14">
        <h1 className="heading-xl">
          {locale === "fr"
            ? "Insights et inspiration — explorez notre blog"
            : "Insights and inspiration — explore our blog"}
        </h1>
        <p className="mt-4 max-w-2xl body-muted">
          {locale === "fr"
            ? "Réflexions sur le logiciel, l'IA, le marketing, l'Academy et la construction pour de vrais opérateurs."
            : "Thoughts on software, AI, marketing systems, Academy, and building for real operators."}
        </p>
        <form className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            name="q"
            defaultValue={q}
            placeholder={locale === "fr" ? "Rechercher un article" : "Search for a blog"}
            className="min-h-11 flex-1 rounded-(--radius-btn) border border-brand-navy/15 px-3"
          />
          <button type="submit" className="btn-primary">
            {locale === "fr" ? "Rechercher" : "Search"}
          </button>
        </form>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`rounded-(--radius-pill) border px-3 py-1.5 text-sm font-semibold ${!category ? "border-brand-purple bg-brand-purple text-white" : "border-brand-navy/15"}`}
          >
            {allLabel}
          </Link>
          {categories.map((item) => (
            <Link
              key={item}
              href={`/blog?category=${encodeURIComponent(item)}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              className={`rounded-(--radius-pill) border px-3 py-1.5 text-sm font-semibold ${
                category === item
                  ? "border-brand-purple bg-brand-purple text-white"
                  : "border-brand-navy/15"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
      </section>

      <section className="site-container pb-20">
        {filtered.length === 0 ? (
          <p className="body-muted">
            {locale === "fr"
              ? "Aucun article ne correspond à vos filtres."
              : "No posts match your filters."}
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((post) => (
              <article key={post.id} className="rounded-(--radius-media) border border-brand-navy/10 p-5">
                <p className="text-xs font-semibold tracking-wide text-brand-purple uppercase">
                  {post.category}
                </p>
                <h2 className="mt-2 text-xl font-bold text-brand-navy">
                  <Link href={`/blog/${post.slug}`} className="hover:text-brand-purple">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-text-muted">{post.publishedAt}</p>
                <p className="mt-3 body-muted">{post.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
