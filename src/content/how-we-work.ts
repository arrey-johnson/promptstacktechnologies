export const howWeWorkMeta = {
  title: "How We Work",
  description:
    "See how Promptstack moves from business problem to working solution — Discover, Define, Design, Build, Launch and Improve — with clear collaboration and quality throughout.",
} as const;

export const howWeWorkHero = {
  eyebrow: "How We Work",
  heading: "From business problem to working solution.",
  supporting:
    "Every project starts by understanding what the business needs to improve before deciding what should be designed, automated or built.",
  primaryCta: { label: "Start a Project", href: "/start-a-project" },
  secondaryCta: { label: "View Our Work", href: "/work" },
} as const;

export const howWeWorkPhilosophy = {
  heading: "Start with the problem, not the platform.",
  intro:
    "Promptstack does not begin by prescribing technology. We begin by understanding the business — then we determine the appropriate solution.",
  points: [
    {
      title: "The business",
      body: "What the organization is trying to improve, grow or make more reliable.",
    },
    {
      title: "The users",
      body: "Who will use the system, campaign or process — and what they need to do successfully.",
    },
    {
      title: "Current workflow",
      body: "How work happens today, including the tools, handoffs and habits already in place.",
    },
    {
      title: "Friction and constraints",
      body: "Where time, errors, delays or missed opportunities appear — and what limits the response.",
    },
    {
      title: "Desired outcome",
      body: "What success should look like in practical business terms before implementation begins.",
    },
  ],
} as const;

export type DeliveryStage = {
  number: string;
  title: string;
  summary: string;
  whatHappens: string;
  whyItMatters: string;
  whatWeDo: string[];
  clientInvolvement: string;
  outcome: string;
};

export const howWeWorkStages: DeliveryStage[] = [
  {
    number: "01",
    title: "Discover",
    summary:
      "We understand your business, workflow, users, goals and the problem you are trying to solve.",
    whatHappens:
      "Discovery focuses on clarity. We learn how the business works today before recommending what should change.",
    whyItMatters:
      "Without this stage, technology decisions are guesses. Understanding the problem reduces wasted work and misplaced solutions.",
    whatWeDo: [
      "Clarify the business problem and desired outcome",
      "Review current workflows and friction points",
      "Understand existing tools and systems where relevant",
      "Identify stakeholders, users and operational constraints",
      "Define what success would look like in practical terms",
    ],
    clientInvolvement:
      "Access to the people who know the process, honest context about constraints, and clarity on what the business wants to improve.",
    outcome:
      "A shared understanding of the problem, the people involved and the direction worth exploring.",
  },
  {
    number: "02",
    title: "Define",
    summary:
      "We turn the problem into clear requirements, priorities, scope and measurable outcomes.",
    whatHappens:
      "Definition turns discovery into a workable plan. Priorities, boundaries and success criteria become explicit enough to build from.",
    whyItMatters:
      "Clear definition protects both the business and the delivery team from vague expectations and uncontrolled scope.",
    whatWeDo: [
      "Capture requirements and user needs",
      "Set priorities and initial scope",
      "Describe key workflows and assumptions",
      "Agree success criteria where they can be defined",
      "Recommend an implementation direction",
    ],
    clientInvolvement:
      "Decisions on priorities, confirmation of what is in or out of scope, and agreement on what success means for this engagement.",
    outcome:
      "A clearer brief for design and implementation — sized to the engagement, not a one-size document for every project.",
  },
  {
    number: "03",
    title: "Design",
    summary:
      "We design the system, experience, workflow or campaign before committing to implementation.",
    whatHappens:
      "Design makes important decisions visible early — whether that means user flows, interfaces, system structure, automation paths or customer journeys.",
    whyItMatters:
      "Testing the approach before expensive implementation reduces rework and helps the business see what will be built.",
    whatWeDo: [
      "Map flows, journeys or system structure as needed",
      "Shape interfaces, workflows or campaign plans",
      "Identify integration and dependency points",
      "Review the design with the people who will use or own it",
      "Adjust before full implementation begins",
    ],
    clientInvolvement:
      "Feedback on proposed flows, experiences or plans, and confirmation that the design matches the business reality.",
    outcome:
      "An agreed direction for build — clear enough to implement without inventing the product during development.",
  },
  {
    number: "04",
    title: "Build",
    summary:
      "We develop, integrate, test and improve the solution through structured iterations.",
    whatHappens:
      "Implementation proceeds in structured increments. Where useful, Promptstack prefers an Agile development rhythm so progress can be reviewed and adjusted.",
    whyItMatters:
      "Iterative build keeps work visible, surfaces issues earlier and avoids a long silent period before the business sees anything real.",
    whatWeDo: [
      "Implement the designed solution in structured cycles",
      "Integrate with existing systems where required",
      "Configure, connect and refine as the work progresses",
      "Review progress with the client through the build",
      "Test during implementation — not only at the end",
    ],
    clientInvolvement:
      "Timely feedback on reviews or demonstrations, access to systems where integration is needed, and decisions when priorities shift.",
    outcome:
      "A working solution progressing through verified increments toward launch readiness.",
  },
  {
    number: "05",
    title: "Launch",
    summary:
      "We deploy the solution, verify that it works properly and support adoption.",
    whatHappens:
      "Launch is a managed transition — final checks, activation and support for the people who will use the solution.",
    whyItMatters:
      "A careful launch protects the business from avoidable disruption and helps the solution land with the teams who need it.",
    whatWeDo: [
      "Complete final verification before activation",
      "Deploy or activate the solution deliberately",
      "Support handover and adoption where relevant",
      "Watch for early issues after launch",
      "Stabilize the initial live period",
    ],
    clientInvolvement:
      "Availability for go-live decisions, user readiness where needed, and prompt communication if early issues appear.",
    outcome:
      "A live solution with a managed transition — without promising that every issue in the world can be prevented in advance.",
  },
  {
    number: "06",
    title: "Improve",
    summary:
      "Where appropriate, we measure performance and continue improving the solution as the business evolves.",
    whatHappens:
      "After launch, some engagements continue through support, measurement, fixes, optimization or enhancements as needs change.",
    whyItMatters:
      "Businesses evolve. Useful systems and growth work often improve after real usage reveals what matters most.",
    whatWeDo: [
      "Address issues that appear in real use",
      "Measure performance where it supports decisions",
      "Optimize workflows, campaigns or experiences as needed",
      "Plan enhancements when priorities justify them",
      "Adapt as the business changes",
    ],
    clientInvolvement:
      "Feedback from real usage, clarity on what should be improved next, and agreement on any continued support scope.",
    outcome:
      "A path to keep the solution useful over time — when ongoing work is part of the engagement, not as an assumed unlimited free service.",
  },
];

