import type { AcademyCta, AcademyFaqItem } from "./types";
import { programCards } from "./programs";

export const academyHomeMeta = {
  title: "Promptstack Academy",
  description:
    "Promptstack Academy is a practical technology education and talent-development division. Learn · Build · Ship — develop real skills through projects and professional workflows.",
  path: "/academy",
} as const;

export const academyHomeHero = {
  eyebrow: "Promptstack Academy",
  heading: "Learn · Build · Ship.",
  supporting:
    "Promptstack Academy is a practical technology education and talent-development division where learners develop real skills through structured learning, projects and professional workflows.",
  emphasis:
    "The goal is not simply to complete lessons. It is to become capable of building and demonstrating real work.",
  primaryCta: {
    label: "Explore Programs",
    href: "/academy/programs",
  } satisfies AcademyCta,
  secondaryCta: {
    label: "How We Teach",
    href: "/academy/how-we-teach",
  } satisfies AcademyCta,
} as const;

export const academyWhatItIs = {
  heading: "Learning technology should result in capability.",
  intro:
    "Promptstack Academy exists so learners can move beyond passive consumption of lessons. Understanding a concept matters — but capability means being able to use it under real constraints.",
  capabilities: [
    "Understand concepts clearly",
    "Use tools with intention",
    "Solve defined problems",
    "Build projects end to end",
    "Collaborate with others",
    "Test and improve work",
    "Explain decisions",
    "Deploy or present outcomes",
  ],
} as const;

export const academyLearnBuildShip = {
  heading: "Learn · Build · Ship",
  intro:
    "Do not just learn the concept. Build something with it. Finish it. Test it. Present it. Ship it.",
  stages: [
    {
      id: "learn",
      title: "Learn",
      body: "Build understanding through fundamentals, concepts, instructor guidance, demonstrations and exercises — including why something works, not only how to copy a step.",
    },
    {
      id: "build",
      title: "Build",
      body: "Turn understanding into practice through individual projects, team projects, labs, applications, systems and problem-solving under realistic constraints.",
    },
    {
      id: "ship",
      title: "Ship",
      body: "Finish the work. Test it. Document it. Deploy or present it. Receive feedback. Improve it. Leave with something demonstrable.",
    },
  ],
} as const;

export const academyProgramsSection = {
  heading: "Programs",
  intro:
    "Three practical learning paths. Each one is designed around capability progression — not a catalogue of disconnected topics.",
  programs: programCards,
} as const;

export const academyPracticalExperience = {
  heading: "Practical by design",
  intro:
    "Promptstack Academy is not primarily a video-course platform or a certificate factory. Learning is organised so concepts become usable skill.",
  points: [
    {
      title: "Structured learning",
      body: "Foundations and guided instruction create clarity before complexity.",
    },
    {
      title: "Applied practice",
      body: "Exercises and labs turn explanation into muscle memory.",
    },
    {
      title: "Project ownership",
      body: "Learners are expected to carry work from problem framing to a finished result.",
    },
  ],
} as const;

export const academyProjectsSection = {
  heading: "Projects turn concepts into capability",
  intro:
    "Projects are not decoration. They are how learners prove they can plan, build, test, document and present work.",
  flow: [
    "Solve a defined problem",
    "Plan the solution",
    "Build it",
    "Test it",
    "Document it",
    "Present it",
  ],
  note: "Example project types on program pages are illustrative. They are not published student portfolios.",
} as const;

export const academyWorkflowsSection = {
  heading: "Professional workflows, not only topics",
  intro:
    "You learn the skill in a way that resembles professional work — so finishing quality becomes part of the training, not an afterthought.",
  themes: [
    {
      title: "Requirements and collaboration",
      body: "Clarify the problem, work with others, and handle feedback.",
    },
    {
      title: "Version control and review",
      body: "Track changes, share work, and improve through critique.",
    },
    {
      title: "Testing and documentation",
      body: "Verify behaviour and leave work others can understand.",
    },
    {
      title: "Deployment and presentation",
      body: "Bring work to a point where it can be shown and discussed.",
    },
  ],
} as const;

export const academyTalentPipeline = {
  heading: "Strong performance can create opportunities to do more",
  intro:
    "Promptstack Academy also supports Promptstack’s future talent pipeline. High-performing learners may be considered for internships, apprenticeships, freelance project teams or junior opportunities within the Promptstack ecosystem when opportunities are available.",
  emphasis:
    "Participation does not guarantee employment. Opportunity depends on performance, timing and available roles.",
} as const;

export const academyHumanChapter = {
  heading: "A human learning environment",
  intro:
    "Academy training is designed around people learning together — classrooms, project sessions, feedback, demonstrations and collaborative work.",
  note: "Photography of Promptstack Academy learners, instructors and sessions will replace composition areas when available.",
} as const;

export const academyHomeFaqs: readonly AcademyFaqItem[] = [
  {
    question: "Do I need prior experience?",
    answer:
      "It depends on the program and your starting point. Some learners begin with foundations; others arrive with partial experience. What matters across programs is willingness to practice, complete work and improve after feedback.",
  },
  {
    question: "Is Promptstack Academy practical or theory-based?",
    answer:
      "Both understanding and practice matter — but the Academy is practical by design. Concepts are taught so they can be used in projects, workflows and demonstrable outcomes.",
  },
  {
    question: "Will I build projects?",
    answer:
      "Yes. Projects are central to Learn · Build · Ship. Learners are expected to finish, test, document and present work.",
  },
  {
    question: "Do I receive a job after training?",
    answer:
      "No. Strong learners may be considered for future opportunities when they exist. The Academy does not promise automatic employment, internships or placement.",
  },
  {
    question: "How does Learn · Build · Ship work?",
    answer:
      "Learn develops understanding. Build turns that understanding into real work. Ship means finishing, verifying, documenting and demonstrating the result.",
  },
  {
    question: "What happens if I am completely new?",
    answer:
      "Beginners can start with foundational progression. Expect practice, questions, revision and responsibility for completing assigned work — not passive watching alone.",
  },
] as const;

export const academyHomeNextStep = {
  heading: "Choose a path. Understand how we teach.",
  body: "Explore the programs, then review How We Teach to see how learning, projects and professional workflows fit together.",
  primaryCta: {
    label: "Explore Programs",
    href: "/academy/programs",
  } satisfies AcademyCta,
  secondaryCta: {
    label: "How We Teach",
    href: "/academy/how-we-teach",
  } satisfies AcademyCta,
} as const;
