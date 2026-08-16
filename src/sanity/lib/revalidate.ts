import { revalidateTag } from "next/cache";
import {
  resolveRevalidateTags,
  type SanityWebhookBody,
} from "./tags";

export type RevalidateWebhookResult =
  | { ok: true; tags: string[] }
  | { ok: false; reason: "no_type" | "no_tags"; tags: string[] };

/**
 * Apply publication invalidation for a validated Sanity webhook body.
 * Safe to call repeatedly; does not mutate CMS or transactional data.
 */
export function applySanityPublicationRevalidation(
  body: SanityWebhookBody,
): RevalidateWebhookResult {
  if (!body._type) {
    return { ok: false, reason: "no_type", tags: [] };
  }

  const tags = resolveRevalidateTags(body);
  if (tags.length === 0) {
    return { ok: false, reason: "no_tags", tags: [] };
  }

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  return { ok: true, tags };
}
