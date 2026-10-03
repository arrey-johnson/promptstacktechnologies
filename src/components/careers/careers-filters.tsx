"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { JobItem } from "@/lib/cms/types";

export function CareersFilters({
  jobs,
  emptyState,
  allLabel,
}: {
  jobs: JobItem[];
  emptyState: string;
  allLabel: string;
}) {
  const [employmentType, setEmploymentType] = useState("All");
  const [workType, setWorkType] = useState("All");

  const employmentOptions = useMemo(() => {
    return ["All", ...Array.from(new Set(jobs.map((job) => job.employmentType))).filter(Boolean)];
  }, [jobs]);

  const workOptions = useMemo(() => {
    return ["All", ...Array.from(new Set(jobs.map((job) => job.workType))).filter(Boolean)];
  }, [jobs]);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const empOk = employmentType === "All" || job.employmentType === employmentType;
      const workOk = workType === "All" || job.workType === workType;
      return empOk && workOk;
    });
  }, [jobs, employmentType, workType]);

  if (jobs.length === 0) {
    return <p className="mt-6 body-muted">{emptyState}</p>;
  }

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-3">
        <select
          value={employmentType}
          onChange={(e) => setEmploymentType(e.target.value)}
          className="min-h-11 rounded-(--radius-btn) border border-brand-navy/15 px-3 text-sm"
        >
          {employmentOptions.map((option) => (
            <option key={option} value={option}>
              {option === "All" ? allLabel : option}
            </option>
          ))}
        </select>
        <select
          value={workType}
          onChange={(e) => setWorkType(e.target.value)}
          className="min-h-11 rounded-(--radius-btn) border border-brand-navy/15 px-3 text-sm"
        >
          {workOptions.map((option) => (
            <option key={option} value={option}>
              {option === "All" ? allLabel : option}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 space-y-4">
        {filtered.length === 0 ? (
          <p className="body-muted">{emptyState}</p>
        ) : (
          filtered.map((job) => (
            <article key={job.id} className="rounded-(--radius-media) border border-brand-navy/10 p-5">
              <h3 className="text-xl font-bold text-brand-navy">
                <Link href={`/careers/${job.slug}`} className="hover:text-brand-purple">
                  {job.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                {job.employmentType} · {job.location} · {job.workType}
              </p>
              <p className="mt-3 body-muted">{job.summary}</p>
            </article>
          ))
        )}
      </div>
    </>
  );
}
