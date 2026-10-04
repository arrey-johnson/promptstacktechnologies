import Link from "next/link";
import { CMS_COLLECTIONS } from "@/lib/cms/collections";
import { isZoomBookingConfigured } from "@/lib/booking/config";

export default function AdminDashboardPage() {
  const zoomReady = isZoomBookingConfigured();

  return (
    <div>
      <h1 className="text-3xl font-bold">Promptstack Admin</h1>
      <p className="mt-2 max-w-2xl text-sm text-text-muted">
        Manage every page, service, product, job, blog post, and legal document from this back office.
        Changes save to the local CMS store and appear on the public site immediately.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {CMS_COLLECTIONS.map((item) => (
          <Link
            key={item.key}
            href={`/admin/edit/${item.key}`}
            className="rounded-2xl border border-brand-navy/10 bg-white p-5 hover:border-brand-purple"
          >
            <h2 className="text-lg font-bold">{item.label}</h2>
            <p className="mt-2 text-sm text-text-muted">{item.description}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-brand-navy/10 bg-white p-5">
        <h2 className="text-lg font-bold">Zoom discovery booking</h2>
        <p className="mt-2 text-sm text-text-muted">
          Status:{" "}
          <span className={zoomReady ? "font-semibold text-green-700" : "font-semibold text-amber-700"}>
            {zoomReady ? "Connected" : "Not configured"}
          </span>
        </p>
        <p className="mt-3 max-w-2xl text-xs text-text-muted">
          Create a Zoom Server-to-Server OAuth app, enable the meetings scopes, then set
          <code className="mx-1">ZOOM_ACCOUNT_ID</code>,
          <code className="mx-1">ZOOM_CLIENT_ID</code>,
          <code className="mx-1">ZOOM_CLIENT_SECRET</code>, and
          <code className="mx-1">ZOOM_HOST_EMAIL</code> in <code>.env.local</code>.
          Bookings use Mon–Sat, 8:00–17:00 Africa/Douala, create a Zoom meeting, invite the client by email,
          and keep the slot busy.
        </p>
      </div>
      <div className="mt-8 rounded-2xl border border-brand-navy/10 bg-white p-5">
        <h2 className="text-lg font-bold">Job applications</h2>
        <p className="mt-2 text-sm text-text-muted">
          Review careers applications submitted on the website, download resumes, and update status.
        </p>
        <Link href="/admin/applications" className="btn-primary mt-4 inline-flex">
          Open applications inbox
        </Link>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-secondary">
          View website
        </Link>
      </div>
    </div>
  );
}
