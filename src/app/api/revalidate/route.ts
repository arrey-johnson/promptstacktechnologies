import { parseBody } from "next-sanity/webhook";
import { type NextRequest, NextResponse } from "next/server";
import { getRevalidateSecret, isSanityConfigured } from "@/sanity/env";
import { applySanityPublicationRevalidation } from "@/sanity/lib/revalidate";
import type { SanityWebhookBody } from "@/sanity/lib/tags";

export const runtime = "nodejs";

/**
 * Authoritative production publication mechanism:
 * Sanity publish → signed webhook → tag revalidation → public pages refresh.
 *
 * SanityLive is intentionally NOT used for ordinary public visitors.
 */
export async function POST(req: NextRequest) {
  try {
    if (!isSanityConfigured()) {
      return NextResponse.json(
        { ok: false, error: "Sanity is not configured." },
        { status: 503 },
      );
    }

    const secret = getRevalidateSecret();
    if (!secret) {
      console.error(
        "[sanity] SANITY_REVALIDATE_SECRET missing — publication webhook unavailable",
      );
      return NextResponse.json(
        { ok: false, error: "Publication webhook is not configured." },
        { status: 503 },
      );
    }

    const { isValidSignature, body } = await parseBody<SanityWebhookBody>(
      req,
      secret,
      true,
    );

    if (isValidSignature === false || isValidSignature === null) {
      return NextResponse.json(
        { ok: false, error: "Invalid signature." },
        { status: 401 },
      );
    }

    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Empty webhook body." },
        { status: 400 },
      );
    }

    const result = applySanityPublicationRevalidation(body);
    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          error:
            result.reason === "no_type"
              ? "Webhook body missing _type."
              : "Unsupported document type for revalidation.",
          tags: result.tags,
        },
        { status: 400 },
      );
    }

    console.info("[sanity] publication revalidated", {
      type: body._type,
      tags: result.tags,
    });

    return NextResponse.json({
      ok: true,
      revalidated: true,
      tags: result.tags,
    });
  } catch (error) {
    console.error("[sanity] webhook revalidation failed", error);
    // 500 allows Sanity to retry; do not expose internals to operators via public pages.
    return NextResponse.json(
      { ok: false, error: "Revalidation failed." },
      { status: 500 },
    );
  }
}

/** Reject non-POST probes without disclosing configuration. */
export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}
