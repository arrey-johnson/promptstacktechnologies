import type { CmsData } from "./types";

export const cmsSeed: CmsData = {
  settings: {
    siteName: "Promptstack Technologies",
    tagline: "Build better systems. Automate the work slowing you down.",
    contactEmail: "hello@promptstacktechnologies.com",
    phone: "+237 674 047 453",
    location: "Bonapriso, Douala",
    nav: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Products", href: "/products" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    cta: { label: "Book a call", href: "#book-discovery" },
    footerColumns: [
      {
        title: "Promptstack",
        links: [
          { label: "About", href: "/about" },
          { label: "Careers", href: "/careers" },
          { label: "Contact", href: "/contact" },
          { label: "Blog", href: "/blog" },
        ],
      },
      {
        title: "What we offer",
        links: [
          { label: "Software", href: "/services#software" },
          { label: "AI & Automation", href: "/services#ai-automation" },
          { label: "Digital Marketing", href: "/services#digital-marketing" },
          { label: "Academy", href: "/services#academy" },
        ],
      },
      {
        title: "Academy",
        links: [
          { label: "Programs", href: "/services#academy" },
          { label: "Enquire", href: "/contact?subject=Academy%20Enquiry" },
        ],
      },
      {
        title: "More",
        links: [
          { label: "Products", href: "/products" },
          { label: "Book a discovery call", href: "#book-discovery" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Terms of Service", href: "/terms-of-service" },
          { label: "Cookie Policy", href: "/cookie-policy" },
        ],
      },
    ],
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
      { label: "X", href: "https://x.com/" },
      { label: "TikTok", href: "https://www.tiktok.com/" },
    ],
    newsletter: {
      heading: "Get Promptstack notes",
      body: "Short updates on products, Academy cohorts, and practical delivery lessons — no spam cadence.",
      consent:
        "Yes, email me occasional Promptstack updates about products, Academy, and events.",
    },
    seo: {
      title: "Promptstack Technologies",
      description:
        "Promptstack Technologies helps businesses solve operational and growth problems through software, AI & automation, digital marketing, and Academy.",
    },
  },
  home: {
    hero: {
      eyebrow: "Promptstack Technologies",
      heading: "Build better systems. Automate the work slowing you down.",
      accentWords: ["better", "Automate"],
      supporting:
        "Software, AI & automation, digital marketing, and Promptstack Academy — so your team ships clearer processes, faster decisions, and growth you can measure.",
      primaryCta: { label: "Book a discovery call", href: "#book-discovery" },
      secondaryCta: { label: "See our services", href: "/services" },
      videoSrc: "/brand/hero-background.mp4",
    },
    purpose: {
      eyebrow: "The Promptstack brief",
      heading: "Systems your team can run — and grow with.",
      body: [
        "Promptstack Technologies sits where operations, growth, and skills meet. We help organisations stop duct-taping tools together and start shipping software, automation, and campaigns that operators can own.",
        "We pair delivery with Promptstack Academy so capability doesn’t leave when a project ends — it compounds inside your team.",
      ],
    },
    servicesIntro: {
      eyebrow: "The Promptstack stack",
      heading: "One partner. Four connected levers.",
      body: "Pick the entry point that hurts most today — custom software, AI & automation, digital marketing, or Academy — then expand without switching vendors mid-flight.",
    },
    featuredWork: {
      eyebrow: "Patterns we ship",
      heading: "Examples of the work",
      items: [
        {
          title: "Ops cockpit for approvals and follow-ups",
          industry: "Back-office ops",
          services: ["Software", "AI & Automation"],
          body: "A shared workspace that replaces spreadsheet chasing with clear queues, reminders, and audit trails.",
        },
        {
          title: "Demand engine with honest reporting",
          industry: "Revenue teams",
          services: ["Digital Marketing", "Software"],
          body: "Campaigns, landing pages, and dashboards wired so spend, leads, and conversion tell one story.",
        },
      ],
    },
    process: {
      eyebrow: "Working with Promptstack",
      heading: "Four phases. Weekly demos. Clear owners.",
      body: "We keep the engagement small enough to steer: diagnose the constraint, lock a useful first win, ship in reviewable slices, then leave the system with named owners on your side.",
      steps: [
        {
          title: "Diagnose the bottleneck",
          body: "We sit with the people doing the work, name the friction in plain language, and agree what “better” must look like before we propose tools.",
        },
        {
          title: "Lock the first useful win",
          body: "Scope, sequence, and success checks are written down early — so we protect the outcome that matters most in the next few weeks, not a fantasy roadmap.",
        },
        {
          title: "Ship, review, harden",
          body: "You see working slices on a steady cadence. Feedback lands while change is cheap; testing rides along with the build, not as a last-minute scramble.",
        },
        {
          title: "Transfer ownership",
          body: "Go-live includes training, docs, and an owner map. Academy paths are available when you want skills to stay in-house.",
        },
      ],
    },
    productsTeaser: {
      eyebrow: "In the lab",
      heading: "Ventures we’re shaping next",
      body: "Placeholder product cards for ideas Promptstack is exploring. Rename, restatus, or replace them anytime under Admin → Products.",
    },
    aboutTeaser: {
      eyebrow: "Who we are",
      heading: "Built around services that move real work.",
      body: [
        "Promptstack is a technology company focused on software, AI & automation, digital marketing, and Academy — shipping systems teams can run, and skills that stick.",
        "We design for lean teams, practical constraints, and leaders who need proof faster than a long strategy deck.",
      ],
    },
    whyUs: {
      eyebrow: "What you get with Promptstack",
      heading: "Delivery plus capability — not slides alone.",
      items: [
        {
          title: "Connected stack, not siloed vendors",
          body: "Software, automation, marketing, and Academy can reinforce each other instead of fighting for budget in four different companies.",
        },
        {
          title: "Operator-first design",
          body: "Interfaces and workflows are judged by the people who click them every day — not only by the steering committee.",
        },
        {
          title: "Demo-driven progress",
          body: "You see working software and campaign artefacts often enough to steer. Surprises stay small and fixable.",
        },
        {
          title: "Skills that stay after we leave",
          body: "When you want it, Academy paths turn delivery into internal capability — so the win isn’t rented forever.",
        },
      ],
    },
    finalCta: {
      heading: "Want a clearer next step?",
      body: "Book a discovery call. We’ll sort whether you need a system, an automation, a growth push, Academy, or a mix — and what to do first.",
      cta: { label: "Book a discovery call", href: "#book-discovery" },
    },
  },
  about: {
    hero: {
      eyebrow: "Promptstack Technologies",
      heading: "About Promptstack",
      body: "We build software, automation, digital marketing systems, and Academy programs — so teams can run clearer operations and grow with skills that stick.",
    },
    story: {
      eyebrow: "How we got here",
      heading: "Focused on the stack that actually moves work.",
      body: [
        "Promptstack started from a simple frustration: too many organisations juggle tools that don’t talk to each other, campaigns that don’t report cleanly, and training that never reaches production.",
        "We narrowed in on four connected levers — software, AI & automation, digital marketing, and Academy — so delivery and capability grow together instead of as separate side quests.",
      ],
    },
    values: {
      eyebrow: "How we work",
      heading: "The standards we hold ourselves to",
      items: [
        {
          title: "Services first, operator mindset",
          body: "Our identity is the work we ship — software, automation, growth systems, and Academy — designed for lean teams and leaders who need proof faster than a long strategy deck.",
        },
        {
          title: "Ship what people can run",
          body: "Pretty screens without owners don’t count. We optimise for systems your team can operate after we leave.",
        },
        {
          title: "Say the hard trade-offs early",
          body: "Scope, risk, and timelines get named in plain language. Surprises should be rare and small.",
        },
        {
          title: "Leave capability behind",
          body: "When it fits, Academy paths turn project work into internal muscle — not rented forever.",
        },
      ],
    },
    teamIntro: {
      heading: "The people behind Promptstack",
      body: "Add real names, roles, and short bios in Admin when you’re ready to publish the team.",
    },
    capabilities: {
      heading: "The Promptstack toolkit",
      body: "Four delivery lanes plus the habits that keep projects honest from first workshop to handover.",
      items: [
        {
          title: "Constraint mapping",
          body: "We start with the bottleneck — process, data, tools, or skills — before recommending a build.",
        },
        {
          title: "Custom software",
          body: "Web and mobile systems shaped around real workflows, not generic templates.",
        },
        {
          title: "AI & automation",
          body: "Workflows that cut repeat work and reduce error without becoming a circus of demos.",
        },
        {
          title: "Growth systems",
          body: "Acquisition, content, and analytics wired so attention connects to pipeline.",
        },
        {
          title: "Academy paths",
          body: "Learn by shipping finished work — evidence over slide decks.",
        },
        {
          title: "Handover & aftercare",
          body: "Training, owner maps, and optional support so go-live isn’t the end of the story.",
        },
      ],
    },
    contactBand: {
      heading: "Want to see if we’re a fit?",
      body: "Book a discovery call or send a note — we’ll map the fastest useful next step.",
    },
  },
  servicesPage: {
    hero: {
      heading: "Services",
      body: "Four connected levers: custom software, AI & automation, digital marketing, and Academy. Start where the constraint is sharpest.",
    },
    cta: {
      heading: "Not sure which lever to pull first?",
      body: "Book a discovery call and we’ll sort the sequence with you.",
      cta: { label: "Book a discovery call", href: "#book-discovery" },
    },
  },
  productsPage: {
    hero: {
      eyebrow: "Promptstack products",
      heading: "Products coming soon",
      body: "We’re shaping ventures and tools worth shipping. This page will open when the first ones are ready to share.",
    },
    emptyState: "Check back soon — or book a discovery call if you want an early look at what’s next.",
  },
  careersPage: {
    hero: {
      heading: "Work at Promptstack",
      body: "Join a team that ships software, automation, growth systems, and Academy — with craft, clarity, and room to level up.",
    },
    whyJoin: {
      heading: "Why people join us",
      body: "Real client constraints, a connected stack, and peers who care about usable outcomes.",
      items: [
        "Ship systems operators can actually run day to day",
        "Work across software, automation, marketing, and Academy",
        "Grow through demos, reviews, and finished work — not busywork",
      ],
    },
    openRolesHeading: "Open roles",
    emptyState: "No open roles at the moment. Leave your email below and we’ll let you know when something opens.",
    alert: {
      heading: "Want a heads-up on new roles?",
      body: "Drop your email and we’ll ping you when something opens that might fit.",
    },
  },
  contact: {
    hero: {
      heading: "Contact Promptstack",
      body: "Tell us the constraint you’re facing — system, automation, growth, Academy, or something else — and we’ll reply with a clear next step.",
    },
    intents: [
      "Book a discovery call",
      "Project enquiry",
      "Academy enquiry",
      "Partnership",
      "Careers",
      "Product interest",
      "Other",
    ],
    formLabels: {
      name: "Full name",
      email: "Email",
      phone: "Phone (optional)",
      subject: "What is this about?",
      message: "Message",
      consent: "I have read and agree to the Privacy Policy.",
      submit: "Send message",
    },
  },
  serviceItems: [
    {
      id: "software",
      name: "Software",
      summary: "Custom tools and platforms shaped around your real workflows.",
      body: "We build web and mobile systems your team can run day to day — internal apps, client portals, and line-of-business tools matched to how work actually moves.",
      detailBody:
        "When spreadsheets, chat threads, and off-the-shelf tools stop fitting, we design and ship software your operators can actually live in. That means clear workflows, sensible permissions, and releases you can review before go-live — not a black-box handoff.",
      details: [
        "Discovery workshops to map the real workflow before we propose screens",
        "Web and mobile apps, portals, and ops dashboards shaped to your process",
        "Iterative builds with demos so you can steer while change is still cheap",
        "Handover, training, and optional aftercare so ownership stays with your team",
      ],
      href: "/services#software",
      imageSrc: "/brand/services/software.jpg",
      imageAlt: "Developer working late at a desk with code on multiple screens",
    },
    {
      id: "ai-automation",
      name: "AI & Automation",
      summary: "Automate the repetitive steps that steal your week.",
      body: "We find the handoffs, copy-paste loops, and approval piles worth fixing — then automate them with maintainable workflows, not demo theatre.",
      detailBody:
        "We look for the grind that burns hours without adding judgment — re-keying, chasing approvals, status updates, document routing — and replace it with automations your team can understand and maintain. AI is used where it helps; boring reliable workflows win where they do.",
      details: [
        "Process audit to spot high-ROI automation candidates",
        "Workflow automation across forms, approvals, notifications, and handoffs",
        "Practical AI assist where it reduces error or speeds decisions",
        "Monitoring and playbooks so automations don’t become mysterious debts",
      ],
      href: "/services#ai-automation",
      imageSrc: "/brand/services/ai-automation.jpg",
      imageAlt: "Human and robot hands shaking — partnership between people and automation",
    },
    {
      id: "digital-marketing",
      name: "Digital Marketing",
      summary: "Acquisition and content tied to numbers you can defend.",
      body: "SEO, paid media, content, and analytics connected so attention turns into pipeline — with reporting operators can trust.",
      detailBody:
        "We build growth systems, not disconnected campaigns. Channels, landing experiences, and reporting stay wired together so you can see what spent money, what converted, and what to do next — without a dashboard that only a consultant can decode.",
      details: [
        "Channel strategy across SEO, paid media, and content with clear priorities",
        "Landing pages and funnels aligned to the offer and audience",
        "Tracking and analytics that connect spend to leads and conversion",
        "Reporting your team can use week to week — not vanity metrics alone",
      ],
      href: "/services#digital-marketing",
      imageSrc: "/brand/services/digital-marketing.jpg",
      imageAlt: "Professional smiling during a video call on a smartphone at her desk",
    },
    {
      id: "academy",
      name: "Academy",
      summary: "Learn by building. Leave with proof, not just slides.",
      body: "Promptstack Academy trains people to ship finished work — projects that demonstrate skill, not certificates without evidence.",
      detailBody:
        "Promptstack Academy is for people and teams who want capability they can show. Learners build toward finished projects — with coaching, critique, and a path that mirrors how we deliver client work — so skills survive past the classroom.",
      details: [
        "Project-based paths across software, AI, and related digital skills",
        "Mentored build cycles with reviews, not only recorded lectures",
        "Portfolio-ready outputs that prove what someone can ship",
        "Team upskilling options when you want delivery capacity in-house",
      ],
      href: "/services#academy",
      imageSrc: "/brand/services/academy.jpg",
      imageAlt: "Speaker presenting to attendees at a professional training workshop",
    },
  ],
  products: [
    {
      id: "prod-1",
      slug: "sample-product-one",
      name: "Sample Product One",
      status: "Early exploration",
      summary: "Replace this with your first real product.",
      body: "Sample product card. Edit or replace it in Admin → Products when you are ready.",
      ctaLabel: "Tell us you're interested",
    },
    {
      id: "prod-2",
      slug: "sample-product-two",
      name: "Sample Product Two",
      status: "Design in progress",
      summary: "Replace this with your second real product.",
      body: "Sample product card. Edit or replace it in Admin → Products when you are ready.",
      ctaLabel: "Request early access",
    },
  ],
  jobs: [],
  team: [],
  posts: [],
  legal: [
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      body: "Draft privacy policy — replace with your final legal text in Admin.",
    },
    {
      slug: "terms-of-service",
      title: "Terms of Service",
      body: "Draft terms of service — replace with your final legal text in Admin.",
    },
    {
      slug: "cookie-policy",
      title: "Cookie Policy",
      body: "Draft cookie policy — replace with your final legal text in Admin.",
    },
  ],
};
