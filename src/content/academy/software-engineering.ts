import type { AcademyProgram } from "./types";

export const softwareEngineeringProgram: AcademyProgram = {
  title: "Software Engineering",
  slug: "software-engineering",
  status: "active",
  heroHeading: "Learn to design, build, test and ship real software.",
  shortPromise:
    "Learn to design, build, test and ship real software through practical projects and professional workflows.",
  overview:
    "The Software Engineering program develops practical capability — not just familiarity with tools. Learners progress from foundations to application development, then into the workflows teams use to finish, review and deliver work.",
  audience:
    "Learners who want to become capable software builders — beginners with commitment, students seeking practical experience, and career changers ready to practice consistently.",
  level: null,
  prerequisites: [
    "Willingness to practice regularly and complete project work",
    "Comfort using a computer for learning and development work",
    "Curiosity about how software products are built and delivered",
  ],
  outcomes: [
    "Break problems into buildable steps",
    "Create structured, responsive interfaces",
    "Build application logic that works with data and APIs",
    "Use version control and collaborate on shared work",
    "Test, document and present completed projects",
    "Explain technical decisions in plain language",
  ],
  learningRoadmap: [
    {
      id: "foundations",
      title: "Foundations",
      summary:
        "Build the thinking habits that make programming teachable and durable.",
      items: [
        "Computing and programming fundamentals",
        "Problem solving and programming logic",
        "Reading, writing and debugging basic programs",
      ],
    },
    {
      id: "front-end",
      title: "Front-end foundations",
      summary:
        "Create interfaces people can actually use across devices.",
      items: [
        "Web structure and styling",
        "Interaction and responsive interfaces",
        "Accessible, usable UI foundations",
      ],
    },
    {
      id: "application",
      title: "Application development",
      summary:
        "Move from pages to working applications with data and logic.",
      items: [
        "Application logic and data modelling concepts",
        "APIs and databases at a practical level",
        "Authentication concepts where appropriate",
      ],
    },
    {
      id: "workflow",
      title: "Software engineering workflow",
      summary:
        "Work the way professional teams organise delivery.",
      items: [
        "Git and version control",
        "Requirements, Agile collaboration and reviews",
        "Debugging, testing and documentation",
      ],
    },
    {
      id: "build-ship",
      title: "Build & ship",
      summary:
        "Finish work that can be demonstrated, not abandoned mid-build.",
      items: [
        "Complete end-to-end projects",
        "Deployment and presentation practice",
        "Portfolio-ready demonstration of capability",
      ],
    },
  ],
  practicalSkills: [
    "Problem decomposition",
    "Interface and interaction design fundamentals",
    "Application logic",
    "Data and API integration",
    "Git collaboration",
    "Testing and debugging",
    "Documentation and demos",
  ],
  technologies: null,
  projects: [
    {
      title: "Example project type: operational web tool",
      body: "Plan and build a small web application that solves a defined workflow problem, then test, document and present the result.",
    },
    {
      title: "Example project type: data-backed interface",
      body: "Connect an interface to structured data, handle real user flows, and ship a version others can review.",
    },
    {
      title: "Example project type: collaborative delivery",
      body: "Work with shared repositories, review feedback, improve the build, and demonstrate what changed.",
    },
  ],
  teachingMethod:
    "Structured instruction, guided exercises, project work, review and demonstration — so capability is proven by what learners can build.",
  professionalWorkflows: [
    {
      title: "Requirements and planning",
      body: "Clarify the problem before jumping into implementation.",
    },
    {
      title: "Version control and collaboration",
      body: "Use Git and shared workflows so work can be reviewed and improved.",
    },
    {
      title: "Testing and documentation",
      body: "Verify behaviour and leave clear notes for the next person — including your future self.",
    },
    {
      title: "Presentation and iteration",
      body: "Demonstrate the result, receive feedback, and improve the work.",
    },
  ],
  demonstrableOutcomes: [
    "Completed project work that can be explained and shown",
    "Evidence of testing, documentation and presentation practice",
    "A clearer ability to describe how a solution was designed and built",
  ],
  format: null,
  duration: null,
  scheduleText: null,
  feeText: null,
  cohortText: null,
  applicationOpen: null,
  faq: [
    {
      question: "Do I need prior coding experience?",
      answer:
        "Prior experience helps, but it is not the only path. What matters more is consistent practice, curiosity and the willingness to finish project work. Foundations are part of the learning journey.",
    },
    {
      question: "Is this only about learning languages and frameworks?",
      answer:
        "No. Languages and tools support the work, but the program emphasises capability progression — problem solving, building applications, collaborating, testing and shipping demonstrable results.",
    },
    {
      question: "Will I build real projects?",
      answer:
        "Yes. Projects are central. Learners are expected to plan, build, test, document and present work — not only complete exercises.",
    },
    {
      question: "Does completing the program guarantee a job?",
      answer:
        "No. Strong performance may create consideration for internships, apprenticeships, freelance project teams or junior opportunities when they exist. Participation does not guarantee employment.",
    },
  ],
  seo: {
    title: "Software Engineering Program",
    description:
      "Learn to design, build, test and ship real software through Promptstack Academy’s practical Software Engineering program.",
  },
  visual: "software",
  whoFor: {
    heading: "Who this program is for",
    intro:
      "This path suits learners who want software capability they can demonstrate — not a passive tour of topics.",
    items: [
      "Beginners ready to practice consistently",
      "Students seeking practical project experience",
      "Career changers building a software foundation",
      "Learners who want to finish and present real work",
    ],
  },
};
