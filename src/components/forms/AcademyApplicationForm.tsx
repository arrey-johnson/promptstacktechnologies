"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import {
  submitAcademyApplicationAction,
  type AcademyApplicationActionState,
} from "@/app/(marketing)/academy/apply/actions";
import {
  AttributionFields,
  Field,
  SelectInput,
  TextArea,
  TextInput,
  describedBy,
  TurnstileField,
} from "@/components/forms";
import { Button } from "@/components/ui";
import type { AcademyApplyProgramSlug } from "@/config/academy";
import {
  ACADEMY_PROGRAM_LABELS,
  ACADEMY_PROGRAM_SLUGS,
  EXPERIENCE_LEVEL_LABELS,
  EXPERIENCE_LEVELS,
} from "@/lib/academy/schema";
import { TURNSTILE_ACADEMY_APPLICATION_ACTION } from "@/lib/security/turnstile";

const initialState: AcademyApplicationActionState = { status: "idle" };

type AcademyApplicationFormProps = {
  turnstileSiteKey?: string;
  initialProgramSlug?: AcademyApplyProgramSlug;
};

function createSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "00000000-0000-4000-8000-000000000000";
}

export function AcademyApplicationForm({
  turnstileSiteKey,
  initialProgramSlug,
}: AcademyApplicationFormProps) {
  const [state, formAction, pending] = useActionState(
    submitAcademyApplicationAction,
    initialState,
  );
  const alertRef = useRef<HTMLDivElement>(null);
  const values = state.values ?? {};
  const [submissionId] = useState(createSubmissionId);
  const attemptId = values.submissionId || submissionId;
  const submissionInputId = useId();
  const programValue = values.programSlug || initialProgramSlug || "";

  useEffect(() => {
    if (state.status === "error") {
      alertRef.current?.focus();
      window.dispatchEvent(
        new CustomEvent("pst:academy_form_error", {
          detail: { code: "validation_or_submit" },
        }),
      );
    }
  }, [state]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("pst:academy_form_start"));
  }, []);

  const firstError = (key: string) => state.fieldErrors?.[key]?.[0];

  const errorSummaryEntries = Object.entries(state.fieldErrors ?? {})
    .map(([key, messages]) => ({
      key,
      message: messages[0],
    }))
    .filter((entry): entry is { key: string; message: string } =>
      Boolean(entry.message),
    );

  return (
    <form
      action={formAction}
      className="space-y-8 sm:space-y-10"
      data-analytics="academy_application_form"
      noValidate
      onSubmit={() => {
        window.dispatchEvent(new CustomEvent("pst:academy_form_submit"));
      }}
    >
      <AttributionFields />

      <input
        id={submissionInputId}
        type="hidden"
        name="submissionId"
        value={attemptId}
        readOnly
      />

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
          <p className="font-medium">{state.message}</p>
          {errorSummaryEntries.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {errorSummaryEntries.map((entry) => (
                <li key={entry.key}>
                  <a
                    href={`#${entry.key}`}
                    className="underline underline-offset-2 hover:text-red-950"
                  >
                    {entry.message}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
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

        <Field id="email" label="Email" required error={firstError("email")}>
          <TextInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            defaultValue={values.email}
            aria-invalid={Boolean(firstError("email"))}
            aria-describedby={describedBy(
              undefined,
              firstError("email") ? "email-error" : undefined,
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

        <Field id="city" label="City" required error={firstError("city")}>
          <TextInput
            id="city"
            name="city"
            autoComplete="address-level2"
            required
            defaultValue={values.city}
            aria-invalid={Boolean(firstError("city"))}
            aria-describedby={describedBy(
              undefined,
              firstError("city") ? "city-error" : undefined,
            )}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-lg font-medium text-text-primary md:text-xl">
          Your learning path
        </legend>

        <Field
          id="programSlug"
          label="Program"
          required
          hint={
            initialProgramSlug
              ? `Preselected from ${ACADEMY_PROGRAM_LABELS[initialProgramSlug]}. You can change this if needed.`
              : "Choose the Academy program you want to apply for."
          }
          error={firstError("programSlug")}
        >
          <SelectInput
            id="programSlug"
            name="programSlug"
            required
            defaultValue={programValue}
            aria-invalid={Boolean(firstError("programSlug"))}
            aria-describedby={describedBy(
              "programSlug-hint",
              firstError("programSlug") ? "programSlug-error" : undefined,
            )}
          >
            <option value="">Select a program</option>
            {ACADEMY_PROGRAM_SLUGS.map((slug) => (
              <option key={slug} value={slug}>
                {ACADEMY_PROGRAM_LABELS[slug]}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field
          id="experienceLevel"
          label="Experience level"
          required
          hint="Be honest about where you are starting. Beginners are welcome."
          error={firstError("experienceLevel")}
        >
          <SelectInput
            id="experienceLevel"
            name="experienceLevel"
            required
            defaultValue={values.experienceLevel || ""}
            aria-invalid={Boolean(firstError("experienceLevel"))}
            aria-describedby={describedBy(
              "experienceLevel-hint",
              firstError("experienceLevel")
                ? "experienceLevel-error"
                : undefined,
            )}
          >
            <option value="">Select your experience level</option>
            {EXPERIENCE_LEVELS.map((level) => (
              <option key={level} value={level}>
                {EXPERIENCE_LEVEL_LABELS[level]}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field
          id="currentOccupationEducation"
          label="Current education or occupation"
          required
          hint="For example: secondary student, university student, freelancing, employed in another field, or looking for work."
          error={firstError("currentOccupationEducation")}
        >
          <TextInput
            id="currentOccupationEducation"
            name="currentOccupationEducation"
            required
            defaultValue={values.currentOccupationEducation}
            aria-invalid={Boolean(firstError("currentOccupationEducation"))}
            aria-describedby={describedBy(
              "currentOccupationEducation-hint",
              firstError("currentOccupationEducation")
                ? "currentOccupationEducation-error"
                : undefined,
            )}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-lg font-medium text-text-primary md:text-xl">
          Your goals
        </legend>

        <Field
          id="motivation"
          label="Why do you want to learn this skill?"
          required
          hint="Tell us what interests you about the field or what problem/opportunity is motivating you."
          error={firstError("motivation")}
        >
          <TextArea
            id="motivation"
            name="motivation"
            rows={4}
            required
            className="min-h-28 sm:min-h-32"
            defaultValue={values.motivation}
            aria-invalid={Boolean(firstError("motivation"))}
            aria-describedby={describedBy(
              "motivation-hint",
              firstError("motivation") ? "motivation-error" : undefined,
            )}
          />
        </Field>

        <Field
          id="desiredOutcome"
          label="What do you hope to achieve after the program?"
          required
          hint="For example, build practical skills, complete projects, improve your current work, change career direction or prepare for future opportunities."
          error={firstError("desiredOutcome")}
        >
          <TextArea
            id="desiredOutcome"
            name="desiredOutcome"
            rows={4}
            required
            className="min-h-28 sm:min-h-32"
            defaultValue={values.desiredOutcome}
            aria-invalid={Boolean(firstError("desiredOutcome"))}
            aria-describedby={describedBy(
              "desiredOutcome-hint",
              firstError("desiredOutcome")
                ? "desiredOutcome-error"
                : undefined,
            )}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-lg font-medium text-text-primary md:text-xl">
          Final details
        </legend>

        <Field
          id="referralSource"
          label="How did you hear about Promptstack Academy?"
          hint="Optional"
          error={firstError("referralSource")}
        >
          <TextInput
            id="referralSource"
            name="referralSource"
            defaultValue={values.referralSource}
            aria-describedby={describedBy(
              "referralSource-hint",
              firstError("referralSource")
                ? "referralSource-error"
                : undefined,
            )}
          />
        </Field>

        <div>
          <label className="flex items-start gap-3 text-[0.95rem] text-text-secondary">
            <input
              type="checkbox"
              name="privacyAcknowledged"
              value="true"
              required
              className="mt-1 h-4 w-4 rounded border-border-strong text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-invalid={Boolean(firstError("privacyAcknowledged"))}
              aria-describedby={
                firstError("privacyAcknowledged")
                  ? "privacyAcknowledged-error"
                  : undefined
              }
            />
            <span>
              I understand that Promptstack Technologies will use the information
              I provide to review and manage my Promptstack Academy application.{" "}
              <a
                href="/privacy"
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                Privacy Policy
              </a>
              <span className="text-accent" aria-hidden="true">
                {" "}
                *
              </span>
            </span>
          </label>
          {firstError("privacyAcknowledged") ? (
            <p
              id="privacyAcknowledged-error"
              className="mt-2 text-sm text-red-700"
              role="alert"
            >
              {firstError("privacyAcknowledged")}
            </p>
          ) : null}
        </div>

        <TurnstileField
          siteKey={turnstileSiteKey}
          action={TURNSTILE_ACADEMY_APPLICATION_ACTION}
          error={firstError("turnstileToken")}
        />

        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={pending}
            aria-disabled={pending}
            data-analytics="cta_academy_form_submit"
          >
            {pending ? "Submitting application…" : "Submit Application"}
          </Button>
          <p className="mt-3 text-sm text-text-secondary" aria-live="polite">
            {pending
              ? "Submitting your application. Please wait."
              : "Submitting an application does not mean automatic admission."}
          </p>
        </div>
      </fieldset>
    </form>
  );
}
