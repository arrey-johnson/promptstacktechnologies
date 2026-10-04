import type { ServiceItem } from "./types";

export const serviceItemsEn: ServiceItem[] = [
  {
    id: "software",
    name: "Software & websites",
    summary: "Websites, apps, and tools built around how your team works.",
    body: "We build company websites, client portals, and custom web apps your team can run day to day — matched to how work actually moves, not a template that almost fits.",
    detailBody:
      "Need a clear company website, a client portal, or software that replaces messy spreadsheets? We design and ship it so your team can actually use it — clear pages and workflows, sensible permissions, and releases you can review before go-live.",
    problem:
      "Your brand looks unclear online, or your team still runs critical work in spreadsheets and chat because no tool quite fits. Off-the-shelf software forces workarounds. A weak website loses trust before the first conversation.",
    details: [
      "Company websites and landing pages that explain what you do and convert interest",
      "Web apps, client portals, and ops dashboards shaped to your real process",
      "Discovery workshops to map the work before we propose screens",
      "Iterative builds with demos, then handover and training so ownership stays with your team",
      "Responsive design, SEO basics, and performance tuned for real visitors",
      "Admin access, documentation, and training so you’re not locked to us forever",
    ],
    process: [
      {
        title: "Discover",
        body: "We map goals, audiences, content, and the workflows the site or app must support.",
      },
      {
        title: "Design & plan",
        body: "Information architecture, key screens, and a build sequence you can review before we code.",
      },
      {
        title: "Build in slices",
        body: "Weekly demos of working pages and features — feedback while change is still cheap.",
      },
      {
        title: "Launch & hand over",
        body: "Go-live checklist, training, docs, and named owners on your side.",
      },
    ],
    modules: [
      {
        title: "Company websites that convert",
        body: "Clear story, services, proof, and contact paths — built to load fast on mobile and desktop, with forms and analytics wired in.",
      },
      {
        title: "Client portals & web apps",
        body: "Login areas, dashboards, and tools that replace spreadsheet chaos — permissions, notifications, and flows that match how your team works.",
      },
      {
        title: "Maintainable delivery",
        body: "Clean structure, sensible CMS or admin where needed, and documentation so updates don’t require a rescue mission.",
      },
    ],
    outcomes: [
      "A website or product customers and your team understand immediately",
      "Fewer manual patches between tools and people",
      "Clear ownership after launch — not a system only the vendor can touch",
      "A foundation you can grow without rebuilding from zero",
    ],
    audience:
      "Companies that need a professional website, a client-facing portal, or internal software that matches how work really gets done.",
    faqs: [
      {
        title: "Do you rebuild from scratch or improve what we have?",
        body: "Either. We’ll recommend the lighter path when an existing site or app can be fixed; we rebuild when the foundation can’t support the outcome you need.",
      },
      {
        title: "Will our team be able to update content?",
        body: "Yes when it matters. We set up editing paths and train the people who will own day-to-day updates.",
      },
      {
        title: "How long does a typical project take?",
        body: "A focused marketing site can move in weeks; portals and custom apps take longer depending on workflows and integrations. We lock a useful first win early.",
      },
    ],
    href: "/services/software",
    imageSrc: "/brand/services/software.jpg",
    imageAlt: "Developer working late at a desk with code on multiple screens",
  },
  {
    id: "ai-automation",
    name: "AI & Automation",
    summary: "Automate the repetitive steps that steal your week.",
    body: "We find the handoffs, copy-paste loops, and approval piles worth fixing — then automate them with maintainable workflows, not demo theatre.",
    detailBody:
      "We look for the grind that burns hours without adding judgment — re-keying, chasing approvals, status updates, document routing — and replace it with automations your team can understand and maintain. AI is used where it helps; reliable workflows win where they do.",
    problem:
      "People copy data between tools, chase approvals in chat, and retype the same updates every day. Hours disappear into work that never needed a human — and errors creep in when someone is tired.",
    details: [
      "Process audit to spot high-ROI automation candidates",
      "Workflow automation across forms, approvals, notifications, and handoffs",
      "Practical AI assist where it reduces error or speeds decisions",
      "Integrations between the tools you already use",
      "Monitoring and playbooks so automations don’t become mysterious debts",
      "Training so operators know what to check when something fails",
    ],
    process: [
      {
        title: "Audit the grind",
        body: "We sit with the people doing the work and list repeatable steps that cost time or create errors.",
      },
      {
        title: "Prioritise ROI",
        body: "We score candidates by impact vs effort and pick a first automation worth shipping soon.",
      },
      {
        title: "Build & test",
        body: "We implement, edge-case test, and put monitoring in place before you rely on it daily.",
      },
      {
        title: "Hand over with playbooks",
        body: "Docs, owners, and a simple runbook — so the automation stays yours.",
      },
    ],
    modules: [
      {
        title: "Ops & admin automation",
        body: "Approvals, reminders, data sync, document routing, and status updates that used to live in chat and spreadsheets.",
      },
      {
        title: "Practical AI assists",
        body: "Drafting, classification, extraction, and decision support — only where accuracy and review paths make sense.",
      },
      {
        title: "Reliable operations",
        body: "Alerts, logs, and fallbacks so a failed step doesn’t silently break the week.",
      },
    ],
    outcomes: [
      "Hours back each week on tasks that used to drag",
      "Fewer dropped handoffs and fewer copy-paste mistakes",
      "Automations your team can explain and keep running",
      "A clearer path from “we should automate this” to something live",
    ],
    audience:
      "Operations, admin, and growth teams drowning in repeatable tasks that should already run themselves.",
    faqs: [
      {
        title: "Do you only use AI?",
        body: "No. Many wins are solid workflow automation. We add AI when it clearly reduces effort or error — not for the pitch deck.",
      },
      {
        title: "Can you work with our existing tools?",
        body: "Usually yes. We start with what you already use and only introduce new tools when they earn their place.",
      },
      {
        title: "What if an automation breaks?",
        body: "We design monitoring and a simple playbook so your team knows what to check — and we can support aftercare when you want it.",
      },
    ],
    href: "/services/ai-automation",
    imageSrc: "/brand/services/ai-automation.jpg",
    imageAlt: "Human and robot hands shaking — partnership between people and automation",
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    summary: "Acquisition and content tied to numbers you can defend.",
    body: "SEO, paid media, content, and analytics connected so attention turns into pipeline — with reporting operators can trust.",
    detailBody:
      "We build growth systems, not disconnected campaigns. Channels, landing experiences, and reporting stay wired together so you can see what spent money, what converted, and what to do next.",
    problem:
      "Ads, content, and SEO run in separate silos. Money goes out, leads come in unevenly, and nobody can clearly say what worked. Reporting looks busy but doesn’t help next week’s decisions.",
    details: [
      "Channel strategy across SEO, paid media, and content with clear priorities",
      "Landing pages and funnels aligned to the offer and audience",
      "Tracking and analytics that connect spend to leads and conversion",
      "Content systems that support search and sales conversations",
      "Campaign setup, optimisation, and creative iteration",
      "Reporting your team can use week to week — not vanity metrics alone",
    ],
    process: [
      {
        title: "Diagnose the funnel",
        body: "We review offer, audience, channels, tracking, and where leads drop today.",
      },
      {
        title: "Set the growth plan",
        body: "Priorities, budget logic, and success metrics for the next useful period — not a fantasy annual roadmap.",
      },
      {
        title: "Ship and measure",
        body: "Launch pages, campaigns, and content with tracking in place from day one.",
      },
      {
        title: "Optimise weekly",
        body: "Review what moved, cut what didn’t, and double down with clear next actions.",
      },
    ],
    modules: [
      {
        title: "Acquisition systems",
        body: "SEO foundations, paid media structure, and campaigns aimed at qualified interest — not noise.",
      },
      {
        title: "Conversion paths",
        body: "Landing pages, offers, and follow-up flows that turn attention into conversations and leads.",
      },
      {
        title: "Measurement you can trust",
        body: "Clean tracking, dashboards, and weekly reporting tied to leads and revenue signals.",
      },
    ],
    outcomes: [
      "Channels that support one clear growth plan",
      "Spend tied to leads and conversions you can track",
      "Weekly reporting your team can act on without a translator",
      "A repeatable way to test offers instead of guessing",
    ],
    audience:
      "Founders and marketing leads who want growth they can measure — not campaigns that look busy and stay opaque.",
    faqs: [
      {
        title: "Do you run ads only, or full-funnel work?",
        body: "We connect channels to landing experiences and tracking. Ads alone without a conversion path usually waste money.",
      },
      {
        title: "Can you work with our existing website?",
        body: "Yes. We’ll improve what converts and recommend rebuilds only when the current site blocks growth.",
      },
      {
        title: "How do you report results?",
        body: "Plain-language weekly or bi-weekly reporting: what we spent, what came in, what changed, and what we do next.",
      },
    ],
    href: "/services/digital-marketing",
    imageSrc: "/brand/services/digital-marketing.jpg",
    imageAlt: "Professional smiling during a video call on a smartphone at her desk",
  },
  {
    id: "academy",
    name: "Academy",
    summary: "Train for web development, digital marketing, and AI.",
    body: "Promptstack Academy trains students and aspiring tech professionals in web development, digital marketing, and AI — through practical projects, not slide-only courses.",
    detailBody:
      "Promptstack Academy is built for students and aspiring tech professionals who want job-ready skills. Choose a focused track — Web Development, Digital Marketing, or AI Training — learn by building, get mentored feedback, and leave with projects you can show employers.",
    problem:
      "Many courses stop at theory and certificates. Graduates still can’t build a site, run a campaign, or apply AI to real tasks — so employers don’t trust the résumé.",
    details: [
      "Three focused tracks: Web Development, Digital Marketing, and AI Training",
      "Project-based learning with mentored reviews",
      "Portfolio-ready outputs you can show in interviews",
      "Practical tools and workflows used in real delivery",
      "Clear fees in FCFA — no vague “contact for pricing” games",
      "Supportive cohort environment for students and career switchers",
    ],
    process: [
      {
        title: "Choose your track",
        body: "Pick Web Development, Digital Marketing, or AI Training based on the career path you want.",
      },
      {
        title: "Learn by building",
        body: "Lessons are tied to exercises and projects — not endless theory with no output.",
      },
      {
        title: "Get reviewed",
        body: "Mentors critique your work so you improve the way real teams improve: with feedback.",
      },
      {
        title: "Show your proof",
        body: "Finish with portfolio pieces and clearer language for applications and interviews.",
      },
    ],
    modules: [
      {
        title: "Who Academy is for",
        body: "Students, recent graduates, and aspiring tech professionals who want practical skills in web development, digital marketing, or AI — not another certificate with nothing to show.",
      },
      {
        title: "How classes run",
        body: "Structured lessons, hands-on practice, project milestones, and mentor feedback. You leave with work products, not only notes.",
      },
      {
        title: "What “done” looks like",
        body: "Completed projects, a clearer skill story for your CV, and confidence using the tools of your track.",
      },
    ],
    courses: [
      {
        id: "web-development",
        name: "Web Development",
        fee: "250,000 FCFA",
        duration: "Full practical track",
        summary:
          "Learn to build modern websites and web interfaces employers can evaluate — from structure and styling to interactive pages and deployment basics.",
        curriculum: [
          "Internet, browsers, and how websites actually work",
          "HTML structure for real pages (not toy demos)",
          "CSS layout, responsive design, and clean visual hierarchy",
          "JavaScript fundamentals for interactive interfaces",
          "Working with components, forms, and basic app logic",
          "Using Git for version control and collaboration habits",
          "APIs and data: fetch, display, and handle simple backend responses",
          "Hosting, deployment, and going live with a project",
          "Debugging, accessibility basics, and performance hygiene",
          "Capstone: ship a complete portfolio-ready website or web app",
        ],
        outcomes: [
          "A live or deployable project you can show",
          "Confidence building pages and interfaces from scratch",
          "A clearer path into junior web / frontend roles",
        ],
      },
      {
        id: "digital-marketing",
        name: "Digital Marketing",
        fee: "250,000 FCFA",
        duration: "Full practical track",
        summary:
          "Learn how modern acquisition works end to end — content, campaigns, landing pages, and measurement — so you can run growth work with evidence.",
        curriculum: [
          "Digital marketing foundations and the customer journey",
          "Brand positioning, offers, and audience clarity",
          "Content marketing: planning, writing, and distribution",
          "Social media strategy and campaign execution basics",
          "SEO fundamentals: search intent, on-page, and content structure",
          "Paid media basics: account structure, targeting, and creative tests",
          "Landing pages and conversion-minded page structure",
          "Email / follow-up flows and lead nurture basics",
          "Analytics & tracking: what to measure and how to read it",
          "Capstone: plan and present a full campaign with reporting logic",
        ],
        outcomes: [
          "A campaign plan and artefacts you can show in interviews",
          "Ability to connect channels to conversion and reporting",
          "Practical skills for marketing assistant / coordinator roles",
        ],
      },
      {
        id: "ai-training",
        name: "AI Training",
        fee: "100,000 FCFA",
        duration: "Focused practical track",
        summary:
          "Learn to use AI tools productively for real work — prompting, workflows, quality control, and practical use cases — without the hype.",
        curriculum: [
          "What AI can and cannot reliably do today",
          "Prompting fundamentals for clear, reusable results",
          "Using AI for research, drafting, and summarisation",
          "AI for productivity workflows (docs, email, planning)",
          "Image and media assist use cases (where appropriate)",
          "Quality control: fact-checking, bias awareness, and human review",
          "Building simple AI-assisted workflows for school or work",
          "Ethics, privacy, and responsible use",
          "Portfolio mini-project: an AI workflow that solves a real task",
          "How to talk about AI skills clearly on a CV or in interviews",
        ],
        outcomes: [
          "Practical AI workflows you can reuse immediately",
          "Better judgment on when to trust or override AI output",
          "A mini-project that proves applied AI skill",
        ],
      },
    ],
    feeNote:
      "Fees are listed per track in FCFA. Ask us about current cohort dates, payment options, and which track fits your goals.",
    outcomes: [
      "Job-ready practice in web development, digital marketing, or AI",
      "Finished projects that strengthen applications and interviews",
      "Mentored feedback instead of learning alone in silence",
      "A clearer story about what you can actually do",
    ],
    audience:
      "Students and aspiring tech professionals who want practical training in web development, digital marketing, or AI.",
    faqs: [
      {
        title: "Who can join Academy?",
        body: "Students, recent graduates, and aspiring tech professionals. No need to already work at a company — motivation and consistency matter most.",
      },
      {
        title: "Are the fees per course?",
        body: "Yes. Web Development is 250,000 FCFA, Digital Marketing is 250,000 FCFA, and AI Training is 100,000 FCFA.",
      },
      {
        title: "Do I get a certificate?",
        body: "You’ll get recognition for completion — but the priority is portfolio proof and skills you can demonstrate, not a paper certificate alone.",
      },
      {
        title: "Can I take more than one track?",
        body: "Yes. Many learners start with one track, then add another. We’ll help you sequence them if you’re unsure.",
      },
      {
        title: "Is this online or in person?",
        body: "Ask us for the current cohort format (in-person, online, or hybrid) and schedule for your preferred track.",
      },
    ],
    href: "/services/academy",
    imageSrc: "/brand/services/academy.jpg",
    imageAlt: "Speaker presenting to attendees at a professional training workshop",
  },
];
