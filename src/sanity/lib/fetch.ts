import type { QueryParams } from "next-sanity";
import { draftMode } from "next/headers";
import { sanityClient } from "../client";
import { isSanityConfigured } from "../env";
import { sanityFetch } from "../live-fetch";

async function readDraftModeEnabled(): Promise<boolean> {
  try {
    const { isEnabled } = await draftMode();
    return isEnabled;
  } catch {
    // generateStaticParams / build contexts have no request draft mode.
    return false;
  }
}

/**
 * Safe CMS fetch wrapper.
 * - No credentials → returns null (callers use local/empty behavior)
 * - Fetch errors → log + return null (never crash marketing pages)
 * - Draft mode uses live fetch with preview perspective when available
 * - `tags` enable webhook-driven on-demand revalidation for public content
 */
export async function fetchSanityData<T>(
  query: string,
  params: QueryParams = {},
  options?: { stega?: boolean; tags?: string[] },
): Promise<T | null> {
  if (!isSanityConfigured()) {
    return null;
  }

  const tags = options?.tags ?? [];

  try {
    const isEnabled = await readDraftModeEnabled();

    if (sanityFetch) {
      const result = await sanityFetch({
        query,
        params,
        perspective: isEnabled ? "previewDrafts" : "published",
        stega: options?.stega ?? isEnabled,
        tags,
      });
      return (result.data as T) ?? null;
    }

    const client = isEnabled
      ? sanityClient.withConfig({
          useCdn: false,
          perspective: "previewDrafts",
          token: process.env.SANITY_API_READ_TOKEN,
        })
      : sanityClient;

    return await client.fetch<T>(query, params, {
      next: {
        revalidate: isEnabled ? 0 : false,
        tags: tags.length > 0 ? tags : undefined,
      },
    });
  } catch (error) {
    console.error("[sanity] fetch failed", error);
    return null;
  }
}
