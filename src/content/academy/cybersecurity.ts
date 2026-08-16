import type { AcademyProgram } from "./types";

export const cybersecurityProgram: AcademyProgram = {
  title: "Cybersecurity",
  slug: "cybersecurity",
  status: "active",
  heroHeading:
    "Build practical foundations for protecting systems, networks and information.",
  shortPromise:
    "Build practical foundations for protecting systems, networks and information through defensive, professional learning.",
  overview:
    "The Cybersecurity program develops defensive security capability. Learners build foundations in systems and networks, understand common risks, practice protective thinking in safe lab contexts, and learn to document and communicate security work professionally.",
  audience:
    "Learners who want practical cybersecurity foundations — students, career explorers and professionals ready for disciplined, ethical defensive practice.",
  level: null,
  prerequisites: [
    "Willingness to learn systems and networking fundamentals",
    "Commitment to ethical, defensive practice only",
    "Comfort with careful documentation and lab discipline",
  ],
  outcomes: [
    "Explain core security principles in practical terms",
    "Recognise common threats, vulnerabilities and access risks",
    "Apply defensive hardening and monitoring concepts in labs",
    "Document findings and recommendations clearly",
    "Work with professional ethics and responsible practice",
  ],
  learningRoadmap: [
    {
      id: "foundations",
      title: "Foundations",
      summary: "Understand the systems security protects.",
      items: [
        "Systems and operating environments",
        "Networking fundamentals",
        "Core security principles",
      ],
    },
    {
      id: "threats",
      title: "Threats and risk",
      summary: "See how risk appears in real environments.",
      items: [
        "Common attack patterns at a conceptual level",
        "Vulnerabilities and weak configurations",
        "Authentication, access and risk awareness",
      ],
    },
    {
      id: "defensive",
      title: "Defensive practice",
      summary: "Practice protection in controlled environments.",
      items: [
        "System hardening concepts",
        "Monitoring fundamentals",
        "Incident-response basics and safe lab practice",
      ],
    },
    {
      id: "workflow",
      title: "Security workflow",
      summary: "Communicate and handle security work professionally.",
      items: [
        "Documentation and reporting",
        "Testing and review habits",
        "Responsible disclosure concepts and professional ethics",
      ],
    },
    {
      id: "demonstrate",
      title: "Build / demonstrate",
      summary: "Show defensive capability through completed exercises.",
      items: [
        "Defensive labs and documented security exercises",
        "Practical demonstration of learning",
        "Clear explanation of findings and next steps",
      ],
    },
  ],
  practicalSkills: [
    "Security fundamentals",
    "Risk awareness",
    "Defensive lab practice",
    "Hardening concepts",
    "Security documentation",
    "Ethical professional judgement",
  ],
  technologies: null,
  projects: [
    {
      title: "Example lab type: defensive configuration review",
      body: "Assess a controlled environment, identify weaknesses, and document practical hardening recommendations.",
    },
    {
      title: "Example lab type: monitoring and response drill",
      body: "Practice recognising signals, following a response outline, and recording what happened.",
    },
    {
      title: "Example exercise type: security report",
      body: "Turn findings into clear professional documentation that a non-specialist can understand.",
    },
  ],
  teachingMethod:
    "Foundational teaching, defensive labs, documentation practice and ethical framing — so learners build protective judgement, not reckless experimentation.",
  professionalWorkflows: [
    {
      title: "Safe lab discipline",
      body: "Practice only in approved environments with clear boundaries.",
    },
    {
      title: "Evidence and documentation",
      body: "Record what was observed, why it matters and what should change.",
    },
    {
      title: "Ethical handling",
      body: "Treat access, findings and disclosure with professional responsibility.",
    },
    {
      title: "Communication",
      body: "Explain risk and recommendations without unnecessary jargon.",
    },
  ],
  demonstrableOutcomes: [
    "Documented defensive lab exercises",
    "Evidence of professional reporting practice",
    "Clearer ability to explain security risk and protective action",
  ],
  format: null,
  duration: null,
  scheduleText: null,
  feeText: null,
  cohortText: null,
  applicationOpen: null,
  faq: [
    {
      question: "Is this an offensive hacking course?",
      answer:
        "No. Promptstack Academy frames cybersecurity around defensive, professional learning. Marketing and training content do not teach offensive exploitation as a public curriculum pitch.",
    },
    {
      question: "Do I need advanced IT experience first?",
      answer:
        "Strong foundations help, and the program includes systems and networking fundamentals. Learners should be ready for careful practice and documentation.",
    },
    {
      question: "Will I work in labs?",
      answer:
        "Yes. Practical defensive work and documented exercises are central to building capability beyond theory.",
    },
    {
      question: "Does the program guarantee cybersecurity employment?",
      answer:
        "No. Strong performance may create consideration for future opportunities when they exist. Participation does not guarantee employment.",
    },
  ],
  seo: {
    title: "Cybersecurity Program",
    description:
      "Build practical defensive cybersecurity foundations at Promptstack Academy — systems, risk awareness, labs and professional security workflows.",
  },
  visual: "cybersecurity",
  whoFor: {
    heading: "Who this program is for",
    intro:
      "This path suits learners who want defensive cybersecurity foundations with professional discipline.",
    items: [
      "Learners exploring cybersecurity as a serious path",
      "Students building practical defensive foundations",
      "Professionals strengthening security awareness",
      "People ready for ethical, documented lab practice",
    ],
  },
};
