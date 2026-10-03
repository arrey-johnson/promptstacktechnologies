"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { ContactContent } from "@/lib/cms/types";

export function ContactForm({ content }: { content: ContactContent }) {
  const params = useSearchParams();
  const initialSubject = params.get("subject") || content.intents[0] || "";
  const [subject, setSubject] = useState(initialSubject);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const intents = useMemo(() => content.intents, [content.intents]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setPending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          subject: form.get("subject"),
          message: form.get("message"),
        }),
      });
      const data = (await res.json()) as { message?: string };
      setStatus(data.message || (res.ok ? "Message sent." : "Something went wrong."));
      if (res.ok) e.currentTarget.reset();
    } catch {
      setStatus("Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <h2 className="heading-lg">How can we help?</h2>
        <p className="mt-3 body-muted">Select a reason, or fill out the form.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {intents.map((intent) => (
            <button
              key={intent}
              type="button"
              onClick={() => setSubject(intent)}
              className={`rounded-(--radius-pill) border px-3 py-1.5 text-sm font-semibold ${
                subject === intent
                  ? "border-brand-purple bg-brand-purple text-white"
                  : "border-brand-navy/15 text-brand-navy hover:border-brand-purple"
              }`}
            >
              {intent}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-(--radius-media) border border-brand-navy/10 bg-white p-5 sm:p-6">
        <label className="block text-sm font-semibold">
          {content.formLabels.name}
          <input name="name" required className="mt-1.5 min-h-11 w-full rounded-(--radius-btn) border border-brand-navy/15 px-3 font-normal" />
        </label>
        <label className="block text-sm font-semibold">
          {content.formLabels.email}
          <input name="email" type="email" required className="mt-1.5 min-h-11 w-full rounded-(--radius-btn) border border-brand-navy/15 px-3 font-normal" />
        </label>
        <label className="block text-sm font-semibold">
          {content.formLabels.phone}
          <input name="phone" className="mt-1.5 min-h-11 w-full rounded-(--radius-btn) border border-brand-navy/15 px-3 font-normal" placeholder="6XX XXX XXX" />
        </label>
        <label className="block text-sm font-semibold">
          {content.formLabels.subject}
          <select
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1.5 min-h-11 w-full rounded-(--radius-btn) border border-brand-navy/15 px-3 font-normal"
          >
            {intents.map((intent) => (
              <option key={intent} value={intent}>
                {intent}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold">
          {content.formLabels.message}
          <textarea
            name="message"
            required
            rows={5}
            className="mt-1.5 w-full rounded-(--radius-btn) border border-brand-navy/15 px-3 py-2 font-normal"
            placeholder="Tell us about your project, question, or how we can help..."
          />
        </label>
        <label className="flex items-start gap-2 text-sm text-text-muted">
          <input type="checkbox" required className="mt-1" />
          <span>
            {content.formLabels.consent}{" "}
            <Link href="/privacy-policy" className="font-semibold text-brand-purple">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <button type="submit" className="btn-primary" disabled={pending}>
          {pending ? "Sending..." : content.formLabels.submit}
        </button>
        {status ? <p className="text-sm text-brand-purple">{status}</p> : null}
      </form>
    </div>
  );
}
