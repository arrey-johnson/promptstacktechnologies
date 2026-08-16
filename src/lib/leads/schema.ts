import { z } from "zod";

export const HELP_AREAS = [
  "software",
  "ai-automation",
  "digital-marketing",
  "website-digital-platform",
  "not-sure-yet",
] as const;

export const HELP_AREA_LABELS: Record<(typeof HELP_AREAS)[number], string> = {
  software: "Software",
  "ai-automation": "AI & Automation",
  "digital-marketing": "Digital Marketing",
  "website-digital-platform": "Website / Digital Platform",
  "not-sure-yet": "Not Sure Yet",
};

export const TIMELINES = [
  "immediately",
  "within-1-month",
  "1-3-months",
  "3-plus-months",
  "exploring",
] as const;

export const TIMELINE_LABELS: Record<(typeof TIMELINES)[number], string> = {
  immediately: "Immediately",
  "within-1-month": "Within 1 month",
  "1-3-months": "1–3 months",
  "3-plus-months": "3+ months",
  exploring: "Exploring",
};

export const BUDGET_RANGES = [
  "still-determining",
  "prefer-to-discuss",
  "other",
] as const;

export const BUDGET_RANGE_LABELS: Record<
  (typeof BUDGET_RANGES)[number],
  string
> = {
  "still-determining": "I am still determining the budget",
  "prefer-to-discuss": "I prefer to discuss it",
  other: "Other / provide context",
};

export const LEAD_STATUSES = [
  "NEW",
  "REVIEWED",
  "QUALIFIED",
  "UNQUALIFIED",
  "DISCOVERY_SCHEDULED",
  "PROPOSAL",
  "WON",
  "LOST",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined));

const uuidSchema = z
  .string()
  .trim()
  .uuid("Invalid submission identifier.");

export const projectInquiryFormSchema = z.object({
  /** Client-generated form-attempt UUID. Not a secret. Used for idempotency. */
  submissionId: uuidSchema,
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "Name is too long."),
  workEmail: z
    .string()
    .trim()
    .email("Enter a valid work email address.")
    .max(254, "Email is too long.")
    .transform((value) => value.toLowerCase()),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a phone or WhatsApp number.")
    .max(40, "Phone number is too long.")
    .regex(/^[\d+\-\s().]+$/, "Enter a valid phone or WhatsApp number."),
  company: z
    .string()
    .trim()
    .min(2, "Enter your company name.")
    .max(160, "Company name is too long."),
  helpArea: z.enum(HELP_AREAS, {
    error: "Select what you need help with.",
  }),
  businessProblem: z
    .string()
    .trim()
    .min(20, "Please describe the problem in a little more detail.")
    .max(4000, "Problem description is too long."),
  projectDescription: z
    .string()
    .trim()
    .min(20, "Please add a bit more detail about the project.")
    .max(8000, "Project description is too long."),
  timeline: z.enum(TIMELINES, {
    error: "Select a desired timeline.",
  }),
  budgetRange: z
    .union([z.enum(BUDGET_RANGES), z.literal("")])
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
  referralSource: optionalText(240),
  privacyAcknowledged: z.literal(true, {
    error: "Privacy acknowledgement is required.",
  }),
  turnstileToken: z
    .string()
    .trim()
    .min(1, "Please complete the security check."),
  // Hidden attribution — never shown as required UI fields
  utmSource: optionalText(200),
  utmMedium: optionalText(200),
  utmCampaign: optionalText(200),
  utmContent: optionalText(200),
  utmTerm: optionalText(200),
  landingPage: optionalText(500),
  // Honeypot — must remain empty
  website: z
    .string()
    .optional()
    .transform((value) => value ?? "")
    .refine((value) => value.length === 0, {
      message: "Unable to submit this request.",
    }),
});

export type ProjectInquiryFormInput = z.input<typeof projectInquiryFormSchema>;
export type ProjectInquiryFormValues = z.output<typeof projectInquiryFormSchema>;

export type NormalizedBusinessLead = {
  submissionId: string;
  fullName: string;
  workEmail: string;
  phone: string;
  company: string;
  helpArea: (typeof HELP_AREAS)[number];
  businessProblem: string;
  projectDescription: string;
  timeline: (typeof TIMELINES)[number];
  budgetRange?: (typeof BUDGET_RANGES)[number];
  referralSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPage?: string;
  privacyAcknowledgedAt: string;
};

export function normalizeProjectInquiry(
  values: ProjectInquiryFormValues,
): NormalizedBusinessLead {
  return {
    submissionId: values.submissionId,
    fullName: values.fullName,
    workEmail: values.workEmail,
    phone: values.phone.replace(/\s+/g, " ").trim(),
    company: values.company,
    helpArea: values.helpArea,
    businessProblem: values.businessProblem,
    projectDescription: values.projectDescription,
    timeline: values.timeline,
    budgetRange: values.budgetRange,
    referralSource: values.referralSource,
    utmSource: values.utmSource,
    utmMedium: values.utmMedium,
    utmCampaign: values.utmCampaign,
    utmContent: values.utmContent,
    utmTerm: values.utmTerm,
    landingPage: values.landingPage,
    privacyAcknowledgedAt: new Date().toISOString(),
  };
}

export function formDataToInquiryInput(
  formData: FormData,
): Record<string, unknown> {
  const get = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };

  return {
    submissionId: get("submissionId"),
    fullName: get("fullName"),
    workEmail: get("workEmail"),
    phone: get("phone"),
    company: get("company"),
    helpArea: get("helpArea"),
    businessProblem: get("businessProblem"),
    projectDescription: get("projectDescription"),
    timeline: get("timeline"),
    budgetRange: get("budgetRange"),
    referralSource: get("referralSource"),
    privacyAcknowledged: formData.get("privacyAcknowledged") === "on" ||
      formData.get("privacyAcknowledged") === "true",
    turnstileToken: get("turnstileToken") || get("cf-turnstile-response"),
    utmSource: get("utmSource"),
    utmMedium: get("utmMedium"),
    utmCampaign: get("utmCampaign"),
    utmContent: get("utmContent"),
    utmTerm: get("utmTerm"),
    landingPage: get("landingPage"),
    website: get("website"),
  };
}
