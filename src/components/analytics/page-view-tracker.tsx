"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function getOrCreateId(key: string) {
  try {
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const next =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(key, next);
    return next;
  } catch {
    return `anon-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
}

function getSessionId() {
  try {
    const existing = sessionStorage.getItem("pst_session");
    if (existing) return existing;
    const next =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem("pst_session", next);
    return next;
  } catch {
    return `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
}

function sendPageView(payload: Record<string, string>) {
  const body = JSON.stringify(payload);
  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      const queued = navigator.sendBeacon("/api/analytics/collect", blob);
      if (queued) return;
    }
  } catch {
    /* fall through to fetch */
  }

  void fetch("/api/analytics/collect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    /* ignore network failures */
  });
}

export function PageViewTracker({ locale }: { locale?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastSent = useRef<string>("");

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname;
    const dedupeKey = `${path}|${locale || ""}`;
    if (lastSent.current === dedupeKey) return;
    lastSent.current = dedupeKey;

    sendPageView({
      path,
      referrer: typeof document !== "undefined" ? document.referrer || "" : "",
      visitorId: getOrCreateId("pst_visitor"),
      sessionId: getSessionId(),
      ...(locale ? { locale } : {}),
    });
  }, [pathname, searchParams, locale]);

  return null;
}
