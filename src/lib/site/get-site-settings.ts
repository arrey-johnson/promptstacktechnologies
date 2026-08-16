import { isSanityConfigured } from "@/sanity/env";
import { fetchSanityData } from "@/sanity/lib/fetch";
import {
  mapSanitySiteSettings,
  type SanitySiteSettingsDoc,
  type SiteSettingsView,
} from "@/sanity/lib/mappers/siteSettings";
import { siteSettingsQuery } from "@/sanity/queries";
import { siteSettingsTag } from "@/sanity/lib/tags";

const emptySettings: SiteSettingsView = {
  organizationLegalName: null,
  organizationShortDescription: null,
  footerDescriptor: null,
  contact: null,
  social: [],
};

/** Verified site settings from Sanity singleton — empty when unset/unavailable. */
export async function getSiteSettings(): Promise<SiteSettingsView> {
  if (!isSanityConfigured()) {
    return emptySettings;
  }

  const doc = await fetchSanityData<SanitySiteSettingsDoc | null>(
    siteSettingsQuery,
    {},
    { tags: siteSettingsTag() },
  );
  return mapSanitySiteSettings(doc);
}
