import type { ReactNode } from "react";
import { Footer, Header } from "@/components/layout";
import { isComingSoonLockActive } from "@/lib/launch";

/**
 * Marketing route group shell — global header and footer for public pages.
 * Coming-soon mode hides chrome so the launch page owns the first viewport.
 */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  if (isComingSoonLockActive()) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
