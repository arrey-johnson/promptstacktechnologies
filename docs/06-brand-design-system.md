# 06 — Brand and Design System

## Official brand assets

The owner has:
- official Promptstack Technologies logo;
- official logo icon.

Never:
- redraw;
- recolor;
- rotate;
- distort;
- regenerate;
- replace.

The official logo should remain a provided asset.

## Typography

Official brand typeface:
**Eurostile**

Use properly licensed webfont files supplied by the owner.

Do not commit or distribute unlicensed font files.

Recommended hierarchy:

### Eurostile Bold / Extended where available
- hero display;
- major headings;
- high-impact statements;
- short numbers/metrics.

### Eurostile Medium
- navigation;
- buttons;
- subheadings;
- cards;
- labels.

### Eurostile Regular
- body and supporting copy, if long-form readability testing is satisfactory.

For long articles, test Eurostile at actual mobile reading sizes. If it causes readability problems, a neutral body companion may be proposed, but must be explicitly approved before changing the single-family system.

Fallback during development:
`Eurostile, Arial, sans-serif`

## Official palette

```css
--brand-purple: #A800E6;
--brand-navy: #1B263B;
--brand-grey: #919191;
--brand-lavender: #CBAED3;
--white: #FFFFFF;
```

### Accessibility facts

White on purple `#A800E6`: about 5.52:1.

White on navy `#1B263B`: about 15.14:1.

Navy on lavender `#CBAED3`: about 7.60:1.

Grey `#919191` on white: about 3.15:1, therefore do not use this grey for normal small body text.

Purple on navy: about 2.75:1, therefore do not use small purple text on navy.

## Color roles

### Navy
Use for:
- main text;
- major headings;
- footer/dark surfaces;
- strong UI structure.

### Purple
Use for:
- primary CTA;
- active states;
- focused accents;
- important links/icons;
- selected highlight words;
- small graphical details.

Do not make the whole website purple.

### Lavender
Use for:
- soft surfaces;
- Academy emphasis;
- decorative planes;
- subtle supporting components.

### Grey
Use for:
- metadata;
- disabled/tertiary UI where accessible;
- non-critical large decorative text;
- separators.

## Derived functional tokens

Use transparent/derived versions before inventing new brand colors.

Example:

```css
--surface-primary: #FFFFFF;
--surface-soft: rgba(203, 174, 211, 0.16);
--surface-muted: rgba(27, 38, 59, 0.035);
--surface-dark: #1B263B;

--text-primary: #1B263B;
--text-secondary: rgba(27, 38, 59, 0.72);
--text-inverse: #FFFFFF;

--border-soft: rgba(27, 38, 59, 0.12);
--border-strong: rgba(27, 38, 59, 0.25);

--accent: #A800E6;
--accent-soft: #CBAED3;
```

If a darker hover purple is required, create a derived interaction token and document it as functional, not official brand identity.

## Visual proportion

Working page ratio:
- 65–75% white/off-white;
- 15–20% navy/dark moments;
- 5–10% purple;
- 5–10% lavender/neutral accents.

Not a rigid rule; use as discipline.

## Layout

Working grid:
- desktop: 12 columns;
- tablet: 8 columns;
- mobile: 4 columns.

Container:
approximately 1200–1280px max content width.

Spacing:
8px base scale.

Suggested spacing tokens:
`4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120, 160`.

Do not use arbitrary values everywhere.

## Radius

Controlled:
- buttons: ~8px
- fields: ~8px
- small cards: ~10–12px
- large visual containers: ~14–18px

Avoid giant `32px+` rounding on every component.

## Buttons

### Primary
Purple background, white text.

### Secondary
White/transparent, navy text, navy/soft border.

### Text action
No container; navy or purple based on context.

Do not turn every link into a pill.

## Photography

Priority:
1. real Promptstack photography;
2. high-quality authentic African business/learning imagery where necessary;
3. product/interface imagery;
4. abstract technology only as a supporting layer.

Prefer:
- Black/African professionals;
- business meetings;
- real operations;
- Academy learners;
- instructors;
- project collaboration;
- actual software/product screens.

Do not cover every photo with purple overlays.

## Graphic language

The Promptstack icon includes overlapping planes and geometric depth.

The website may abstract this idea into:
- subtle layered planes behind screenshots;
- controlled geometric background accents;
- section transitions.

Do not repeat the logo itself as a decorative pattern everywhere.

## Section rhythm

Avoid:
`card grid → card grid → card grid → card grid`.

Use a mix of:
- editorial split layouts;
- full-width typography;
- interface showcases;
- project imagery;
- process strips;
- real photography;
- restrained cards.

## Academy visual differentiation

Same brand, different emphasis.

Corporate:
white + navy + purple.

Academy:
white + navy + a slightly stronger use of lavender + purple.

Do not create a separate unrelated Academy brand.
