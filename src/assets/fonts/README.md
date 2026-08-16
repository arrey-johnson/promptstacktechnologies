# Eurostile webfonts

**TODO_ASSET:** Licensed Eurostile webfont files are not included in this repository.

Place owner-supplied, properly licensed files here when available. Suggested names:

```text
src/assets/fonts/
  Eurostile-Regular.woff2
  Eurostile-Medium.woff2
  Eurostile-Bold.woff2
  EurostileExtended-Bold.woff2   # optional, if licensed/available
```

Then enable `next/font/local` in `src/lib/fonts.ts` as documented in that file.

Rules:
- Do not download Eurostile from unofficial websites.
- Do not commit unlicensed font files.
- Do not fabricate placeholder binary font files.

Until licensed files are supplied, the site uses the documented development fallback:
`Eurostile, Arial, sans-serif`.
