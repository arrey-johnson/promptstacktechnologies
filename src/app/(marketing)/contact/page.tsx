import type { Metadata } from "next";
import { ContactHero, ContactPathways } from "@/components/company";
import { contactPageCopy } from "@/content/company";
import { getSiteSettings } from "@/lib/site/get-site-settings";
import {
  buildContactPageJsonLd,
  buildOrganizationJsonLd,
} from "@/lib/seo/organization-json-ld";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: contactPageCopy.supporting,
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const organizationLd = buildOrganizationJsonLd(settings);
  const contactLd = buildContactPageJsonLd();

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationLd, contactLd]),
        }}
      />
      <ContactHero />
      <ContactPathways settings={settings} />
    </main>
  );
}
