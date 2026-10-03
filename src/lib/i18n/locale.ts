import { cookies } from "next/headers";

export const LOCALE_COOKIE = "pst_locale";
export type Locale = "en" | "fr";

export const LOCALES: Locale[] = ["en", "fr"];

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "fr";
}

export function normalizeLocale(value: string | undefined | null): Locale {
  return value === "fr" ? "fr" : "en";
}

export async function getRequestLocale(): Promise<Locale> {
  const jar = await cookies();
  return normalizeLocale(jar.get(LOCALE_COOKIE)?.value);
}
