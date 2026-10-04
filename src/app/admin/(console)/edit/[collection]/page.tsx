import { notFound } from "next/navigation";
import { CollectionEditor } from "@/components/admin/collection-editor";
import { getAdminNavItem, allAdminNavItems } from "@/lib/cms/admin-nav";
import type { CmsCollection } from "@/lib/cms/types";

type Props = { params: Promise<{ collection: string }> };

export default async function AdminEditCollectionPage({ params }: Props) {
  const { collection } = await params;
  const meta = getAdminNavItem(collection as CmsCollection);
  if (!meta) notFound();

  return <CollectionEditor collection={meta.key} label={meta.label} />;
}

export function generateStaticParams() {
  return allAdminNavItems().map((item) => ({ collection: item.key }));
}
