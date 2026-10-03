import Link from "next/link";
import { CareersFilters } from "@/components/careers/careers-filters";
import { JobAlertForm } from "@/components/careers/job-alert-form";
import { getCmsData } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";

export default async function CareersPage() {
  const locale = await getRequestLocale();
  const { careersPage: page, jobs } = await getCmsData(locale);
  const published = jobs.filter((job) => job.published);

  return (
    <>
      <section className="site-container py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-text-muted">
          <Link href="/">{locale === "fr" ? "Accueil" : "Homepage"}</Link> /{" "}
          {locale === "fr" ? "Carrières" : "Careers"}
        </nav>
        <h1 className="mt-4 heading-xl">{page.hero.heading}</h1>
        <p className="mt-4 max-w-2xl body-muted">{page.hero.body}</p>
      </section>

      <section className="bg-surface-soft">
        <div className="site-container section-space">
          <h2 className="heading-lg">{page.whyJoin.heading}</h2>
          <p className="mt-3 max-w-2xl body-muted">{page.whyJoin.body}</p>
          <ul className="mt-6 space-y-3">
            {page.whyJoin.items.map((item) => (
              <li key={item} className="font-semibold text-brand-navy">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="site-container section-space">
        <h2 className="heading-lg">{page.openRolesHeading}</h2>
        <CareersFilters
          jobs={published}
          emptyState={page.emptyState}
          allLabel={locale === "fr" ? "Tous" : "All"}
        />
      </section>

      <section className="bg-surface-soft">
        <JobAlertForm
          heading={page.alert.heading}
          body={page.alert.body}
          placeholder={locale === "fr" ? "Votre e-mail" : "Enter your email"}
          submitLabel={locale === "fr" ? "Créer une alerte" : "Create a Job Alert"}
        />
      </section>
    </>
  );
}
