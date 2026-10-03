"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PromptstackLogo } from "@/components/brand/promptstack-logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login failed.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Login failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5">
      <PromptstackLogo className="mb-8 inline-flex items-center gap-3" href="/" />
      <h1 className="text-2xl font-bold">Admin CMS</h1>
      <p className="mt-2 text-sm text-text-muted">
        Sign in to manage all website content.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <label className="block text-sm font-semibold">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1.5 min-h-11 w-full rounded-lg border border-brand-navy/15 px-3 font-normal"
          />
        </label>
        <button type="submit" className="btn-primary w-full" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </button>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>
    </div>
  );
}
