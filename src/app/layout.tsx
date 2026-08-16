import type { Metadata } from "next";
import type { ReactNode } from "react";
import { eurostileVariableClassName } from "@/lib/fonts";
import { createRootMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/cn";
import { DraftModeSanityLive } from "@/sanity/live";
import "@/styles/globals.css";

export const metadata: Metadata = createRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(eurostileVariableClassName, "h-full antialiased")}
    >
      <body
        className="flex min-h-full flex-col bg-surface-primary text-text-primary"
        // Browser extensions (e.g. ColorZilla) inject body attributes before hydrate.
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-button)] focus:bg-accent focus:px-4 focus:py-2 focus:text-text-inverse"
        >
          Skip to main content
        </a>
        {children}
        <DraftModeSanityLive />
      </body>
    </html>
  );
}
