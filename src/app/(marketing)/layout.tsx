import { BookingProvider } from "@/components/booking/booking-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getCollection } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";

export const dynamic = "force-dynamic";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const settings = await getCollection("settings", locale);

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
      />
      <main id="main-content">{children}</main>
      <SiteFooter settings={settings} />
    </BookingProvider>
  );
}
