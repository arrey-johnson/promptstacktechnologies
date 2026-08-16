import { defineLive } from "next-sanity/live";
import { sanityClient } from "./client";
import { getSanityReadToken, isSanityConfigured } from "./env";

/**
 * Server-safe live fetch exports only (no VisualEditing client component).
 * Keeps content-access modules importable from Vitest without next/dynamic.
 */

const token = getSanityReadToken();

// Avoid initializing defineLive under Vitest (client-boundary import issue).
const live =
  isSanityConfigured() && process.env.VITEST !== "true"
    ? defineLive({
        client: sanityClient.withConfig({
          apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-01",
        }),
        serverToken: token,
        browserToken: token,
      })
    : null;

export const sanityFetch = live?.sanityFetch;
export const SanityLive = live?.SanityLive;
