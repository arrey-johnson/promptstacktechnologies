import type {
  CapabilityItem,
  FaqItem,
  FlowStep,
  ProblemSignal,
  RelatedWorkItem,
  SolutionHeroContent,
  UseCaseItem,
} from "./types";

export const aiAutomationMeta = {
  title: "AI & Automation",
  description:
    "Promptstack helps businesses automate repetitive work and apply artificial intelligence where it creates practical value — from workflows and follow-up to internal tools and support.",
} as const;

export const aiAutomationHero: SolutionHeroContent = {
  eyebrow: "AI & Automation",
  heading: "Automate repetitive work. Apply AI where it creates real value.",
  supporting:
    "The goal is not to introduce technology for its own sake. It is to remove predictable friction, connect systems and use artificial intelligence only where it helps people work more effectively.",
  primaryCta: {
    label: "Discuss an Automation Project",
    href: "/start-a-project",
  },
  secondaryCta: { label: "See How We Work", href: "/how-we-work" },
  visual: "automation",
};

export const aiAutomationProblems = {
  heading: "Signs automation may help",
  intro:
    "Automation is most useful when the same kind of work keeps appearing — and when people are spending time on steps that do not need full human attention every time.",
  items: [
    {
      title: "Repeated data entry",
      body: "The same information is typed into multiple places because systems do not pass it along.",
    },
    {
      title: "Manual follow-up",
      body: "Customer or internal follow-up depends on memory, reminders and individual discipline.",
    },
    {
      title: "Information copied between systems",
      body: "Teams move records, files or status updates by hand from one tool to another.",
    },
    {
      title: "Repetitive customer questions",
      body: "Support and sales teams answer the same predictable questions again and again.",
    },
    {
      title: "Recurring reports",
      body: "People assemble the same updates every week from scattered sources.",
    },
    {
      title: "Manual approvals and routing",
      body: "Requests wait for someone to notice, forward or chase the next step.",
    },
    {
      title: "Predictable administrative tasks",
      body: "Employees spend valuable time on routine work that could follow clearer rules or assisted workflows.",
    },
  ] satisfies ProblemSignal[],
};

export const aiAutomationCapabilities = {
  heading: "What Promptstack can automate",
  intro:
    "Each capability is explained in business terms. The right mix depends on the workflow — not on using every AI feature available.",
  items: [
    {
      title: "Business Process Automation",
      body: "Turn recurring operational steps into clearer, more reliable sequences with fewer manual handoffs.",
    },
    {
      title: "Workflow Automation",
      body: "Route work, trigger next actions and keep status moving when conditions are met.",
    },
    {
      title: "AI-Powered Applications",
      body: "Build practical applications that use artificial intelligence to assist with specific tasks inside the business.",
    },
    {
      title: "AI Customer Support",
      body: "Help teams handle common questions and triage more complex requests — with human review where it matters.",
    },
    {
      title: "Internal AI Tools",
      body: "Support internal work such as finding information, drafting routine content or assisting with knowledge that already exists in the business.",
    },
    {
      title: "Integrations & Automation",
      body: "Connect systems so information and actions move between tools without constant copying.",
    },
  ] satisfies CapabilityItem[],
};

export const aiAutomationUseCases = {
  heading: "Practical AI and automation use cases",
  intro:
    "These examples describe common opportunities. They are not promises about replacing teams or guaranteeing specific returns.",
  note: "Use cases illustrate opportunity areas. They are not client case studies.",
  items: [
    {
      title: "Lead and customer follow-up",
      body: "Keep first responses and next steps consistent after an inquiry arrives.",
    },
    {
      title: "Customer support assistance",
      body: "Help handle common questions and route the rest to the right person.",
    },
    {
      title: "Document and information processing",
      body: "Reduce manual sorting, extraction or classification of recurring information.",
    },
    {
      title: "Internal knowledge assistance",
      body: "Make it easier for teams to find and use information that already exists in the organization.",
    },
    {
      title: "Workflow routing",
      body: "Send work to the right place based on clear rules or assisted decisions.",
    },
    {
      title: "Reporting and data movement",
      body: "Reduce the manual effort of assembling recurring updates from multiple systems.",
    },
    {
      title: "Administrative task automation",
      body: "Remove predictable busywork from operations, sales support or service delivery.",
    },
    {
      title: "System-to-system automation",
      body: "Keep records and status aligned across the tools the business already uses.",
    },
  ] satisfies UseCaseItem[],
};

