# 09 — CMS and Data Model

## Sanity document types

### Project / CaseStudy

Fields:
- `_id`
- `title`
- `slug`
- `contentType`: client-case-study | project | internal | academy
- `clientName` optional
- `clientPermissionConfirmed` boolean/internal editorial control
- `industry`
- `category`: software | ai-automation | digital-marketing | multi-disciplinary
- `heroImage`
- `heroImageAlt`
- `summary`
- `businessProblem`
- `whyItMattered`
- `approach`
- `solution`
- `implementation`
- `outcome`
- `outcomeMetrics[]` only verified
- `services[]`
- `technologies[]`
- `gallery[]`
- `testimonial` optional reference
- `completedAt` optional
- `featured`
- `seo`
- `relatedProjects[]`

Editorial rule:
Do not publish a client identity or sensitive project detail without permission.

### Insight

- title
- slug
- excerpt
- category
- author
- heroImage
- heroAlt
- body
- publishedAt
- updatedAt optional
- featured
- relatedSolutions[]
- relatedPrograms[]
- relatedInsights[]
- seo

### AcademyProgram

- title
- slug
- status: active | upcoming | paused | archived
- shortPromise
- overview
- audience
- level
- prerequisites
- outcomes[]
- learningRoadmap[]
- technologies[]
- projects[]
- teachingMethod
- format
- duration
- scheduleText
- feeText
- cohortText
- applicationOpen
- featured
- faq[]
- seo

Do not fabricate fee/schedule/cohort values.

### TeamMember

- name
- role
- image
- alt
- shortBio
- expertise[]
- linkedIn
- order
- active

### Testimonial

- person
- role
- organization
- quote
- relatedProject
- permissionConfirmed
- featured

### SiteSettings

- businessEmail
- phone
- whatsapp
- address
- socialLinks
- globalAnnouncement optional
- defaultOgImage
- organizationLegalName
- organizationShortDescription

Only verified values.

## PostgreSQL — business leads

Table: `business_leads`

Suggested fields:
- `id uuid`
- `created_at timestamptz`
- `updated_at timestamptz`
- `status`
- `full_name`
- `work_email`
- `phone`
- `company`
- `help_area`
- `business_problem`
- `project_description`
- `timeline`
- `budget_range nullable`
- `referral_source nullable`
- `utm_source nullable`
- `utm_medium nullable`
- `utm_campaign nullable`
- `utm_content nullable`
- `utm_term nullable`
- `landing_page nullable`
- `privacy_acknowledged_at`
- `assigned_to nullable`
- `internal_notes nullable` or preferably separate notes table
- `last_contacted_at nullable`

Do not store raw Turnstile tokens after validation.

### Lead status history

`business_lead_status_history`
- id
- lead_id
- previous_status
- new_status
- changed_at
- changed_by nullable
- note nullable

## PostgreSQL — Academy applications

Table: `academy_applications`

- `id uuid`
- `created_at`
- `updated_at`
- `status`
- `full_name`
- `email`
- `phone`
- `city`
- `program_slug`
- `current_occupation_education`
- `experience_level`
- `motivation`
- `desired_outcome`
- `cohort nullable`
- attribution fields
- `privacy_acknowledged_at`
- assigned/review fields as needed

### Application status history

Same pattern as lead history.

## Data rules

- transactional tables are not public-readable;
- use least-privilege database access;
- access from trusted server code;
- maintain audit fields;
- define retention policy before launch;
- do not copy production personal data into development environments.
