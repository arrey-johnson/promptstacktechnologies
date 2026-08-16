# Technical Reference Notes — Verified August 2026

These notes exist so Cursor does not make old-version assumptions.

## Next.js

Next.js 16 is the selected major line.

In July 2026, the Next.js project identified 16.2.11 as an Active LTS security release. Use a current secure 16.x Active LTS patch at implementation time, never an older known-vulnerable patch.

Next.js 16 defaults include:
- App Router in create-next-app defaults;
- TypeScript-first setup;
- Tailwind support;
- Turbopack;
- minimum Node.js 20.9.

## Sanity

Sanity provides an official Next.js integration, including App Router workflows, typed queries, draft mode, and visual editing/preview capabilities.

## Supabase

Supabase provides an official Next.js quickstart and is the chosen managed PostgreSQL platform for transactional records.

## Cloudflare Turnstile

Turnstile can be used independently of Cloudflare hosting.

Server-side Siteverify validation is mandatory. Client-side completion alone does not protect a form.

## Legal

Cameroon Law No. 2024/017 of 23 December 2024 relates to personal data protection in Cameroon.

Legal implementation decisions must receive qualified legal review.
