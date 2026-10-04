import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/components/services/service-detail-view";
import { getCmsData } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { serviceItems } = await getCmsData();
  const service = serviceItems.find((item) => item.id === slug);
  return {
    title: service?.name || "Service",
    description: service?.summary,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [cms, locale] = await Promise.all([getCmsData(), getRequestLocale()]);
  const service = cms.serviceItems.find((item) => item.id === slug);
  if (!service) notFound();

  return (
    <ServiceDetailView
      service={service}
      siblings={cms.serviceItems}
      locale={locale}
    />
  );
}
