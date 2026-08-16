# Project Decisions — Locked Until Explicitly Changed

This file records decisions that should not be casually revisited during implementation.

## Strategic decisions

- The website balances the corporate business and Promptstack Academy, but the corporate homepage is primarily B2B.
- Primary website conversion: qualified business inquiry.
- Secondary conversion: Academy application/enrolment.
- Primary B2B CTA: `Start a Project`.
- The website sells outcomes and problem-solving before technical capabilities.
- The site must communicate a Cameroon base with wider African ambition without pretending the company already operates everywhere.
- Promptstack Academy stays under the parent Promptstack web ecosystem rather than being presented as an unrelated company.

## Navigation decisions

Desktop:

`Solutions | Work | How We Work | Academy | Insights | Company | Start a Project`

- full horizontal desktop navigation;
- Solutions mega-menu;
- Company standard dropdown;
- Academy visible at first level;
- mobile uses drawer/hamburger.

Do not use the Ainet mobile-like desktop navigation.

## Brand decisions

Official primary font: Eurostile.

Official colors:

- Purple `#A800E6`
- Navy `#1B263B`
- Grey `#919191`
- Lavender `#CBAED3`

The owner already has the official logo and icon. They must not be regenerated.

Design is predominantly light, with navy text and controlled purple/lavender accents.

## UX decisions

- Problem recognition precedes the detailed solution pitch.
- Large solution modules are preferred over three tiny generic cards.
- Selected Work should feature one dominant project plus supporting projects where content supports it.
- How We Work uses the six-step model:
  `Discover → Define → Design → Build → Launch → Improve`.
- Academy is introduced after core commercial proof/process on the corporate homepage.
- Final CTA tells the prospect they may start with the business problem even if they do not know the technical solution.
- Mobile is designed in parallel, not as a later adaptation.

## Technology decisions

- Next.js 16 App Router + TypeScript.
- Tailwind with custom tokens.
- Sanity for editorial content.
- Supabase/PostgreSQL for business/application transactional data.
- Vercel deployment.
- Cloudflare Turnstile.
- GA4, GTM, Search Console.
- Playwright E2E.

## V1 non-goals

- public authentication;
- LMS;
- client portal;
- talent marketplace;
- public user profiles;
- AI chatbot;
- site-wide search;
- complex personalization;
- large multilingual system;
- WebGL/3D showcase effects;
- dozens of thin SEO pages;
- a huge service catalog.

## Change control

A proposed change should answer:

1. Which customer problem does it solve?
2. Which business objective does it support?
3. What is the measurable value?
4. What implementation/maintenance cost does it introduce?
5. Does it conflict with the current positioning or conversion hierarchy?

Do not add scope merely because a competitor or template has it.
