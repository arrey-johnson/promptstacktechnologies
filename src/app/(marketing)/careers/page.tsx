import Image from "next/image";
import Link from "next/link";
import { CareersFilters } from "@/components/careers/careers-filters";
import { JobAlertForm } from "@/components/careers/job-alert-form";
import { getCmsData } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";

export default async function CareersPage() {
  const locale = await getRequestLocale();
  const { careersPage: page, jobs } = await getCmsData(locale);
  const published = jobs.filter((job) => job.published);
  const heroImage = page.hero.imageSrc || "/brand/careers-hero.jpg?v=2";
  const careersLabel = locale === "fr" ? "Carrières" : "Careers";

  return (
    <>
      <section className="relative isolate min-h-[22rem] overflow-hidden text-white sm:min-h-[26rem]">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          quality={95}
          className="object-cover object-[62%_center]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgb(168_0_230/0.92)_0%,rgb(168_0_230/0.82)_38%,rgb(168_0_230/0.4)_68%,rgb(168_0_230/0.18)_100%)]"
          aria-hidden="true"
        />
        <div className="relative site-container flex min-h-[22rem] items-center section-space sm:min-h-[26rem]">
          <div className="max-w-xl">
            <nav aria-label="Breadcrumb" className="text-sm text-white/75">
              <Link href="/" className="hover:text-white">
                {locale === "fr" ? "Accueil" : "Homepage"}
              </Link>{" "}
              / {careersLabel}
            </nav>
            <p className="mt-6 inline-flex items-center rounded-(--radius-pill) bg-white/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-white uppercase">
              {careersLabel}
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              {page.hero.heading}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/92">
              {page.hero.body}
            </p>
          </div>
        </div>
      </section>

      <section className="site-container section-space">
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
