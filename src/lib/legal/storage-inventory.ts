/**
 * Current public-visitor cookie / browser-storage inventory for /cookies.
 * Distinguish public behavior from editor/Draft Mode behavior.
 * Describe only mechanisms that exist in the current implementation.
 */

import { isAnalyticsConfigured } from "@/config/analytics";
import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  ANALYTICS_CONSENT_VALUES,
} from "@/config/analytics";

export type StorageInventoryItem = {
  id: string;
  name: string;
  category: "essential" | "functional" | "analytics" | "editor";
  audience: "public" | "editors";
  mechanism: "cookie" | "localStorage" | "sessionStorage" | "third-party";
  purpose: string;
  lifetime?: string;
};

export const PUBLIC_STORAGE_INVENTORY: StorageInventoryItem[] = [
  {
    id: "attribution",
    name: "Campaign attribution (pst_attribution_v1)",
    category: "functional",
    audience: "public",
    mechanism: "sessionStorage",
    purpose:
      "Temporarily remembers marketing attribution and landing-page context during a Start a Project or Academy application session so the submission can include accurate campaign fields.",
    lifetime: "Browser session",
  },
  {
    id: "turnstile",
    name: "Cloudflare Turnstile",
    category: "essential",
    audience: "public",
    mechanism: "third-party",
    purpose:
      "Protects project inquiry and Academy application forms from automated abuse. Cloudflare may set cookies or similar identifiers as part of that challenge.",
  },
];

export const ANALYTICS_STORAGE_INVENTORY: StorageInventoryItem[] = [
  {
    id: "analytics-consent",
    name: `Analytics preference (${ANALYTICS_CONSENT_STORAGE_KEY})`,
    category: "functional",
    audience: "public",
    mechanism: "localStorage",
    purpose: `Remembers whether you accepted or rejected optional analytics. Values: ${ANALYTICS_CONSENT_VALUES.accepted} | ${ANALYTICS_CONSENT_VALUES.rejected}. Does not store name, email, phone, or form answers.`,
    lifetime: "Until cleared by the visitor or browser storage reset",
  },
  {
    id: "gtm-ga",
    name: "Google Tag Manager / Google Analytics",
    category: "analytics",
    audience: "public",
    mechanism: "third-party",
    purpose:
      "Loads only after analytics consent is accepted and only when a GTM container ID is configured. Used for aggregated traffic and conversion measurement. Rejecting analytics keeps these scripts unloaded.",
  },
  {
    id: "conversion-session",
    name: "Conversion measurement markers (pst_conversion_*_v1)",
    category: "analytics",
    audience: "public",
    mechanism: "sessionStorage",
    purpose:
      "Prevents duplicate conversion events if a confirmation page is refreshed. Contains no personal information.",
    lifetime: "Browser session",
  },
];

export const EDITOR_STORAGE_INVENTORY: StorageInventoryItem[] = [
  {
    id: "draft-mode",
    name: "Next.js Draft Mode",
    category: "editor",
    audience: "editors",
    mechanism: "cookie",
    purpose:
      "Enables authorized Sanity preview / Presentation sessions for editors. Not used for ordinary public browsing.",
  },
];

export function getPublicStorageInventory(): StorageInventoryItem[] {
  const items = [...PUBLIC_STORAGE_INVENTORY];
  if (isAnalyticsConfigured()) {
    items.push(...ANALYTICS_STORAGE_INVENTORY);
  }
  return items;
}

export function getEditorStorageInventory(): StorageInventoryItem[] {
  return [...EDITOR_STORAGE_INVENTORY];
}

/** True when GTM is configured (analytics may activate after consent). */
export function hasMarketingAnalyticsCookies(): boolean {
  return isAnalyticsConfigured();
}
