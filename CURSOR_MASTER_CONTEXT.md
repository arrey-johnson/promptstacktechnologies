# Cursor Master Context — Promptstack Technologies Website

## 1. Company context

Parent company: **PROMPTSTACK TECHNOLOGIES**

Promptstack Technologies is a Cameroon-based technology company that helps businesses build, automate, market, and grow through software, artificial intelligence, automation, and digital marketing.

Official divisions:

- Promptstack Software Solutions
- Promptstack AI and Automation
- Promptstack Digital Marketing
- Promptstack Academy

Promptstack Academy is the education and talent-development division. It provides practical, project-based technology training and should operate as a talent pipeline. Strong learners may progress into internships, apprenticeships, freelance project teams, or junior opportunities when opportunities exist.

Academy positioning:

> **Learn · Build · Ship.**

The company should initially remain lean, service-driven, execution-focused, and commercially disciplined.

## 2. What this website is

This website is a business system and strategic brand asset.

Its primary objective is to generate **qualified business opportunities**.

Its secondary objective is to generate **qualified Promptstack Academy applications and enrolments**.

Supporting objectives:

- establish trust and credibility;
- explain Promptstack's capabilities in business language;
- publish proof through work and case studies;
- build search authority;
- support sales;
- attract talent and partners;
- create a scalable foundation for future products and portals.

The site must not become a generic agency brochure.

## 3. Primary customer logic

Business visitors usually know the problem before they know the technical solution.

The website must therefore communicate in this order:

**Business problem → desired outcome → solution → capability → proof → process → conversion**

Do not lead with frameworks, programming languages, AI buzzwords, or long service lists.

Core commercial funnel:

**Recognize problem → understand solution → trust Promptstack → see proof → understand process → start a project**

Academy funnel:

**Interest → understand learning model → find program fit → see proof → understand expectations/opportunity → apply**

## 4. Positioning

Core positioning:

> Promptstack Technologies helps businesses build better systems, automate inefficient processes, and grow through software, artificial intelligence, automation, and digital marketing.

Internal positioning principle:

> **We solve business problems with technology.**

Technology is the mechanism. Business improvement is the objective.

## 5. Target audiences

Primary:

- business owners;
- founders;
- managing directors;
- operations managers;
- administrators;
- department heads;
- marketing managers;
- other decision-makers responsible for improving a business.

Important problem-led visitor:

- a business with manual operations;
- disconnected information;
- lost customer follow-up;
- repetitive work;
- poor reporting/visibility;
- weak digital acquisition;
- technology that no longer fits the organization.

Academy:

- beginners;
- university students who need practical experience;
- career changers and professionals;
- ambitious emerging technologists who want demonstrable skills.

Secondary:

- talent;
- interns;
- freelancers;
- instructors;
- partners.

## 6. Brand direction

Official font: **Eurostile**

Official brand colors:

- Promptstack Purple: `#A800E6`
- Promptstack Navy: `#1B263B`
- Promptstack Grey: `#919191`
- Promptstack Lavender: `#CBAED3`
- White: `#FFFFFF`

Official logo and icon: supplied separately by the owner. Never alter them.

Visual direction:

> **Light, premium, modern, editorial, technical, African, human, confident, restrained.**

The design should feel like a serious technology company, not a generic agency or neon AI startup.

Prioritize:

- white/off-white surfaces;
- navy typography;
- controlled purple accents;
- lavender as a soft supporting brand color;
- real African people;
- real Promptstack work;
- actual product interfaces;
- generous whitespace;
- strong Eurostile-led typography;
- restrained motion.

Avoid:

- AI robots;
- holographic brains;
- generic code walls;
- stock “hacker” imagery;
- meaningless dashboards;
- neon cyber aesthetics;
- purple everywhere;
- excessive gradients;
- giant rounded SaaS pills;
- glassmorphism everywhere;
- repetitive card grids;
- template-like desktop hamburger navigation.

## 7. Desktop navigation

The desktop header must be unmistakably desktop.

Global navigation:

**Solutions · Work · How We Work · Academy · Insights · Company · [Start a Project]**

Header:

- official logo left;
- horizontal navigation center/right;
- visible `Start a Project` CTA at far right;
- approximately 80px high;
- white/light surface;
- sticky;
- subtle border/shadow only after scroll;
- no oversized floating pill navbar;
- no hamburger on normal desktop widths.

Solutions opens a proper mega-menu.

Company uses a normal compact dropdown.

On mobile, use a hamburger/drawer.

## 8. Launch routes

