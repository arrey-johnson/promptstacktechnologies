export type SiteSettingsContact = {
  email?: string;
  phone?: string;
  address?: string;
};

export type SiteSettingsSocialLink = {
  label: string;
  href: string;
};

export type SiteSettingsView = {
  organizationLegalName: string | null;
  organizationShortDescription: string | null;
  footerDescriptor: string | null;
  contact: SiteSettingsContact | null;
  social: SiteSettingsSocialLink[];
};

export type SanitySiteSettingsDoc = {
  organizationLegalName?: string | null;
  organizationShortDescription?: string | null;
  footerDescriptor?: string | null;
  businessEmail?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  socialLinks?: Array<{ label?: string | null; href?: string | null }> | null;
};

export function mapSanitySiteSettings(
  doc: SanitySiteSettingsDoc | null | undefined,
): SiteSettingsView {
  if (!doc) {
    return {
      organizationLegalName: null,
      organizationShortDescription: null,
      footerDescriptor: null,
      contact: null,
      social: [],
    };
  }

  const email = doc.businessEmail?.trim() || undefined;
  const phone = doc.phone?.trim() || doc.whatsapp?.trim() || undefined;
  const address = doc.address?.trim() || undefined;
  const hasContact = Boolean(email || phone || address);

  return {
    organizationLegalName: doc.organizationLegalName?.trim() || null,
    organizationShortDescription:
      doc.organizationShortDescription?.trim() || null,
    footerDescriptor: doc.footerDescriptor?.trim() || null,
    contact: hasContact ? { email, phone, address } : null,
    social: (doc.socialLinks ?? [])
      .filter(
        (link): link is { label: string; href: string } =>
          Boolean(link?.label?.trim() && link.href?.trim()),
      )
      .map((link) => ({
        label: link.label.trim(),
        href: link.href.trim(),
      })),
  };
}
