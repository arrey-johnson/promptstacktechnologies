import type { Metadata } from "next";
import Link from "next/link";
import { AI_TRAINING, formatXaf } from "@/lib/training/config";

export const metadata: Metadata = {
  title: "AI Training payment",
  robots: { index: false, follow: false },
};

export default function AiTrainingSuccessPage() {
  return (
    <article className="site-container py-16 sm:py-20">
      <p className="pill">Registration</p>
      <h1 className="mt-4 heading-xl">Ready to complete payment?</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-navy/85">
        Register for <strong>{AI_TRAINING.title}</strong> ({AI_TRAINING.dateLabel}, online) by paying{" "}
        <strong>{formatXaf(AI_TRAINING.priceXaf)}</strong> with MTN Mobile Money or Orange Money.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={AI_TRAINING.paymentLink}
          className="btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Continue to payment
        </a>
        <Link href="/ai-training" className="btn-secondary">
          Back to training page
        </Link>
      </div>
    </article>
  );
}
