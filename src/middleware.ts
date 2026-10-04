import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REDIRECTS: Record<string, string> = {
  "/solutions/software": "/services",
  "/solutions/ai-automation": "/services",
  "/solutions/digital-marketing": "/services",
  "/academy": "/services",
  "/academy/programs": "/services",
  "/academy/how-we-teach": "/services",
  "/academy/apply": "/contact",
  "/academy/application-received": "/contact",
  "/company/about": "/about",
  "/insights": "/blog",
  "/work": "/portfolio",
  "/products": "/portfolio",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (REDIRECTS[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = REDIRECTS[pathname];
    url.search = pathname.includes("apply") ? "?subject=Academy%20Enquiry" : "";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/insights/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace("/insights/", "/blog/");
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/work/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace("/work/", "/portfolio/");
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/products/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/portfolio";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/academy/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/services";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/solutions/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/services";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/solutions/:path*",
    "/academy/:path*",
    "/company/:path*",
    "/insights/:path*",
    "/work/:path*",
    "/products",
    "/products/:path*",
  ],
};
