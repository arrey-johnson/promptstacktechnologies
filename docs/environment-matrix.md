# Environment matrix — Promptstack Technologies

Status values reflect **code expectations**. Production values must be confirmed in Vercel without pasting secrets into tickets.

| Variable | Purpose | Public? | Local | Preview | Production | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin | Public | Required (`http://localhost:3000`) | Required (preview URL or noindex host) | **Required** `https://www.promptstacktechnologies.com` | Code normalizes Promptstack hosts to https www |
| `SITE_ENV` | Indexing override | Server | Optional | Optional (`preview`) | Optional (`production`) | Prefer `VERCEL_ENV` on Vercel |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project | Public | If using CMS | If using CMS | Required for CMS | |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset | Public | Usually `production` | Usually `production` | `production` | |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version | Public | Optional | Optional | Optional | Default in code |
| `SANITY_API_READ_TOKEN` | Draft/Presentation | Server | Required for preview | Required for preview | Required for preview | Viewer |
| `SANITY_PREVIEW_SECRET` | Draft Mode | Server | Required for preview | Required | Required for preview | |
| `SANITY_REVALIDATE_SECRET` | Webhook HMAC | Server | For webhook tests | Recommended | **Required** for publish refresh | Never `NEXT_PUBLIC_` |
| `SANITY_API_WRITE_TOKEN` | Migrations only | Server | Scripts only | **Must not** be runtime | **Must not** be runtime | |
| `ACADEMY_CONTENT_SOURCE` | `local` \| `sanity` | Server | Optional | Optional | `sanity` when live | Not admissions |
| `ACADEMY_APPLICATIONS_ENABLED` | Admissions gate | Server | `false` default | `false` | `false` until activation | |
| `INSIGHTS_DEV_FIXTURES` | Local fixtures | Server | Optional local | **Must be false/absent** | **Must be absent/false** | |
| `SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_URL` | DB | Mixed | Optional (file adapter) | If testing forms | **Required** for leads | Service role never public |
| `SUPABASE_SERVICE_ROLE_KEY` | Privileged DB | Server | Optional local | If testing | **Required** | |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Widget | Public | Test keys OK | Test/real | **Required** real | |
| `TURNSTILE_SECRET_KEY` | Siteverify | Server | Test keys OK | Required if forms | **Required** | |
| `TURNSTILE_ALLOWED_HOSTNAMES` | Hostname check | Server | Optional local | Recommended | **Required** | www + apex if used |
| `RESEND_API_KEY` | Email | Server | Optional | If testing | **Required** for notifications | |
| `EMAIL_FROM_ADDRESS` | Verified sender | Server | Optional | If testing | **Required** | |
| `LEAD_NOTIFICATION_EMAIL` | Lead inbox | Server | Optional | Safe inbox | **Required** real owner | |
| `ACADEMY_APPLICATION_NOTIFICATION_EMAIL` | Admissions inbox | Server | Optional | Optional | Required before activation | |
| `NEXT_PUBLIC_GTM_ID` | GTM container | Public | Optional | Optional | Optional until analytics live | Absent = disabled |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Docs only | Public | Optional | Optional | Optional | Not dual-loaded |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | GSC meta | Public | Optional | Optional | Optional if DNS used | |

Never commit secret values. Report only configured / missing / invalid.
