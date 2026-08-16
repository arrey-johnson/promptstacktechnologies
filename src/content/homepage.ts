/**
 * Homepage content — approved copy from docs/04-homepage-spec-and-copy.md.
 * Do not silently rewrite. Work/Insights placeholders are CMS-ready shapes.
 */

export type WorkProject = {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  /** Only publish when owner-verified. */
  outcome: string | null;
  href: string;
  /**
   * TODO_ASSET: Real project image URL/path when available.
   * Null means the UI uses a premium composition placeholder.
   */
  imageSrc: string | null;
  imageAlt: string;
  /**
   * TODO_CONTENT: Set false when this record is a real approved case study.
   * Placeholder records must never invent client names or metrics.
   */
  isPlaceholder: boolean;
};

export type InsightPreview = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  href: string;
  /**
   * TODO_ASSET: Featured article image when available.
   */
  imageSrc: string | null;
  imageAlt: string;
  /**
   * TODO_CONTENT: Set false when this is a real published Insight.
   */
  isPlaceholder: boolean;
};

export const homepageHero = {
  eyebrow: "Technology for ambitious businesses",
  /**
   * Purple accent applies only to the middle sentence — controlled, not half the H1.
   */
  h1: {
    before: "Build better systems. ",
    accent: "Automate the work slowing you down.",
    after: " Grow with technology.",
  },
  supporting:
    "Promptstack Technologies helps businesses solve operational and growth problems through software, artificial intelligence, automation and digital marketing.",
  primaryCta: { label: "Start a Project", href: "/start-a-project" },
  secondaryCta: { label: "Explore Solutions", href: "/solutions" },
} as const;

export const homepageCapabilities = [
  { label: "Software Solutions", href: "/solutions/software" },
  { label: "AI & Automation", href: "/solutions/ai-automation" },
  { label: "Digital Marketing", href: "/solutions/digital-marketing" },
  { label: "Promptstack Academy", href: "/academy" },
] as const;

export const homepageProblems = {
  heading: "Where is your business losing time, customers or visibility?",
  intro:
    "Many businesses do not need more technology for the sake of technology. They need better ways to work, serve customers, make decisions and grow.",
  items: [
    {
      number: "01",
      title: "Manual Operations",
      body: "Important processes still depend on paper, spreadsheets, repeated data entry or constant manual coordination.",
    },
    {
      number: "02",
      title: "Disconnected Information",
      body: "Teams work from different sources of information, making it difficult to stay organized and make confident decisions.",
    },
    {
      number: "03",
      title: "Lost Leads and Customers",
      body: "Customer inquiries, sales opportunities and follow-ups are not consistently tracked.",
    },
    {
      number: "04",
      title: "Repetitive Work",
      body: "Employees spend valuable time doing work that software or automation could handle.",
    },
    {
      number: "05",
      title: "Poor Business Visibility",
      body: "Decision-makers struggle to get a clear picture of what is happening across the business.",
    },
    {
      number: "06",
      title: "Weak Digital Growth",
      body: "Marketing activity exists, but results are inconsistent, difficult to measure or disconnected from actual business growth.",
    },
  ],
} as const;

/**
 * Capability lines drawn from docs/05 / navigation architecture — not invented offerings.
 */
