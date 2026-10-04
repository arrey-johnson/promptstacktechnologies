"use client";

import { useEffect, useState } from "react";
import type { StoredBooking } from "@/lib/booking/store";

type Stats = { total: number; upcoming: number; past: number };

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Douala",
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function BookingsConsole() {
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [zoomConnected, setZoomConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<StoredBooking | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to load bookings.");
        return;
      }
      setBookings(data.bookings || []);
      setStats(data.stats || null);
      setZoomConnected(Boolean(data.zoomConnected));
      if (data.bookings?.[0]) setSelected(data.bookings[0]);
    } catch {
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const now = Date.now();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">Zoom bookings</h1>
          <p className="mt-2 text-sm text-text-muted">
            All discovery calls booked on the website.
            {stats ? ` ${stats.upcoming} upcoming · ${stats.past} past · ${stats.total} total.` : null}
          </p>
          <p className="mt-1 text-sm">
            Zoom:{" "}
            <span className={zoomConnected ? "font-semibold text-green-700" : "font-semibold text-amber-700"}>
              {zoomConnected ? "Connected" : "Not configured"}
            </span>
          </p>
        </div>
        <button type="button" onClick={() => void load()} className="btn-secondary">
          Refresh
        </button>
      </div>

      {loading ? <p className="mt-8 text-sm text-text-muted">Loading…</p> : null}
      {error ? <p className="mt-8 text-sm font-semibold text-red-700">{error}</p> : null}

      {!loading && !error && bookings.length === 0 ? (
        <p className="mt-8 text-sm text-text-muted">No Zoom bookings yet.</p>
      ) : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          {bookings.map((item) => {
            const upcoming = Date.parse(item.start) >= now;
            return (
              <button
                key={`${item.id}-${item.start}`}
                type="button"
                onClick={() => setSelected(item)}
                className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                  selected?.id === item.id && selected?.start === item.start
                    ? "border-brand-purple bg-brand-lavender/15"
                    : "border-brand-navy/10 bg-white hover:border-brand-purple/40"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-brand-navy">{item.name}</p>
                    <p className="mt-1 text-sm text-text-muted">{item.email}</p>
                    <p className="mt-2 text-sm font-medium text-brand-navy">
                      {formatWhen(item.start)}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      upcoming ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {upcoming ? "Upcoming" : "Past"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {selected ? (
          <aside className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-brand-navy">{selected.name}</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-semibold text-brand-navy">Email</dt>
                <dd className="mt-1">
                  <a className="text-brand-purple" href={`mailto:${selected.email}`}>
                    {selected.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-brand-navy">When (Africa/Douala)</dt>
                <dd className="mt-1 text-text-muted">{formatWhen(selected.start)}</dd>
              </div>
              {selected.notes ? (
                <div>
                  <dt className="font-semibold text-brand-navy">Notes</dt>
                  <dd className="mt-1 whitespace-pre-wrap text-text-muted">{selected.notes}</dd>
                </div>
              ) : null}
              <div>
                <dt className="font-semibold text-brand-navy">Booked at</dt>
                <dd className="mt-1 text-text-muted">{formatWhen(selected.createdAt)}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              {selected.joinUrl ? (
                <a
                  href={selected.joinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Open Zoom join link
                </a>
              ) : null}
              {selected.startUrl ? (
                <a
                  href={selected.startUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  Host start link
                </a>
              ) : null}
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
