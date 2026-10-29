import type { Metadata } from "next";
import Link from "next/link";
import { AI_TRAINING } from "@/lib/training/config";

export const metadata: Metadata = {
  title: "AI Training registration received",
  robots: { index: false, follow: false },
};

export default function AiTrainingSuccessPage() {
  return (
    <article className="site-container py-16 sm:py-20">
      <p className="pill">Registration</p>
      <h1 className="mt-4 heading-xl">Thank you — complete payment if you haven’t already</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-navy/85">
        If your payment was confirmed, you’re registered for <strong>{AI_TRAINING.title}</strong> on{" "}
        <strong>{AI_TRAINING.dateLabel}</strong> (online). Keep your receipt and watch your email for join
        details.
      </p>
      <ul className="mt-8 max-w-2xl space-y-3 text-sm body-muted">
        <li>• Payment methods: MTN Mobile Money and Orange Money</li>
        <li>• Fee: {AI_TRAINING.priceLabel}</li>
        <li>• Questions? Email hello@promptstacktechnologies.com</li>
      </ul>
      <div className="mt-10 flex flex-wrap gap-3">
        <a href={AI_TRAINING.paymentLink} className="btn-primary" target="_blank" rel="noreferrer">
          Open payment page again
        </a>
        <Link href="/ai-training" className="btn-secondary">
          Back to training page
        </Link>
      </div>
    </article>
  );
}
