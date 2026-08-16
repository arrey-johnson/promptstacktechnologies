# 08 — Technical Architecture

## Stack

### Application
- Next.js 16 App Router
- TypeScript
- React version supported by Next.js
- Tailwind CSS

Version policy:
- use the current secure Next.js 16.x Active LTS patch at implementation time;
- baseline verified in August 2026: do not use a patch older than 16.2.11;
- review official security release notes before production deployment.

### Editorial CMS
Sanity.

Use for:
- Work/case studies;
- Insights;
- Academy programs;
- team/testimonials if launched;
- selected global site settings.

### Transactional database
Supabase/PostgreSQL.

Use for:
- business leads;
- lead status/history;
- Academy applications;
- application status/history;
- attribution metadata;
- submission audit fields.

Do not use Sanity as the lead/application system of record.

### Hosting
Vercel.

### Email
Resend or a comparable transactional provider.

Email is a notification channel, not the system of record.

### Anti-bot
Cloudflare Turnstile.

Server-side validation is mandatory.

### Analytics
- Google Analytics 4
- Google Tag Manager
- Google Search Console

### Testing
- Playwright E2E
- unit/component testing appropriate to implementation
- automated accessibility checks + manual testing

## Rendering strategy

Prefer:
- static generation/ISR for evergreen public marketing content;
- server-rendered content where required;
- Server Components by default;
- Client Components only for actual interactivity.

CMS content should support preview/draft workflow.

## Suggested source layout

```text
src/
├── app/
│   ├── (marketing)/
│   ├── academy/
│   ├── api/
│   └── studio/          # only if embedding Sanity Studio
├── components/
│   ├── ui/
│   ├── layout/
│   ├── marketing/
│   ├── academy/
│   └── forms/
├── lib/
│   ├── sanity/
│   ├── database/
│   ├── analytics/
│   ├── validation/
│   ├── security/
│   └── seo/
├── styles/
├── types/
└── config/
```

Exact grouping may evolve, but page-specific copies of reusable UI are not acceptable.

## Component strategy

Base components:
- Container
- Section
- Button
- LinkButton
- Eyebrow
- Heading
- RichText
- Field
- Select
- Textarea
- FormMessage
- Tag
- Breadcrumb
- ResponsiveImage

Composite:
- Header
- SolutionsMegaMenu
- MobileNavigation
- Footer
- ProblemItem
- SolutionFeature
- OutcomeItem
- ProjectCard
- FeaturedProject
- ProcessStep
- AcademyProgramCard
- InsightCard
- FinalCTA

## Security boundary

Secrets only server-side:
- Supabase service role where used;
- Sanity write/preview token;
- Resend API key;
- Turnstile secret;
- any other private keys.

Never prefix secrets with `NEXT_PUBLIC_`.

## Forms

Preferred flow:

1. client-side convenience validation;
2. submit to server action or route handler;
3. server schema validation;
4. normalize fields;
5. Turnstile Siteverify;
6. rate-limit/abuse controls;
7. database transaction;
8. notification email;
9. analytics conversion;
10. success state.

If email fails after database persistence, the lead must remain safely recorded and error logging should allow operational recovery.

## Sanity

Use typed queries where practical.

Support:
- draft preview;
- image metadata;
- alt text;
- SEO metadata;
- featured flags;
- related content.

## Dependencies

Avoid dependency sprawl.

Do not install:
- a large animation framework for a simple reveal;
- a full UI design system that imposes unrelated visuals;
- CMS plugins without a real use case.

## Environment separation

Development:
local.

Preview/staging:
Vercel preview or dedicated staging; noindex.

Production:
protected production environment.

Use separate Turnstile configuration/keys where appropriate.

## Git/CI

- GitHub repository
- protected main branch
- pull requests
- preview deployments
- lint/typecheck/test before merge
- production from controlled branch
