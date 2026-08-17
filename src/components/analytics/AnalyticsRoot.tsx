"use client";

import { Suspense } from "react";
import { AnalyticsRuntime } from "./AnalyticsRuntime";

/** Suspense boundary required for useSearchParams in App Router. */
export function AnalyticsRoot() {
  return (
    <Suspense fallback={null}>
      <AnalyticsRuntime />
    </Suspense>
  );
}
