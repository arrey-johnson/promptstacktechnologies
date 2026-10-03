import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin CMS",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-[#f4f1f6] text-brand-navy">
      {children}
    </div>
  );
}