- `/`
- `/solutions`
- `/solutions/software`
- `/solutions/ai-automation`
- `/solutions/digital-marketing`
- `/work`
- `/work/[slug]`
- `/how-we-work`
- `/academy`
- `/academy/programs`
- `/academy/programs/software-engineering`
- `/academy/programs/artificial-intelligence`
- `/academy/programs/cybersecurity`
- `/academy/how-we-teach`
- `/academy/apply`
- `/insights`
- `/insights/[slug]`
- `/company/about`
- `/contact`
- `/start-a-project`
- `/privacy`
- `/terms`
- `/cookies`
- `/project-request-received`
- `/academy/application-received`

Provide a custom 404.

Do not add public authentication, client portal, LMS, talent marketplace, site search, or AI chatbot in v1.

## 9. Homepage narrative

The homepage must follow this narrative:

1. Hero — who Promptstack helps and what outcome it creates
2. Capability/brand architecture strip
3. Business problem recognition
4. Solutions
5. Business outcomes
6. Selected work
7. How we work
8. Why Promptstack
9. Promptstack Academy
10. Insights
11. Final commercial CTA
12. Footer

The homepage is business-first. Academy is important but must not make the homepage a 50/50 student/business split.

## 10. Primary CTA hierarchy

Primary: **Start a Project**

Secondary: **Explore Solutions**

Supporting:

- View Our Work
- See How We Work
- Explore Promptstack Academy
- Explore Insights

Academy primary CTA: **Apply** / **Apply to Promptstack Academy** according to page context.

Do not place many equal-weight CTAs in the same viewport.

## 11. Technical architecture

Baseline implementation stack:

- Next.js 16, App Router, TypeScript
- use the current secure 16.x Active LTS patch; minimum baseline as of August 2026 is 16.2.11
- React supported by the selected Next.js version
- Tailwind CSS with custom Promptstack design tokens
- Sanity for editorial content
- PostgreSQL via Supabase for transactional form data
- Resend or equivalent transactional email provider
- Cloudflare Turnstile for anti-bot protection
- Vercel hosting
- GA4 + Google Tag Manager + Search Console
- Playwright for critical E2E journeys

Use server components by default. Add client components only when interaction requires them.

Do not use a heavy visual component kit that dictates the brand. Accessible headless primitives are acceptable if styled entirely through Promptstack's design system.

## 12. Content ownership

CMS-managed content should include:

- case studies/projects;
- Insights;
- Academy programs;
- team members if launched;
- testimonials;
- editable global contact/social details;
- selected real statistics once available.

Do not turn every homepage sentence into a CMS field.

## 13. Forms

Business inquiry and Academy applications are separate systems.

Business inquiry captures:

- name;
- work email;
- phone/WhatsApp;
- company;
- help area;
- business problem;
- project description;
- timeline;
- optional budget range;
- optional source attribution;
- privacy acknowledgement.

Help-area options:

- Software
- AI & Automation
- Digital Marketing
- Website / Digital Platform
- Not Sure Yet

Academy application captures:

- full name;
- email;
- phone/WhatsApp;
- city;
- program;
- current occupation/education;
- experience level;
- motivation;
- intended outcome;
- cohort where applicable;
- privacy acknowledgement.

Validate server-side. Protect forms with Turnstile and validate Turnstile server-side.

## 14. Workflow states

Business lead:

`NEW → REVIEWED → QUALIFIED / UNQUALIFIED → DISCOVERY SCHEDULED → PROPOSAL → WON / LOST`

Academy:

`SUBMITTED → UNDER REVIEW → ADMITTED / NOT ADMITTED → PAYMENT PENDING → ENROLLED → ONBOARDED`

## 15. Performance and accessibility

Target WCAG 2.2 AA.

Target Core Web Vitals:

- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1

Target production Lighthouse performance score ≥ 90 on representative pages, while recognizing field data matters more than lab scores.

The mobile experience is first-class. Do not hide meaningful desktop content from mobile indexing or mobile users.

## 16. Strict project rules

Never:

- fabricate client names, testimonials, statistics, metrics, outcomes, partners, awards, certifications, or student success;
- redraw or regenerate the official logo/icon;
- include unauthorized Eurostile font files;
- change the official brand palette without approval;
- use generic AI visual clichés;
- create a mobile-like desktop menu;
- overload the homepage with every service;
- put technology jargon ahead of business outcomes;
- build empty pages simply to enlarge the sitemap;
- add features that are explicitly v2/non-goals;
- sacrifice accessibility/performance for visual effects;
- introduce a new design library that makes the website look generic;
- silently rewrite approved homepage messaging.

When uncertain, preserve the strategy and ask for the missing factual input.
