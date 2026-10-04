import Link from "next/link";
import { ADMIN_NAV_GROUPS } from "@/lib/cms/admin-nav";
import { getDashboardOverview } from "@/lib/admin/health";

function formatWhen(iso?: string | null) {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Douala",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function AdminDashboardPage() {
  const overview = await getDashboardOverview();
  const a = overview.analytics;

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-navy">Dashboard</h1>
      <p className="mt-2 max-w-2xl text-sm text-text-muted">
        Website health, visitors, Zoom bookings, and quick links to edit content — no technical
        skills needed.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-brand-purple uppercase">
            Visitors today
          </p>
          <p className="mt-2 text-3xl font-bold text-brand-navy">{a.todayVisitors}</p>
          <p className="mt-1 text-xs text-text-muted">{a.todayPageViews} page views</p>
        </div>
        <div className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-brand-purple uppercase">
            Last 7 days
          </p>
          <p className="mt-2 text-3xl font-bold text-brand-navy">{a.last7DaysVisitors}</p>
          <p className="mt-1 text-xs text-text-muted">{a.last7DaysPageViews} page views</p>
        </div>
        <div className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-brand-purple uppercase">
            Website health
          </p>
          <p className="mt-2 text-3xl font-bold text-brand-navy">{overview.healthScore}%</p>
          <p className="mt-1 text-xs text-text-muted">
            {overview.zoomConnected ? "Zoom connected" : "Zoom needs setup"}
          </p>
        </div>
        <div className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-brand-purple uppercase">
            Upcoming bookings
          </p>
          <p className="mt-2 text-3xl font-bold text-brand-navy">{overview.bookings.upcoming}</p>
          <p className="mt-1 text-xs text-text-muted">
            Next: {formatWhen(overview.bookings.next?.start)}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Link
          href="/admin/analytics"
          className="rounded-2xl border border-brand-purple/25 bg-white p-5 shadow-sm hover:border-brand-purple"
        >
          <p className="text-xs font-semibold tracking-wide text-brand-purple uppercase">Analytics</p>
          <h2 className="mt-2 text-lg font-bold text-brand-navy">Visitors & health</h2>
          <p className="mt-2 text-sm text-text-muted">
            {a.uniqueVisitors} all-time visitors · {a.totalPageViews} page views. Open full report.
          </p>
        </Link>
        <Link
          href="/admin/bookings"
          className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm hover:border-brand-purple"
        >
          <p className="text-xs font-semibold tracking-wide text-brand-purple uppercase">Bookings</p>
          <h2 className="mt-2 text-lg font-bold text-brand-navy">Zoom discovery calls</h2>
          <p className="mt-2 text-sm text-text-muted">
            {overview.bookings.total} bookings total. View guests, times, and Zoom links.
          </p>
          {overview.recentBookings[0] ? (
            <p className="mt-3 text-xs text-text-muted">
              Latest: {overview.recentBookings[0].name} ·{" "}
              {formatWhen(overview.recentBookings[0].start)}
            </p>
          ) : null}
        </Link>
        <Link
          href="/admin/applications"
          className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm hover:border-brand-purple"
        >
          <p className="text-xs font-semibold tracking-wide text-brand-purple uppercase">Inbox</p>
          <h2 className="mt-2 text-lg font-bold text-brand-navy">Job applications</h2>
          <p className="mt-2 text-sm text-text-muted">
            {overview.applications.newCount} new · {overview.applications.total} total
          </p>
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/media"
          className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm hover:border-brand-purple"
        >
          <p className="text-xs font-semibold tracking-wide text-brand-purple uppercase">Media</p>
          <h2 className="mt-2 text-lg font-bold text-brand-navy">Picture library</h2>
          <p className="mt-2 text-sm text-text-muted">
            {overview.mediaCount} uploaded picture{overview.mediaCount === 1 ? "" : "s"}. Upload and
            reuse images without touching file paths.
          </p>
        </Link>
        <section className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-brand-purple uppercase">Health</p>
          <h2 className="mt-2 text-lg font-bold text-brand-navy">System checks</h2>
          <ul className="mt-3 space-y-2">
            {overview.health.slice(0, 5).map((check) => (
              <li key={check.id} className="flex items-center gap-2 text-sm">
                <span
                  className={`h-2 w-2 rounded-full ${
                    check.status === "ok"
                      ? "bg-green-500"
                      : check.status === "warn"
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                />
                <span className="font-medium text-brand-navy">{check.label}</span>
                <span className="truncate text-text-muted">— {check.detail}</span>
              </li>
            ))}
          </ul>
          <Link href="/admin/analytics" className="mt-3 inline-block text-sm font-semibold text-brand-purple">
            Full health & analytics →
          </Link>
        </section>
      </div>

      <div className="mt-10 space-y-8">
        {ADMIN_NAV_GROUPS.map((group) => (
          <section key={group.id}>
            <h2 className="text-sm font-semibold tracking-[0.12em] text-brand-navy/50 uppercase">
              {group.label}
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {group.items.map((item) => (
                <Link
                  key={item.key}
                  href={`/admin/edit/${item.key}`}
                  className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm transition hover:border-brand-purple"
                >
                  <h3 className="text-base font-bold text-brand-navy">{item.label}</h3>
                  <p className="mt-2 text-sm text-text-muted">{item.description}</p>
                  <p className="mt-3 text-xs font-semibold text-brand-purple">Open editor →</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
