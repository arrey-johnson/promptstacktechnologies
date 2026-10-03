import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { getCmsData, resetCmsToSeed, updateCollection } from "@/lib/cms/store";
import { normalizeLocale, type Locale } from "@/lib/i18n/locale";
import type { CmsCollection, CmsData } from "@/lib/cms/types";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const locale = normalizeLocale(searchParams.get("locale"));
  const collection = searchParams.get("collection") as CmsCollection | null;
  const data = await getCmsData(locale);
  if (!collection) return NextResponse.json({ locale, data });
  if (!(collection in data)) {
    return NextResponse.json({ message: "Unknown collection" }, { status: 400 });
  }
  return NextResponse.json({ locale, collection, value: data[collection] });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    collection?: CmsCollection;
    value?: CmsData[CmsCollection];
    reset?: boolean;
    locale?: Locale;
  };
  const locale = normalizeLocale(body.locale);

  if (body.reset) {
    const data = await resetCmsToSeed(locale);
    return NextResponse.json({ ok: true, locale, data });
  }

  if (!body.collection || body.value === undefined) {
    return NextResponse.json({ message: "collection and value required" }, { status: 400 });
  }

  const data = await updateCollection(body.collection, body.value, locale);
  return NextResponse.json({ ok: true, locale, data });
}
