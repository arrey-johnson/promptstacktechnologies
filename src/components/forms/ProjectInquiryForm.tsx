"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import {
  submitProjectInquiryAction,
  type ProjectInquiryActionState,
} from "@/app/(marketing)/start-a-project/actions";
import { Button } from "@/components/ui";
import {
  BUDGET_RANGE_LABELS,
  BUDGET_RANGES,
  HELP_AREA_LABELS,
  HELP_AREAS,
  TIMELINE_LABELS,
  TIMELINES,
} from "@/lib/leads/schema";
import { AttributionFields } from "./AttributionFields";
import {
  Field,
  SelectInput,
  TextArea,
  TextInput,
  describedBy,
} from "./Field";
import { TurnstileField } from "./TurnstileField";

const initialState: ProjectInquiryActionState = { status: "idle" };

type ProjectInquiryFormProps = {
  turnstileSiteKey?: string;
};

function createSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Extremely defensive fallback — should not run in modern browsers.
  return "00000000-0000-4000-8000-000000000000";
}

export function ProjectInquiryForm({
  turnstileSiteKey,
}: ProjectInquiryFormProps) {
  const [state, formAction, pending] = useActionState(
    submitProjectInquiryAction,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const values = state.values ?? {};
  const [submissionId] = useState(createSubmissionId);
  const attemptId = values.submissionId || submissionId;
  const submissionInputId = useId();

  useEffect(() => {
    if (state.status === "error") {
      alertRef.current?.focus();
      window.dispatchEvent(
        new CustomEvent("pst:project_form_error", {
          detail: { code: "validation_or_submit" },
        }),
      );
    }
  }, [state]);

  useEffect(() => {
    // Analytics-ready hook — no vendor SDK in this Epic.
    window.dispatchEvent(new CustomEvent("pst:project_form_start"));
  }, []);

  const firstError = (key: string) => state.fieldErrors?.[key]?.[0];

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-10"
      data-analytics="project_inquiry_form"
      noValidate
      onSubmit={() => {
        window.dispatchEvent(new CustomEvent("pst:project_form_submit"));
      }}
    >
      <AttributionFields />

      {/* Stable per-attempt id for server/database idempotency — not a secret */}
      <input
        id={submissionInputId}
        type="hidden"
        name="submissionId"
        value={attemptId}
        readOnly
      />

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.status === "error" && state.message ? (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className="rounded-[var(--radius-card)] border border-red-300 bg-red-50 px-4 py-3 text-[0.95rem] text-red-800 outline-none"
        >
          {state.message}
        </div>
      ) : null}

      <fieldset className="space-y-5">
        <legend className="text-lg font-medium text-text-primary md:text-xl">
          About you
        </legend>

        <Field
          id="fullName"
          label="Full name"
          required
          error={firstError("fullName")}
        >
          <TextInput
            id="fullName"
            name="fullName"
            autoComplete="name"
            required
            defaultValue={values.fullName}
            aria-invalid={Boolean(firstError("fullName"))}
            aria-describedby={describedBy(
              undefined,
              firstError("fullName") ? "fullName-error" : undefined,
            )}
          />
        </Field>

        <Field
          id="workEmail"
          label="Work email"
          required
          error={firstError("workEmail")}
        >
          <TextInput
            id="workEmail"
            name="workEmail"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            defaultValue={values.workEmail}
            aria-invalid={Boolean(firstError("workEmail"))}
            aria-describedby={describedBy(
              undefined,
              firstError("workEmail") ? "workEmail-error" : undefined,
            )}
          />
        </Field>

        <Field
          id="phone"
          label="Phone / WhatsApp"
          required
          error={firstError("phone")}
        >
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            defaultValue={values.phone}
            aria-invalid={Boolean(firstError("phone"))}
            aria-describedby={describedBy(
              undefined,
              firstError("phone") ? "phone-error" : undefined,
            )}
          />
        </Field>

        <Field
          id="company"
          label="Company"
          required
          error={firstError("company")}
        >
          <TextInput
            id="company"
            name="company"
            autoComplete="organization"
            required
            defaultValue={values.company}
            aria-invalid={Boolean(firstError("company"))}
            aria-describedby={describedBy(
              undefined,
              firstError("company") ? "company-error" : undefined,
            )}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-lg font-medium text-text-primary md:text-xl">
          About the project
        </legend>

        <Field
          id="helpArea"
          label="What do you need help with?"
          required
          error={firstError("helpArea")}
        >
          <SelectInput
            id="helpArea"
            name="helpArea"
            required
            defaultValue={values.helpArea ?? ""}
            aria-invalid={Boolean(firstError("helpArea"))}
          >
            <option value="" disabled>
              Select an option
            </option>
            {HELP_AREAS.map((value) => (
              <option key={value} value={value}>
                {HELP_AREA_LABELS[value]}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field
          id="businessProblem"
          label="What problem are you trying to solve?"
          hint="Describe what is currently difficult, manual, slow, disconnected or not working as expected."
          required
          error={firstError("businessProblem")}
        >
          <TextArea
            id="businessProblem"
            name="businessProblem"
            required
            defaultValue={values.businessProblem}
            aria-invalid={Boolean(firstError("businessProblem"))}
            aria-describedby={describedBy(
              "businessProblem-hint",
              firstError("businessProblem")
                ? "businessProblem-error"
                : undefined,
            )}
          />
        </Field>

        <Field
          id="projectDescription"
          label="Project description"
          hint="Tell us what you already know about the project, users, workflow or desired result."
          required
          error={firstError("projectDescription")}
        >
          <TextArea
            id="projectDescription"
            name="projectDescription"
            required
            defaultValue={values.projectDescription}
            aria-invalid={Boolean(firstError("projectDescription"))}
            aria-describedby={describedBy(
              "projectDescription-hint",
              firstError("projectDescription")
                ? "projectDescription-error"
                : undefined,
            )}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-lg font-medium text-text-primary md:text-xl">
          Timing
        </legend>

        <Field
          id="timeline"
          label="Desired timeline"
          required
          error={firstError("timeline")}
        >
          <SelectInput
            id="timeline"
            name="timeline"
            required
            defaultValue={values.timeline ?? ""}
            aria-invalid={Boolean(firstError("timeline"))}
          >
            <option value="" disabled>
              Select a timeline
            </option>
            {TIMELINES.map((value) => (
              <option key={value} value={value}>
                {TIMELINE_LABELS[value]}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field
          id="budgetRange"
          label="Budget context"
          hint="Optional approximate context for discussion — not a published Promptstack price package."
          error={firstError("budgetRange")}
        >
          <SelectInput
            id="budgetRange"
            name="budgetRange"
            defaultValue={values.budgetRange ?? ""}
            aria-describedby="budgetRange-hint"
          >
            <option value="">Prefer not to say</option>
            {BUDGET_RANGES.map((value) => (
              <option key={value} value={value}>
                {BUDGET_RANGE_LABELS[value]}
              </option>
            ))}
          </SelectInput>
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-lg font-medium text-text-primary md:text-xl">
          How you found us
        </legend>

        <Field
          id="referralSource"
          label="How did you hear about us?"
          error={firstError("referralSource")}
        >
          <TextInput
            id="referralSource"
            name="referralSource"
            defaultValue={values.referralSource}
            autoComplete="off"
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-lg font-medium text-text-primary md:text-xl">
          Privacy and submit
        </legend>

        <div className="space-y-2">
          <label className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-text-primary">
            <input
              type="checkbox"
              name="privacyAcknowledged"
              value="true"
              required
              className="mt-1 h-4 w-4 shrink-0 rounded border-border-strong text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-invalid={Boolean(firstError("privacyAcknowledged"))}
              aria-describedby={
                firstError("privacyAcknowledged")
                  ? "privacyAcknowledged-error"
                  : "privacyAcknowledged-hint"
              }
            />
            <span>
              I understand that Promptstack Technologies will use the
              information I provide to review and respond to this project
              inquiry. See our{" "}
              <a
                href="/privacy"
                className="font-medium text-accent underline underline-offset-2"
              >
                Privacy Policy
              </a>
              .
              <span className="text-accent" aria-hidden="true">
                {" "}
                *
              </span>
            </span>
          </label>
          <p id="privacyAcknowledged-hint" className="sr-only">
            Privacy acknowledgement is required to submit.
          </p>
          {firstError("privacyAcknowledged") ? (
            <p
              id="privacyAcknowledged-error"
              className="text-sm text-red-700"
              role="alert"
            >
              {firstError("privacyAcknowledged")}
            </p>
          ) : null}
        </div>

        <TurnstileField
          siteKey={turnstileSiteKey}
          error={firstError("turnstileToken")}
        />

        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={pending}
            aria-disabled={pending}
            data-analytics="cta_project_form_submit"
          >
            {pending ? "Sending request…" : "Submit project request"}
          </Button>
          <p className="mt-3 text-sm text-text-secondary" aria-live="polite">
            {pending
              ? "Submitting your request. Please wait."
              : "You do not need a technical specification to submit."}
          </p>
        </div>
      </fieldset>
    </form>
  );
}
