# 07 — UX, Responsive, and Interaction Specification

## Global principle

Sophistication should come from clarity, hierarchy, spacing, content, and execution — not visual gimmicks.

## Header

Desktop:
- ~80px;
- sticky;
- light background;
- full horizontal nav;
- visible CTA;
- Solutions mega-menu;
- Company dropdown.

Scroll behavior:
- optional subtle border/shadow;
- no dramatic shrinking;
- no transforming into a floating pill unless explicitly approved.

Mobile/tablet:
- logo + menu control;
- full-height or large drawer;
- expandable Solutions/Company;
- `Start a Project` easy to reach;
- do not reproduce the desktop mega-menu as a tiny panel.

## Hero

Desktop:
approximately 55% message / 45% visual.

Mobile:
- message first;
- CTA early;
- visual follows without making the user scroll excessively to understand the company.

No interaction is required to reveal the core message.

## Problem section

Prefer editorial numbered items or a refined two-column layout.

Cards may have subtle hover, but hover cannot expose required information.

## Solutions

Prefer large modules:
- Software;
- AI & Automation;
- Digital Marketing.

Use alternating composition or another premium layout rather than three cramped equal cards.

Each module communicates:
1. outcome;
2. explanation;
3. supporting capabilities;
4. CTA;
5. relevant visual.

## Outcomes

Prefer large typographic treatment instead of another card wall.

## Work

Recommended:
- one featured project;
- two supporting projects when enough real work exists.

If only one or two real projects exist, design honestly around that amount of proof rather than inventing density.

## How We Work

Desktop:
horizontal sequence is acceptable.

Mobile:
vertical sequence.

If using interactive stage details, all content must remain keyboard accessible.

## Motion

Use motion for:
- menu transitions;
- section reveals;
- project image transitions;
- process progression;
- subtle graphic movement.

General timing:
- micro interactions: ~150–250ms;
- larger transitions: ~300–500ms.

Avoid:
- continuous bobbing text;
- scroll hijacking;
- excessive parallax;
- cursor gimmicks;
- long page loaders.

Respect `prefers-reduced-motion`.

## Forms

Prioritize mobile completion.

Requirements:
- clear labels, not placeholder-only;
- appropriate mobile keyboard/input modes;
- field-level validation;
- submit state;
- server error state;
- retry;
- accessible error summary where useful;
- success confirmation;
- preserve entered data on recoverable errors.

Do not use a multi-step wizard unless testing shows it reduces friction. A clear single-page grouped form may be better for the first version.

## Content widths

Do not stretch paragraphs across the full 1280px container.

Keep long-form text at a comfortable reading measure.

## Breakpoints

Use content-driven breakpoints rather than device-name assumptions.

The design must be intentionally reviewed at:
- small mobile;
- normal mobile;
- large mobile/small tablet;
- tablet;
- laptop;
- desktop;
- wide desktop.

## Touch targets

Ensure interactive controls are comfortably tappable.

## Focus

All interactive elements must have visible, brand-consistent keyboard focus states.

## Empty/loading/error states

Design them intentionally.

CMS pages:
- use skeleton only where it helps;
- static/ISR content should normally arrive without unnecessary client loading.

Forms:
- user-friendly validation and persistence.

Images:
- provide meaningful alt text for informative imagery;
- decorative imagery uses empty alt.
