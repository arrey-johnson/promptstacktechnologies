import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { sanityClient } from "@/sanity/client";
import { getDraftModeSecret, getSanityReadToken, isSanityConfigured } from "@/sanity/env";

function safeRedirectPath(url: string | null | undefined): string {
  if (!url) return "/";
  try {
    // Absolute URLs must match the site; relative paths must start with /
    if (url.startsWith("/") && !url.startsWith("//")) {
      return url;
    }
    const parsed = new URL(url);
    const site = process.env.NEXT_PUBLIC_SITE_URL;
    if (site) {
      const allowed = new URL(site);
      if (parsed.origin === allowed.origin) {
        return `${parsed.pathname}${parsed.search}`;
      }
    }
  } catch {
    // fall through
  }
  return "/";
}

/**
 * Enable Next.js Draft Mode for Sanity Presentation / preview.
 * Requires SANITY_PREVIEW_SECRET (or DRAFT_MODE_SECRET) + read token.
 */
export async function GET(request: Request) {
  if (!isSanityConfigured()) {
    return new Response("Sanity is not configured.", { status: 503 });
  }

  const secret = getDraftModeSecret();
  const token = getSanityReadToken();
  if (!secret || !token) {
    return new Response("Preview secrets are not configured.", { status: 401 });
  }

  const client = sanityClient.withConfig({ token });
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    client,
    request.url,
  );

  if (!isValid) {
    return new Response("Invalid preview secret.", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(safeRedirectPath(redirectTo));
}
