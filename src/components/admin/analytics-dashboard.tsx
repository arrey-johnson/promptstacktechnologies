"use client";

import { useEffect, useState } from "react";
import type { AnalyticsSummary } from "@/lib/analytics/store";
import type { DashboardOverview, HealthCheck } from "@/lib/admin/health";

function StatusDot({ status }: { status: HealthCheck["status"] }) {
  const color =
    status === "ok" ? "bg-green-500" : status === "warn" ? "bg-amber-500" : "bg-red-500";
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${color}`} />;
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold tracking-wide text-brand-purple uppercase">{label}</p>
      <p className="mt-2 text-3xl font-bold text-brand-navy">{value}</p>
      {hint ? <p className="mt-1 text-xs text-text-muted">{hint}</p> : null}
    </div>
  );
}

function MiniBars({
  daily,
}: {
  daily: AnalyticsSummary["daily"];
}) {
  const max = Math.max(...daily.map((d) => d.pageViews), 1);
  return (
    <div className="flex h-36 items-end gap-1">
      {daily.map((day) => (
        <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-t bg-brand-purple/80"
            style={{ height: `${Math.max(4, (day.pageViews / max) * 100)}%` }}
            title={`${day.date}: ${day.pageViews} views, ${day.visitors} visitors`}
          />
          <span className="text-[9px] text-text-muted">{day.date.slice(8)}</span>
        </div>
      ))}
    </div>
  );
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/analytics?overview=1");
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Failed to load analytics.");
        return;
      }
      setData(json as DashboardOverview);
    } catch {
      setError("Failed to load analytics.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  if (loading) return <p className="text-sm text-text-muted">Loading analytics…</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!data) return null;

  const a = data.analytics;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">Analytics & health</h1>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            Visitors, page views, traffic sources, and website health — all in one place.
          </p>
        </div>
        <button type="button" className="btn-secondary" onClick={() => void load()}>
          Refresh
        </button>
      </div>

      {!a.writable ? (
        <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
          <p className="font-bold">Live visitor stats cannot persist on this host yet</p>
          <p className="mt-1">{a.persistenceDetail}</p>
          <p className="mt-2 text-xs">
            These zeros are real empty counts — not demo numbers. Configure Upstash Redis
            (`UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`), redeploy, then browse the
            public website to start collecting.
          </p>
        </div>
      ) : (
        <p className="mt-4 text-xs text-text-muted">
          Live data via <span className="font-semibold text-brand-navy">{a.backend}</span> —{" "}
          {a.persistenceDetail}
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Visitors today" value={a.todayVisitors} hint={`${a.todayPageViews} page views`} />
        <StatCard
          label="Last 7 days"
          value={a.last7DaysVisitors}
          hint={`${a.last7DaysPageViews} page views`}
        />
        <StatCard label="All-time visitors" value={a.uniqueVisitors} hint={`${a.sessions} sessions`} />
        <StatCard
          label="Website health"
          value={`${data.healthScore}%`}
          hint={data.zoomConnected ? "Zoom connected" : "Zoom needs setup"}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-brand-navy">Page views (14 days)</h2>
          <div className="mt-6">
            <MiniBars daily={a.daily} />
          </div>
        </section>

        <section className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-brand-navy">Website health</h2>
          <ul className="mt-4 space-y-3">
            {data.health.map((check) => (
              <li key={check.id} className="flex items-start gap-3 text-sm">
                <StatusDot status={check.status} />
                <div>
                  <p className="font-semibold text-brand-navy">{check.label}</p>
                  <p className="text-text-muted">{check.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-brand-navy">Top pages</h2>
          <ul className="mt-4 space-y-2">
            {a.topPages.length === 0 ? (
              <li className="text-sm text-text-muted">No visits recorded yet. Browse the public site to start collecting.</li>
            ) : (
              a.topPages.map((page) => (
                <li
                  key={page.path}
                  className="flex items-center justify-between gap-3 border-b border-brand-navy/5 py-2 text-sm"
                >
                  <span className="truncate font-medium text-brand-navy">{page.path}</span>
                  <span className="shrink-0 text-text-muted">{page.views}</span>
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-brand-navy">Traffic sources</h2>
          <ul className="mt-4 space-y-2">
            {a.topReferrers.length === 0 ? (
              <li className="text-sm text-text-muted">No referrer data yet.</li>
            ) : (
              a.topReferrers.map((ref) => (
                <li
                  key={ref.referrer}
                  className="flex items-center justify-between gap-3 border-b border-brand-navy/5 py-2 text-sm"
                >
                  <span className="truncate font-medium text-brand-navy">{ref.referrer}</span>
                  <span className="shrink-0 text-text-muted">{ref.views}</span>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-brand-navy">Recent visits</h2>
        <ul className="mt-4 space-y-2">
          {a.recent.length === 0 ? (
            <li className="text-sm text-text-muted">Waiting for the first public visit.</li>
          ) : (
            a.recent.map((visit, index) => (
              <li
                key={`${visit.ts}-${index}`}
                className="grid gap-1 border-b border-brand-navy/5 py-2 text-sm sm:grid-cols-[10rem_1fr_1fr]"
              >
                <span className="text-text-muted">
                  {new Date(visit.ts).toLocaleString("en-GB", { hour12: false })}
                </span>
                <span className="font-medium text-brand-navy">{visit.path}</span>
                <span className="truncate text-text-muted">{visit.referrer || "Direct"}</span>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
