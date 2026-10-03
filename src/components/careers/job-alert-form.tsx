"use client";

import { useState } from "react";

export function JobAlertForm({
  heading,
  body,
  placeholder,
  submitLabel,
}: {
  heading: string;
  body: string;
  placeholder: string;
  submitLabel: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function onAlert(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/forms/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "job-alert" }),
    });
    const data = await res.json();
    setStatus(data.message || "Saved.");
    if (res.ok) setEmail("");
  }

  return (
    <div className="site-container section-space max-w-2xl">
      <h2 className="heading-lg">{heading}</h2>
      <p className="mt-3 body-muted">{body}</p>
      <form onSubmit={onAlert} className="mt-6 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="min-h-11 flex-1 rounded-(--radius-btn) border border-brand-navy/15 px-3"
        />
        <button type="submit" className="btn-primary">
          {submitLabel}
        </button>
      </form>
      {status ? <p className="mt-3 text-sm text-brand-purple">{status}</p> : null}
    </div>
  );
}
