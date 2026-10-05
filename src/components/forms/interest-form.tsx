"use client";

import { useState } from "react";

export function InterestForm({
  productName,
  ctaLabel,
}: {
  productName: string;
  ctaLabel: string;
}) {
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    setPending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/forms/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          product: productName,
        }),
      });
      const data = (await res.json()) as { message?: string };
      setStatus(data.message || (res.ok ? "Thanks — you're on the list." : "Something went wrong."));
      if (res.ok) formEl.reset();
    } catch {
      setStatus("Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
      <input
        name="name"
        required
        placeholder="Full name"
        className="min-h-11 rounded-(--radius-btn) border border-brand-navy/15 px-3 text-sm"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email address"
        className="min-h-11 rounded-(--radius-btn) border border-brand-navy/15 px-3 text-sm"
      />
      <button type="submit" className="btn-primary" disabled={pending}>
        {pending ? "..." : ctaLabel}
      </button>
      {status ? <p className="sm:col-span-3 text-sm text-brand-purple">{status}</p> : null}
    </form>
  );
}
