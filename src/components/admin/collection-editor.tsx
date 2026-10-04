"use client";

import { VisualCollectionEditor } from "@/components/admin/visual-collection-editor";
import type { CmsCollection } from "@/lib/cms/types";

/** Back-compat wrapper — the editor is now form-based (WordPress-style). */
export function CollectionEditor({
  collection,
  label,
}: {
  collection: CmsCollection;
  label: string;
}) {
  return <VisualCollectionEditor collection={collection} label={label} />;
}
