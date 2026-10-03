"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/locale";
import type { CmsCollection } from "@/lib/cms/types";

export function CollectionEditor({
  collection,
  label,
}: {
  collection: CmsCollection;
  label: string;
}) {
  const [locale, setLocale] = useState<Locale>("en");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    fetch(`/api/admin/content?collection=${collection}&locale=${locale}`)
      .then((r) => r.json())
      .then((data) => {
        setValue(JSON.stringify(data.value, null, 2));
        setStatus(null);
      })
      .catch(() => setStatus("Failed to load content."))
      .finally(() => setPending(false));
  }, [collection, locale]);

  async function save() {
    setPending(true);
    setStatus(null);
    try {
      const parsed = JSON.parse(value);
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection, value: parsed, locale }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.message || "Save failed.");
        return;
      }
      setStatus(`Saved (${locale.toUpperCase()}). Public pages will use this content.`);
    } catch {
      setStatus("Invalid JSON. Fix the syntax and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">{label}</h1>
      <p className="mt-2 text-sm text-text-muted">
        Edit this collection as JSON. Switch language to manage English and French separately.
      </p>
      <div className="mt-4 inline-flex rounded-lg border border-brand-navy/15 p-0.5">
        {(["en", "fr"] as Locale[]).map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
              locale === code ? "bg-brand-purple text-white" : "text-brand-navy"
            }`}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        spellCheck={false}
        className="mt-6 min-h-[28rem] w-full rounded-2xl border border-brand-navy/15 bg-white p-4 font-mono text-xs leading-5"
      />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" className="btn-primary" onClick={save} disabled={pending}>
          {pending ? "Working…" : `Save ${locale.toUpperCase()}`}
        </button>
        {status ? <p className="text-sm text-brand-purple">{status}</p> : null}
      </div>
    </div>
  );
}
