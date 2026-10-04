import { BookingProvider } from "@/components/booking/booking-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getCmsData, getCollection } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";

export const dynamic = "force-dynamic";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const [settings, cms] = await Promise.all([
    getCollection("settings", locale),
    getCmsData(locale),
  ]);
  const serviceLinks = cms.serviceItems.map((service) => ({
    label: service.name,
    href: service.href || `/services/${service.id}`,
  }));

  return (
    <BookingProvider locale={locale}>
      <SiteHeader
        nav={settings.nav}
        cta={settings.cta}
        locale={locale}
        contactEmail={settings.contactEmail}
        phone={settings.phone}
        location={settings.location}
        socials={settings.socials}
        serviceLinks={serviceLinks}
      />
      <main id="main-content">{children}</main>
      <SiteFooter settings={settings} />
    </BookingProvider>
  );
}
