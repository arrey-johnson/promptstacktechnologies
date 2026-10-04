import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
// import { CeoWord } from "@/components/about/ceo-word";
import { TeamSection } from "@/components/about/team-section";
import { ContactForm } from "@/components/forms/contact-form";
import { getCmsData } from "@/lib/cms/store";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const cms = await getCmsData();
  const { about, contact, team } = cms;

  return (
    <>
      {/* 1. Hero — who we are */}
      <section className="site-container grid gap-8 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="pill">{about.hero.eyebrow}</p>
          <h1 className="mt-4 heading-xl">{about.hero.heading}</h1>
        </div>
        <p className="body-muted text-base leading-relaxed sm:text-lg">{about.hero.body}</p>
      </section>

      {/* 2. Why we exist + Our vision */}
      <section className="bg-surface-soft">
        <div className="site-container section-space">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="pill">{about.story.eyebrow}</p>
              <h2 className="mt-4 heading-lg">{about.story.heading}</h2>
              <div className="mt-6 space-y-4">
                {about.story.body.map((p) => (
                  <p key={p.slice(0, 28)} className="body-muted text-base leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {about.vision ? (
              <div>
                <p className="pill">{about.vision.eyebrow}</p>
                <h2 className="mt-4 heading-lg">{about.vision.heading}</h2>
                <div className="mt-6 space-y-4">
                  {about.vision.body.map((p) => (
                    <p key={p.slice(0, 28)} className="body-muted text-base leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* 3. Team */}
      <TeamSection
        eyebrow={about.teamIntro.eyebrow}
        heading={about.teamIntro.heading}
        body={about.teamIntro.body}
        members={team}
      />

      {/* 4. How we intend to succeed */}
      {about.howWeWin ? (
        <section className="bg-surface-soft">
          <div className="site-container section-space">
            <p className="pill">{about.howWeWin.eyebrow}</p>
            <h2 className="mt-4 heading-lg max-w-3xl">{about.howWeWin.heading}</h2>
            <p className="mt-4 max-w-2xl body-muted">{about.howWeWin.body}</p>
            <ol className="mt-10 grid gap-6 sm:grid-cols-2">
              {about.howWeWin.items.map((item, index) => (
                <li key={item.title} className="flex gap-4">
                  <span
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-purple text-xs font-bold text-white"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-brand-navy">{item.title}</h3>
                    <p className="mt-2 body-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* 5. Standards */}
      <section className="site-container section-space">
        <p className="pill">{about.values.eyebrow}</p>
        <h2 className="mt-4 heading-lg">{about.values.heading}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {about.values.items.map((item) => (
            <article key={item.title} className="border-t-2 border-brand-purple pt-4">
              <h3 className="text-lg font-bold text-brand-navy">{item.title}</h3>
              <p className="mt-2 body-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Word from the CEO — temporarily hidden
      {about.ceoWord ? <CeoWord content={about.ceoWord} /> : null}
      */}

      {/* 7. What we deliver */}
      <section className="bg-surface-soft">
        <div className="site-container section-space">
          <h2 className="heading-lg">{about.capabilities.heading}</h2>
          <p className="mt-3 max-w-2xl body-muted">{about.capabilities.body}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {about.capabilities.items.map((item) => (
              <article key={item.title}>
                <h3 className="font-bold text-brand-navy">{item.title}</h3>
                <p className="mt-2 body-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact */}
      <section className="site-container section-space">
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
      </section>
    </>
  );
}
