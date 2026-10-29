import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AiTrainingRegisterForm } from "@/components/training/ai-training-register-form";
import { AI_TRAINING, formatXaf } from "@/lib/training/config";

export const metadata: Metadata = {
  title: "AI Training for Professionals",
  description:
    "4-day online practical AI training by Promptstack Technologies (11–14 November 2026 cohort) — register and pay with MTN Mobile Money or Orange Money.",
};

export default function AiTrainingPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-brand-navy/10 bg-brand-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,0,230,0.35),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_40%)]" />
        <div className="site-container relative grid gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
          <div>
            <p className="inline-flex items-center rounded-(--radius-pill) bg-white/12 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-brand-lavender uppercase">
              {AI_TRAINING.cohortLabel} · {AI_TRAINING.format} · {AI_TRAINING.mode}
            </p>
            <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              Artificial Intelligence{" "}
              <span className="text-brand-lavender">for Professionals</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              {AI_TRAINING.tagline}
            </p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-(--radius-btn) border border-white/15 bg-white/5 px-4 py-3">
                <dt className="text-xs font-semibold tracking-[0.12em] text-brand-lavender uppercase">Dates</dt>
                <dd className="mt-1 text-sm font-semibold">{AI_TRAINING.dateLabel}</dd>
              </div>
              <div className="rounded-(--radius-btn) border border-white/15 bg-white/5 px-4 py-3">
                <dt className="text-xs font-semibold tracking-[0.12em] text-brand-lavender uppercase">Duration</dt>
                <dd className="mt-1 text-sm font-semibold">{AI_TRAINING.duration}</dd>
              </div>
              <div className="rounded-(--radius-btn) border border-white/15 bg-white/5 px-4 py-3">
                <dt className="text-xs font-semibold tracking-[0.12em] text-brand-lavender uppercase">Venue</dt>
                <dd className="mt-1 text-sm font-semibold">Online (live cohort)</dd>
              </div>
              <div className="rounded-(--radius-btn) border border-white/15 bg-white/5 px-4 py-3">
                <dt className="text-xs font-semibold tracking-[0.12em] text-brand-lavender uppercase">Fee</dt>
                <dd className="mt-1 text-sm font-semibold">{formatXaf(AI_TRAINING.priceXaf)}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#register" className="btn-primary">
                Register & pay now
              </a>
            </div>
            <p className="mt-4 text-sm text-brand-lavender">{AI_TRAINING.seatsNote}</p>
          </div>

          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-(--radius-media) border border-white/15 bg-white/5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
            <Image
              src={AI_TRAINING.flyerSrc}
              alt="Professional using AI productivity tools on a laptop"
              width={900}
              height={1200}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </section>

      <section className="site-container section-space">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="pill">What you will learn</p>
            <h2 className="mt-4 heading-lg">Practical AI skills for work that matters</h2>
            <p className="mt-3 max-w-2xl body-muted">
              A focused online cohort over four days — not slide-only theory. Leave with workflows you can reuse the next morning.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {AI_TRAINING.learn.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-(--radius-btn) border border-brand-navy/10 bg-surface-soft px-4 py-3 text-sm text-brand-navy"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <p className="pill">Who should attend</p>
              <h2 className="mt-4 heading-lg">Built for busy professionals</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {AI_TRAINING.audience.map((item) => (
                  <li
                    key={item}
                    className="rounded-(--radius-pill) border border-brand-navy/10 bg-white px-3 py-1.5 text-sm font-semibold text-brand-navy"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 rounded-(--radius-media) border border-brand-navy/10 bg-brand-navy px-6 py-8 text-white">
              <p className="text-xs font-semibold tracking-[0.14em] text-brand-lavender uppercase">How payment works</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight">Register here → pay securely</h3>
              <ol className="mt-5 space-y-3 text-sm text-white/85">
                <li>1. Submit your name, email, and phone on this page.</li>
                <li>2. Complete payment of {formatXaf(AI_TRAINING.priceXaf)} with MTN Mobile Money or Orange Money.</li>
                <li>3. Keep your payment receipt — we send online join details to your email.</li>
              </ol>
              <p className="mt-5 text-sm text-brand-lavender">
                Training is hosted <strong className="text-white">online</strong>.
              </p>
            </div>
          </div>

          <AiTrainingRegisterForm />
        </div>
      </section>

      <section className="border-t border-brand-navy/10 bg-surface-soft">
        <div className="site-container section-space flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-brand-navy">{AI_TRAINING.slogan}</h2>
            <p className="mt-2 body-muted">Promptstack Academy · Build, automate, grow.</p>
          </div>
          <Link href="/services/academy" className="btn-secondary">
            Explore Academy programmes
          </Link>
        </div>
      </section>
    </>
  );
}
