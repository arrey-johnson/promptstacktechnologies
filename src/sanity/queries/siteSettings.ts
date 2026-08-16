import { defineQuery } from "next-sanity";

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    organizationLegalName,
    organizationShortDescription,
    footerDescriptor,
    businessEmail,
    phone,
    whatsapp,
    address,
    socialLinks[]{ label, href },
    defaultOgImage
  }
`);
