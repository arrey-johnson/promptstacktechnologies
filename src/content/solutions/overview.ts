import type {
  ProblemSignal,
  RelatedWorkItem,
  SolutionHeroContent,
} from "./types";

export const solutionsOverviewMeta = {
  title: "Solutions",
  description:
    "Explore how Promptstack helps businesses improve operations, automate work and grow through software, AI & automation and digital marketing.",
} as const;

export const solutionsOverviewHero: SolutionHeroContent = {
  eyebrow: "Promptstack Solutions",
  heading: "Technology built around the problem your business needs to solve.",
  supporting:
    "You do not need to know the technical answer before speaking with us. Tell us what is slowing the business down, what you want to improve, or what you are trying to build — and we will help determine the right approach.",
  primaryCta: { label: "Start a Project", href: "/start-a-project" },
  secondaryCta: { label: "See How We Work", href: "/how-we-work" },
  visual: "overview",
};

export const solutionsOverviewProblems = {
  heading: "Where businesses typically need better systems",
  intro:
    "Most conversations begin with a practical friction — not with a request for a particular technology.",
  items: [
    {
      title: "Inefficient manual operations",
      body: "Important work still depends on paper, spreadsheets, repeated entry or constant coordination.",
    },
    {
      title: "Disconnected systems and information",
      body: "Teams work from different sources of information, making it harder to stay organized and decide with confidence.",
    },
    {
      title: "Poor customer follow-up",
      body: "Inquiries, opportunities and follow-ups are not tracked consistently, so leads and relationships are lost.",
    },
    {
      title: "Repetitive administrative work",
      body: "People spend valuable time doing predictable tasks that software or automation could handle more reliably.",
    },
    {
      title: "Weak business visibility",
      body: "Decision-makers struggle to get a clear picture of what is happening across the business.",
    },
    {
      title: "Digital growth without a clear system",
      body: "Marketing activity exists, but results are inconsistent, hard to measure or disconnected from actual acquisition.",
    },
    {
      title: "Need for a custom product or platform",
      body: "Off-the-shelf tools do not fit the workflow, and the business needs a digital system shaped around how it actually works.",
    },
  ] satisfies ProblemSignal[],
};

export const solutionsOverviewAreas = {
  heading: "Three ways Promptstack can help",
  intro:
    "Each division focuses on a different kind of business problem. Some engagements stay within one area. Others combine more than one when the work requires it.",
  modules: [
    {
      id: "software",
      label: "Software Solutions",
      situation: "Your processes, customers or teams need a clearer digital system.",
      change:
        "We design and build software around real workflows — from management systems and web applications to websites, e-commerce, mobile applications and integrations.",
      capabilities: [
        "Custom business software",
        "Management systems",
        "Web & mobile applications",
        "Integrations",
      ] satisfies string[],
      cta: {
        label: "Explore Software Solutions",
        href: "/solutions/software",
      },
      visual: "software" as const,
      align: "text-first" as const,
    },
    {
      id: "ai-automation",
      label: "AI & Automation",
      situation: "Too much time is spent on repetitive, predictable work.",
      change:
        "We help automate workflows, connect systems and apply artificial intelligence where it creates practical value — without forcing technology into places it does not belong.",
      capabilities: [
        "Process & workflow automation",
        "AI-powered applications",
        "Customer support assistance",
        "System connections",
      ] satisfies string[],
      cta: {
        label: "Explore AI & Automation",
        href: "/solutions/ai-automation",
      },
      visual: "automation" as const,
      align: "visual-first" as const,
    },
    {
      id: "digital-marketing",
      label: "Digital Marketing",
      situation: "Digital activity is not translating into measurable growth.",
      change:
        "We help strengthen presence, reach the right audiences and build clearer systems for content, advertising, lead generation and follow-through.",
      capabilities: [
        "Growth strategy",
        "Content & campaigns",
        "Lead generation",
        "Measurement",
      ] satisfies string[],
      cta: {
        label: "Explore Digital Marketing",
        href: "/solutions/digital-marketing",
      },
      visual: "marketing" as const,
      align: "text-first" as const,
    },
  ],
};

