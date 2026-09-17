import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isComingSoonBypassPath,
  isComingSoonLockActive,
} from "@/lib/launch";

const DRAFT_MODE_COOKIE = "__prerender_bypass";

export function middleware(request: NextRequest) {
  if (!isComingSoonLockActive()) {
    return NextResponse.next();
  }

  if (request.cookies.has(DRAFT_MODE_COOKIE)) {
    return NextResponse.next();
  }

  if (isComingSoonBypassPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
