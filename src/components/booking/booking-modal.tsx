"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n/locale";

type Slot = { start: string; end: string; label: string };

const copy = {
  en: {
    title: "Book a discovery call",
    subtitle: "30 minutes · Mon–Sat · 8:00 AM–5:00 PM (Cameroon time)",
    date: "Date",
    slot: "Available times",
    name: "Full name",
    email: "Work email",
    notes: "What should we discuss? (optional)",
    submit: "Confirm booking",
    loading: "Loading…",
    empty: "No open slots this day. Try another date.",
    close: "Close",
    success: "You're booked",
    openMeet: "Open Zoom meeting",
    notConfigured:
      "Zoom booking is almost ready. Add your Zoom Server-to-Server app credentials in .env.local.",
  },
  fr: {
    title: "Réserver un appel découverte",
    subtitle: "30 minutes · Lun–Sam · 8h00–17h00 (heure du Cameroun)",
    date: "Date",
    slot: "Créneaux disponibles",
    name: "Nom complet",
    email: "E-mail professionnel",
    notes: "De quoi souhaitez-vous parler ? (optionnel)",
    submit: "Confirmer la réservation",
    loading: "Chargement…",
    empty: "Aucun créneau ce jour. Essayez une autre date.",
    close: "Fermer",
    success: "C'est réservé",
    openMeet: "Ouvrir la réunion Zoom",
    notConfigured:
      "La réservation Zoom est presque prête. Ajoutez vos identifiants Zoom Server-to-Server dans .env.local.",
  },
} as const;

export function BookingModal({
  open,
  onClose,
  locale,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}) {
  const t = copy[locale] || copy.en;
  const [dates, setDates] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [configured, setConfigured] = useState(true);
  const [pending, setPending] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [meetLink, setMeetLink] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setStatus(null);
    setMeetLink(null);
    setSlot(null);
    fetch("/api/booking/slots")
      .then((r) => r.json())
      .then((data) => {
        setConfigured(data.configured !== false);
        setDates(data.dates || []);
        if (data.dates?.[0]) setDate(data.dates[0]);
      })
      .catch(() => setStatus("Could not load booking calendar."));
  }, [open]);

  useEffect(() => {
    if (!open || !date) return;
    setLoadingSlots(true);
    setSlot(null);
    fetch(`/api/booking/slots?date=${date}`)
      .then((r) => r.json())
      .then((data) => {
        setConfigured(data.configured !== false);
        setSlots(data.slots || []);
      })
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [open, date]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const dateLabel = useMemo(() => {
    if (!date) return "";
    return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Africa/Douala",
    }).format(new Date(`${date}T12:00:00+01:00`));
  }, [date, locale]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!slot) return;
    setPending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          notes,
          date,
          start: slot.start,
          end: slot.end,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.message || "Booking failed.");
        return;
      }
      setMeetLink(data.meetLink || null);
      setStatus(data.message || t.success);
    } catch {
      setStatus("Booking failed.");
    } finally {
      setPending(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-brand-navy/55 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="booking-title" className="text-xl font-bold text-brand-navy">
              {t.title}
            </h2>
            <p className="mt-1 text-sm text-text-muted">{t.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm font-semibold text-brand-navy hover:bg-surface-soft"
          >
            {t.close}
          </button>
        </div>

        {!configured ? (
          <p className="mt-5 rounded-xl bg-surface-soft p-4 text-sm text-brand-navy">
            {t.notConfigured}
          </p>
        ) : null}

        {meetLink || (status && status.toLowerCase().includes("booked")) ? (
          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold text-brand-purple">{status}</p>
            {meetLink ? (
              <a
                href={meetLink}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex"
              >
                {t.openMeet}
              </a>
            ) : null}
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-5 space-y-4">
            <label className="block text-sm font-semibold">
              {t.date}
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1.5 min-h-11 w-full rounded-(--radius-btn) border border-brand-navy/15 px-3 font-normal"
                required
              >
                {dates.map((value) => (
                  <option key={value} value={value}>
                    {new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      timeZone: "Africa/Douala",
                    }).format(new Date(`${value}T12:00:00+01:00`))}
                  </option>
                ))}
              </select>
              {dateLabel ? (
                <span className="mt-1 block text-xs font-normal text-text-muted">
                  {dateLabel}
                </span>
              ) : null}
            </label>

            <div>
              <p className="text-sm font-semibold">{t.slot}</p>
              <div className="mt-2 grid max-h-40 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
                {loadingSlots ? (
                  <p className="col-span-full text-sm text-text-muted">{t.loading}</p>
                ) : slots.length === 0 ? (
                  <p className="col-span-full text-sm text-text-muted">{t.empty}</p>
                ) : (
                  slots.map((item) => {
                    const active = slot?.start === item.start;
                    return (
                      <button
                        key={item.start}
                        type="button"
                        onClick={() => setSlot(item)}
                        className={`rounded-(--radius-btn) border px-2 py-2 text-xs font-semibold ${
                          active
                            ? "border-brand-purple bg-brand-purple text-white"
                            : "border-brand-navy/15 text-brand-navy hover:border-brand-purple"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <label className="block text-sm font-semibold">
              {t.name}
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1.5 min-h-11 w-full rounded-(--radius-btn) border border-brand-navy/15 px-3 font-normal"
              />
            </label>
            <label className="block text-sm font-semibold">
              {t.email}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5 min-h-11 w-full rounded-(--radius-btn) border border-brand-navy/15 px-3 font-normal"
              />
            </label>
            <label className="block text-sm font-semibold">
              {t.notes}
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="mt-1.5 w-full rounded-(--radius-btn) border border-brand-navy/15 px-3 py-2 font-normal"
              />
            </label>

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={pending || !slot || !configured}
            >
              {pending ? t.loading : t.submit}
            </button>
            {status ? <p className="text-sm text-brand-purple">{status}</p> : null}
          </form>
        )}
      </div>
    </div>
  );
}
