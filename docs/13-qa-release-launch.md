# 13 — QA, Release, and Launch

## Environments

### Local
Development.

### Preview / Staging
- real-like content;
- safe credentials;
- noindex;
- review URLs;
- content/editor preview.

### Production
Public.

## Testing matrix

### Functional
- navigation;
- dropdowns/mega-menu;
- forms;
- redirects;
- CMS content;
- links;
- confirmation pages.

### Responsive
Review:
- 320/360-ish small mobile;
- ~390/430 mobile;
- tablet portrait/landscape;
- laptop;
- standard desktop;
- wide desktop.

### Browsers
- Chrome
- Safari
- Firefox
- Edge

### Accessibility
- keyboard-only;
- screen-reader spot checks;
- automated axe checks;
- zoom/text scaling;
- reduced motion.

### Performance
- Lighthouse;
- Web Vitals in production;
- image/font request review;
- JS bundle review.

### SEO
- metadata;
- canonical;
- sitemap;
- robots;
- structured data;
- link crawl;
- no accidental noindex on production.

### Security
- no exposed environment values;
- form abuse behavior;
- Turnstile;
- security headers;
- dependency vulnerabilities;
- CSP compatibility.

## Critical E2E

### Business
Home → Software → Work → Start Project → Submit → DB → notification → confirmation.

### Academy
Home → Academy → AI Program → Apply → Submit → DB → notification → confirmation.

### Content acquisition
Insight → relevant Solution → Start Project.

## Content QA

Check:
- spelling;
- names;
- verified phone/email;
- fees/dates;
- project permissions;
- image alt;
- no placeholders;
- no lorem ipsum;
- no fake stats;
- no unapproved testimonials.

## Pre-launch

- domain/DNS ready;
- SSL;
- production environment;
- CMS production dataset/config;
- analytics;
- GTM;
- Search Console verification;
- sitemap submitted;
- robots correct;
- 404;
- legal pages;
- real form owners;
- tested email delivery;
- backup/recovery;
- monitoring;
- redirect list if replacing an old site.

### Start a Project conversion (Epic 6 / 6A) — production blockers

Production readiness remains **FALSE** until all of the following are confirmed:

- [ ] Supabase credentials configured (server-only service role)
- [ ] Both business-lead migrations applied
- [ ] Cloudflare Turnstile production site + secret keys
- [ ] `TURNSTILE_ALLOWED_HOSTNAMES` set to approved production hostnames
- [ ] Vercel Firewall/WAF rate-limit rule on `/start-a-project` **POST** (not GET) — see `docs/epic-6-operations.md`
- [ ] Resend API key + verified sender (`EMAIL_FROM_ADDRESS`)
- [ ] `LEAD_NOTIFICATION_EMAIL` set to a real Promptstack operator inbox
- [ ] Legally approved Privacy Policy replaces interim `/privacy` content
- [ ] After legal approval: remove interim privacy `noindex` so the page can be indexable in production

Code implements conversion security/reliability; the checklist above is external configuration that cannot be “completed” by the application alone.

### Academy application conversion (Epic 8) — production blockers

Academy admissions readiness remains **FALSE** until all of the following are confirmed:

- [ ] `ACADEMY_APPLICATIONS_ENABLED=true` set intentionally
- [ ] Academy applications migration applied (`20260811090000_academy_applications.sql`)
- [ ] Cloudflare Turnstile production site + secret keys (action `academy_application`)
- [ ] `TURNSTILE_ALLOWED_HOSTNAMES` set
- [ ] Vercel Firewall/WAF rate-limit rule on `/academy/apply` **POST** (not GET) — see `docs/epic-8-academy-operations.md`
- [ ] Resend API key + verified sender
- [ ] `ACADEMY_APPLICATION_NOTIFICATION_EMAIL` set to a real admissions owner inbox (separate from commercial leads unless intentionally shared)
- [ ] Admissions review ownership process defined
- [ ] Legally approved Privacy Policy (shared)
- [ ] Legal input on minors/age policy if required — do not invent

### Sanity CMS (Epic 9 / 9A) — production blockers

Editorial CMS readiness remains **FALSE** until:

- [x] Sanity project created (`4ruih0z5`) and dataset `production`
- [x] Local env public IDs + preview/revalidate secrets
- [x] Academy programs migrated (SE / AI / Cybersecurity)
- [x] Local Academy Sanity-source page verification
- [x] Draft vs published separation verified
- [ ] `SANITY_API_READ_TOKEN` (Viewer) present in **deployed** environment
- [ ] `SANITY_PREVIEW_SECRET` present in deployed environment
- [ ] **`SANITY_REVALIDATE_SECRET` + Sanity webhook → public `/api/revalidate`** (pending public deployment)
- [ ] Production/preview CORS origin(s) added for real deployment host(s)
- [ ] Explicit production `ACADEMY_CONTENT_SOURCE=sanity` only after go-live approval
- [ ] Revoke temporary Editor `SANITY_API_WRITE_TOKEN` after migration (not needed at runtime)
- [ ] Real Work/Insights authored when available (never fictional seeds)
- [ ] Admissions still controlled solely by `ACADEMY_APPLICATIONS_ENABLED` (not CMS)
- [x] Sitemap verified locally: Academy programs included; no Insight detail URLs; no Studio/confirmations

## Post-launch

Within first days:
- check form records daily;
- check notification delivery;
- check Search Console crawl/index status;
- inspect Web Vitals;
- inspect JS/runtime errors;
- review analytics events.

Within first month:
- review conversion data;
- identify highest-traffic solutions;
- monitor form abandonment;
- gather qualitative sales feedback;
- prioritize iteration.
