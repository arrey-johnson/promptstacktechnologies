# Epic 6 / 6A — Start a Project operations

This document distinguishes **implemented in code** from **required external production configuration**.

Production readiness for conversion is **FALSE** until every external item below is confirmed.

## Implemented in code

- `/start-a-project` and `/project-request-received`
- Zod server validation + client convenience validation
- Cloudflare Turnstile widget + Siteverify (action `project_inquiry`)
- Turnstile Siteverify `idempotency_key` aligned with form `submissionId`
- Production hostname validation via `TURNSTILE_ALLOWED_HOSTNAMES`
- Development-only custom bypass (`dev-turnstile-bypass`) gated to deployment environment `development`
- Server/database submission idempotency via `submission_id` UNIQUE
- Atomic lead + initial status-history create (`create_business_lead_with_history`)
- Notification claim (`notification_sent_at`) to prevent duplicate emails
- Database-as-system-of-record (email failure does not undo lead)
- Application in-memory rate-limit **backstop only** (not globally reliable on Vercel)
- Confirmation URL without internal lead UUID
- Interim `/privacy` page with `noindex, follow`

## Required external production configuration

| Requirement | Notes |
| --- | --- |
| Supabase URL + service role key | Server-only; never `NEXT_PUBLIC` for service role |
| Migrations applied | `20260807220000_business_leads.sql` then `20260808010000_business_leads_idempotency.sql` |
| Turnstile production site + secret keys | Real keys for production hostnames |
| `TURNSTILE_ALLOWED_HOSTNAMES` | Production fail-closed if missing/mismatch |
| **Vercel Firewall / WAF rate-limit rule** | Required — see below |
| Resend API key | Transactional email |
| Verified sender (`EMAIL_FROM_ADDRESS`) | Must be verified in Resend |
| `LEAD_NOTIFICATION_EMAIL` | Do not invent; must be a real Promptstack operator inbox |
| Legally approved Privacy Policy | Replace interim `/privacy` content; then remove interim noindex |

## Production rate limiting (Vercel)

The in-memory limiter in `src/lib/security/rate-limit.ts` is only a local/application backstop. It is **not** globally reliable across Vercel isolates.

### Required dashboard step

In the Vercel project (Firewall / WAF / Rate Limiting — product name may vary by plan):

1. Create a rate-limit rule targeting **Start a Project submissions only**.
2. Match:
   - Path: `/start-a-project` (and/or the server-action POST traffic for that route)
   - Method: `POST` only
3. Do **not** rate-limit normal `GET` page views of `/start-a-project`.
4. Choose a conservative threshold that reduces spam without blocking legitimate retries (align roughly with app backstop: on the order of a handful of POSTs per IP per 15 minutes).
5. Record the rule ID / screenshot in the launch checklist.

Until this platform rule is confirmed, treat production conversion protection as incomplete even if Turnstile is live.

Visitor IPs used by the app backstop are ephemeral bucket keys only and are **not** stored on `business_leads`.

## Turnstile local / test guidance

Preferred for Siteverify testing: Cloudflare official always-passes test keys  
(see Cloudflare Turnstile testing docs).

Custom bypass token `dev-turnstile-bypass`:

- Allowed only when deployment environment resolves to `development` and no secret is set
- Impossible in production, Vercel preview, and staging

## Idempotency behavior

- Client generates one `submissionId` UUID per form attempt
- Retries with the same id return success without creating another lead, history row, or notification
- Different project inquiries from the same person use a new `submissionId` (no email/phone dedupe)

## Privacy indexing

- Interim `/privacy` → `noindex, follow`
- Become normally indexable **only after** legal approval and production content replacement
- `/project-request-received` → `noindex, nofollow` permanently for V1
- `/start-a-project` → follows environment indexing policy (indexable in production)

## Manual test matrix

1. Empty submit → field errors  
2. Malformed email → email error  
3. Missing privacy acknowledgement → privacy error  
4. Valid local submission → redirect to `/project-request-received` (no `ref=` / UUID)  
5. Repeat submit with same `submissionId` → still success, one lead  
6. Double click → pending disables submit; server idempotency covers races  
7. Turnstile invalid → security error  
8. Production missing Turnstile/hostnames/Supabase → fail closed  
9. Notification failure after persist → user still sees confirmation  
