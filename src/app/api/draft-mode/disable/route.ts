import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/** Disable Draft Mode and return to the published site. */
export async function GET(request: Request) {
  const draft = await draftMode();
  draft.disable();

  const url = new URL(request.url);
  const next = url.searchParams.get("redirect");
  const target =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "/";

  return NextResponse.redirect(new URL(target, url.origin));
}
