# Launch readiness — Promptstack Technologies

Authoritative Epic 12 status board. Status values: **PASS** | **BLOCKER** | **MANUAL OWNER ACTION** | **POST-LAUNCH**.

Canonical domain: `https://www.promptstacktechnologies.com`

---

## Corporate website vs Academy activation

| Gate | Scope |
| --- | --- |
| **Corporate website launch** | Public marketing site, Start a Project, Sanity editorial, Insights/Work empty states OK |
| **Academy application activation** | Separate — requires admissions enablement + WAF + Turnstile + notifications + legal/minor guidance |

Absence of Work case studies or Insights articles is **not** an engineering launch blocker when truthful empty states exist.

---

## A. Domain / canonical

| Item | Status | Next action |
| --- | --- | --- |
| Apex → www redirect | PASS (live 308) | Keep Vercel domain config |
| HTTP → HTTPS | PASS (live 308) | Keep |
| Code normalizes production URL to `https://www…` | PASS (Epic 12) | Redeploy so sitemap/robots stop emitting `http://` |
| Vercel `NEXT_PUBLIC_SITE_URL` still `http://…` on live deploy | **MANUAL OWNER ACTION** | Set to `https://www.promptstacktechnologies.com` and redeploy |

---

## B. Environment safety

| Item | Status | Next action |
| --- | --- | --- |
| Indexing policy (`SITE_ENV` / `VERCEL_ENV`) | PASS | Ensure production has `VERCEL_ENV=production` (automatic) |
| `INSIGHTS_DEV_FIXTURES` must not be true in production | MANUAL OWNER ACTION | Confirm absent/false in Vercel Production |
| `SANITY_API_WRITE_TOKEN` not required at runtime | MANUAL OWNER ACTION | Confirm absent from Production runtime env |
| Analytics dormant without `NEXT_PUBLIC_GTM_ID` | PASS | Supply ID when ready |

---

## C. Analytics / consent

| Item | Status | Next action |
| --- | --- | --- |
| Config-driven GTM | PASS (code) | Provide `NEXT_PUBLIC_GTM_ID` |
| Consent banner (accept / reject) | PASS (code) | Appears only when GTM configured |
| Consent storage `pst_analytics_consent_v1` | PASS | Documented on `/cookies` |
| Event taxonomy + no PII helpers | PASS | Configure GA4 tags inside GTM |
| Conversion success only on confirmation | PASS | Verify in GA DebugView after IDs live |
| Analytics “live” measurement | **MANUAL OWNER ACTION** | Create GTM/GA4, publish container, Tag Assistant |
| Vercel Web Analytics | POST-LAUNCH / not enabled | Avoid dual pageview systems; GA4 is primary |
| Vercel Speed Insights | POST-LAUNCH optional | Not a launch blocker |

---

## D. SEO

| Item | Status | Next action |
| --- | --- | --- |
| robots.txt production allow + disallows | PASS (code) | Redeploy |
| Non-prod robots disallow `/` | PASS (code) | — |
| Sitemap excludes confirmations, studio, interim legal | PASS | — |
| Default OG image | PASS (`/opengraph-image`) | Redeploy |
| Search Console | **MANUAL OWNER ACTION** | Verify property + submit `https://www.promptstacktechnologies.com/sitemap.xml` |
| Interim `/privacy` `/terms` `/cookies` noindex | PASS | Flip only after legal approval |

---

## E. Security

| Item | Status | Next action |
| --- | --- | --- |
| Security headers + CSP (marketing + studio) | PASS (code) | Redeploy; spot-check Studio + Turnstile |
| App in-memory rate limit | PASS (backstop only) | Not distributed protection |
| Vercel WAF `/start-a-project` POST | **BLOCKER / MANUAL OWNER ACTION** | Configure Firewall rate-limit rule (see Epic 6 ops) |
| Vercel WAF `/academy/apply` POST | Academy activation blocker | Configure before enabling admissions |
| Turnstile production keys + hostnames | MANUAL OWNER ACTION | Confirm Production env |
| Unsigned revalidate rejected | PASS (existing) | — |

### Exact WAF rule (business)

