import type { Metadata } from "next";
import {
  AboutAcademy,
  AboutDivisions,
  AboutFinalCta,
  AboutFounder,
  AboutHero,
  AboutMarket,
  AboutPhilosophy,
  AboutProblems,
  AboutProcessBridge,
  AboutStory,
} from "@/components/company";
import { aboutPageCopy } from "@/content/company";
import { getSiteSettings } from "@/lib/site/get-site-settings";
import {
  buildAboutPageJsonLd,
  buildOrganizationJsonLd,
} from "@/lib/seo/organization-json-ld";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: aboutPageCopy.supporting,
  path: "/company/about",
});

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const organizationLd = buildOrganizationJsonLd(settings);
  const aboutLd = buildAboutPageJsonLd();

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationLd, aboutLd]),
        }}
      />
      <AboutHero />
      <AboutStory />
      <AboutProblems />
      <AboutDivisions />
      <AboutPhilosophy />
      <AboutMarket />
      <AboutFounder />
      <AboutAcademy />
      <AboutProcessBridge />
      <AboutFinalCta />
    </main>
  );
}
