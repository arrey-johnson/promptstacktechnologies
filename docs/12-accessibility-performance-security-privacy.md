# 12 — Accessibility, Performance, Security, and Privacy

## Accessibility

Target:
WCAG 2.2 AA.

Requirements:
- semantic HTML;
- meaningful page landmarks;
- keyboard-accessible menus;
- visible focus;
- sufficient contrast;
- form labels;
- accessible validation;
- skip link;
- useful alt text;
- decorative images ignored appropriately;
- reduced motion support;
- touch-friendly controls;
- no essential hover-only behavior.

Brand-specific:
- do not use `#919191` as normal small text on white;
- navy and white are strong primary contrast pair;
- purple CTA with white text is acceptable;
- avoid small purple text on navy.

## Performance

Core Web Vitals targets:
- LCP <= 2.5 seconds
- INP <= 200 ms
- CLS <= 0.1

Internal Lighthouse performance target:
>= 90 on representative production pages.

Performance strategy:
- server components;
- low JS;
- responsive images;
- image compression;
- lazy-load below-fold imagery;
- avoid heavy autoplay video;
- limit font files/weights;
- cache editorial content;
- no needless hydration;
- CSS-first effects.

Mobile/network performance is a first-class requirement for the Cameroonian market.

## Security

- security headers;
- CSP appropriate to dependencies;
- no secrets in client code;
- no sensitive data in logs;
- dependency review;
- input validation;
- rate limiting;
- Turnstile server verification;
- secure database policies;
- least privilege;
- separate dev/staging/production credentials;
- staging noindex;
- avoid production PII in development.

## Privacy

Cameroon has Law No. 2024/017 of 23 December 2024 relating to personal data protection.

This implementation collects personal data through:
- business inquiry;
- Academy application;
- analytics/marketing technologies as configured.

Before production, document:
- exact categories collected;
- purpose;
- lawful/appropriate processing basis as advised;
- processors/vendors;
- retention;
- access;
- deletion/request workflow;
- cookies/tracking;
- cross-border processing where relevant.

The public Privacy Policy must describe the actual implementation.

Do not copy a generic policy and assume compliance.

Obtain qualified Cameroonian legal review before production publication of legal/privacy documents.

## Data minimization

Only collect fields needed for:
- lead qualification;
- application review;
- attribution/measurement.

Do not add sensitive personal-data questions without a clear need and legal review.
