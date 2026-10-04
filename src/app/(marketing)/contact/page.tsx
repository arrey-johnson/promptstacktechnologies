import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ContactForm } from "@/components/forms/contact-form";
import { getCmsData } from "@/lib/cms/store";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const { contact, settings } = await getCmsData();
  const heroImage = contact.hero.imageSrc || "/brand/contact-hero.jpg?v=2";

  return (
    <>
      <section className="relative isolate min-h-[22rem] overflow-hidden text-white sm:min-h-[26rem]">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          quality={95}
          className="object-cover object-[55%_center]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgb(168_0_230/0.92)_0%,rgb(168_0_230/0.82)_38%,rgb(168_0_230/0.4)_68%,rgb(168_0_230/0.18)_100%)]"
          aria-hidden="true"
        />
        <div className="relative site-container flex min-h-[22rem] items-center section-space sm:min-h-[26rem]">
          <div className="max-w-xl">
            <p className="inline-flex items-center rounded-(--radius-pill) bg-white/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-white uppercase">
              Contact
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              {contact.hero.heading}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/92">
              {contact.hero.body}
            </p>
            <p className="mt-5 text-sm text-white/85">
              {settings.location} · {settings.phone} · {settings.contactEmail}
            </p>
          </div>
        </div>
      </section>

      <section className="site-container section-space">
        <Suspense fallback={<p className="body-muted">Loading form…</p>}>
          <ContactForm content={contact} />
        </Suspense>
      </section>
    </>
  );
}
