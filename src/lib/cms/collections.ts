import type { CmsCollection } from "./types";

export const CMS_COLLECTIONS: Array<{
  key: CmsCollection;
  label: string;
  description: string;
}> = [
  { key: "settings", label: "Site Settings", description: "Nav, footer, contact, SEO, newsletter" },
  { key: "home", label: "Home Page", description: "Hero and all homepage sections" },
  { key: "about", label: "About Page", description: "Story, values, team intro, capabilities" },
  { key: "servicesPage", label: "Services Page", description: "Services hero and CTA copy" },
  { key: "productsPage", label: "Products Page", description: "Products page intro copy" },
  { key: "portfolioPage", label: "Portfolio Page", description: "Portfolio hero, grid, and CTA copy" },
  { key: "careersPage", label: "Careers Page", description: "Careers page copy and empty states" },
  { key: "contact", label: "Contact Page", description: "Intents and form labels" },
  { key: "serviceItems", label: "Services", description: "Software, AI, Marketing, Academy" },
  { key: "products", label: "Products", description: "Product cards and placeholders" },
  { key: "portfolioItems", label: "Portfolio", description: "Portfolio project cards and images" },
  { key: "jobs", label: "Jobs", description: "Open roles / placeholders" },
  { key: "team", label: "Team", description: "About page team members" },
  { key: "posts", label: "Blog Posts", description: "Insights and articles" },
  { key: "legal", label: "Legal Pages", description: "Privacy, terms, cookies" },
];
