import Link from "next/link";
import { redirect } from "next/navigation";
import { PromptstackLogo } from "@/components/brand/promptstack-logo";
import { AdminLogoutButton } from "@/components/admin/logout-button";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { ADMIN_NAV_GROUPS } from "@/lib/cms/admin-nav";

export default async function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto grid min-h-dvh max-w-7xl gap-0 lg:grid-cols-[15.5rem_1fr]">
      <aside className="border-r border-brand-navy/10 bg-[#1b263b] text-white">
        <div className="sticky top-0 flex max-h-dvh flex-col overflow-y-auto p-4">
          <PromptstackLogo
            className="inline-flex items-center gap-2 [&_.logo-wordmark-name]:text-white [&_.logo-wordmark-sub]:text-white/55"
            href="/admin"
          />
          <p className="mt-4 text-[11px] font-semibold tracking-[0.14em] text-white/55 uppercase">
            Website manager
          </p>

          <nav className="mt-5 space-y-5">
            <div className="space-y-1">
              <Link
                href="/admin"
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/analytics"
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#d8b4e8] hover:bg-white/10"
              >
                Analytics & health
              </Link>
              <Link
                href="/admin/bookings"
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#d8b4e8] hover:bg-white/10"
              >
                Zoom bookings
              </Link>
              <Link
                href="/admin/applications"
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#d8b4e8] hover:bg-white/10"
              >
                Job applications
              </Link>
              <Link
                href="/admin/media"
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#d8b4e8] hover:bg-white/10"
              >
                Picture library
              </Link>
            </div>

            {ADMIN_NAV_GROUPS.map((group) => (
              <div key={group.id}>
                <p className="mb-1.5 px-3 text-[11px] font-semibold tracking-[0.12em] text-white/45 uppercase">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <Link
                      key={item.key}
                      href={`/admin/edit/${item.key}`}
                      className="block rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/10"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-8 border-t border-white/10 pt-4">
            <AdminLogoutButton />
            <Link
              href="/"
              className="mt-2 block rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
            >
              ← View website
            </Link>
          </div>
        </div>
      </aside>
      <div className="bg-surface-soft p-5 sm:p-8">{children}</div>
    </div>
  );
}
