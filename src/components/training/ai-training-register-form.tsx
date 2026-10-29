"use client";

import { useState } from "react";
import { AI_TRAINING, formatXaf } from "@/lib/training/config";

export function AiTrainingRegisterForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    setPending(true);
    setStatus(null);

    try {
      const res = await fetch("/api/forms/ai-training", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.get("fullName"),
          email: form.get("email"),
          phone: form.get("phone"),
          organization: form.get("organization"),
        }),
      });
      const data = (await res.json()) as {
        message?: string;
        paymentUrl?: string;
      };

      if (!res.ok || !data.paymentUrl) {
        setStatus(data.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus(data.message || "Redirecting to payment…");
      window.location.assign(data.paymentUrl);
    } catch {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      id="register"
      onSubmit={onSubmit}
      className="scroll-mt-28 rounded-(--radius-media) border border-brand-navy/10 bg-white p-6 shadow-[0_20px_50px_-28px_rgb(27_38_59/0.35)] sm:p-8"
    >
      <p className="text-xs font-semibold tracking-[0.14em] text-brand-purple uppercase">Register & pay</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-navy">Secure your seat</h2>
      <p className="mt-2 text-sm body-muted">
        Enter your details, then pay <strong className="text-brand-navy">{formatXaf(AI_TRAINING.priceXaf)}</strong>{" "}
        with MTN Mobile Money or Orange Money.
      </p>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-1.5 text-sm">
          <span className="font-semibold text-brand-navy">Full name</span>
          <input
            name="fullName"
            required
            autoComplete="name"
            className="min-h-11 rounded-(--radius-btn) border border-brand-navy/15 px-3"
            placeholder="Your full name"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-semibold text-brand-navy">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="min-h-11 rounded-(--radius-btn) border border-brand-navy/15 px-3"
            placeholder="you@example.com"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-semibold text-brand-navy">Phone</span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="min-h-11 rounded-(--radius-btn) border border-brand-navy/15 px-3"
            placeholder="+237 6XX XXX XXX"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-semibold text-brand-navy">
            Organization <span className="font-normal text-text-muted">(optional)</span>
          </span>
          <input
            name="organization"
            autoComplete="organization"
            className="min-h-11 rounded-(--radius-btn) border border-brand-navy/15 px-3"
            placeholder="Company or school"
          />
        </label>
      </div>

      <button type="submit" className="btn-primary mt-6 w-full min-h-12" disabled={pending}>
        {pending ? "Preparing payment…" : `Pay ${formatXaf(AI_TRAINING.priceXaf)} & register`}
      </button>

      <p className="mt-3 text-xs leading-relaxed text-text-muted">
        You will be redirected to a secure checkout to pay with Mobile Money or Orange Money. Training is{" "}
        <strong className="text-brand-navy">online</strong> on {AI_TRAINING.dateLabel}.
      </p>

      {status ? <p className="mt-3 text-sm font-medium text-brand-purple">{status}</p> : null}
    </form>
  );
}
