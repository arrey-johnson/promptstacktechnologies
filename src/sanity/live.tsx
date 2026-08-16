import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { SanityLive } from "./live-fetch";

/**
 * Content refresh strategy (Next.js 16 + next-sanity v13):
 *
 * PUBLIC VISITORS → cached published fetches + webhook tag revalidation
 *   (authoritative: POST /api/revalidate with SANITY_REVALIDATE_SECRET)
 * DRAFT MODE → SanityLive + Visual Editing only while draft is enabled
 *
 * Do not mount SanityLive globally for ordinary visitors.
 */

export { sanityFetch, SanityLive } from "./live-fetch";

/** Render Live + Visual Editing only for authorized draft/presentation sessions. */
export async function DraftModeSanityLive() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (
    <>
      {SanityLive ? <SanityLive /> : null}
      <VisualEditing />
    </>
  );
}
