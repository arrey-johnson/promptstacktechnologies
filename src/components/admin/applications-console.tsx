"use client";

import { useEffect, useState } from "react";
import type { JobApplication } from "@/lib/applications/store";

export function ApplicationsConsole() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<JobApplication | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/applications");
      const data = (await res.json()) as { applications?: JobApplication[]; message?: string };
      if (!res.ok) {
        setError(data.message || "Failed to load applications.");
        return;
      }
      setApplications(data.applications || []);
    } catch {
      setError("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function setStatus(id: string, status: JobApplication["status"]) {
    const res = await fetch("/api/admin/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) return;
    const data = (await res.json()) as { application: JobApplication };
    setApplications((prev) =>
      prev.map((item) => (item.id === id ? data.application : item)),
    );
    setSelected((prev) => (prev?.id === id ? data.application : prev));
  }

  const newCount = applications.filter((item) => item.status === "new").length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Job applications</h1>
          <p className="mt-2 text-sm text-text-muted">
            Applications submitted from the careers pages. {newCount} new.
          </p>
        </div>
        <button type="button" onClick={() => void load()} className="btn-secondary">
          Refresh
        </button>
      </div>

      {loading ? <p className="mt-8 text-sm text-text-muted">Loading…</p> : null}
      {error ? <p className="mt-8 text-sm font-semibold text-red-700">{error}</p> : null}

      {!loading && !error && applications.length === 0 ? (
        <p className="mt-8 body-muted">No applications yet.</p>
      ) : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          {applications.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected(item)}
              className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                selected?.id === item.id
                  ? "border-brand-purple bg-brand-lavender/15"
                  : "border-brand-navy/10 bg-white hover:border-brand-purple/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-brand-navy">{item.fullName}</p>
                  <p className="mt-1 text-sm text-brand-purple">{item.jobTitle}</p>
                  <p className="mt-1 text-xs text-text-muted">
                    {new Date(item.receivedAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide ${
                    item.status === "new"
                      ? "bg-brand-purple/15 text-brand-purple"
                      : item.status === "reviewed"
                        ? "bg-brand-navy/10 text-brand-navy"
                        : "bg-brand-grey/20 text-brand-grey"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-brand-navy/10 bg-white p-5">
          {!selected ? (
            <p className="text-sm text-text-muted">Select an application to review.</p>
          ) : (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-brand-navy">{selected.fullName}</h2>
                <p className="mt-1 text-sm font-semibold text-brand-purple">{selected.jobTitle}</p>
              </div>
              <dl className="grid gap-2 text-sm">
                <div>
                  <dt className="font-semibold text-brand-navy">Email</dt>
                  <dd>
                    <a className="text-brand-purple" href={`mailto:${selected.email}`}>
                      {selected.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-brand-navy">Phone</dt>
                  <dd>{selected.phone}</dd>
                </div>
                {selected.linkedin ? (
                  <div>
                    <dt className="font-semibold text-brand-navy">LinkedIn</dt>
                    <dd>
                      <a
                        className="text-brand-purple break-all"
                        href={selected.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {selected.linkedin}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {selected.portfolioUrl ? (
                  <div>
                    <dt className="font-semibold text-brand-navy">Portfolio</dt>
                    <dd>
                      <a
                        className="text-brand-purple break-all"
                        href={selected.portfolioUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {selected.portfolioUrl}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
              <div>
                <h3 className="text-sm font-semibold text-brand-navy">Cover letter</h3>
                <p className="mt-2 whitespace-pre-wrap text-sm text-text-muted">
                  {selected.coverLetter}
                </p>
              </div>
              {selected.resumeStoredAs ? (
                <a
                  href={`/api/admin/applications/resume?id=${selected.id}`}
                  className="btn-secondary inline-flex"
                >
                  Download resume
                  {selected.resumeFileName ? ` (${selected.resumeFileName})` : ""}
                </a>
              ) : (
                <p className="text-sm text-text-muted">No resume attached.</p>
              )}
              <div className="flex flex-wrap gap-2 pt-2">
                {(["new", "reviewed", "archived"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => void setStatus(selected.id, status)}
                    className={`rounded-(--radius-btn) border px-3 py-2 text-xs font-semibold uppercase tracking-wide ${
                      selected.status === status
                        ? "border-brand-purple bg-brand-purple text-white"
                        : "border-brand-navy/15 text-brand-navy hover:border-brand-purple"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
