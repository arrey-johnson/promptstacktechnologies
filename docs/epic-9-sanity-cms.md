# Epic 9 / 9A — Sanity CMS operations

Distinguishes **implemented in code** from **live-configured** CMS.

Sanity = editorial content only.  
Supabase = transactional leads / Academy applications.

**Important:** configuring a Sanity project does **not** automatically configure public publication refresh. Both are launch requirements:

1. Sanity project + read token + Studio  
2. Signed publication webhook → `/api/revalidate` + `SANITY_REVALIDATE_SECRET`

## Content source strategy

### Work / Insights / Site Settings

| Condition | Behavior |
| --- | --- |
| Sanity **not** configured | Local integrity mode: development placeholders labeled; production empty / omit |
| Sanity configured + 0 published docs | Truthful empty states (no fake proof) |
| Sanity configured + published docs | Render CMS content |

### Academy programs

| `ACADEMY_CONTENT_SOURCE` | Behavior |
| --- | --- |
| `local` (default) | Approved TypeScript program modules (Epic 7) |
| `sanity` | Published `academyProgram` documents (falls back to local if fetch empty/fails) |

Admissions CTAs remain gated by `ACADEMY_APPLICATIONS_ENABLED` only.  
There is **no** CMS `applicationOpen` field. Sanity publish/revalidate never enables applications.

## Publication refresh architecture (Epic 9A)

Promptstack intentionally does **not** mount `SanityLive` for ordinary public visitors.

| Audience | Mechanism |
| --- | --- |
| Public visitors | Cached published Sanity fetches tagged for on-demand revalidation |
| Draft Mode / Presentation | `SanityLive` + Visual Editing only while draft is enabled |

### Authoritative production publish flow

```text
SANITY PUBLISH
→ Sanity webhook (HMAC signature)
→ POST /api/revalidate (parseBody validation)
→ revalidateTag(…) for deliberate content tags
→ public pages serve updated content on next request
```

`next-sanity` v13 addresses the major Next.js 16 Live invalidation/request issue from v12, but Promptstack still uses **webhook revalidation** for deterministic public publishing and controlled request behavior.

### Cache tags

| Tag | Used by |
| --- | --- |
| `case-study` | `/work`, homepage Selected Work, Solutions related work, How We Work related work, sitemap Work entries |
| `case-study:<slug>` | `/work/[slug]` |
| `insight` | Homepage Insights preview only |
| `insight:<slug>` | Reserved for Epic 10 detail routes |
| `academy-program` | Academy indexes/cards, sitemap program entries |
| `academy-program:<slug>` | `/academy/programs/[slug]` |
| `site-settings` | Footer / verified contact / social |
| `sitemap` | CMS-derived sitemap entries (with type tags) |

### Webhook security

- Server-only `SANITY_REVALIDATE_SECRET`
- Validation via `parseBody` from `next-sanity/webhook` (HMAC signature)
- Invalid / missing signature → `401`
- Missing secret or Sanity not configured → `503` (fail closed)
- Secret never prefixed with `NEXT_PUBLIC_`

### Recommended Sanity webhook settings

- URL: `https://<production-host>/api/revalidate`
- Dataset: production (or staging dataset for staging host)
- Trigger: Create / Update / Delete on `caseStudy`, `insight`, `academyProgram`, `siteSettings`
- Projection (GROQ filter / projection) must include at least:

```groq
{
  _type,
  _id,
  "slug": slug.current
}
```

(`siteSettings` may omit slug.)

- Enable webhook secret matching `SANITY_REVALIDATE_SECRET`
- HTTP method: POST

### Failure / retry

If a webhook delivery fails:

- Cached public content remains available (stale-but-safe)
- CMS and transactional systems are not corrupted
- Start a Project / Academy applications continue independently

Operator retry:

1. Confirm Vercel logs for `/api/revalidate`
2. Confirm secret matches Sanity webhook secret
3. Re-deliver the webhook from Sanity, **or**
4. Re-publish the document in Studio (fires webhook again)
5. Optionally hit a controlled re-publish after fixing configuration

Do not expose technical webhook errors to public visitors.

## Sitemap rules (Epic 9A)

Inclusion requires **both**:

1. published legitimate content  
2. a real implemented public route  

Until Epic 10:

- **no** `/insights`  
- **no** `/insights/[slug]`  
- published Insight documents may still refresh homepage preview via the `insight` tag  

Always excluded: Studio, `/api/*`, draft/preview endpoints, confirmation routes, placeholders, drafts.

## Connected project (public identifiers)

| Field | Value |
| --- | --- |
| Organization ID | `o7H8TxLCm` |
| Project name | Promptstack Technologies |
| Project ID | `4ruih0z5` |
| Dataset | `production` (public) |
| Studio path | `/studio` |
| Manage URL | https://www.sanity.io/manage/project/4ruih0z5 |

Local development CORS origin configured: `http://localhost:3000` (credentials enabled).

Academy source remains `ACADEMY_CONTENT_SOURCE=local` until Sanity-source verification succeeds.

1. Create/connect Sanity project (owner action)
2. Set env:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION` (optional; default `2026-02-01`)
   - `SANITY_API_READ_TOKEN` (Viewer, server-only)
   - `SANITY_PREVIEW_SECRET` (Draft Mode)
   - **`SANITY_REVALIDATE_SECRET` (publication webhook — required for live public refresh)**
3. Configure CORS / preview origin for the production site URL
4. Open Studio at `/studio` and sign in
5. Migrate Academy programs if needed: `npm run sanity:migrate-academy`
6. After verification, set `ACADEMY_CONTENT_SOURCE=sanity` (optional)
7. Configure Sanity webhook → `POST /api/revalidate` with secret + projection above
8. Publish a test case study
9. Verify public refresh on `/work` (and dependent surfaces)
10. Verify Draft Mode / Presentation separately (does not replace the webhook)

## Do not put in Sanity

- business leads / Academy applications / status history
- Turnstile, Resend, Supabase secrets
- `ACADEMY_APPLICATIONS_ENABLED`
- brand colors / primary navigation architecture
