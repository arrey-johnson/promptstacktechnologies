# Epic 8 — Academy application operations

Distinguishes **implemented in code** from **required external production configuration**.

Academy admissions production readiness is **FALSE** until every external item below is confirmed — including explicit enablement.

## Implemented in code

- `/academy/apply` and `/academy/application-received`
- Feature flag via `ACADEMY_APPLICATIONS_ENABLED` (default closed)
- Polished unavailable state when applications are closed
- Zod validation + program enum whitelist + query preselection sanitization
- Turnstile action `academy_application` (separate from `project_inquiry`)
- Submission idempotency via `submission_id`
- Atomic create RPC `create_academy_application_with_history`
- Notification claim via `notification_sent_at`
- Separate admissions notification recipient env
- Confirmation URL without internal UUID
- Apply CTAs gated through `getAcademyApplyHref` / footer helper

## Required external production configuration

| Requirement | Notes |
| --- | --- |
| `ACADEMY_APPLICATIONS_ENABLED=true` | Explicit operational enablement |
| Supabase + academy migration applied | `20260811090000_academy_applications.sql` |
| Turnstile production keys + allowed hostnames | Shared Turnstile config; action differs |
| **Vercel WAF POST rule for `/academy/apply`** | Separate from Start a Project rule |
| Resend + verified sender | Shared email provider OK |
| `ACADEMY_APPLICATION_NOTIFICATION_EMAIL` | Separate from `LEAD_NOTIFICATION_EMAIL` |
| Legally approved Privacy Policy | Shared legal dependency |
| Admissions ownership process | Who reviews SUBMITTED applications |
| Optional: age/minors policy if required | Do not invent; legal input needed |

## Production rate limiting (Vercel)

Add a WAF/Firewall rate-limit rule for Academy applications:

1. Path: `/academy/apply` (and/or server-action POST for that route)
2. Method: `POST` only
3. Do not rate-limit normal GET page views
4. Keep a conservative threshold (similar to business inquiry backstop)

Until confirmed, Academy abuse protection is incomplete even with Turnstile live.

## Enablement checklist

1. Migration applied
2. Env secrets configured
3. Notification recipient assigned
4. WAF rule live
5. Set `ACADEMY_APPLICATIONS_ENABLED=true`
6. Verify Apply CTAs appear on Academy pages + footer
7. Submit a test application end-to-end
