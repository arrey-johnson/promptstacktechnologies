"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function getOrCreateId(key: string) {
  try {
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const next =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(key, next);
    return next;
  } catch {
    return `anon-${Date.now()}`;
  }
}

function getSessionId() {
  try {
    const existing = sessionStorage.getItem("pst_session");
    if (existing) return existing;
    const next =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem("pst_session", next);
    return next;
  } catch {
    return `session-${Date.now()}`;
  }
}

export function PageViewTracker({ locale }: { locale?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname;

    void fetch("/api/analytics/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path,
        referrer: document.referrer || "",
        visitorId: getOrCreateId("pst_visitor"),
        sessionId: getSessionId(),
        locale,
      }),
      keepalive: true,
    }).catch(() => {
      /* ignore beacon failures */
    });
  }, [pathname, searchParams, locale]);

  return null;
}
