"use client";

import { useState } from "react";

export function NewsletterForm({ consent }: { consent: string }) {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) {
      setStatus("Please agree to receive emails.");
      return;
    }
    setPending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/forms/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { message?: string };
      setStatus(data.message || (res.ok ? "Subscribed." : "Something went wrong."));
      if (res.ok) setEmail("");
    } catch {
      setStatus("Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="min-h-11 flex-1 rounded-(--radius-btn) border border-brand-navy/15 bg-white px-3 text-sm"
        />
        <button type="submit" className="btn-primary" disabled={pending}>
          {pending ? "..." : "Subscribe"}
        </button>
      </div>
      <label className="flex items-start gap-2 text-xs text-text-muted">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5"
        />
        <span>{consent}</span>
      </label>
      {status ? <p className="text-sm text-brand-purple">{status}</p> : null}
    </form>
  );
}
