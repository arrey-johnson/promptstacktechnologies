# AGENTS.md — Promptstack Website

Before editing code, read:

- `CURSOR_MASTER_CONTEXT.md`
- `PROJECT_DECISIONS.md`
- `.cursor/rules/*`

The repository is for Promptstack Technologies' production public website.

## Agent behavior

- Preserve the approved IA, copy hierarchy, brand system, and design direction.
- Build reusable, typed, accessible components.
- Prefer server components.
- Keep client JavaScript low.
- Do not invent client proof or company facts.
- Do not generate or alter official logo assets.
- Do not add font files; expect licensed Eurostile webfont assets to be supplied separately.
- Do not replace the custom visual system with a default UI kit look.
- Do not add unrequested features.
- Ensure all critical user flows work on mobile.
- When implementing forms, persist to the transactional database, validate server-side, validate Turnstile server-side, and provide explicit success/error states.
- Use real content from the specification rather than lorem ipsum where approved copy exists.
- Mark missing factual content with `TODO_CONTENT:` comments or structured placeholders that cannot be mistaken for production claims.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
