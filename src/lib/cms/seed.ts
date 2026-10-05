import { blogPostsEn } from "./blog-posts-en";
import { legalPagesEn } from "./legal-pages-en";
import { portfolioItemsEn } from "./portfolio-items";
import { serviceItemsEn } from "./service-items";
import { teamMembersEn } from "./team-members";
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
      { label: "Portfolio", href: "/portfolio" },
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
          { label: "Software & websites", href: "/services/software" },
          { label: "AI & Automation", href: "/services/ai-automation" },
          { label: "Digital Marketing", href: "/services/digital-marketing" },
          { label: "Academy", href: "/services/academy" },
        ],
      },
      {
        title: "Academy",
        links: [
          { label: "Programs", href: "/services/academy" },
          { label: "Enquire", href: "/contact?subject=Academy%20Enquiry" },
        ],
      },
      {
        title: "More",
        links: [
          { label: "Portfolio", href: "/portfolio" },
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
          { label: "Acceptable Use", href: "/acceptable-use" },
        ],
      },
    ],
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/promptstack-technologies/" },
      { label: "TikTok", href: "https://www.tiktok.com/@promptstacktechnologies" },
    ],
    newsletter: {
      heading: "Get Promptstack notes",
      body: "Short updates on delivery work, Academy cohorts (web development, digital marketing, AI), and practical lessons — no spam.",
      consent:
        "Yes, email me occasional Promptstack updates about products, Academy training, and events.",
    },
    seo: {
      title: "Promptstack Technologies",
      description:
        "Promptstack Technologies helps businesses with software, AI & automation, and digital marketing — and trains students and aspiring tech pros through Academy in web development, digital marketing, and AI.",
    },
  },
  home: {
    hero: {
      eyebrow: "Promptstack Technologies",
      heading: "Build better systems. Automate the work slowing you down.",
      accentWords: ["better", "Automate"],
      supporting:
        "Software, AI & automation, digital marketing, and Promptstack Academy — where students and aspiring tech pros train in web development, digital marketing, and AI.",
      primaryCta: { label: "Book a discovery call", href: "#book-discovery" },
      secondaryCta: { label: "See our services", href: "/services" },
      videoSrc: "/brand/hero-background.mp4",
    },
    purpose: {
      eyebrow: "The Promptstack brief",
      heading: "Stop fighting your tools. Start running the business.",
      body: [
        "Too many teams lose time every week to messy handoffs, endless spreadsheets, and apps that don’t match how people really work. Progress slows — not because the team isn’t trying, but because the tools get in the way.",
        "Promptstack Technologies builds the software, automation, and digital systems that fix that. We make tools that fit your process, so your team can work faster, with fewer workarounds, and with a clear owner for every part.",
      ],
    },
    servicesIntro: {
      eyebrow: "Our services",
      heading: "Services built to work together.",
      body: "Start with the service you need most — websites & software, AI & automation, digital marketing, or Academy training — then add more without switching partners.",
    },
    portfolioTeaser: {
      eyebrow: "Selected work",
      heading: "Recent websites we’ve shipped.",
      body: "A snapshot of client sites and product interfaces — open any project for the case study: client context, challenge, scope, and outcome.",
      cta: { label: "View full portfolio", href: "/portfolio" },
    },
    partners: {
      eyebrow: "Technology ecosystem",
      heading: "Platforms & tools we work with",
      body: "We deliver on the platforms teams already trust — so solutions fit the stack you run today, without implying a formal partnership with every vendor logo shown.",
      items: [
        { name: "Google", logoSrc: "/brand/partners/google.webp?v=4" },
        { name: "Odoo", logoSrc: "/brand/partners/odoo.webp?v=4" },
        { name: "Microsoft", logoSrc: "/brand/partners/microsoft.webp?v=4" },
        { name: "Zoho", logoSrc: "/brand/partners/zoho.webp?v=3" },
        { name: "cPanel", logoSrc: "/brand/partners/cpanel.png?v=4" },
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
          body: "Go-live includes training, docs, and an owner map so your team can run what we shipped.",
        },
      ],
    },
    productsTeaser: {
      eyebrow: "In the lab",
      heading: "Ventures we’re shaping next",
      body: "Placeholder product cards for ideas Promptstack is exploring. Rename, restatus, or replace them anytime under Admin → Products.",
    },
    aboutTeaser: {
      eyebrow: "Is Promptstack a fit?",
      heading: "Call us when the work is stuck — not when you need another company bio.",
      body: [
        "If one of these is true, a discovery call is worth 30 minutes. If none are, we’re probably not the right team yet.",
      ],
    },
    whyUs: {
      eyebrow: "You’re a fit if",
      heading: "Four signals we can help this month.",
      items: [
        {
          title: "Tools don’t match how the team works",
          body: "Spreadsheets, workarounds, and half-used software. We rebuild around the real process so people stop fighting the system.",
        },
        {
          title: "Manual work is eating the week",
          body: "Repeating ops that should run themselves. We find the high-ROI automations, ship them, and name who owns them.",
        },
        {
          title: "Marketing can’t prove what moved",
          body: "Campaigns without a clean path to leads or revenue. We connect tracking, funnels, and follow-up so you can steer.",
        },
        {
          title: "You’re growing talent for tech roles",
          body: "Academy trains students and aspiring tech professionals in web development, digital marketing, and AI — with practical projects, not slide-only courses.",
        },
      ],
    },
    finalCta: {
      heading: "Want a clearer next step?",
      body: "Book a discovery call. We’ll sort whether you need a system, an automation, a growth push, Academy training, or a mix — and what to do first.",
      cta: { label: "Book a discovery call", href: "#book-discovery" },
      imageSrc: "/brand/cta-next-step.jpg?v=3",
    },
  },
  about: {
    hero: {
      eyebrow: "Our story",
      heading: "Building the Promptstack ecosystem — where technology finally makes work feel simple.",
      body: "Promptstack Technologies is a software, automation, digital marketing, and Academy company. We help organisations run clearer processes today — and train the talent that will keep those systems alive tomorrow.",
    },
    story: {
      eyebrow: "Why we exist",
      heading: "Too many businesses are stuck between ambition and broken tools.",
      body: [
        "Leaders want modern systems. Teams want tools that match real work. Students want skills that open doors. Too often, those goals sit in three different rooms — with three different vendors, three timelines, and no shared owner.",
        "Promptstack was built to close that gap. We design and ship websites, software, AI & automation, and growth systems that people can actually run — and through Academy we train students and aspiring tech professionals in web development, digital marketing, and AI.",
      ],
    },
    vision: {
      eyebrow: "Our vision",
      heading: "A future where business processes feel light — and capability stays close to the people doing the work.",
      body: [
        "We believe the next era of business is not more software for its own sake. It is connected systems, practical automation, measurable growth, and people who know how to build and operate what they use.",
        "Promptstack’s ecosystem is how we bring that closer: delivery for companies, training for talent, and a standard of work that prefers proof over slides.",
      ],
    },
    howWeWin: {
      eyebrow: "How we intend to succeed",
      heading: "Win by shipping useful systems — and raising the people who can run them.",
      body: "Our plan is simple and demanding: stay close to real constraints, deliver in reviewable slices, and grow talent that can keep the stack moving after go-live.",
      items: [
        {
          title: "One connected stack",
          body: "Software, automation, marketing, and Academy reinforce each other — so clients don’t buy four disconnected promises.",
        },
        {
          title: "Demo-driven delivery",
          body: "Weekly working slices keep decisions honest. Progress is visible early enough to steer.",
        },
        {
          title: "Operator-first design",
          body: "We judge success by the people who use the system every day — not only by a launch deck.",
        },
        {
          title: "Talent that can ship",
          body: "Academy builds practical skill in web development, digital marketing, and AI — so the ecosystem grows people, not just projects.",
        },
      ],
    },
    values: {
      eyebrow: "How we work",
      heading: "The standards behind every engagement",
      items: [
        {
          title: "Clarity over theatre",
          body: "Scope, risk, and trade-offs are named early in plain language. Surprises should stay rare and small.",
        },
        {
          title: "Ship what people can run",
          body: "Pretty screens without owners don’t count. We design for handover, ownership, and day-two reality.",
        },
        {
          title: "Evidence over opinion",
          body: "Demos, metrics, and finished work decide what stays. We optimise for outcomes you can point to.",
        },
        {
          title: "Leave capability behind",
          body: "Whether through project handover or Academy training, we want strength to remain on your side.",
        },
      ],
    },
    ceoWord: {
      eyebrow: "Word from the CEO",
      heading: "The future we dreamed of should feel practical at work.",
      quote:
        "Promptstack exists to bring that futuristic era we all imagined into real business life — not as hype, but as systems that make processes clearer, faster, and easier to run. When software, automation, growth, and skilled people move together, organisations stop fighting their tools and start compounding progress.",
      name: "Arrey Johnson",
      role: "Chief Executive Officer",
      credentials:
        "Software engineer and business developer with 8+ years of experience. He has worked with several tech companies and executed for multinational corporations — bringing both build craft and commercial judgment to Promptstack’s ecosystem.",
      imageSrc: "/brand/team/arrey-johnson.jpg?v=hd1",
      imageAlt: "Arrey Johnson, Chief Executive Officer of Promptstack Technologies",
    },
    teamIntro: {
      eyebrow: "Experienced team",
      heading: "An experienced team built for delivery",
      body: "Promptstack is led by practitioners across engineering, strategy, project direction, and content — people who have shipped, sold, coordinated, and communicated real work. We pair technical depth with business sense, so clients get systems that land and a team that can explain the path.",
    },
    capabilities: {
      heading: "What we put into the world",
      body: "The Promptstack ecosystem across delivery and training — from first diagnosis to handover and capability growth.",
      items: [
        {
          title: "Websites & custom software",
          body: "Company websites, portals, and apps shaped around real workflows — not generic templates.",
        },
        {
          title: "AI & automation",
          body: "Workflows that cut repeat work and reduce error without becoming a circus of demos.",
        },
        {
          title: "Digital marketing systems",
          body: "Acquisition, content, and analytics wired so attention connects to pipeline.",
        },
        {
          title: "Academy training",
          body: "Web development, digital marketing, and AI for students and aspiring tech professionals — learn by building real projects.",
        },
        {
          title: "Constraint mapping",
          body: "We start with the bottleneck — process, data, tools, or skills — before recommending a build.",
        },
        {
          title: "Handover & aftercare",
          body: "Training, owner maps, and optional support so go-live isn’t the end of the story.",
        },
      ],
    },
    contactBand: {
      heading: "Want to build with us?",
      body: "Book a discovery call or send a note — we’ll map whether Promptstack is the right next step for your systems, growth, or Academy path.",
    },
  },
  servicesPage: {
    hero: {
      heading: "Services",
      body: "Websites & custom software, AI & automation, digital marketing, and Academy (web development, digital marketing, and AI training). Start where you need us most.",
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
  portfolioPage: {
    hero: {
      eyebrow: "Selected work",
      heading: "Case studies across industries — not just screenshots",
      body: "Each project opens with client context, challenge, Promptstack’s role, scope, and outcome — the proof corporate buyers expect before a serious conversation.",
      primaryCta: { label: "Explore projects", href: "#portfolio-grid" },
      secondaryCta: { label: "Start a project", href: "#book-discovery" },
      imageSrc: "/brand/portfolio-hero.jpg?v=3",
    },
    grid: {
      eyebrow: "Delivery proof",
      heading: "Websites and digital systems we have shipped",
      body: "Open any project for the full case study. Named clients appear only when approved for publication; otherwise we use confidential sector labels.",
    },
    cta: {
      heading: "Let’s create work worth adding to this portfolio.",
      body: "Tell us about your goals and we will recommend the right path.",
      cta: { label: "Book a discovery call", href: "#book-discovery" },
    },
    emptyState: "Portfolio projects will appear here once you add them in Admin → Portfolio.",
  },
  careersPage: {
    hero: {
      heading: "Careers at Promptstack",
      body: "Build a career with a technology company that ships websites, software, automation, and growth systems for real clients. Apply directly on this website — every application is received in our back office.",
      imageSrc: "/brand/careers-hero.jpg?v=2",
    },
    whyJoin: {
      heading: "Why people join us",
      body: "Real client constraints, a connected stack, and peers who care about usable outcomes.",
      items: [
        "Ship systems operators can actually run day to day",
        "Support Academy training in web development, digital marketing, and AI",
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
      body: "Tell us what you need — a system, automation, growth work, Academy training (web development, digital marketing, or AI), or something else — and we’ll reply with a clear next step.",
      imageSrc: "/brand/contact-hero.jpg?v=2",
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
  serviceItems: serviceItemsEn,
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
  portfolioItems: portfolioItemsEn,
  jobs: [
    {
      id: "job-corporate-sales-manager",
      slug: "corporate-sales-manager",
      title: "Corporate Sales Manager",
      employmentType: "Full-time",
      location: "Douala",
      workType: "Hybrid",
      summary:
        "Own enterprise and mid-market sales for Promptstack’s software, websites, automation, and digital growth services — from prospecting to signed delivery.",
      body: "As Corporate Sales Manager, you will build and run a professional sales pipeline for Promptstack Technologies. You will qualify opportunities, run discovery conversations, prepare proposals, and close engagements that our delivery team can execute with clarity.\n\nYou will work closely with founders and delivery leads, represent Promptstack with credibility, and keep CRM hygiene and forecast accuracy high.",
      responsibilities: [
        "Prospect, qualify, and manage a corporate sales pipeline across target industries",
        "Lead discovery calls and present Promptstack services with clear commercial framing",
        "Prepare proposals, quotations, and follow-ups that convert interest into signed work",
        "Coordinate handoff to delivery with accurate scope notes and next steps",
        "Report weekly on pipeline, close rates, and revenue forecast",
      ],
      requirements: [
        "Proven B2B or corporate sales experience (technology, services, or digital preferred)",
        "Strong communication skills in English; French is a strong plus",
        "Comfortable owning targets, CRM updates, and professional client follow-up",
        "Organized, self-driven, and confident presenting to decision-makers",
        "Based in or able to work around Douala with hybrid availability",
      ],
      published: true,
    },
    {
      id: "job-digital-marketing-internship",
      slug: "digital-marketing-internship",
      title: "Digital Marketing Internship",
      employmentType: "Internship",
      location: "Douala",
      workType: "Hybrid",
      summary:
        "A structured internship for aspiring marketers who want hands-on experience in content, campaigns, analytics, and growth systems — not coffee runs.",
      body: "The Digital Marketing Internship at Promptstack is built for people who want to learn by shipping. You will support real campaigns and content workflows under mentorship, while building a portfolio of work you can show.\n\nThis is a professional internship track: clear expectations, weekly feedback, and exposure to how growth systems are planned and measured.",
      responsibilities: [
        "Support content drafting, scheduling, and basic creative coordination",
        "Assist with campaign setup, tracking checks, and weekly performance notes",
        "Help research audiences, competitors, and channel opportunities",
        "Maintain organized campaign assets and reporting sheets",
        "Participate in reviews and apply feedback to improve output quality",
      ],
      requirements: [
        "Currently studying or recently graduated in marketing, communications, or a related field — or a strong self-taught portfolio",
        "Curious about SEO, social, paid media, and analytics",
        "Reliable writing skills and attention to detail",
        "Comfortable with tools like Google Docs/Sheets; familiarity with Meta/Google Ads or Canva is a plus",
        "Available for a structured internship schedule (hybrid in Douala preferred)",
      ],
      published: true,
    },
  ],
  team: teamMembersEn,
  posts: blogPostsEn,
  legal: legalPagesEn,
};
