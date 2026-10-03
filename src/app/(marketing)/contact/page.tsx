import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/forms/contact-form";
import { getCmsData } from "@/lib/cms/store";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const { contact, settings } = await getCmsData();

  return (
    <section className="site-container py-14">
      <h1 className="heading-xl">{contact.hero.heading}</h1>
      <p className="mt-4 max-w-2xl body-muted">{contact.hero.body}</p>
      <p className="mt-4 text-sm text-text-muted">
        {settings.location} · {settings.phone} · {settings.contactEmail}
      </p>
      <div className="mt-10">
        <Suspense fallback={<p className="body-muted">Loading form…</p>}>
          <ContactForm content={contact} />
        </Suspense>
      </div>
    </section>
  );
}
