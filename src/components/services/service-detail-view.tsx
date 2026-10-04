import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/locale";
import type { ServiceItem } from "@/lib/cms/types";

export function ServiceDetailView({
  service,
  siblings,
  locale = "en",
}: {
  service: ServiceItem;
  siblings: ServiceItem[];
  locale?: Locale;
}) {
  const ui =
    locale === "fr"
      ? {
          allServices: "Tous les services",
          problem: "Le problème",
          covers: "Ce que nous livrons",
          outcomes: "Ce que vous gagnez",
          audience: "Pour qui c'est fait",
          other: "Autres services",
          ctaHeading: "Prêt à avancer sur ce sujet ?",
          ctaBody:
            "Réservez un appel découverte. Nous clarifierons le besoin, le périmètre utile, et la première étape concrète.",
          cta: "Réserver un appel découverte",
          seeService: "Voir le service",
        }
      : {
          allServices: "All services",
          problem: "The problem",
          covers: "What we deliver",
          outcomes: "What you get",
          audience: "Who this is for",
          other: "Other services",
          ctaHeading: "Ready to move on this?",
          ctaBody:
            "Book a discovery call. We’ll clarify the need, a useful scope, and the first concrete step.",
          cta: "Book a discovery call",
          seeService: "See service",
        };

  const others = siblings.filter((item) => item.id !== service.id);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-navy text-white">
        {service.imageSrc ? (
          <Image
            src={service.imageSrc}
            alt=""
            fill
            className="object-cover opacity-35"
            sizes="100vw"
            priority
          />
        ) : null}
        <div
          className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/88 to-brand-navy/55"
          aria-hidden="true"
        />
        <div className="relative site-container py-14 sm:py-20">
          <Link
            href="/services"
            className="text-sm font-semibold text-brand-lavender hover:text-white"
          >
            ← {ui.allServices}
          </Link>
          <p className="mt-6 inline-flex items-center rounded-(--radius-pill) bg-white/12 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-brand-lavender uppercase">
            {service.name}
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            {service.summary}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/88">
            {service.detailBody || service.body}
          </p>
          <Link
            href="#book-discovery"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-(--radius-btn) bg-white px-5 text-sm font-semibold text-brand-purple hover:bg-white/95"
          >
            {ui.cta}
          </Link>
        </div>
      </section>

      <section className="site-container section-space grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          {service.problem ? (
            <div>
              <p className="pill">{ui.problem}</p>
              <p className="mt-4 text-lg leading-relaxed text-brand-navy">{service.problem}</p>
            </div>
          ) : null}

          {service.details && service.details.length > 0 ? (
            <div className={service.problem ? "mt-10" : ""}>
              <p className="pill">{ui.covers}</p>
              <ul className="mt-5 space-y-3">
                {service.details.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-(--radius-media) border border-brand-navy/10 bg-white px-4 py-3"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-purple"
                      aria-hidden
                    />
                    <span className="body-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <aside className="space-y-6">
          {service.outcomes && service.outcomes.length > 0 ? (
            <div className="rounded-(--radius-media) bg-surface-soft p-6">
              <h2 className="text-lg font-bold text-brand-navy">{ui.outcomes}</h2>
              <ul className="mt-4 space-y-3">
                {service.outcomes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-text-muted">
                    <span className="font-bold text-brand-purple" aria-hidden>
                      →
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {service.audience ? (
            <div className="rounded-(--radius-media) border border-brand-navy/10 p-6">
              <h2 className="text-lg font-bold text-brand-navy">{ui.audience}</h2>
              <p className="mt-3 body-muted">{service.audience}</p>
            </div>
          ) : null}

          <div className="rounded-(--radius-media) bg-brand-purple p-6 text-white">
            <h2 className="text-lg font-bold">{ui.ctaHeading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/90">{ui.ctaBody}</p>
            <Link
              href="#book-discovery"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-(--radius-btn) bg-white px-5 text-sm font-semibold text-brand-purple"
            >
              {ui.cta}
            </Link>
          </div>
        </aside>
      </section>

      {others.length > 0 ? (
        <section className="border-t border-brand-navy/10 bg-surface-soft">
          <div className="site-container section-space">
            <h2 className="heading-lg">{ui.other}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="rounded-(--radius-media) border border-brand-navy/10 bg-white p-5 transition-colors hover:border-brand-purple/40"
                >
                  <h3 className="font-bold text-brand-navy">{item.name}</h3>
                  <p className="mt-2 text-sm text-text-muted">{item.summary}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-brand-purple">
                    {ui.seeService} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
