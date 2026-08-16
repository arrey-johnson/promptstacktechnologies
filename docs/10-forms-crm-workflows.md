# 10 — Forms and Operational Workflows

## Business inquiry

Route:
`/start-a-project`

Purpose:
qualify a serious prospect without requiring technical expertise.

### Fields

Required:
- Full Name
- Work Email
- Phone / WhatsApp
- Company
- What do you need help with?
- What problem are you trying to solve?
- Project description
- Desired timeline
- Privacy acknowledgement

Optional initially:
- Budget range
- How did you hear about us?

Help-area options:
- Software
- AI & Automation
- Digital Marketing
- Website / Digital Platform
- Not Sure Yet

Timeline:
- Immediately
- Within 1 month
- 1–3 months
- 3+ months
- Exploring

### Success behavior

Persist first, then notify.

Redirect/display:
`/project-request-received`

Do not promise an exact response time unless Promptstack operations formally commit to it.

## Lead state model

- NEW
- REVIEWED
- QUALIFIED
- UNQUALIFIED
- DISCOVERY_SCHEDULED
- PROPOSAL
- WON
- LOST

A lead should never disappear because an email notification failed.

## Academy application

Route:
`/academy/apply`

Required:
- Full name
- Email
- Phone / WhatsApp
- City
- Program
- Current education/occupation
- Experience level
- Why do you want to learn this skill?
- What do you hope to achieve?
- privacy acknowledgement

Context-dependent:
- cohort

State model:
- SUBMITTED
- UNDER_REVIEW
- ADMITTED
- NOT_ADMITTED
- PAYMENT_PENDING
- ENROLLED
- ONBOARDED

## Anti-spam

Use Cloudflare Turnstile.

Rules:
- client widget generates a token;
- server validates with Siteverify;
- reject invalid/expired/replayed tokens;
- never treat client-side widget state as sufficient.

Also implement:
- rate limiting;
- input length constraints;
- normalization;
- server schema validation;
- log abuse without storing unnecessary personal data.

## Notifications

Business:
notify designated lead owner.

Academy:
notify designated admissions owner.

The owners must be operationally assigned before launch.

## Future CRM

The database schema should allow later integration with a CRM or internal Promptstack system.

Do not overbuild a complete CRM into v1 unless separately approved.
