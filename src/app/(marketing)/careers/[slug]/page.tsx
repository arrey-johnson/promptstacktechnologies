import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCmsData } from "@/lib/cms/store";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { jobs } = await getCmsData();
  const job = jobs.find((item) => item.slug === slug && item.published);
  return { title: job?.title || "Role" };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const { jobs, settings } = await getCmsData();
  const job = jobs.find((item) => item.slug === slug && item.published);
  if (!job) notFound();

  return (
    <article className="site-container py-14">
      <Link href="/careers" className="text-sm font-semibold text-brand-purple">
        ← Careers
      </Link>
      <h1 className="mt-6 heading-xl">{job.title}</h1>
      <p className="mt-3 text-sm text-text-muted">
        {job.employmentType} · {job.location} · {job.workType}
      </p>
      <p className="mt-6 max-w-2xl body-muted">{job.summary}</p>
      <p className="mt-4 max-w-3xl whitespace-pre-wrap body-muted">{job.body}</p>
      <Link
        href={`/contact?subject=${encodeURIComponent(`Careers: ${job.title}`)}`}
        className="btn-primary mt-8 inline-flex"
      >
        Apply / Contact us
      </Link>
      <p className="mt-4 text-sm text-text-muted">
        Or email {settings.contactEmail}
      </p>
    </article>
  );
}
