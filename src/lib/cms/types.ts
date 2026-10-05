export type NavLink = { label: string; href: string };
export type FooterColumn = { title: string; links: NavLink[] };
export type Cta = { label: string; href: string };
export type FeatureItem = { title: string; body: string };
export type ProcessStep = { title: string; body: string };

export type ServiceCourse = {
  id: string;
  name: string;
  fee: string;
  duration?: string;
  summary: string;
  curriculum: string[];
  outcomes?: string[];
};

export type ServiceItem = {
  id: string;
  name: string;
  summary: string;
  body: string;
  /** Longer detail shown on /services — keep home cards on summary + body */
  detailBody?: string;
  details?: string[];
  /** Problem statement for the dedicated service sales page */
  problem?: string;
  /** How delivery / training runs */
  process?: FeatureItem[];
  /** Deeper content blocks */
  modules?: FeatureItem[];
  /** Academy (and similar) course tracks with curriculum + fees */
  courses?: ServiceCourse[];
  /** Note under course fees */
  feeNote?: string;
  /** Outcomes / results visitors can expect */
  outcomes?: string[];
  /** Who this service is for */
  audience?: string;
  faqs?: FeatureItem[];
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
  responsibilities?: string[];
  requirements?: string[];
  published: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  imageSrc?: string;
  imageAlt?: string;
  linkedinHref?: string;
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
  portfolioTeaser: {
    eyebrow: string;
    heading: string;
    body: string;
    cta: Cta;
  };
  partners: {
    eyebrow: string;
    heading: string;
    body: string;
    items: Array<{
      name: string;
      logoSrc: string;
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
    imageSrc?: string;
  };
};

export type AboutContent = {
  hero: { eyebrow: string; heading: string; body: string };
  story: { eyebrow: string; heading: string; body: string[] };
  vision: { eyebrow: string; heading: string; body: string[] };
  howWeWin: { eyebrow: string; heading: string; body: string; items: FeatureItem[] };
  values: { eyebrow: string; heading: string; items: FeatureItem[] };
  ceoWord: {
    eyebrow: string;
    heading: string;
    quote: string;
    name: string;
    role: string;
    credentials: string;
    imageSrc?: string;
    imageAlt?: string;
  };
  teamIntro: { eyebrow?: string; heading: string; body: string };
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

export type PortfolioItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  imageSrc: string;
  imageAlt?: string;
  href?: string;
  /** Short overview shown under the title */
  summary?: string;
  /** Named client when approved; otherwise sector / confidential label */
  client?: string;
  challenge?: string;
  /** What Promptstack delivered */
  role?: string;
  outcome?: string;
  scope?: string[];
  technologies?: string[];
  featured?: boolean;
};

export type PortfolioContent = {
  hero: {
    eyebrow?: string;
    heading: string;
    body: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    imageSrc?: string;
  };
  grid: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  cta: {
    heading: string;
    body: string;
    cta: Cta;
  };
  emptyState: string;
};

export type CareersContent = {
  hero: { heading: string; body: string; imageSrc?: string };
  whyJoin: { heading: string; body: string; items: string[] };
  openRolesHeading: string;
  emptyState: string;
  alert: { heading: string; body: string };
};

export type ContactContent = {
  hero: { heading: string; body: string; imageSrc?: string };
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
  portfolioPage: PortfolioContent;
  careersPage: CareersContent;
  contact: ContactContent;
  serviceItems: ServiceItem[];
  products: ProductItem[];
  portfolioItems: PortfolioItem[];
  jobs: JobItem[];
  team: TeamMember[];
  posts: BlogPost[];
  legal: LegalPage[];
};

export type CmsCollection = keyof CmsData;
