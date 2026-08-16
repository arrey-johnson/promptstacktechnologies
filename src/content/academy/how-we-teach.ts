import type { AcademyCta, AcademyFaqItem } from "./types";

export const howWeTeachMeta = {
  title: "How We Teach",
  description:
    "Learn the skill. Build the work. Ship the result. See how Promptstack Academy combines instruction, projects, feedback and professional workflows.",
  path: "/academy/how-we-teach",
} as const;

export const howWeTeachHero = {
  eyebrow: "How We Teach",
  heading: "Learn the skill. Build the work. Ship the result.",
  supporting:
    "Promptstack Academy combines structured instruction with practical projects and professional workflows so learners can demonstrate what they know by what they can build.",
  primaryCta: {
    label: "Explore Programs",
    href: "/academy/programs",
  } satisfies AcademyCta,
} as const;

export const howWeTeachModel = {
  heading: "The learning model",
  intro:
    "Attendance alone is not the measure of progress. Capability grows when understanding, practice, feedback and finished work reinforce each other.",
  stages: [
    {
      title: "Learn",
      body: "Concepts, demonstrations, guided practice and fundamentals that make later work possible.",
    },
    {
      title: "Build",
      body: "Projects, labs and applied exercises that force decisions under real constraints.",
    },
    {
      title: "Ship",
      body: "Finish, test, document, present and improve — so learning becomes demonstrable.",
    },
  ],
} as const;

export const howWeTeachLessons = {
  heading: "How lessons work",
  intro:
    "Lessons create clarity. They are not the entire experience.",
  points: [
    "Instructor guidance and demonstrations",
    "Concept explanations tied to practical use",
    "Exercises that prepare learners for project work",
    "Space to ask questions and correct misunderstandings early",
  ],
} as const;

export const howWeTeachProjects = {
  heading: "Projects are central",
  intro:
    "Projects transform concepts into capability. Learners are expected to carry work through planning, building, testing, documentation and presentation.",
  flow: [
    "Define the problem",
    "Plan an approach",
    "Build the solution",
    "Test and revise",
    "Document and demonstrate",
  ],
} as const;

export const howWeTeachFeedback = {
  heading: "Feedback and review",
  intro:
    "Progress accelerates when work is reviewed. Learners should expect critique, revision and iteration — not only praise for submission.",
  points: [
    "Review of exercises and project work",
    "Clear notes on what to improve",
    "Opportunity to revise after feedback",
    "Practice explaining decisions to others",
  ],
} as const;

export const howWeTeachCollaboration = {
  heading: "Team collaboration",
  intro:
    "Professional work rarely happens alone. Depending on the program, learners practice collaborating, sharing work and coordinating toward a finished result.",
} as const;

export const howWeTeachWorkflows = {
  heading: "Professional workflows",
  intro:
    "Training resembles how real teams work — without turning the Academy into a methodology textbook.",
  themes: [
    "Requirements and planning",
    "Agile-style collaboration where relevant",
    "Git and version control",
    "Documentation",
    "Debugging and testing",
    "Deployment or presentation practice",
    "Feedback and iteration",
  ],
} as const;

export const howWeTeachAssessment = {
  heading: "Assessment philosophy",
  intro:
    "Practical assessment looks at what learners can do with what they have learned.",
  mayInclude: [
    "Exercises",
    "Assignments",
    "Projects",
    "Demos",
    "Review",
    "Presentation",
    "Documentation",
    "Improvement after feedback",
  ],
  note: "Formal grading percentages are not published here. Assessment remains practical and evidence-based.",
} as const;

export const howWeTeachExpectations = {
  heading: "What learners are expected to bring",
  intro:
    "Respectful expectations help everyone learn better.",
  items: [
    "Practice consistently",
    "Ask questions when stuck",
    "Complete assigned work",
    "Receive feedback openly",
    "Revise work after review",
    "Collaborate constructively",
    "Meet project expectations",
    "Take responsibility for progress",
  ],
} as const;

export const howWeTeachTalent = {
  heading: "Talent development connection",
  body: "Strong performance can create opportunities to do more within the Promptstack ecosystem when opportunities are available. Participation does not guarantee employment.",
} as const;

export const howWeTeachFaqs: readonly AcademyFaqItem[] = [
  {
    question: "Is the Academy mostly recorded videos?",
    answer:
      "No. Structured learning matters, but Promptstack Academy is built around practice, projects, feedback and demonstrable outcomes — not passive watching alone.",
  },
  {
    question: "How important are projects?",
    answer:
      "Projects are essential. They are how learners show they can finish work, handle feedback and communicate results.",
  },
  {
    question: "Will I receive a certificate automatically?",
    answer:
      "Certificate terms are not fabricated here. What the Academy emphasises publicly is demonstrated capability through completed work.",
  },
] as const;

export const howWeTeachNextStep = {
  heading: "Find the program that fits the capability you want",
  body: "Explore Software Engineering, Artificial Intelligence or Cybersecurity — then prepare for application when admissions open.",
  primaryCta: {
    label: "Explore Programs",
    href: "/academy/programs",
  } satisfies AcademyCta,
} as const;