export const homepageSolutions = {
  heading: "Solutions built around business problems",
  intro:
    "Technology should fit the way your business needs to work — not force your business to fit the technology.",
  modules: [
    {
      id: "software",
      label: "Software Solutions",
      outcome: "Build the systems your business actually needs.",
      body: "We design and develop software around real business workflows — from management systems and web applications to websites, e-commerce platforms, mobile applications and system integrations.",
      capabilities: [
        "Custom business software",
        "Management systems",
        "Web applications & platforms",
        "Websites & e-commerce",
        "Mobile applications",
        "System integrations",
      ],
      cta: {
        label: "Explore Software Solutions",
        href: "/solutions/software",
      },
      align: "text-first" as const,
      visual: "systems" as const,
    },
    {
      id: "ai-automation",
      label: "AI & Automation",
      outcome: "Remove repetitive work and make processes smarter.",
      body: "We help businesses automate workflows, connect systems and use artificial intelligence where it creates practical value — from customer support and follow-up to internal tools and operational processes.",
      capabilities: [
        "Business process automation",
        "AI-powered applications",
        "AI customer support",
        "Workflow connections",
        "Operational tooling",
      ],
      cta: {
        label: "Explore AI & Automation",
        href: "/solutions/ai-automation",
      },
      align: "visual-first" as const,
      visual: "automation" as const,
    },
    {
      id: "digital-marketing",
      label: "Digital Marketing",
      outcome: "Turn digital activity into measurable growth.",
      body: "We help businesses strengthen their digital presence, reach the right audiences and create more deliberate systems for content, advertising, lead generation and customer acquisition.",
      capabilities: [
        "Digital growth strategy",
        "Lead generation",
        "Paid advertising",
        "Content systems",
        "Measurement & reporting",
      ],
      cta: {
        label: "Explore Digital Marketing",
        href: "/solutions/digital-marketing",
      },
      align: "text-first" as const,
      visual: "growth" as const,
    },
  ],
} as const;

export const homepageOutcomes = {
  heading: "Technology should produce business outcomes.",
  intro: "The goal is not simply to introduce another tool into your company.",
  items: [
    {
      title: "Save time",
      body: "Reduce repetitive work and unnecessary manual processes.",
    },
    {
      title: "Reduce errors",
      body: "Create clearer and more consistent workflows.",
    },
    {
      title: "See your business more clearly",
      body: "Make important information easier to access and understand.",
    },
    {
      title: "Capture more opportunities",
      body: "Improve how leads, customers and follow-ups are handled.",
    },
    {
      title: "Improve customer experience",
      body: "Create faster and more consistent interactions.",
    },
    {
      title: "Build for growth",
      body: "Create systems and processes capable of supporting a larger business.",
    },
  ],
} as const;

/**
 * TODO_CONTENT: Replace with real CMS case studies. No client names or metrics.
 * Titles describe engagement types, not fictional clients.
 */
export const homepageWork: {
  heading: string;
  supporting: string;
  cta: { label: string; href: string };
  featured: WorkProject;
  secondary: WorkProject[];
} = {
  heading: "Selected Work",
  supporting:
    "Problems become more convincing when you can show what you built to solve them.",
  cta: { label: "View Our Work", href: "/work" },
  featured: {
    id: "work-featured",
    title: "Business operations system",
    category: "Software Solutions",
    problem:
      "Important day-to-day processes still depend on spreadsheets, repeated entry and manual coordination.",
    solution:
      "Software shaped around the actual workflow — so teams can work from one clearer system.",
    outcome: null,
    href: "/work",
    imageSrc: null,
    imageAlt: "",
    isPlaceholder: true,
  },
  secondary: [
    {
      id: "work-secondary-1",
      title: "Workflow automation engagement",
      category: "AI & Automation",
      problem:
        "Teams spend valuable time on repetitive follow-up and handoffs that software could handle.",
      solution:
        "Practical automation that connects steps, reduces busywork and keeps work moving.",
      outcome: null,
      href: "/work",
      imageSrc: null,
      imageAlt: "",
      isPlaceholder: true,
    },
    {
      id: "work-secondary-2",
      title: "Digital growth system",
      category: "Digital Marketing",
      problem:
        "Marketing activity exists, but results are inconsistent and hard to connect to real growth.",
      solution:
        "A more deliberate approach to presence, acquisition and measurable lead flow.",
      outcome: null,
      href: "/work",
      imageSrc: null,
      imageAlt: "",
      isPlaceholder: true,
    },
  ],
};

