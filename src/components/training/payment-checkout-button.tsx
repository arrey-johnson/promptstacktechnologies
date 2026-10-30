"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

type PaymentCheckoutButtonProps = {
  paymentUrl: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
};

export function PaymentCheckoutButton({
  paymentUrl,
  children,
  className,
  title = "Secure checkout",
}: PaymentCheckoutButtonProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const modal =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-end justify-center bg-brand-navy/60 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
            role="presentation"
            onClick={() => setOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="flex h-[96vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-(--radius-media) bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.55)] sm:h-[min(920px,94vh)] sm:rounded-(--radius-media)"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 border-b border-brand-navy/10 px-4 py-3">
                <div>
                  <p id={titleId} className="text-sm font-bold text-brand-navy">
                    {title}
                  </p>
                  <p className="text-xs text-text-muted">MTN Mobile Money · Orange Money</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-(--radius-btn) border border-brand-navy/15 text-brand-navy hover:bg-surface-soft"
                  aria-label="Close checkout"
                >
                  <span aria-hidden className="text-lg leading-none">
                    ×
                  </span>
                </button>
              </div>
              <iframe
                src={paymentUrl}
                title={title}
                className="h-full w-full flex-1 bg-white"
                allow="payment *"
              />
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      {modal}
    </>
  );
}
