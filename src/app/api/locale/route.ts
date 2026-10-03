import { NextResponse } from "next/server";
import { LOCALE_COOKIE, isLocale } from "@/lib/i18n/locale";

export async function POST(request: Request) {
  const body = (await request.json()) as { locale?: string };
  if (!isLocale(body.locale)) {
    return NextResponse.json({ message: "Invalid locale." }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true, locale: body.locale });
  response.cookies.set(LOCALE_COOKIE, body.locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}
