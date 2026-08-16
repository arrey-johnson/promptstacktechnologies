import { createClient } from "next-sanity";
import {
  apiVersion,
  dataset,
  getSanityReadToken,
  getStudioProjectId,
  isSanityConfigured,
} from "./env";

/**
 * Published CDN client for ordinary visitors.
 * Only use when isSanityConfigured() is true.
 */
export const sanityClient = createClient({
  projectId: getStudioProjectId(),
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
});

/** Authenticated client for draft preview / migration (server-only token). */
export function getSanityPreviewClient() {
  const token = getSanityReadToken();
  return sanityClient.withConfig({
    token,
    useCdn: false,
    perspective: "previewDrafts",
    stega: {
      enabled: true,
      studioUrl: "/studio",
    },
  });
}

export function assertCanQuerySanity(): boolean {
  return isSanityConfigured();
}
