import { z } from "zod";
import {
  ACADEMY_APPLY_PROGRAM_SLUGS,
  type AcademyApplyProgramSlug,
} from "@/config/academy";

export const ACADEMY_PROGRAM_SLUGS = ACADEMY_APPLY_PROGRAM_SLUGS;

export const ACADEMY_PROGRAM_LABELS: Record<
  AcademyApplyProgramSlug,
  string
> = {
  "software-engineering": "Software Engineering",
  "artificial-intelligence": "Artificial Intelligence",
  cybersecurity: "Cybersecurity",
};

export const EXPERIENCE_LEVELS = [
  "complete-beginner",
  "some-basic-experience",
  "built-practiced-before",
  "studying-or-working-in-field",
] as const;

export const EXPERIENCE_LEVEL_LABELS: Record<
  (typeof EXPERIENCE_LEVELS)[number],
  string
> = {
  "complete-beginner": "Complete beginner",
  "some-basic-experience": "Some basic experience",
  "built-practiced-before": "Have built/practiced before",
  "studying-or-working-in-field": "Currently studying or working in the field",
};

export const ACADEMY_APPLICATION_STATUSES = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "ADMITTED",
  "NOT_ADMITTED",
  "PAYMENT_PENDING",
  "ENROLLED",
  "ONBOARDED",
] as const;

export type AcademyApplicationStatus =
  (typeof ACADEMY_APPLICATION_STATUSES)[number];

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

export const academyApplicationFormSchema = z.object({
  submissionId: uuidSchema,
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email is too long.")
    .transform((value) => value.toLowerCase()),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a phone or WhatsApp number.")
    .max(40, "Phone number is too long.")
    .regex(/^[\d+\-\s().]+$/, "Enter a valid phone or WhatsApp number."),
  city: z
    .string()
    .trim()
    .min(2, "Enter your city.")
    .max(120, "City is too long."),
  programSlug: z.enum(ACADEMY_PROGRAM_SLUGS, {
    error: "Select a program.",
  }),
  currentOccupationEducation: z
    .string()
    .trim()
    .min(2, "Tell us about your current education or occupation.")
    .max(240, "That answer is too long."),
  experienceLevel: z.enum(EXPERIENCE_LEVELS, {
    error: "Select your experience level.",
  }),
  motivation: z
    .string()
    .trim()
    .min(20, "Please share a little more about why you want to learn this skill.")
    .max(4000, "That answer is too long."),
  desiredOutcome: z
    .string()
    .trim()
    .min(20, "Please share a little more about what you hope to achieve.")
    .max(4000, "That answer is too long."),
  cohort: optionalText(160),
  referralSource: optionalText(240),
  privacyAcknowledged: z.literal(true, {
    error: "Privacy acknowledgement is required.",
  }),
  turnstileToken: z
    .string()
    .trim()
    .min(1, "Please complete the security check."),
  utmSource: optionalText(200),
  utmMedium: optionalText(200),
  utmCampaign: optionalText(200),
  utmContent: optionalText(200),
  utmTerm: optionalText(200),
  landingPage: optionalText(500),
  website: z
    .string()
    .optional()
    .transform((value) => value ?? "")
    .refine((value) => value.length === 0, {
      message: "Unable to submit this application.",
    }),
});

export type AcademyApplicationFormInput = z.input<
  typeof academyApplicationFormSchema
>;
export type AcademyApplicationFormValues = z.output<
  typeof academyApplicationFormSchema
>;

export type NormalizedAcademyApplication = {
  submissionId: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  programSlug: AcademyApplyProgramSlug;
  currentOccupationEducation: string;
  experienceLevel: (typeof EXPERIENCE_LEVELS)[number];
  motivation: string;
  desiredOutcome: string;
  cohort?: string;
  referralSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPage?: string;
  privacyAcknowledgedAt: string;
};

export function normalizeAcademyApplication(
  values: AcademyApplicationFormValues,
): NormalizedAcademyApplication {
  return {
    submissionId: values.submissionId,
    fullName: values.fullName,
    email: values.email,
    phone: values.phone.replace(/\s+/g, " ").trim(),
    city: values.city,
    programSlug: values.programSlug,
    currentOccupationEducation: values.currentOccupationEducation,
    experienceLevel: values.experienceLevel,
    motivation: values.motivation,
    desiredOutcome: values.desiredOutcome,
    cohort: values.cohort,
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

export function formDataToAcademyApplicationInput(
  formData: FormData,
): Record<string, unknown> {
  const get = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };

  return {
    submissionId: get("submissionId"),
    fullName: get("fullName"),
    email: get("email"),
    phone: get("phone"),
    city: get("city"),
    programSlug: get("programSlug"),
    currentOccupationEducation: get("currentOccupationEducation"),
    experienceLevel: get("experienceLevel"),
    motivation: get("motivation"),
    desiredOutcome: get("desiredOutcome"),
    cohort: get("cohort"),
    referralSource: get("referralSource"),
    privacyAcknowledged:
      formData.get("privacyAcknowledged") === "on" ||
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
