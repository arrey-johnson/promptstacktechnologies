import type { ReactNode } from "react";
import { Footer, Header } from "@/components/layout";

/**
 * Marketing route group shell — global header and footer for public pages.
 */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