export const solutionsExploreByProblem = {
  id: "explore-by-problem",
  heading: "Explore by business objective",
  intro:
    "If you recognize one of these situations, the linked solution areas below are a useful starting point. These are discovery guides — not separate service pages.",
  items: [
    {
      id: "improve-operations",
      title: "Improve Operations",
      body: "Reduce manual coordination and create clearer day-to-day systems.",
      related: [
        { label: "Software Solutions", href: "/solutions/software" },
        { label: "AI & Automation", href: "/solutions/ai-automation" },
      ],
    },
    {
      id: "automate-work",
      title: "Automate Repetitive Work",
      body: "Free people from predictable tasks and connect steps that currently depend on handoffs.",
      related: [
        { label: "AI & Automation", href: "/solutions/ai-automation" },
        { label: "Software Solutions", href: "/solutions/software" },
      ],
    },
    {
      id: "manage-customers",
      title: "Manage Customers & Sales",
      body: "Track inquiries, opportunities and follow-ups more consistently.",
      related: [
        { label: "Software Solutions", href: "/solutions/software" },
        { label: "Digital Marketing", href: "/solutions/digital-marketing" },
        { label: "AI & Automation", href: "/solutions/ai-automation" },
      ],
    },
    {
      id: "build-product",
      title: "Build a Digital Product",
      body: "Create a platform, application or customer experience that does not exist off the shelf.",
      related: [
        { label: "Software Solutions", href: "/solutions/software" },
      ],
    },
    {
      id: "generate-growth",
      title: "Generate Growth",
      body: "Turn digital presence and campaigns into clearer acquisition and conversion.",
      related: [
        { label: "Digital Marketing", href: "/solutions/digital-marketing" },
        { label: "Software Solutions", href: "/solutions/software" },
      ],
    },
  ],
};

export const solutionsIntegrated = {
  heading: "Capabilities that can work together",
  intro:
    "Not every engagement needs every discipline. When a business problem crosses boundaries, Promptstack can combine the right capabilities.",
  example: {
    title: "Example: improving lead generation and follow-up",
    body: "A growth problem is rarely solved by advertising alone. It may involve digital marketing for acquisition, software for capturing and managing leads, and automation for timely follow-up.",
    parts: [
      { label: "Digital Marketing", role: "Reach and attract the right audiences" },
      { label: "Software", role: "Capture, organize and track opportunities" },
      { label: "Automation", role: "Keep follow-up consistent after the lead arrives" },
    ],
  },
  closing:
    "We begin with the problem. The mix of capabilities follows from what the business actually needs.",
};

export const solutionsOverviewProcess = {
  heading: "How Promptstack approaches projects",
  intro:
    "Whether the work is software, automation or digital growth, projects move through a structured path from business problem to working solution.",
  stages: [
    { number: "01", title: "Discover", body: "Understand the business, workflow and problem." },
    { number: "02", title: "Define", body: "Clarify requirements, priorities and outcomes." },
    { number: "03", title: "Design", body: "Shape the system, experience or campaign before building." },
    { number: "04", title: "Build", body: "Implement, integrate and test through structured iterations." },
    { number: "05", title: "Launch", body: "Deploy carefully and support adoption." },
    { number: "06", title: "Improve", body: "Measure and refine as the business evolves." },
  ],
  cta: { label: "See How We Work", href: "/how-we-work" },
};

/** TODO_CONTENT: Replace with real CMS Work filtered by solutions relevance. */
export const solutionsOverviewWork: {
  heading: string;
  supporting: string;
  emptyMessage: string;
  cta: { label: string; href: string };
  featured: RelatedWorkItem;
  secondary: RelatedWorkItem[];
} = {
  heading: "Relevant Work",
  supporting:
    "Selected engagements will appear here once approved case studies are published.",
  emptyMessage:
    "Selected project stories will appear here once approved case studies are published.",
  cta: { label: "View Our Work", href: "/work" },
  featured: {
    id: "solutions-work-featured",
    title: "Operations system engagement",
    category: "Software Solutions",
    problem: "Day-to-day processes still depend on spreadsheets and manual coordination.",
    solution: "Software shaped around the actual workflow.",
    href: "/work",
    isPlaceholder: true,
  },
  secondary: [
    {
      id: "solutions-work-2",
      title: "Workflow automation engagement",
      category: "AI & Automation",
      problem: "Teams spend time on repetitive follow-up and handoffs.",
      solution: "Practical automation that keeps work moving.",
      href: "/work",
      isPlaceholder: true,
    },
  ],
};

export const solutionsOverviewCta = {
  heading: "Ready to improve something in your business?",
  subheading: "Tell us the problem. You do not need to know the technical solution.",
  body: "Explain what is slowing the business down, what you want to improve or what you are trying to build. We will help determine the right approach.",
  cta: { label: "Start a Project", href: "/start-a-project" },
  analyticsId: "cta_solutions_final",
};
