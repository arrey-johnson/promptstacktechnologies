import { allAdminNavItems } from "./admin-nav";
import type { CmsCollection } from "./types";

/** @deprecated Prefer ADMIN_NAV_GROUPS from admin-nav — kept for compatibility. */
export const CMS_COLLECTIONS: Array<{
  key: CmsCollection;
  label: string;
  description: string;
}> = allAdminNavItems().map((item) => ({
  key: item.key,
  label: item.label,
  description: item.description,
}));
