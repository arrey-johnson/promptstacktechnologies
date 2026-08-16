# Epic 6 — Local testing notes

See also: `docs/epic-6-operations.md` for production vs implemented-in-code distinctions.

## Development without production secrets

When deployment environment resolves to `development`:

- Missing Supabase credentials → leads persist to `.data/business-leads.json`
- Missing Turnstile credentials → form uses documented bypass token `dev-turnstile-bypass`
- Prefer Cloudflare official test keys when validating Siteverify
- Missing Resend / notification email → lead still succeeds; notification is skipped and logged

`.data/` is gitignored.

Custom bypass is impossible in production, Vercel preview, and staging.

## Production fail-closed rules

- Missing Turnstile secret → submission rejected
- Missing `TURNSTILE_ALLOWED_HOSTNAMES` in production → submission rejected
- Missing Supabase credentials → submission rejected (`not_configured`)
- Notification failure after successful persist → user still sees success
- Platform WAF rate-limit rule is still required (app in-memory limiter is only a backstop)

## Manual test matrix

1. Empty submit → field errors
2. Malformed email → email error
3. Missing privacy acknowledgement → privacy error
4. Valid local submission → redirect to `/project-request-received` (no internal id in URL)
5. Resubmit same attempt (`submissionId`) → success without duplicate lead/email
6. Double click → submit disabled while pending + server idempotency
7. Turnstile invalid (with secret configured) → security error
8. Browser back from confirmation → form page (new attempt id after full reload)

## Apply database migrations

1. `supabase/migrations/20260807220000_business_leads.sql`
2. `supabase/migrations/20260808010000_business_leads_idempotency.sql`
