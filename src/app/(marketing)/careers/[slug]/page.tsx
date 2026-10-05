import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JobApplicationForm } from "@/components/careers/job-application-form";
import { getCmsData } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { jobs } = await getCmsData();
  const job = jobs.find((item) => item.slug === slug && item.published);
  return { title: job?.title || "Role" };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const [cms, locale] = await Promise.all([getCmsData(), getRequestLocale()]);
  const job = cms.jobs.find((item) => item.slug === slug && item.published);
  if (!job) notFound();

  const ui =
    locale === "fr"
      ? {
          back: "Retour aux carrières",
          responsibilities: "Responsabilités",
          requirements: "Profil recherché",
          applyCta: "Postuler maintenant",
        }
      : {
          back: "Back to careers",
          responsibilities: "Responsibilities",
          requirements: "What we’re looking for",
          applyCta: "Apply now",
        };

  return (
    <>
      <article className="site-container py-14">
        <Link href="/careers" className="text-sm font-semibold text-brand-purple">
          ← {ui.back}
        </Link>
        <p className="pill mt-6">{job.employmentType}</p>
        <h1 className="mt-4 heading-xl">{job.title}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {Array.from(
            new Set(
              [job.location, job.workType]
                .map((tag) => tag?.trim())
                .filter(Boolean)
                .filter((tag) => !(tag === job.workType && job.location?.includes(job.workType))),
            ),
          ).map((tag) => (
            <span
              key={tag}
              className="rounded-(--radius-pill) bg-surface-soft px-2.5 py-1 text-xs font-semibold text-brand-navy"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-navy">{job.summary}</p>
        <p className="mt-4 max-w-3xl whitespace-pre-wrap body-muted">{job.body}</p>

        {job.responsibilities && job.responsibilities.length > 0 ? (
          <div className="mt-10 max-w-3xl">
            <h2 className="text-xl font-bold text-brand-navy">{ui.responsibilities}</h2>
            <ul className="mt-4 space-y-3">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex gap-3 body-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {job.requirements && job.requirements.length > 0 ? (
          <div className="mt-10 max-w-3xl">
            <h2 className="text-xl font-bold text-brand-navy">{ui.requirements}</h2>
            <ul className="mt-4 space-y-3">
              {job.requirements.map((item) => (
                <li key={item} className="flex gap-3 body-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <a href="#apply" className="btn-primary mt-10 inline-flex">
          {ui.applyCta}
        </a>
      </article>

      <section id="apply" className="scroll-mt-28 border-t border-brand-navy/10 bg-surface-soft">
        <div className="site-container section-space max-w-3xl">
          <JobApplicationForm jobSlug={job.slug} jobTitle={job.title} locale={locale} />
        </div>
      </section>
    </>
  );
}
