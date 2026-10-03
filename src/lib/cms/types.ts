export type NavLink = { label: string; href: string };
export type FooterColumn = { title: string; links: NavLink[] };
export type Cta = { label: string; href: string };
export type FeatureItem = { title: string; body: string };
export type ProcessStep = { title: string; body: string };

export type ServiceItem = {
  id: string;
  name: string;
  summary: string;
  body: string;
  /** Longer detail shown on /services — keep home cards on summary + body */
  detailBody?: string;
  details?: string[];
  href: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type ProductItem = {
  id: string;
  slug: string;
  name: string;
  status: string;
  summary: string;
  body: string;
  ctaLabel: string;
};

export type JobItem = {
  id: string;
  slug: string;
  title: string;
  employmentType: string;
  location: string;
  workType: string;
  summary: string;
  body: string;
  published: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  body: string;
  published: boolean;
};

export type LegalPage = {
  slug: string;
  title: string;
  body: string;
};

export type SiteSettings = {
  siteName: string;
  tagline: string;
  contactEmail: string;
  phone: string;
  location: string;
  nav: NavLink[];
  cta: Cta;
  footerColumns: FooterColumn[];
  socials: NavLink[];
  newsletter: {
    heading: string;
    body: string;
    consent: string;
  };
  seo: {
    title: string;
    description: string;
  };
};

export type HomeContent = {
  hero: {
    eyebrow: string;
    heading: string;
    accentWords: string[];
    supporting: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    videoSrc: string;
  };
  purpose: {
    eyebrow: string;
    heading: string;
    body: string[];
  };
  servicesIntro: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  featuredWork: {
    eyebrow: string;
    heading: string;
    items: Array<{
      title: string;
      industry: string;
      services: string[];
      body: string;
    }>;
  };
  process: {
    eyebrow: string;
    heading: string;
    body: string;
    steps: ProcessStep[];
  };
  productsTeaser: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  aboutTeaser: {
    eyebrow: string;
    heading: string;
    body: string[];
  };
  whyUs: {
    eyebrow: string;
    heading: string;
    items: FeatureItem[];
  };
  finalCta: {
    heading: string;
    body: string;
    cta: Cta;
  };
};

export type AboutContent = {
  hero: { eyebrow: string; heading: string; body: string };
  story: { eyebrow: string; heading: string; body: string[] };
  values: { eyebrow: string; heading: string; items: FeatureItem[] };
  teamIntro: { heading: string; body: string };
  capabilities: { heading: string; body: string; items: FeatureItem[] };
  contactBand: { heading: string; body: string };
};

export type ServicesContent = {
  hero: { heading: string; body: string };
  cta: { heading: string; body: string; cta: Cta };
};

export type ProductsContent = {
  hero: { eyebrow?: string; heading: string; body: string };
  emptyState: string;
};

export type CareersContent = {
  hero: { heading: string; body: string };
  whyJoin: { heading: string; body: string; items: string[] };
  openRolesHeading: string;
  emptyState: string;
  alert: { heading: string; body: string };
};

export type ContactContent = {
  hero: { heading: string; body: string };
  intents: string[];
  formLabels: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    consent: string;
    submit: string;
  };
};

export type CmsData = {
  settings: SiteSettings;
  home: HomeContent;
  about: AboutContent;
  servicesPage: ServicesContent;
  productsPage: ProductsContent;
  careersPage: CareersContent;
  contact: ContactContent;
  serviceItems: ServiceItem[];
  products: ProductItem[];
  jobs: JobItem[];
  team: TeamMember[];
  posts: BlogPost[];
  legal: LegalPage[];
};

export type CmsCollection = keyof CmsData;
