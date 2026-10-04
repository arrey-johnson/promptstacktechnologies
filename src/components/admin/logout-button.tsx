"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton({ className }: { className?: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className={
        className ||
        "w-full rounded-lg border border-white/20 px-3 py-2 text-left text-sm font-semibold text-white hover:bg-white/10"
      }
    >
      Sign out
    </button>
  );
}
