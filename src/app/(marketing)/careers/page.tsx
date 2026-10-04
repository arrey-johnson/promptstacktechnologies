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
        <p className="pill mt-6">{locale === "fr" ? "Carrières" : "Careers"}</p>
        <h1 className="mt-4 heading-xl">{page.hero.heading}</h1>
        <p className="mt-4 max-w-2xl body-muted">{page.hero.body}</p>
      </section>

      <section className="site-container pb-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="heading-lg">{page.openRolesHeading}</h2>
            <p className="mt-2 max-w-xl text-sm text-text-muted">
              {locale === "fr"
                ? "Sélectionnez un poste pour lire le détail et postuler directement sur le site."
                : "Select a role to review the details and apply directly on this website."}
            </p>
          </div>
          <p className="text-sm font-semibold text-brand-purple">
            {published.length}{" "}
            {locale === "fr"
              ? published.length === 1
                ? "poste ouvert"
                : "postes ouverts"
              : published.length === 1
                ? "open role"
                : "open roles"}
          </p>
        </div>
        <CareersFilters
          jobs={published}
          emptyState={page.emptyState}
          allLabel={locale === "fr" ? "Tous" : "All"}
          viewRoleLabel={locale === "fr" ? "Voir le poste" : "View role"}
          applyLabel={locale === "fr" ? "Postuler" : "Apply"}
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
