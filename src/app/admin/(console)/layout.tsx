import Link from "next/link";
import { redirect } from "next/navigation";
import { PromptstackLogo } from "@/components/brand/promptstack-logo";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { CMS_COLLECTIONS } from "@/lib/cms/collections";
import { AdminLogoutButton } from "@/components/admin/logout-button";

export default async function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto grid min-h-dvh max-w-7xl gap-0 lg:grid-cols-[16rem_1fr]">
      <aside className="border-r border-brand-navy/10 bg-white p-5">
        <PromptstackLogo className="inline-flex items-center gap-2" href="/" />
        <p className="mt-4 text-xs font-semibold tracking-wide text-brand-purple uppercase">
          Content CMS
        </p>
        <nav className="mt-4 space-y-1">
          <Link href="/admin" className="block rounded-lg px-3 py-2 text-sm font-semibold hover:bg-surface-soft">
            Dashboard
          </Link>
          <Link
            href="/admin/applications"
            className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-purple hover:bg-surface-soft"
          >
            Job applications
          </Link>
          {CMS_COLLECTIONS.map((item) => (
            <Link
              key={item.key}
              href={`/admin/edit/${item.key}`}
              className="block rounded-lg px-3 py-2 text-sm text-brand-navy hover:bg-surface-soft"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8">
          <AdminLogoutButton />
        </div>
      </aside>
      <div className="p-5 sm:p-8">{children}</div>
    </div>
  );
}
