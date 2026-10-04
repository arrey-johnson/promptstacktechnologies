"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { JobItem } from "@/lib/cms/types";

export function CareersFilters({
  jobs,
  emptyState,
  allLabel,
  viewRoleLabel = "View role",
  applyLabel = "Apply",
}: {
  jobs: JobItem[];
  emptyState: string;
  allLabel: string;
  viewRoleLabel?: string;
  applyLabel?: string;
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
          aria-label="Employment type"
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
          aria-label="Work type"
        >
          {workOptions.map((option) => (
            <option key={option} value={option}>
              {option === "All" ? allLabel : option}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid gap-4">
        {filtered.length === 0 ? (
          <p className="body-muted">{emptyState}</p>
        ) : (
          filtered.map((job) => (
            <article
              key={job.id}
              className="rounded-(--radius-media) border border-brand-navy/10 bg-white p-5 sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-brand-navy">
                    <Link href={`/careers/${job.slug}`} className="hover:text-brand-purple">
                      {job.title}
                    </Link>
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[job.employmentType, job.location, job.workType].map((tag) => (
                      <span
                        key={`${job.id}-${tag}`}
                        className="rounded-(--radius-pill) bg-surface-soft px-2.5 py-1 text-xs font-semibold text-brand-navy"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 max-w-2xl body-muted">{job.summary}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link href={`/careers/${job.slug}`} className="btn-secondary">
                    {viewRoleLabel}
                  </Link>
                  <Link href={`/careers/${job.slug}#apply`} className="btn-primary">
                    {applyLabel}
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
}