1. Vercel project → Firewall / WAF / Rate Limiting  
2. Path: `/start-a-project`  
3. Method: **POST only** (do not limit GET page views)  
4. Threshold: on the order of ~5 POSTs / IP / 15 minutes  
5. Record rule ID in this document when done  

---

## F. Transactional (Start a Project)

| Item | Status | Next action |
| --- | --- | --- |
| Supabase migrations + service role | MANUAL OWNER ACTION | Confirm Production |
| Resend + verified sender + lead inbox | MANUAL OWNER ACTION | Confirm + owner-approved smoke test once |
| Failed-notification recovery CLI | PASS (code) | `npm run ops:recover-notifications -- list` |
| Real production lead smoke test | MANUAL OWNER ACTION | One labeled internal test after deps confirmed |

---

## G. Academy applications

| Item | Status | Notes |
| --- | --- | --- |
| `ACADEMY_APPLICATIONS_ENABLED` | expect `false` for corporate launch | Closed path is correct |
| Minors / age policy | Academy activation dependency | Do not invent threshold |
| Admissions notification inbox | Academy activation | Separate from lead inbox |

---

## H. Content / brand

| Item | Status | Notes |
| --- | --- | --- |
| Licensed Eurostile webfonts | POST-LAUNCH / content | Fallback Arial active — not official typography complete |
| Founder photo / TODO_ASSET visuals | POST-LAUNCH content | Not fabricated |
| Site Settings contact fields | POST-LAUNCH / MANUAL | Omit gracefully when empty |
| Interim legal pages | INTERIM — LEGAL REVIEW REQUIRED | Remain noindex |

---

## I. Quality gates (engineering)

| Item | Status |
| --- | --- |
| typecheck / lint / unit tests / build | Run before merge |
| Playwright smoke + axe sampling | `npm run test:e2e` |
| Vitest isolated from `.env.local` Sanity leakage | PASS (setup file) |

---

## J. Operational ownership (roles)

Assign real people later — placeholders only:

| Area | Owner role |
| --- | --- |
| Business lead inbox / review | Commercial owner |
| Failed notification recovery | Technical operator |
| Academy admissions (when activated) | Admissions owner |
| Sanity publishing | Editorial owner |
| Domain / DNS / Vercel | Technical operator |
| Supabase / Resend / Turnstile | Technical operator |
| Search Console / GA4 / GTM | Growth / technical operator |

---

## K. Recovery procedure (failed email)

When DB row exists and `notification_sent_at` is null:

```bash
# List (emails masked)
npm run ops:recover-notifications -- list
npm run ops:recover-notifications -- list --academy

# Recover one
npm run ops:recover-notifications -- recover --lead <uuid>

# Dry run
OPS_RECOVERY_DRY_RUN=true npm run ops:recover-notifications -- recover-all --leads
```

Uses claim → send → clear-on-failure. Does not duplicate records.

---

## L. Google Search Console — owner steps

1. Open Search Console for `https://www.promptstacktechnologies.com`  
2. Verify ownership (DNS or meta — `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` supported)  
3. Submit sitemap: `https://www.promptstacktechnologies.com/sitemap.xml`  
4. Inspect homepage URL  
5. Request indexing where appropriate  
6. Monitor coverage  

Do not claim indexing merely because the sitemap exists.

---

## M. GA4 / GTM — owner steps

1. Create GA4 property + web data stream for the canonical domain  
2. Create/select GTM container  
3. Configure GA4 Configuration + conversion events via GTM (map `dataLayer` events)  
4. Set Vercel Production `NEXT_PUBLIC_GTM_ID=GTM-XXXX`  
5. Optional: `NEXT_PUBLIC_GA_MEASUREMENT_ID` for documentation only (not dual-loaded)  
6. Redeploy  
7. Accept analytics on site → Tag Assistant / GA4 DebugView  
8. Publish GTM container  

Until IDs are supplied and verified, analytics remains correctly dormant.

---

## N. Final decision (engineering view)

See Epic 12 report section AQ. Engineering cannot mark **READY FOR LAUNCH** while:

- production WAF for Start a Project is unverified  
- production env URL still http (until redeploy with fix + env correction)  
- production transactional smoke test not owner-approved  
- Epic 11/12 routes not yet on the live deployment (`/company/about` was 404 on audit)

Legal interim pages are not corporate launch blockers if they remain noindex and linked.
