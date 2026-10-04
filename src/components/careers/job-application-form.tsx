"use client";

import { useState } from "react";

export function JobApplicationForm({
  jobSlug,
  jobTitle,
  locale = "en",
}: {
  jobSlug: string;
  jobTitle: string;
  locale?: "en" | "fr";
}) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ui =
    locale === "fr"
      ? {
          heading: "Postuler en ligne",
          body: "Soumettez votre candidature directement. Elle arrive dans le back-office Promptstack pour revue.",
          fullName: "Nom complet",
          email: "E-mail",
          phone: "Téléphone",
          linkedin: "Profil LinkedIn (optionnel)",
          portfolio: "Portfolio / site (optionnel)",
          coverLetter: "Lettre de motivation",
          resume: "CV (PDF ou Word, max 5 Mo)",
          submit: "Envoyer ma candidature",
          sending: "Envoi…",
        }
      : {
          heading: "Apply on this website",
          body: "Submit your application here. It is received in the Promptstack back office for review.",
          fullName: "Full name",
          email: "Email",
          phone: "Phone",
          linkedin: "LinkedIn profile (optional)",
          portfolio: "Portfolio / website (optional)",
          coverLetter: "Cover letter",
          resume: "Resume / CV (PDF or Word, max 5MB)",
          submit: "Submit application",
          sending: "Submitting…",
        };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage(null);
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("jobSlug", jobSlug);

    try {
      const res = await fetch("/api/forms/job-application", {
        method: "POST",
        body: data,
      });
      const json = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(json.message || "Submission failed.");
        return;
      }
      setMessage(json.message || "Application received.");
      form.reset();
    } catch {
      setError(
        locale === "fr"
          ? "Impossible d'envoyer la candidature. Réessayez."
          : "Couldn't submit your application. Please try again.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-(--radius-media) border border-brand-navy/10 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-bold text-brand-navy">{ui.heading}</h2>
      <p className="mt-2 text-sm text-text-muted">{ui.body}</p>
      <p className="mt-1 text-sm font-semibold text-brand-purple">{jobTitle}</p>

      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          {ui.fullName}
          <input
            name="fullName"
            required
            className="min-h-11 rounded-(--radius-btn) border border-brand-navy/15 px-3 font-normal"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
            {ui.email}
            <input
              name="email"
              type="email"
              required
              className="min-h-11 rounded-(--radius-btn) border border-brand-navy/15 px-3 font-normal"
            />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
            {ui.phone}
            <input
              name="phone"
              type="tel"
              required
              className="min-h-11 rounded-(--radius-btn) border border-brand-navy/15 px-3 font-normal"
            />
          </label>
        </div>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          {ui.linkedin}
          <input
            name="linkedin"
            type="url"
            placeholder="https://"
            className="min-h-11 rounded-(--radius-btn) border border-brand-navy/15 px-3 font-normal"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          {ui.portfolio}
          <input
            name="portfolioUrl"
            type="url"
            placeholder="https://"
            className="min-h-11 rounded-(--radius-btn) border border-brand-navy/15 px-3 font-normal"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          {ui.coverLetter}
          <textarea
            name="coverLetter"
            required
            rows={6}
            className="rounded-(--radius-btn) border border-brand-navy/15 px-3 py-2 font-normal"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          {ui.resume}
          <input
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="block w-full text-sm font-normal file:mr-3 file:rounded-(--radius-btn) file:border-0 file:bg-brand-lavender/30 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-brand-navy"
          />
        </label>

        <button type="submit" disabled={pending} className="btn-primary mt-2 w-fit disabled:opacity-60">
          {pending ? ui.sending : ui.submit}
        </button>

        {message ? <p className="text-sm font-semibold text-green-700">{message}</p> : null}
        {error ? <p className="text-sm font-semibold text-red-700">{error}</p> : null}
      </form>
    </div>
  );
}