export const aiAutomationWorkflow = {
  heading: "How automation thinking works",
  intro:
    "Useful automation is rarely a single magic step. It is a clear path from input to action — with human review where judgment is required.",
  label: "Illustrative workflow model — not a client implementation",
  steps: [
    { label: "Input", detail: "A request, form, message, record or system event enters the process." },
    { label: "Rule / AI decision", detail: "Clear rules or assisted judgment determine what should happen next." },
    { label: "Action", detail: "The system updates a record, sends a message, creates a task or triggers the next step." },
    { label: "Human review where needed", detail: "People handle exceptions, sensitive decisions and work that needs judgment." },
    { label: "System update / output", detail: "Status, records and follow-up stay aligned so the business can see what happened." },
  ] satisfies FlowStep[],
};

export const aiAutomationProcess = {
  heading: "Delivery approach",
  intro:
    "Automation projects still follow the same disciplined path as other Promptstack work: understand the process before changing it.",
  stages: [
    { number: "01", title: "Discover", body: "Map the current process, friction points and where human judgment is essential." },
    { number: "02", title: "Define", body: "Decide what should be automated, assisted or left with people." },
    { number: "03", title: "Design", body: "Design the workflow, rules, integrations and review points." },
    { number: "04", title: "Build", body: "Implement, connect systems and test the flow with real scenarios." },
    { number: "05", title: "Launch", body: "Introduce the change carefully and support the teams affected." },
    { number: "06", title: "Improve", body: "Refine based on exceptions, usage and changing business needs." },
  ],
  cta: { label: "See How We Work", href: "/how-we-work" },
};

export const aiAutomationFaqs = [
  {
    question: "What should we automate first?",
    answer:
      "Start with work that is repetitive, frequent and well understood — especially where errors or delays create clear business cost. High-judgment or poorly defined work is usually a weaker first candidate.",
  },
  {
    question: "Does automation require replacing our existing software?",
    answer:
      "Not necessarily. Many useful automations connect the systems you already use. Replacement only makes sense when the current tools are part of the problem.",
  },
  {
    question: "Where should AI not be used?",
    answer:
      "AI should not be forced into decisions that need accountability, sensitive judgment or unreliable inputs. In those cases, rules, better software or clearer human process may be the better answer.",
  },
  {
    question: "What happens when human review is required?",
    answer:
      "Good automation designs for review. The system can prepare, route or recommend — while people confirm actions that need judgment, context or responsibility.",
  },
  {
    question: "Will automation replace our team?",
    answer:
      "That is not the goal. The practical aim is to remove repetitive work so people can focus on work that needs attention, relationships and judgment.",
  },
] satisfies FaqItem[];

/** TODO_CONTENT: Replace with real automation-related Work from CMS. */
export const aiAutomationWork = {
  heading: "Relevant Work",
  supporting:
    "Automation engagements will appear here once approved case studies are published.",
  emptyMessage:
    "Selected automation project stories will appear here once approved case studies are published.",
  cta: { label: "View Our Work", href: "/work" },
  featured: {
    id: "ai-work-1",
    title: "Workflow automation engagement",
    category: "AI & Automation",
    problem: "Teams spend time on repetitive follow-up and handoffs.",
    solution: "Practical automation that keeps work moving.",
    href: "/work",
    isPlaceholder: true,
  } satisfies RelatedWorkItem,
  secondary: [] as RelatedWorkItem[],
};

export const aiAutomationCta = {
  heading: "Ready to discuss automation?",
  subheading: "Tell us which work is consuming time.",
  body: "Describe the repetitive process, follow-up or handoff you want to improve. We will help identify what should be automated, assisted or left with people.",
  cta: { label: "Discuss an Automation Project", href: "/start-a-project" },
  analyticsId: "cta_ai_automation_final",
};
