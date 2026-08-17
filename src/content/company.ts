/**
 * Company / Contact copy — verified strategic positioning only.
 * Do not invent offices, stats, awards, biographies, or contact details here.
 * Verified contact/social values come from Sanity Site Settings at runtime.
 */

export const aboutPageCopy = {
  eyebrow: "Promptstack Technologies",
  heading: "Technology should solve a real business problem.",
  supporting:
    "Promptstack Technologies helps businesses improve how they operate, serve customers and grow through software, artificial intelligence, automation and digital marketing.",
  primaryCta: { label: "Explore Solutions", href: "/solutions" },
  secondaryCta: { label: "How We Work", href: "/how-we-work" },
} as const;

export const aboutStory = {
  heading: "Why Promptstack exists",
  intro:
    "Many businesses do not necessarily need more technology for its own sake. They need better systems, less manual work, clearer information, stronger customer acquisition and technology that fits the way the business actually operates.",
  body: "Promptstack exists to connect those business problems to practical technology solutions — software, artificial intelligence, automation and digital marketing that support real operating conditions.",
} as const;

export const aboutProblems = {
  heading: "The business problems we exist to solve",
  items: [
    {
      title: "Manual operations",
      body: "Important work still depends on paper, spreadsheets, repeated data entry or constant manual coordination.",
    },
    {
      title: "Disconnected information",
      body: "Teams work from different sources of information, making it harder to stay organized and make confident decisions.",
    },
    {
      title: "Lost leads and weak follow-up",
      body: "Customer inquiries, sales opportunities and follow-ups are not consistently tracked.",
    },
    {
      title: "Repetitive work",
      body: "People spend valuable time on work that software or automation could handle more reliably.",
    },
    {
      title: "Limited business visibility",
      body: "Decision-makers struggle to get a clear picture of what is happening across the business.",
    },
    {
      title: "Inconsistent digital growth",
      body: "Marketing activity exists, but results are difficult to measure or disconnected from actual business growth.",
    },
  ],
} as const;

export const aboutDivisions = {
  heading: "How Promptstack is structured",
  intro:
    "Promptstack Technologies operates through four divisions. Each focuses on a different part of the same goal: helping businesses work and grow with technology.",
  items: [
    {
      id: "software",
      title: "Promptstack Software Solutions",
      body: "Build custom software, business systems, websites, digital platforms, integrations and related technology solutions.",
      href: "/solutions/software",
      cta: "Explore Software",
    },
    {
      id: "ai",
      title: "Promptstack AI & Automation",
      body: "Improve workflows and productivity through automation, AI-powered systems and practical business applications of artificial intelligence.",
      href: "/solutions/ai-automation",
      cta: "Explore AI & Automation",
    },
    {
      id: "marketing",
      title: "Promptstack Digital Marketing",
      body: "Help businesses improve digital visibility, customer acquisition, campaigns and measurable growth.",
      href: "/solutions/digital-marketing",
      cta: "Explore Digital Marketing",
    },
    {
      id: "academy",
      title: "Promptstack Academy",
      body: "Practical technology education and talent development through Learn · Build · Ship.",
      href: "/academy",
      cta: "Explore Academy",
    },
  ],
} as const;

export const aboutPhilosophy = {
  heading: "Business before technology",
  intro:
    "Promptstack starts with the business problem, the workflow, the customer journey, the desired outcome and the operational reality — before choosing technology.",
  body: "A client does not need to arrive with a technical specification. They can begin with the problem: what is slowing the business down, what needs to improve, or what they want to build.",
} as const;

export const aboutMarket = {
  heading: "Built for Cameroon and the African market",
  intro:
    "Promptstack Technologies is based in Cameroon and is being built for the realities of businesses operating in Cameroon and the wider African market.",
  body: "That means practical implementation, attention to real operating conditions, value discipline and technology that has to work outside of idealized environments — while remaining open to ambition beyond any single geography.",
} as const;

/**
 * Verified founder identity only.
 * No unverified biography, degrees, employers, awards or photography.
 */
export const aboutFounder = {
  heading: "Founder & leadership",
  name: "Arrey Johnson",
  role: "Founder & CEO",
  organization: "Promptstack Technologies",
  body: "Arrey Johnson leads Promptstack Technologies with a business-first approach to technology: connect real operating problems to practical software, automation, AI and digital growth solutions.",
  /**
   * TODO_ASSET: Add approved founder photography when available.
   * Do not use AI-generated portraits or scraped social images.
   */
  imageSrc: null as string | null,
  imageAlt: "Portrait of Arrey Johnson, Founder & CEO of Promptstack Technologies",
} as const;

export const aboutAcademy = {
  heading: "Promptstack Academy",
  intro:
    "Promptstack Academy is the education and talent-development division of Promptstack Technologies.",
  body: "It develops practical technology capability through project-based training. Strong learners may eventually progress toward opportunities such as internships, apprenticeships, freelance teams or junior opportunities where available — without employment guarantees.",
  cta: { label: "Explore Promptstack Academy", href: "/academy" },
} as const;

export const aboutProcessBridge = {
  heading: "How we work with clients",
  body: "Promptstack follows a clear delivery path from understanding the problem to improving the result after launch.",
  cta: { label: "How We Work", href: "/how-we-work" },
} as const;

export const aboutFinalCta = {
  heading: "Have a business problem technology could help solve?",
  body: "Tell us what is slowing the business down, what needs to improve or what you want to build.",
  primaryCta: { label: "Start a Project", href: "/start-a-project" },
  secondaryCta: { label: "Explore Solutions", href: "/solutions" },
} as const;

export const contactPageCopy = {
  eyebrow: "Contact",
  heading: "Start with what you need.",
  supporting:
    "Whether you want to discuss a business project, learn more about Promptstack Academy or make a general enquiry, use the appropriate route below.",
} as const;

export const contactPathways = {
  project: {
    title: "Project / business enquiry",
    body: "For software, AI, automation, digital platforms or digital marketing work.",
    cta: { label: "Start a Project", href: "/start-a-project" },
  },
  academy: {
    title: "Promptstack Academy",
    body: "For programs, practical training and Academy information.",
    cta: { label: "Explore Academy", href: "/academy" },
  },
  general: {
    title: "General company contact",
    body: "For verified corporate contact details when published.",
  },
} as const;

export const interimLegalNotice = {
  privacy: {
    heading: "Privacy Policy",
    status:
      "Promptstack Technologies is preparing a complete Privacy Policy for legal review.",
  },
  terms: {
    heading: "Terms of Use",
    status:
      "Formal website Terms of Use are being finalized for legal review.",
  },
  cookies: {
    heading: "Cookies",
    status:
      "This page describes how the current Promptstack website uses browser storage and related services. It is subject to legal review.",
  },
} as const;
