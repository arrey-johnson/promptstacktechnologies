import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { PortfolioItem } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n/locale";

const labels = {
  en: {
    back: "Back to portfolio",
    cta: "Start a similar project",
    next: "Next project",
    client: "Client",
    challenge: "Challenge",
    role: "Promptstack's role",
    scope: "Scope",
    technologies: "Technologies",
    outcome: "Outcome",
    overview: "Overview",
  },
  fr: {
    back: "Retour au portfolio",
    cta: "Démarrer un projet similaire",
    next: "Projet suivant",
    client: "Client",
    challenge: "Défi",
    role: "Rôle de Promptstack",
    scope: "Périmètre",
    technologies: "Technologies",
    outcome: "Résultat",
    overview: "Vue d'ensemble",
  },
} as const;

function CaseBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-brand-navy/10 pt-8">
      <h2 className="text-xs font-semibold tracking-[0.14em] text-brand-purple uppercase">{title}</h2>
      <div className="mt-3 text-base leading-relaxed text-brand-navy/90">{children}</div>
    </section>
  );
}

export function PortfolioCaseStudy({
  item,
  next,
  locale,
}: {
  item: PortfolioItem;
  next?: PortfolioItem | null;
  locale: Locale;
}) {
  const ui = labels[locale === "fr" ? "fr" : "en"];
  const hasCase =
    Boolean(item.client || item.challenge || item.role || item.outcome || item.summary) ||
    Boolean(item.scope?.length || item.technologies?.length);

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
        {item.summary ? <p className="mt-5 max-w-3xl text-lg leading-relaxed text-brand-navy/85">{item.summary}</p> : null}
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
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
            <div className="overflow-hidden rounded-(--radius-media) border border-brand-navy/10 bg-white shadow-[0_20px_50px_-24px_rgb(27_38_59/0.35)]">
              <Image
                src={item.imageSrc}
                alt={item.imageAlt || item.title}
                width={1200}
                height={2400}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 54vw"
                priority
              />
            </div>

            {hasCase ? (
              <div className="rounded-(--radius-media) border border-brand-navy/10 bg-white p-6 sm:p-8">
                {item.client ? (
                  <CaseBlock title={ui.client}>
                    <p>{item.client}</p>
                  </CaseBlock>
                ) : null}
                {item.challenge ? (
                  <CaseBlock title={ui.challenge}>
                    <p className="body-muted">{item.challenge}</p>
                  </CaseBlock>
                ) : null}
                {item.role ? (
                  <CaseBlock title={ui.role}>
                    <p className="body-muted">{item.role}</p>
                  </CaseBlock>
                ) : null}
                {item.scope && item.scope.length > 0 ? (
                  <CaseBlock title={ui.scope}>
                    <ul className="space-y-2">
                      {item.scope.map((line) => (
                        <li key={line} className="flex gap-3 body-muted">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple" aria-hidden />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </CaseBlock>
                ) : null}
                {item.technologies && item.technologies.length > 0 ? (
                  <CaseBlock title={ui.technologies}>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-(--radius-pill) bg-surface-soft px-2.5 py-1 text-xs font-semibold text-brand-navy"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CaseBlock>
                ) : null}
                {item.outcome ? (
                  <CaseBlock title={ui.outcome}>
                    <p className="font-medium text-brand-navy">{item.outcome}</p>
                  </CaseBlock>
                ) : null}
              </div>
            ) : (
              <div className="rounded-(--radius-media) border border-brand-navy/10 bg-white p-6 sm:p-8">
                <h2 className="text-xs font-semibold tracking-[0.14em] text-brand-purple uppercase">{ui.overview}</h2>
                <p className="mt-3 body-muted">
                  {locale === "fr"
                    ? "Aperçu du projet. Contactez-nous pour discuter d’un engagement similaire avec brief, périmètre et résultats mesurables."
                    : "Project showcase. Talk to us about a similar engagement with brief, scope, and measurable outcomes."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