export const homepageProcess = {
  heading: "From business problem to working solution.",
  cta: { label: "See How We Work", href: "/how-we-work" },
  stages: [
    {
      number: "01",
      title: "Discover",
      body: "We understand your business, workflow, users, goals and the problem you are trying to solve.",
    },
    {
      number: "02",
      title: "Define",
      body: "We turn the problem into clear requirements, priorities, scope and measurable outcomes.",
    },
    {
      number: "03",
      title: "Design",
      body: "We design the system, experience, workflow or campaign before committing to implementation.",
    },
    {
      number: "04",
      title: "Build",
      body: "We develop, integrate, test and improve the solution through structured iterations.",
    },
    {
      number: "05",
      title: "Launch",
      body: "We deploy the solution, verify that it works properly and support adoption.",
    },
    {
      number: "06",
      title: "Improve",
      body: "Where appropriate, we measure performance and continue improving the solution as the business evolves.",
    },
  ],
} as const;

export const homepageWhy = {
  heading: "Why Promptstack?",
  statement:
    "We solve business problems with technology — starting from what the organization actually needs.",
  items: [
    {
      title: "Business before technology",
      body: "We begin with the problem. Technology comes after we understand what the business actually needs.",
    },
    {
      title: "Integrated capability",
      body: "Software, artificial intelligence, automation and digital growth can work together when the problem requires more than one discipline.",
    },
    {
      title: "Structured execution",
      body: "Requirements, planning, design, implementation, testing and launch are handled deliberately.",
    },
    {
      title: "Built for our market",
      body: "We understand the realities businesses face in Cameroon and across Africa while working toward professional technology standards.",
    },
  ],
} as const;

export const homepageAcademy = {
  label: "Promptstack Academy",
  heading: "Learn · Build · Ship.",
  body: "Promptstack Academy is our practical technology education and talent-development division. Learners develop real skills through structured learning, projects and professional workflows in software engineering, artificial intelligence, cybersecurity and digital skills. The goal is not simply to complete lessons. It is to become capable of building and demonstrating real work.",
  cta: { label: "Explore Promptstack Academy", href: "/academy" },
} as const;

/**
 * TODO_CONTENT: Replace with real CMS Insights. Titles are structural placeholders only.
 */
export const homepageInsights: {
  heading: string;
  body: string;
  cta: { label: string; href: string };
  featured: InsightPreview;
  supporting: InsightPreview[];
} = {
  heading: "Better decisions start with better understanding.",
  body: "Explore practical ideas about software, automation, artificial intelligence, digital growth and building stronger businesses with technology.",
  cta: { label: "Explore Insights", href: "/insights" },
  featured: {
    id: "insight-featured",
    title: "When manual operations start costing the business",
    category: "Operations",
    excerpt:
      "A practical look at the signals that your processes need clearer systems — before more tools are added.",
    href: "/insights",
    imageSrc: null,
    imageAlt: "",
    isPlaceholder: true,
  },
  supporting: [
    {
      id: "insight-2",
      title: "Automation that creates value — not noise",
      category: "AI & Automation",
      excerpt:
        "Where artificial intelligence and workflow automation help, and where they should wait.",
      href: "/insights",
      imageSrc: null,
      imageAlt: "",
      isPlaceholder: true,
    },
    {
      id: "insight-3",
      title: "Digital growth without disconnected activity",
      category: "Digital Growth",
      excerpt:
        "How presence, acquisition and follow-up can work as one measurable system.",
      href: "/insights",
      imageSrc: null,
      imageAlt: "",
      isPlaceholder: true,
    },
  ],
};

export const homepageFinalCta = {
  heading: "Ready to improve something in your business?",
  subheading:
    "Tell us the problem. You don't need to know the technical solution.",
  body: "Explain what is slowing the business down, what you want to improve or what you are trying to build. We will help determine the right approach.",
  cta: { label: "Start a Project", href: "/start-a-project" },
} as const;
