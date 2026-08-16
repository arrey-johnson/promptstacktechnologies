import type {
  CapabilityItem,
  FaqItem,
  FlowStep,
  ProblemSignal,
  RelatedWorkItem,
  SolutionHeroContent,
  UseCaseItem,
} from "./types";

export const digitalMarketingMeta = {
  title: "Digital Marketing",
  description:
    "Promptstack helps businesses build clearer systems for reaching, converting and growing customers online — connecting presence, campaigns, lead capture and follow-up.",
} as const;

export const digitalMarketingHero: SolutionHeroContent = {
  eyebrow: "Digital Marketing",
  heading:
    "Build a clearer system for reaching, converting and growing customers online.",
  supporting:
    "Digital marketing at Promptstack is not limited to posting on social media. It is about creating a more deliberate path from presence and campaigns to lead capture, follow-up and measurable growth.",
  primaryCta: {
    label: "Discuss Your Growth",
    href: "/start-a-project",
  },
  secondaryCta: { label: "Explore Our Approach", href: "#growth-system" },
  visual: "marketing",
};

export const digitalMarketingProblems = {
  heading: "Common digital-growth problems",
  intro:
    "Many businesses are already active online. The harder question is whether that activity forms a system that produces business results.",
  items: [
    {
      title: "Inconsistent brand presence",
      body: "The business appears online, but messaging, quality and continuity are uneven.",
    },
    {
      title: "Social activity without business results",
      body: "Content is published, but it does not clearly support inquiries, sales or reputation goals.",
    },
    {
      title: "Paid advertising without clear measurement",
      body: "Budget is spent, but it is difficult to see what is working and what should stop.",
    },
    {
      title: "Weak lead flow",
      body: "Interest does not convert into captured opportunities the business can follow.",
    },
    {
      title: "Disconnected campaigns",
      body: "Channels and messages operate separately instead of supporting one acquisition path.",
    },
    {
      title: "Poor follow-up after lead capture",
      body: "Leads arrive, then wait — or disappear into inboxes and chat threads.",
    },
    {
      title: "Content without strategy",
      body: "Material is produced without a clear audience, offer or next step.",
    },
    {
      title: "No clear customer acquisition system",
      body: "Growth depends on ad hoc effort rather than a repeatable path from attention to conversion.",
    },
  ] satisfies ProblemSignal[],
};

export const digitalMarketingCapabilities = {
  heading: "What Promptstack does",
  intro:
    "Capabilities cover strategy, creative work and campaigns — and where useful, connect to the systems that capture and follow up on demand.",
  items: [
    {
      title: "Digital Growth Strategy",
      body: "Clarify audiences, offers, channels and the path from attention to conversion before activity scales.",
    },
    {
      title: "Social Media Management",
      body: "Maintain a consistent presence with content that supports business goals — not activity for its own sake.",
    },
    {
      title: "Content & Creative",
      body: "Create clear messaging and assets that help the business communicate with the right people.",
    },
    {
      title: "Paid Advertising",
      body: "Run campaigns with clearer targeting, creative direction and measurement discipline.",
    },
    {
      title: "Lead Generation",
      body: "Design paths that turn interest into captured opportunities the business can act on.",
    },
    {
      title: "Campaign Management",
      body: "Coordinate and improve campaigns across channels with a view of what is actually working.",
    },
  ] satisfies CapabilityItem[],
  connectionNote: {
    heading: "Marketing that can connect to systems",
    body: "Where the business problem requires it, digital marketing may connect with landing pages, lead capture, CRM or software, automated follow-up and analytics. That connection is part of how Promptstack thinks about growth — not every engagement needs every piece.",
  },
};

export const digitalMarketingGrowthSystem = {
  id: "growth-system",
  heading: "A clearer acquisition and growth system",
  intro:
    "Useful digital growth is a sequence — not a collection of disconnected posts and ads.",
  label: "Illustrative growth system — not a performance report",
  steps: [
    { label: "Positioning", detail: "Clarify who you serve and what you offer." },
    { label: "Content / campaigns", detail: "Communicate with intention across the right channels." },
    { label: "Traffic", detail: "Bring the right people into contact with the business." },
    { label: "Lead capture", detail: "Turn interest into information the business can act on." },
    { label: "Follow-up", detail: "Respond consistently so opportunities do not stall." },
    { label: "Conversion", detail: "Move qualified interest toward the business outcome." },
    {
      label: "Measurement / improvement",
      detail: "See what is working and refine the system over time.",
    },
  ] satisfies FlowStep[],
};