export const howWeWorkCollaboration = {
  heading: "Communication that keeps projects understandable",
  intro:
    "Structured delivery only works when the business can see what is happening and influence the right decisions at the right time.",
  items: [
    {
      title: "Clear points of contact",
      body: "You should know who to speak with about progress, decisions and issues — without chasing multiple unclear channels.",
    },
    {
      title: "Progress visibility",
      body: "Work should not disappear into a long silent period. Reviews and demonstrations keep the direction visible.",
    },
    {
      title: "Feedback loops",
      body: "Client feedback is part of delivery. The earlier important reactions arrive, the easier it is to adjust course.",
    },
    {
      title: "Documented decisions where useful",
      body: "Key choices should be clear enough that the project does not rely on memory alone — scaled to the size of the engagement.",
    },
    {
      title: "Fewer surprises",
      body: "Scope, constraints and trade-offs are raised early so the business can decide with context rather than after the fact.",
    },
  ],
} as const;

export const howWeWorkQuality = {
  heading: "Quality before and after launch",
  intro:
    "Quality is not a final ceremony. It is part of understanding requirements, building carefully and checking that the solution works for real use.",
  items: [
    {
      title: "Requirements verification",
      body: "Check that what is being built still matches the problem and priorities agreed with the business.",
    },
    {
      title: "Functional testing",
      body: "Confirm that key flows and features behave as intended under realistic scenarios.",
    },
    {
      title: "Responsive and usability checks",
      body: "Where interfaces are involved, verify that the experience remains usable across the devices people actually use.",
    },
    {
      title: "Integration testing where relevant",
      body: "When systems connect, verify that information and actions move correctly between them.",
    },
    {
      title: "Security considerations",
      body: "Handle access, data and integrations with appropriate care for the sensitivity of the work — without claiming certifications Promptstack has not stated.",
    },
    {
      title: "Launch checks",
      body: "Verify readiness before activation and watch the early live period for issues that only appear in real conditions.",
    },
  ],
} as const;

export const howWeWorkExpectations = {
  heading: "A good project is collaborative",
  intro:
    "Promptstack can structure the work. The business still plays an essential role in making the solution accurate and useful.",
  items: [
    {
      title: "Access to relevant stakeholders",
      body: "The people who understand the process, customers or constraints need to be available at key moments.",
    },
    {
      title: "Timely feedback",
      body: "Reviews and decisions move faster when feedback arrives while the work is still easy to adjust.",
    },
    {
      title: "Clear decision-making",
      body: "Someone on the business side should be able to confirm priorities, scope and go-live choices.",
    },
    {
      title: "Honest business information",
      body: "Accurate context about current workflows, constraints and goals leads to better design and fewer false starts.",
    },
    {
      title: "Access to existing systems where necessary",
      body: "Integrations and automation often require the right credentials, environments or technical contacts.",
    },
    {
      title: "Agreement on priorities",
      body: "Not everything can be first. Shared priorities keep the project focused on what matters most.",
    },
  ],
} as const;

export const howWeWorkCta = {
  heading: "Ready to improve something in your business?",
  subheading: "Tell us the problem. You do not need to know the technical solution.",
  body: "Explain what is slowing the business down, what you want to improve or what you are trying to build. We will help determine the right approach.",
  cta: { label: "Start a Project", href: "/start-a-project" },
  analyticsId: "cta_how_we_work_final",
} as const;
