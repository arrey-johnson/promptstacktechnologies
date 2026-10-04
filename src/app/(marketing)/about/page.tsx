import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { TeamSection } from "@/components/about/team-section";
import { ContactForm } from "@/components/forms/contact-form";
import { getCmsData } from "@/lib/cms/store";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const cms = await getCmsData();
  const { about, contact, team } = cms;

  return (
    <>
      <section className="site-container grid gap-8 py-14 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="pill">{about.hero.eyebrow}</p>
          <h1 className="mt-4 heading-xl">{about.hero.heading}</h1>
        </div>
        <p className="body-muted">{about.hero.body}</p>
      </section>

      <section className="bg-brand-navy text-white">
        <div className="site-container section-space">
          <p className="text-sm font-semibold tracking-wide text-brand-lavender uppercase">
            {about.story.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-4xl">{about.story.heading}</h2>
          {about.story.body.map((p) => (
            <p key={p.slice(0, 20)} className="mt-4 max-w-3xl text-white/85">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="site-container section-space">
        <p className="pill">{about.values.eyebrow}</p>
        <h2 className="mt-4 heading-lg">{about.values.heading}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {about.values.items.map((item) => (
            <article key={item.title} className="rounded-(--radius-media) border border-brand-navy/10 p-5">
              <h3 className="text-lg font-bold text-brand-navy">{item.title}</h3>
              <p className="mt-2 body-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <TeamSection
        heading={about.teamIntro.heading}
        body={about.teamIntro.body}
        members={team}
      />

      <section className="site-container section-space">
        <h2 className="heading-lg">{about.capabilities.heading}</h2>
        <p className="mt-3 max-w-2xl body-muted">{about.capabilities.body}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {about.capabilities.items.map((item) => (
            <article key={item.title}>
              <h3 className="font-bold text-brand-navy">{item.title}</h3>
              <p className="mt-2 body-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface-soft">
        <div className="site-container section-space">
          <h2 className="heading-lg">{about.contactBand.heading}</h2>
          <p className="mt-3 max-w-2xl body-muted">{about.contactBand.body}</p>
          <div className="mt-8">
            <Suspense fallback={<p className="body-muted">Loading form…</p>}>
              <ContactForm content={contact} />
            </Suspense>
          </div>
          <p className="mt-6 text-sm text-text-muted">
            Or email{" "}
            <Link href={`mailto:${cms.settings.contactEmail}`} className="font-semibold text-brand-purple">
              {cms.settings.contactEmail}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
