import type {
  CapabilityItem,
  FaqItem,
  ProblemSignal,
  RelatedWorkItem,
  SolutionHeroContent,
  UseCaseItem,
} from "./types";

export const softwareMeta = {
  title: "Software Solutions",
  description:
    "Promptstack designs and develops practical software for real business workflows — management systems, web applications, websites, e-commerce, mobile apps and integrations.",
} as const;

export const softwareHero: SolutionHeroContent = {
  eyebrow: "Software Solutions",
  heading: "Build software around the way your business actually works.",
  supporting:
    "Promptstack designs and develops practical digital systems for real operational and customer problems — not generic tools that force your team to adapt around the software.",
  primaryCta: {
    label: "Start a Software Project",
    href: "/start-a-project",
  },
  secondaryCta: { label: "View Our Work", href: "/work" },
  visual: "software",
};

export const softwareProblems = {
  heading: "Signs your business may need better software",
  intro:
    "Software becomes useful when it removes friction from work that already matters to the business.",
  items: [
    {
      title: "Critical processes still run on spreadsheets or paper",
      body: "Important information lives in files, notebooks or personal knowledge that is hard to share and easy to lose.",
    },
    {
      title: "Staff enter the same information repeatedly",
      body: "Data is copied between tools, messages and forms because systems do not connect.",
    },
    {
      title: "Existing software does not fit the workflow",
      body: "Teams work around the tool instead of the tool supporting how the business actually operates.",
    },
    {
      title: "There is no shared source of truth",
      body: "Different teams hold different versions of the same information, which slows decisions and creates errors.",
    },
    {
      title: "Customers need a better digital experience",
      body: "Inquiries, bookings, orders or service requests need a clearer, more reliable path online.",
    },
    {
      title: "The right product does not exist off the shelf",
      body: "Standard packages cover part of the need, but the business requires a system shaped around its own process.",
    },
  ] satisfies ProblemSignal[],
};

export const softwareCapabilities = {
  heading: "What Promptstack builds",
  intro:
    "Capabilities are grouped around the kind of system the business needs — not around programming languages or frameworks.",
  items: [
    {
      title: "Custom Software Development",
      body: "Purpose-built applications shaped around your workflows, users and operational constraints.",
    },
    {
      title: "Business Management Systems",
      body: "Internal systems that help teams organize operations, records, approvals and day-to-day work.",
    },
    {
      title: "Web Applications & Platforms",
      body: "Browser-based products and platforms for customers, partners or internal teams.",
    },
    {
      title: "Websites & Digital Experiences",
      body: "Clear, professional websites and digital experiences that support communication and conversion.",
    },
    {
      title: "E-commerce Solutions",
      body: "Online selling experiences connected to inventory, payments, fulfilment and customer follow-up where needed.",
    },
    {
      title: "Mobile Applications",
      body: "Mobile experiences when the work genuinely belongs on a phone — not mobile for its own sake.",
    },
    {
      title: "Systems Integration",
      body: "Connections between the tools you already use so information moves without constant re-entry.",
    },
  ] satisfies CapabilityItem[],
};

export const softwareUseCases = {
  heading: "Common business use cases",
  intro:
    "These are problem categories — not published case studies. They describe the kinds of work software often supports.",
  note: "Use cases describe typical business needs. They are not client proof.",
  items: [
    {
      title: "Operations management",
      body: "Coordinate day-to-day work, records and responsibilities in one clearer system.",
    },
    {
      title: "Customer and lead management",
      body: "Track inquiries, opportunities, conversations and follow-up without losing context.",
    },
    {
      title: "Inventory and ordering",
      body: "Manage stock, orders and fulfilment with fewer manual handoffs.",
    },
    {
      title: "Internal workflows",
      body: "Structure approvals, tasks and handoffs that currently depend on chat and memory.",
    },
    {
      title: "Client or customer portals",
      body: "Give customers a reliable place to request services, track progress or access information.",
    },
    {
      title: "Booking and service workflows",
      body: "Handle scheduling, requests and service delivery with clearer status and less back-and-forth.",
    },
    {
      title: "E-commerce",
      body: "Sell products or services online with a path from discovery to purchase and follow-up.",
    },
    {
      title: "Reporting dashboards",
      body: "Make important operational information easier to see and act on.",
    },
    {
      title: "System integrations",
      body: "Connect existing tools so teams stop copying the same data between systems.",
    },
  ] satisfies UseCaseItem[],
};

export const softwareProcess = {
  heading: "How custom software projects are approached",
  intro:
    "Software projects still begin with the business problem. Delivery follows a structured path so scope, design and implementation stay deliberate.",
  stages: [
    { number: "01", title: "Discover", body: "Understand workflows, users, constraints and the problem to solve." },
    { number: "02", title: "Define", body: "Turn the need into clear requirements, priorities and measurable outcomes." },
    { number: "03", title: "Design", body: "Shape the system and experience before committing to full implementation." },
    { number: "04", title: "Build", body: "Develop, integrate and test through structured iterations." },
    { number: "05", title: "Launch", body: "Deploy carefully and support adoption by the people who will use it." },
    { number: "06", title: "Improve", body: "Refine the system as usage and business needs evolve." },
  ],
  cta: { label: "See How We Work", href: "/how-we-work" },
};

export const softwareFaqs = [
  {
    question: "What if we do not know exactly what software we need?",
    answer:
      "That is a normal starting point. Many projects begin with a business problem rather than a finished specification. Discovery helps clarify what should be built, what should not, and whether software is the right response.",
  },
  {
    question: "Do you work with existing systems?",
    answer:
      "Yes where it makes sense. New software often needs to connect with tools the business already uses. Integration is considered as part of understanding the workflow — not as an afterthought.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Launch includes verifying that the system works properly and supporting adoption. Where appropriate, we continue improving the solution as the business uses it and needs evolve. The exact support model depends on the project.",
  },
  {
    question: "How does a project begin?",
    answer:
      "Start by telling us what you are trying to improve. We use that conversation to understand the problem, identify the right approach and define next steps. You do not need a technical brief to begin.",
  },
  {
    question: "Will you recommend an off-the-shelf tool instead of custom software?",
    answer:
      "When a standard product clearly fits the need, that may be the better path. Custom software is most valuable when off-the-shelf options force the business into awkward workarounds.",
  },
] satisfies FaqItem[];

/** TODO_CONTENT: Replace with real software-related Work from CMS. */
export const softwareWork = {
  heading: "Relevant Work",
  supporting:
    "Software engagements will appear here once approved case studies are published.",
  emptyMessage:
    "Selected software project stories will appear here once approved case studies are published.",
  cta: { label: "View Our Work", href: "/work" },
  featured: {
    id: "software-work-1",
    title: "Business operations system",
    category: "Software Solutions",
    problem: "Important processes still depend on spreadsheets and manual coordination.",
    solution: "Software shaped around the actual workflow.",
    href: "/work",
    isPlaceholder: true,
  } satisfies RelatedWorkItem,
  secondary: [] as RelatedWorkItem[],
};

export const softwareCta = {
  heading: "Ready to discuss a software project?",
  subheading: "Tell us how the business needs to work.",
  body: "Explain the process, product or customer experience you want to improve. We will help determine whether custom software is the right approach.",
  cta: { label: "Start a Software Project", href: "/start-a-project" },
  analyticsId: "cta_software_final",
};
