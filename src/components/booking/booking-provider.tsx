"use client";

import { useEffect, useState } from "react";
import { BookingModal } from "@/components/booking/booking-modal";
import type { Locale } from "@/lib/i18n/locale";

const BOOK_HREF = "#book-discovery";

function isBookingTrigger(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;
  const anchor = target.closest("a");
  if (!anchor) return null;
  const href = anchor.getAttribute("href") || "";
  if (href === BOOK_HREF || href.endsWith(BOOK_HREF)) return anchor;
  const label = (anchor.textContent || "").toLowerCase();
  if (
    label.includes("discovery call") ||
    label.includes("appel découverte") ||
    label.includes("book a discovery")
  ) {
    return anchor;
  }
  return null;
}

export function BookingProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const anchor = isBookingTrigger(event.target);
      if (!anchor) return;
      event.preventDefault();
      setOpen(true);
    }

    function onHash() {
      if (window.location.hash === BOOK_HREF) {
        setOpen(true);
      }
    }

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return (
    <>
      {children}
      <BookingModal open={open} onClose={() => setOpen(false)} locale={locale} />
    </>
  );
}
