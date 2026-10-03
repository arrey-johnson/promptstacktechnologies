import { NextResponse } from "next/server";
import { getCmsData } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";
import type { CmsCollection } from "@/lib/cms/types";

export async function GET(request: Request) {
  const locale = await getRequestLocale();
  const { searchParams } = new URL(request.url);
  const keys = (searchParams.get("keys") || "")
    .split(",")
    .map((key) => key.trim())
    .filter(Boolean) as CmsCollection[];

  const data = await getCmsData(locale);
  if (!keys.length) {
    return NextResponse.json({ locale, ...data });
  }

  const payload: Partial<Record<CmsCollection, unknown>> & { locale: string } = {
    locale,
  };
  for (const key of keys) {
    if (key in data) payload[key] = data[key];
  }
  return NextResponse.json(payload);
}
