import { HomeView } from "@/components/home/home-view";
import { getCmsData } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";

export default async function HomePage() {
  const [cms, locale] = await Promise.all([getCmsData(), getRequestLocale()]);
  return (
    <HomeView
      home={cms.home}
      services={cms.serviceItems}
      products={cms.products}
      locale={locale}
    />
  );
}
