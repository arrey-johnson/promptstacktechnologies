"use server";

import { redirect } from "next/navigation";
import { getProjectRequestReceivedPath } from "@/lib/leads/confirmation";
import {
  submitProjectInquiry,
  type SubmitProjectInquiryResult,
} from "@/lib/leads/submit-project-inquiry";

export type ProjectInquiryActionState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
  values?: Record<string, string>;
};

function preserveValues(formData: FormData): Record<string, string> {
  const keys = [
    "submissionId",
    "fullName",
    "workEmail",
    "phone",
    "company",
    "helpArea",
    "businessProblem",
    "projectDescription",
    "timeline",
    "budgetRange",
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

export async function submitProjectInquiryAction(
  _previous: ProjectInquiryActionState,
  formData: FormData,
): Promise<ProjectInquiryActionState> {
  const result: SubmitProjectInquiryResult =
    await submitProjectInquiry(formData);

  if (result.ok) {
    // Do not expose internal lead UUID in the confirmation URL.
    redirect(getProjectRequestReceivedPath());
  }

  return {
    status: "error",
    message: result.message,
    fieldErrors: result.fieldErrors,
    values: preserveValues(formData),
  };
}
