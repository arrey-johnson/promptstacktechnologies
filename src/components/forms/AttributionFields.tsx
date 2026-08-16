"use client";

import { useSyncExternalStore } from "react";

type Attribution = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  landingPage: string;
};

const STORAGE_KEY = "pst_attribution_v1";
const EMPTY: Attribution = {
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  utmTerm: "",
  landingPage: "",
};

let cachedClientAttribution: Attribution | null = null;

function readStored(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}

function captureFromLocation(): Attribution {
  if (cachedClientAttribution) {
    return cachedClientAttribution;
  }

  const params = new URLSearchParams(window.location.search);
  const existing = readStored();

  const next: Attribution = {
    utmSource: params.get("utm_source") || existing?.utmSource || "",
    utmMedium: params.get("utm_medium") || existing?.utmMedium || "",
    utmCampaign: params.get("utm_campaign") || existing?.utmCampaign || "",
    utmContent: params.get("utm_content") || existing?.utmContent || "",
    utmTerm: params.get("utm_term") || existing?.utmTerm || "",
    landingPage:
      existing?.landingPage ||
      `${window.location.pathname}${window.location.search}`,
  };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage failures.
  }

  cachedClientAttribution = next;
  return next;
}

function subscribe() {
  return () => {};
}

function getClientAttribution() {
  return captureFromLocation();
}

function getServerAttribution() {
  return EMPTY;
}

/** Hidden attribution fields — never shown to the visitor. */
export function AttributionFields() {
  const attribution = useSyncExternalStore(
    subscribe,
    getClientAttribution,
    getServerAttribution,
  );

  return (
    <>
      <input type="hidden" name="utmSource" value={attribution.utmSource} />
      <input type="hidden" name="utmMedium" value={attribution.utmMedium} />
      <input type="hidden" name="utmCampaign" value={attribution.utmCampaign} />
      <input type="hidden" name="utmContent" value={attribution.utmContent} />
      <input type="hidden" name="utmTerm" value={attribution.utmTerm} />
      <input type="hidden" name="landingPage" value={attribution.landingPage} />
    </>
  );
}
