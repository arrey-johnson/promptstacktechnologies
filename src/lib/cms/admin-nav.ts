import type { CmsCollection } from "./types";

export type AdminNavItem = {
  key: CmsCollection;
  label: string;
  description: string;
  /** Public page to preview after editing */
  viewHref?: string;
};

export type AdminNavGroup = {
  id: string;
  label: string;
  items: AdminNavItem[];
};

/** WordPress-style sidebar groups with plain-language labels. */
export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    id: "pages",
    label: "Pages",
    items: [
      {
        key: "home",
        label: "Home",
        description: "Hero, services intro, process, and homepage CTAs",
        viewHref: "/",
      },
      {
        key: "about",
        label: "About",
        description: "Story, vision, team intro, and about page copy",
        viewHref: "/about",
      },
      {
        key: "servicesPage",
        label: "Services page",
        description: "Services listing hero and call-to-action",
        viewHref: "/services",
      },
      {
        key: "productsPage",
        label: "Products page",
        description: "Products page intro and empty state",
        viewHref: "/products",
      },
      {
        key: "portfolioPage",
        label: "Portfolio page",
        description: "Portfolio hero, grid headings, and CTA",
        viewHref: "/portfolio",
      },
      {
        key: "careersPage",
        label: "Careers page",
        description: "Careers hero and open-roles copy",
        viewHref: "/careers",
      },
      {
        key: "contact",
        label: "Contact",
        description: "Contact hero, form labels, and subject options",
        viewHref: "/contact",
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    items: [
      {
        key: "serviceItems",
        label: "Service offerings",
        description: "Software, AI, Marketing, Academy — details and courses",
        viewHref: "/services",
      },
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    items: [
      {
        key: "portfolioItems",
        label: "Projects",
        description: "Portfolio cards, images, and categories",
        viewHref: "/portfolio",
      },
    ],
  },
  {
    id: "team",
    label: "Team",
    items: [
      {
        key: "team",
        label: "Team members",
        description: "Names, roles, bios, photos, and LinkedIn links",
        viewHref: "/about",
      },
    ],
  },
  {
    id: "jobs",
    label: "Jobs",
    items: [
      {
        key: "jobs",
        label: "Open roles",
        description: "Job posts shown on the careers page",
        viewHref: "/careers",
      },
    ],
  },
  {
    id: "blog",
    label: "Blog",
    items: [
      {
        key: "posts",
        label: "Posts",
        description: "Blog articles and drafts",
        viewHref: "/blog",
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    items: [
      {
        key: "products",
        label: "Product cards",
        description: "Product listings and placeholders",
        viewHref: "/products",
      },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    items: [
      {
        key: "legal",
        label: "Legal pages",
        description: "Privacy, terms, and cookies",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    items: [
      {
        key: "settings",
        label: "Site settings",
        description: "Site name, contact info, navigation, footer, SEO",
      },
    ],
  },
];

export function getAdminNavItem(key: CmsCollection): AdminNavItem | undefined {
  for (const group of ADMIN_NAV_GROUPS) {
    const found = group.items.find((item) => item.key === key);
    if (found) return found;
  }
  return undefined;
}

export function allAdminNavItems(): AdminNavItem[] {
  return ADMIN_NAV_GROUPS.flatMap((g) => g.items);
}
