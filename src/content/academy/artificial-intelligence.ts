import type { AcademyProgram } from "./types";

export const artificialIntelligenceProgram: AcademyProgram = {
  title: "Artificial Intelligence",
  slug: "artificial-intelligence",
  status: "active",
  heroHeading: "Practical artificial intelligence — not AI hype.",
  shortPromise:
    "Learn how AI systems work, use modern AI tools effectively, and build practical AI-powered solutions — without the hype.",
  overview:
    "The Artificial Intelligence program focuses on practical understanding and applied capability. Learners explore what AI can and cannot do, develop disciplined ways of using modern tools, and build solutions that still require human judgement, verification and responsibility.",
  audience:
    "Learners who want practical AI capability for real work — students, career changers and professionals who need more than prompting tips.",
  level: null,
  prerequisites: [
    "Comfort learning with a computer and modern digital tools",
    "Willingness to verify outputs and revise work after feedback",
    "Interest in applying AI to real problems, not only exploring demos",
  ],
  outcomes: [
    "Explain what AI systems are and where they commonly fail",
    "Use modern AI tools through structured, evaluable workflows",
    "Build practical AI-assisted applications or automations",
    "Apply verification, privacy and oversight thinking",
    "Document and demonstrate an AI-powered project clearly",
  ],
  learningRoadmap: [
    {
      id: "ai-foundations",
      title: "AI foundations",
      summary: "Separate useful capability from hype.",
      items: [
        "What AI is and is not",
        "Data, models and outputs at a practical level",
        "Limitations, uncertainty and common failure modes",
      ],
    },
    {
      id: "modern-tools",
      title: "Using modern AI tools",
      summary: "Work with AI systems as disciplined collaborators.",
      items: [
        "Prompting and structured workflows",
        "Research and productivity applications",
        "Evaluating quality before trusting output",
      ],
    },
    {
      id: "building",
      title: "Building AI-powered solutions",
      summary: "Move from tool use into applied systems.",
      items: [
        "APIs and AI-assisted applications",
        "Workflow automation",
        "Knowledge and support system patterns",
      ],
    },
    {
      id: "responsibility",
      title: "Quality and responsibility",
      summary: "Keep humans accountable for the result.",
      items: [
        "Verification and hallucination awareness",
        "Privacy and security thinking",
        "Human oversight as a design requirement",
      ],
    },
    {
      id: "build-ship",
      title: "Build & ship",
      summary: "Finish a practical AI project others can understand.",
      items: [
        "Practical AI project delivery",
        "Documentation of approach and limits",
        "Demonstration and presentation",
      ],
    },
  ],
  practicalSkills: [
    "AI literacy without hype",
    "Structured prompting and evaluation",
    "Applied AI workflows",
    "AI-assisted application thinking",
    "Verification and oversight",
    "Responsible use judgement",
  ],
  technologies: null,
  projects: [
    {
      title: "Example project type: AI-assisted workflow",
      body: "Design a practical workflow where AI accelerates a defined task, with clear human review points.",
    },
    {
      title: "Example project type: support or knowledge assistant",
      body: "Build a constrained assistant pattern, document its limits, and demonstrate safe use.",
    },
    {
      title: "Example project type: AI-powered application feature",
      body: "Integrate an AI capability into a small application, then test, document and present the result.",
    },
  ],
  teachingMethod:
    "Concept teaching, guided tool practice, applied projects and critical review — so learners can use AI productively without treating outputs as automatic truth.",
  professionalWorkflows: [
    {
      title: "Problem framing",
      body: "Decide where AI is useful before introducing a model or tool.",
    },
    {
      title: "Evaluation loops",
      body: "Compare outputs against requirements instead of accepting the first answer.",
    },
    {
      title: "Documentation of limits",
      body: "Record assumptions, risks and review steps for anyone using the system.",
    },
    {
      title: "Demonstration with judgement",
      body: "Present not only what was built, but where oversight remains essential.",
    },
  ],
  demonstrableOutcomes: [
    "A practical AI project with documented approach and limits",
    "Evidence of evaluation and human oversight thinking",
    "Ability to explain AI decisions without hype language",
  ],
  format: null,
  duration: null,
  scheduleText: null,
  feeText: null,
  cohortText: null,
  applicationOpen: null,
  faq: [
    {
      question: "Is this an AI research science program?",
      answer:
        "No. The focus is practical artificial intelligence — understanding systems, using modern tools well, and building useful AI-powered solutions with responsibility.",
    },
    {
      question: "Will I only learn prompting?",
      answer:
        "Prompting is part of the journey, but not the whole story. Learners also work on evaluation, applied workflows, AI-powered solutions and responsible use.",
    },
    {
      question: "Do I need a software engineering background?",
      answer:
        "A technical background can help for some builds, but the program is designed around practical progression. What matters is willingness to practice, verify work and finish projects.",
    },
    {
      question: "Does this guarantee AI employment?",
      answer:
        "No. Strong learners may later be considered for relevant opportunities when they exist. Participation does not guarantee employment.",
    },
  ],
  seo: {
    title: "Artificial Intelligence Program",
    description:
      "Practical AI training at Promptstack Academy — learn how AI works, use modern tools effectively, and build responsible AI-powered solutions.",
  },
  visual: "ai",
  whoFor: {
    heading: "Who this program is for",
    intro:
      "This path suits learners who want practical AI capability grounded in judgement — not trend-chasing.",
    items: [
      "Learners exploring AI for real work problems",
      "Students building applied AI project experience",
      "Professionals who need disciplined AI workflows",
      "Builders who want to ship AI-assisted solutions responsibly",
    ],
  },
};
