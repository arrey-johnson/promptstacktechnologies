import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Promptstack Studio",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

/**
 * Studio is isolated from marketing shell (no public header/footer).
 */
export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black" data-studio-shell>
      {children}
    </div>
  );
}
