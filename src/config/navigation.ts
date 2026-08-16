/**
 * Global navigation architecture for Promptstack Technologies.
 * Only `href` values that are approved launch routes are clickable.
 * Future capability/problem items may appear as non-link labels.
 */

import { areAcademyApplicationsEnabled } from "@/config/academy";

export type NavLink = {
  label: string;
  href: string;
};

export type NavLabel = {
  label: string;
  /** Presentational architecture label — not a route yet. */
  href?: undefined;
};

export type NavItem = NavLink | NavLabel;

export function isNavLink(item: NavItem): item is NavLink {
  return typeof item.href === "string";
}

export const primaryCta = {
  label: "Start a Project",
  href: "/start-a-project",
} as const;

export const primaryNavLinks: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Academy", href: "/academy" },
  { label: "Insights", href: "/insights" },
];

/** Live V1 Solutions destinations for the mobile drawer accordion. */
export const mobileSolutionsLinks: NavLink[] = [
  { label: "Software Solutions", href: "/solutions/software" },
  { label: "AI & Automation", href: "/solutions/ai-automation" },
  { label: "Digital Marketing", href: "/solutions/digital-marketing" },
  { label: "View all solutions", href: "/solutions" },
];

export type SolutionsColumn = {
  title: string;
  /** Pillar overview route — always a real launch route. */
  href: string;
  items: NavItem[];
};

export const solutionsMegaMenu: {
  columns: SolutionsColumn[];
  problemExploration: {
    title: string;
    items: NavItem[];
  };
} = {
  columns: [
    {
      title: "Software Solutions",
      href: "/solutions/software",
      items: [
        { label: "Software Solutions", href: "/solutions/software" },
        { label: "Custom Software Development" },
        { label: "Business Management Systems" },
        { label: "Web Applications & Platforms" },
      ],
    },
    {
      title: "AI & Automation",
      href: "/solutions/ai-automation",
      items: [
        { label: "AI & Automation", href: "/solutions/ai-automation" },
        { label: "Business Process Automation" },
        { label: "AI-Powered Applications" },
        { label: "AI Customer Support" },
      ],
    },
    {
      title: "Digital Growth",
      href: "/solutions/digital-marketing",
      items: [
        { label: "Digital Marketing", href: "/solutions/digital-marketing" },
        { label: "Digital Growth Strategy" },
        { label: "Lead Generation" },
        { label: "Paid Advertising" },
      ],
    },
  ],
  problemExploration: {
    title: "Explore by business problem",
    // Future architecture — no dedicated V1 routes yet (docs/03).
    items: [
      { label: "Improve Operations" },
      { label: "Automate Repetitive Work" },
      { label: "Manage Customers & Sales" },
      { label: "Build a Digital Product" },
      { label: "Generate Growth" },
    ],
  },
};

/** Company dropdown — Team/Careers omitted until content is ready (docs/03). */
export const companyNavLinks: NavLink[] = [
  { label: "About", href: "/company/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  descriptor: "Software · AI & Automation · Digital Marketing",
  solutions: [
    { label: "Software Solutions", href: "/solutions/software" },
    { label: "AI & Automation", href: "/solutions/ai-automation" },
    { label: "Digital Marketing", href: "/solutions/digital-marketing" },
  ] satisfies NavLink[],
  company: [
    { label: "About", href: "/company/about" },
    { label: "Work", href: "/work" },
    { label: "How We Work", href: "/how-we-work" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  /**
   * Apply is included only when Epic 8 applications are enabled.
   * Use getFooterAcademyLinks() in UI so the flag is respected.
   */
  academy: [
    { label: "Academy", href: "/academy" },
    { label: "Programs", href: "/academy/programs" },
    { label: "How We Teach", href: "/academy/how-we-teach" },
    { label: "Apply", href: "/academy/apply" },
  ] satisfies NavLink[],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
  ] satisfies NavLink[],
  /**
   * TODO_CONTENT: Add verified social profile URLs only when supplied.
   * Do not invent social links.
   */
  social: [] as NavLink[],
  /**
   * TODO_CONTENT: Publish verified email/phone/address only when supplied.
   */
  contact: null as null | {
    email?: string;
    phone?: string;
    address?: string;
  },
};

/** Footer Academy links with Apply gated until applications are enabled. */
export function getFooterAcademyLinks(): NavLink[] {
  if (areAcademyApplicationsEnabled()) {
    return [...footerNav.academy];
  }
  return footerNav.academy.filter((link) => link.href !== "/academy/apply");
}
