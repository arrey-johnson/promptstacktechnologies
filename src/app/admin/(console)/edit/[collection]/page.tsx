import { notFound } from "next/navigation";
import { CollectionEditor } from "@/components/admin/collection-editor";
import { CMS_COLLECTIONS } from "@/lib/cms/collections";
import type { CmsCollection } from "@/lib/cms/types";

type Props = { params: Promise<{ collection: string }> };

export default async function AdminEditCollectionPage({ params }: Props) {
  const { collection } = await params;
  const meta = CMS_COLLECTIONS.find((item) => item.key === collection);
  if (!meta) notFound();

  return (
    <CollectionEditor collection={meta.key as CmsCollection} label={meta.label} />
  );
}
