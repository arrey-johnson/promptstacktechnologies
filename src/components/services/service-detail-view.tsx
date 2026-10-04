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
          covers: "Ce que nous couvrons",
          howItWorks: "Comment ça se passe",
          goDeeper: "Aller plus loin",
          courses: "Parcours & frais",
          curriculum: "Programme",
          courseOutcomes: "Vous repartez avec",
          fee: "Frais",
          duration: "Format",
          outcomes: "Ce que vous gagnez",
          audience: "Pour qui c'est fait",
          faqs: "Questions fréquentes",
          other: "Autres services",
          ctaHeading: "Prêt à avancer sur ce sujet ?",
          ctaBody:
            "Réservez un appel découverte. Nous clarifierons le besoin, le parcours ou le périmètre utile, et la première étape concrète.",
          cta: "Réserver un appel découverte",
          enquireCourse: "S'inscrire / se renseigner",
          seeService: "Voir le service",
        }
      : {
          allServices: "All services",
          problem: "The problem",
          covers: "What we cover",
          howItWorks: "How it works",
          goDeeper: "Go deeper",
          courses: "Courses & fees",
          curriculum: "Curriculum",
          courseOutcomes: "You’ll leave with",
          fee: "Fee",
          duration: "Format",
          outcomes: "What you get",
          audience: "Who this is for",
          faqs: "FAQs",
          other: "Other services",
          ctaHeading: "Ready to move on this?",
          ctaBody:
            "Book a discovery call. We’ll clarify the need, the right course or scope, and the first concrete step.",
          cta: "Book a discovery call",
          enquireCourse: "Enquire / enrol",
          seeService: "See service",
        };

  const others = siblings.filter((item) => item.id !== service.id);
  const hasCourses = Boolean(service.courses && service.courses.length > 0);

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
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#book-discovery"
              className="inline-flex min-h-11 items-center justify-center rounded-(--radius-btn) bg-white px-5 text-sm font-semibold text-brand-purple hover:bg-white/95"
            >
              {ui.cta}
            </Link>
            {hasCourses ? (
              <Link
                href="#courses"
                className="inline-flex min-h-11 items-center justify-center rounded-(--radius-btn) border border-white/70 px-5 text-sm font-semibold text-white hover:bg-white/10"
              >
                {ui.courses}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {(service.problem || (service.details && service.details.length > 0)) && (
        <section className="site-container section-space grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-10">
            {service.problem ? (
              <div>
                <p className="pill">{ui.problem}</p>
                <p className="mt-4 text-lg leading-relaxed text-brand-navy">{service.problem}</p>
              </div>
            ) : null}

            {service.details && service.details.length > 0 ? (
              <div>
                <p className="pill">{ui.covers}</p>
                <ul className="mt-5 space-y-3">
                  {service.details.map((item) => (
                    <li key={item} className="flex gap-3 border-b border-brand-navy/8 pb-3 last:border-0">
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
            {service.audience ? (
              <div className="rounded-(--radius-media) border border-brand-navy/10 p-6">
                <h2 className="text-lg font-bold text-brand-navy">{ui.audience}</h2>
                <p className="mt-3 body-muted">{service.audience}</p>
              </div>
            ) : null}

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
          </aside>
        </section>
      )}

      {service.process && service.process.length > 0 ? (
        <section className="bg-surface-soft">
          <div className="site-container section-space">
            <p className="pill">{ui.howItWorks}</p>
            <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, index) => (
                <li key={step.title} className="min-w-0">
                  <p className="text-xs font-bold tracking-[0.16em] text-brand-purple uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-brand-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {service.modules && service.modules.length > 0 ? (
        <section className="site-container section-space">
          <p className="pill">{ui.goDeeper}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {service.modules.map((module) => (
              <div key={module.title} className="border-t-2 border-brand-purple pt-4">
                <h3 className="text-lg font-bold text-brand-navy">{module.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{module.body}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {hasCourses ? (
        <section id="courses" className="scroll-mt-28 bg-surface-soft">
          <div className="site-container section-space">
            <div className="max-w-2xl">
              <p className="pill">{ui.courses}</p>
              <h2 className="mt-4 heading-lg">
                {locale === "fr"
                  ? "Trois parcours. Des frais clairs. Un programme concret."
                  : "Three tracks. Clear fees. Concrete curriculum."}
              </h2>
              {service.feeNote ? (
                <p className="mt-4 body-muted">{service.feeNote}</p>
              ) : null}
            </div>

            <div className="mt-10 space-y-8">
              {service.courses!.map((course) => (
                <article
                  key={course.id}
                  id={course.id}
                  className="scroll-mt-28 overflow-hidden rounded-(--radius-media) border border-brand-navy/10 bg-white"
                >
                  <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="border-b border-brand-navy/10 p-6 sm:p-8 lg:border-r lg:border-b-0">
                      <h3 className="text-2xl font-bold tracking-tight text-brand-navy">
                        {course.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-text-muted">
                        {course.summary}
                      </p>
                      <dl className="mt-6 space-y-3">
                        <div>
                          <dt className="text-xs font-semibold tracking-[0.14em] text-brand-purple uppercase">
                            {ui.fee}
                          </dt>
                          <dd className="mt-1 text-2xl font-bold text-brand-navy">{course.fee}</dd>
                        </div>
                        {course.duration ? (
                          <div>
                            <dt className="text-xs font-semibold tracking-[0.14em] text-brand-navy/50 uppercase">
                              {ui.duration}
                            </dt>
                            <dd className="mt-1 text-sm font-medium text-brand-navy">
                              {course.duration}
                            </dd>
                          </div>
                        ) : null}
                      </dl>
                      <Link
                        href={`#book-discovery`}
                        className="btn-primary mt-6 inline-flex"
                      >
                        {ui.enquireCourse}
                      </Link>
                    </div>

                    <div className="p-6 sm:p-8">
                      <h4 className="text-sm font-bold tracking-[0.14em] text-brand-purple uppercase">
                        {ui.curriculum}
                      </h4>
                      <ol className="mt-4 space-y-2.5">
                        {course.curriculum.map((item, index) => (
                          <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-muted">
                            <span className="w-6 shrink-0 font-semibold text-brand-navy/45">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ol>
                      {course.outcomes && course.outcomes.length > 0 ? (
                        <div className="mt-6 border-t border-brand-navy/10 pt-5">
                          <h4 className="text-sm font-bold text-brand-navy">
                            {ui.courseOutcomes}
                          </h4>
                          <ul className="mt-3 space-y-2">
                            {course.outcomes.map((item) => (
                              <li
                                key={item}
                                className="flex gap-2 text-sm leading-relaxed text-text-muted"
                              >
                                <span className="text-brand-purple" aria-hidden>
                                  ✓
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.faqs && service.faqs.length > 0 ? (
        <section className="site-container section-space">
          <p className="pill">{ui.faqs}</p>
          <div className="mt-8 max-w-3xl divide-y divide-brand-navy/10">
            {service.faqs.map((faq) => (
              <div key={faq.title} className="py-5 first:pt-0 last:pb-0">
                <h3 className="text-lg font-bold text-brand-navy">{faq.title}</h3>
                <p className="mt-2 body-muted">{faq.body}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="bg-brand-navy text-white">
        <div className="site-container section-space text-center">
          <h2 className="mx-auto max-w-3xl text-2xl font-bold sm:text-4xl">{ui.ctaHeading}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/88">{ui.ctaBody}</p>
          <Link
            href="#book-discovery"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-(--radius-btn) bg-white px-5 text-sm font-semibold text-brand-purple hover:bg-white/95"
          >
            {ui.cta}
          </Link>
        </div>
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
