"use server";

import { redirect } from "next/navigation";
import { getAcademyApplicationReceivedPath } from "@/lib/academy/confirmation";
import {
  submitAcademyApplication,
  type SubmitAcademyApplicationResult,
} from "@/lib/academy/submit-application";

export type AcademyApplicationActionState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
  values?: Record<string, string>;
};

function preserveValues(formData: FormData): Record<string, string> {
  const keys = [
    "submissionId",
    "fullName",
    "email",
    "phone",
    "city",
    "programSlug",
    "currentOccupationEducation",
    "experienceLevel",
    "motivation",
    "desiredOutcome",
    "referralSource",
  ] as const;

  const values: Record<string, string> = {};
  for (const key of keys) {
    const value = formData.get(key);
    if (typeof value === "string") {
      values[key] = value;
    }
  }
  return values;
}

export async function submitAcademyApplicationAction(
  _previous: AcademyApplicationActionState,
  formData: FormData,
): Promise<AcademyApplicationActionState> {
  const result: SubmitAcademyApplicationResult =
    await submitAcademyApplication(formData);

  if (result.ok) {
    redirect(getAcademyApplicationReceivedPath());
  }

  return {
    status: "error",
    message: result.message,
    fieldErrors: result.fieldErrors,
    values: preserveValues(formData),
  };
}
