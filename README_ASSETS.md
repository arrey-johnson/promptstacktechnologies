# Asset Integration Instructions

## Logo

Add official owner-supplied files under a structure such as:

```text
public/brand/
  promptstack-logo.svg
  promptstack-icon.svg
  promptstack-logo-white.svg   # only if an official white variant exists
```

Do not recreate a white variant programmatically unless explicitly approved.

## Eurostile

The font is licensed/proprietary. This package does not include it.

When the owner supplies licensed webfont files, place them under a private project-controlled asset path such as:

```text
src/assets/fonts/
```

or the repository's chosen local-font path.

Use `next/font/local`.

Do not source the font from random font-download websites.

## Images

Use:
- real Promptstack photography;
- real project screenshots;
- Academy classroom/project images;
- approved client imagery.

Do not use generic robot/AI imagery.

## Business card reference

`brand/reference-business-card.png` is for visual reference only and is not a web asset unless separately approved.
