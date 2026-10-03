import type { Metadata } from "next";
import "./globals.css";
import { getCollection } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getCollection("settings");
  return {
    title: {
      default: settings.seo.title,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.seo.description,
    icons: {
      icon: [{ url: "/favicon.png", type: "image/png" }],
      apple: [{ url: "/favicon.png", type: "image/png" }],
      shortcut: ["/favicon.png"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