export const digitalMarketingMeasurement = {
  heading: "Measurement and reporting philosophy",
  intro:
    "Activity is not the same as progress. Measurement should help the business decide what to continue, improve or stop.",
  points: [
    {
      title: "Start with the business outcome",
      body: "Define what success means — inquiries, qualified leads, sales conversations or another commercial result — before optimizing vanity metrics.",
    },
    {
      title: "Connect activity to next steps",
      body: "Campaigns matter when they create a clear path into capture, follow-up and conversion.",
    },
    {
      title: "Report for decisions",
      body: "Reporting should make the next action clearer. Exact metrics depend on the channel mix and goals of the engagement.",
    },
    {
      title: "Improve deliberately",
      body: "Use what you learn to refine messaging, targeting, creative and the systems that handle demand.",
    },
  ],
};

export const digitalMarketingUseCases = {
  heading: "Where digital marketing often helps",
  intro:
    "These are common growth situations. They describe opportunity areas, not published client results.",
  note: "Use cases describe typical needs. They are not case studies.",
  items: [
    {
      title: "Building a clearer online presence",
      body: "Make the business easier to understand and trust for the people it wants to reach.",
    },
    {
      title: "Generating qualified inquiries",
      body: "Create a more deliberate path from attention to captured opportunity.",
    },
    {
      title: "Improving paid campaign discipline",
      body: "Spend with clearer targeting, messaging and measurement.",
    },
    {
      title: "Connecting campaigns to follow-up",
      body: "Ensure leads are not lost after the first expression of interest.",
    },
  ] satisfies UseCaseItem[],
};

export const digitalMarketingProcess = {
  heading: "How growth projects are approached",
  intro:
    "Campaigns work better when the system around them is clear. Delivery still follows Promptstack’s structured method.",
  stages: [
    { number: "01", title: "Discover", body: "Understand the offer, audience, current activity and commercial goal." },
    { number: "02", title: "Define", body: "Clarify priorities, channels, messages and what success should look like." },
    { number: "03", title: "Design", body: "Shape the growth system, creative direction and capture path." },
    { number: "04", title: "Build", body: "Produce assets, set up campaigns and connect the necessary systems." },
    { number: "05", title: "Launch", body: "Go live carefully and watch early signals." },
    { number: "06", title: "Improve", body: "Measure, learn and refine the system over time." },
  ],
  cta: { label: "See How We Work", href: "/how-we-work" },
};

export const digitalMarketingFaqs = [
  {
    question: "Do you only manage social media?",
    answer:
      "No. Social media can be part of the work, but Promptstack Digital Marketing is broader: strategy, content, campaigns, lead generation and the systems that help turn attention into business results.",
  },
  {
    question: "How do you measure results?",
    answer:
      "Measurement depends on the goal of the engagement. We focus on outcomes that matter to the business — such as inquiries, qualified leads or conversion path quality — rather than activity alone. Exact metrics are defined in discovery.",
  },
  {
    question: "Can marketing connect with our website and lead systems?",
    answer:
      "Yes where it is useful. Landing pages, lead capture, CRM or software and automated follow-up can be part of a stronger growth system. The exact combination depends on the problem.",
  },
  {
    question: "What happens before campaigns begin?",
    answer:
      "We clarify the audience, offer, message, channels and the path from interest to follow-up. Starting campaigns without that foundation often creates activity without useful results.",
  },
  {
    question: "Do you guarantee a specific number of leads or sales?",
    answer:
      "No. Results depend on market, offer, creative, budget, systems and follow-up. We work to build a clearer system and improve it with evidence — without inventing guarantees.",
  },
] satisfies FaqItem[];

/** TODO_CONTENT: Replace with real marketing-related Work from CMS. */
export const digitalMarketingWork = {
  heading: "Relevant Work",
  supporting:
    "Growth engagements will appear here once approved case studies are published.",
  emptyMessage:
    "Selected growth project stories will appear here once approved case studies are published.",
  cta: { label: "View Our Work", href: "/work" },
  featured: {
    id: "dm-work-1",
    title: "Digital growth system",
    category: "Digital Marketing",
    problem: "Marketing activity exists, but results are hard to connect to growth.",
    solution: "A clearer path from presence to acquisition and follow-up.",
    href: "/work",
    isPlaceholder: true,
  } satisfies RelatedWorkItem,
  secondary: [] as RelatedWorkItem[],
};

export const digitalMarketingCta = {
  heading: "Ready to improve digital growth?",
  subheading: "Tell us what you want more of — and where activity is falling short.",
  body: "Explain the audience, offer or acquisition problem you are trying to solve. We will help determine the right mix of strategy, campaigns and systems.",
  cta: { label: "Discuss Your Growth", href: "/start-a-project" },
  analyticsId: "cta_digital_marketing_final",
};
