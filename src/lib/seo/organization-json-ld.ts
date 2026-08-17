import { siteConfig } from "@/config/site";
import { getSiteUrl } from "@/config/env";
import type { SiteSettingsView } from "@/sanity/lib/mappers/siteSettings";

/**
 * Organization structured data from verified Site Settings + siteConfig only.
 * Omits unverified founding dates, employee counts, fabricated socials, etc.
 */
export function buildOrganizationJsonLd(settings: SiteSettingsView) {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.organizationLegalName || siteConfig.name,
    url: siteUrl,
    logo: `${siteUrl}/brand/promptstack-icon.svg`,
    description:
      settings.organizationShortDescription || siteConfig.description,
  };

  if (settings.contact?.email) {
    data.email = settings.contact.email;
  }
  if (settings.contact?.phone) {
    data.telephone = settings.contact.phone;
  }
  if (settings.contact?.address) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: settings.contact.address,
    };
  }
  if (settings.social.length > 0) {
    data.sameAs = settings.social.map((item) => item.href);
  }

  return data;
}

export function buildAboutPageJsonLd() {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${siteConfig.name}`,
    url: `${siteUrl}/company/about`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteUrl,
    },
  };
}

export function buildContactPageJsonLd() {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${siteConfig.name}`,
    url: `${siteUrl}/contact`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteUrl,
    },
  };
}
