"use client";

import { useEffect, useMemo, useState } from "react";
import { FieldRenderer, LocaleTabs, SaveBar } from "@/components/admin/fields";
import { getAdminNavItem } from "@/lib/cms/admin-nav";
import { ADMIN_SCHEMAS, type ListSchema, type ObjectSchema } from "@/lib/cms/admin-schema";
import type { Locale } from "@/lib/i18n/locale";
import type { CmsCollection } from "@/lib/cms/types";

export function VisualCollectionEditor({
  collection,
  label,
}: {
  collection: CmsCollection;
  label: string;
}) {
  const schema = ADMIN_SCHEMAS[collection];
  const nav = getAdminNavItem(collection);
  const [locale, setLocale] = useState<Locale>("en");
  const [data, setData] = useState<unknown>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<"neutral" | "success" | "error">("neutral");
  const [pending, setPending] = useState(false);
  const [jsonDraft, setJsonDraft] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    setPending(true);
    setStatus(null);
    setSelectedIndex(null);
    fetch(`/api/admin/content?collection=${collection}&locale=${locale}`)
      .then((r) => r.json())
      .then((payload) => {
        if (cancelled) return;
        setData(payload.value);
        setJsonDraft(JSON.stringify(payload.value, null, 2));
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("Failed to load content.");
          setStatusTone("error");
        }
      })
      .finally(() => {
        if (!cancelled) setPending(false);
      });
    return () => {
      cancelled = true;
    };
  }, [collection, locale]);

  async function save(nextValue: unknown = data) {
    setPending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection, value: nextValue, locale }),
      });
      const payload = await res.json();
      if (!res.ok) {
        setStatus(payload.message || "Save failed.");
        setStatusTone("error");
        return;
      }
      setData(nextValue);
      setJsonDraft(JSON.stringify(nextValue, null, 2));
      setStatus(`Saved ${locale === "en" ? "English" : "French"} successfully. The website is updated.`);
      setStatusTone("success");
    } catch {
      setStatus("Save failed. Please try again.");
      setStatusTone("error");
    } finally {
      setPending(false);
    }
  }

  async function saveFromJson() {
    try {
      const parsed = JSON.parse(jsonDraft);
      await save(parsed);
    } catch {
      setStatus("Invalid JSON. Fix the syntax and try again.");
      setStatusTone("error");
    }
  }

  if (data === null && pending) {
    return <p className="text-sm text-text-muted">Loading editor…</p>;
  }

  if (data === null) {
    return <p className="text-sm text-red-600">Could not load this content.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">{label}</h1>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            Edit with simple forms — no technical knowledge needed. Switch language to update English
            and French separately.
          </p>
        </div>
        <LocaleTabs
          locale={locale}
          onChange={(next) => {
            setLocale(next);
          }}
        />
      </div>

      {schema.kind === "object" ? (
        <ObjectEditor
          schema={schema}
          value={data as Record<string, unknown>}
          onChange={setData}
        />
      ) : (
        <ListEditor
          schema={schema}
          value={data as Record<string, unknown>[]}
          onChange={setData}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
      )}

      <details
        className="mt-8 rounded-xl border border-brand-navy/10 bg-white"
        onToggle={(e) => {
          if ((e.target as HTMLDetailsElement).open) {
            setJsonDraft(JSON.stringify(data, null, 2));
          }
        }}
      >
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-text-muted">
          Advanced (JSON) — for technical use only
        </summary>
        <div className="border-t border-brand-navy/10 p-4">
          <p className="mb-3 text-xs text-text-muted">
            Most people should ignore this. Use the forms above instead.
          </p>
          <textarea
            value={jsonDraft}
            onChange={(e) => setJsonDraft(e.target.value)}
            spellCheck={false}
            className="min-h-48 w-full rounded-lg border border-brand-navy/15 bg-surface-soft p-3 font-mono text-xs"
          />
          <button type="button" className="btn-secondary mt-3" onClick={saveFromJson} disabled={pending}>
            Save JSON
          </button>
        </div>
      </details>

      <SaveBar
        pending={pending}
        status={status}
        statusTone={statusTone}
        onSave={() => save()}
        viewHref={nav?.viewHref}
      />
    </div>
  );
}

function ObjectEditor({
  schema,
  value,
  onChange,
}: {
  schema: ObjectSchema;
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
}) {
  return (
    <div className="mt-8 space-y-6">
      {schema.sections.map((section) => (
        <section
          key={section.id}
          className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm"
        >
          <h2 className="text-lg font-bold text-brand-navy">{section.label}</h2>
          {section.description ? (
            <p className="mt-1 text-sm text-text-muted">{section.description}</p>
          ) : null}
          <div className="mt-5 space-y-4">
            {section.fields.map((field) => (
              <FieldRenderer
                key={field.key}
                field={field}
                value={value[field.key]}
                onChange={(next) => onChange({ ...value, [field.key]: next })}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ListEditor({
  schema,
  value,
  onChange,
  selectedIndex,
  onSelect,
}: {
  schema: ListSchema;
  value: Record<string, unknown>[];
  onChange: (value: Record<string, unknown>[]) => void;
  selectedIndex: number | null;
  onSelect: (index: number | null) => void;
}) {
  const items = Array.isArray(value) ? value : [];
  const selected = selectedIndex !== null ? items[selectedIndex] : null;

  const title = useMemo(() => {
    if (!selected) return "";
    return String(selected[schema.titleKey] || schema.itemLabel);
  }, [selected, schema.titleKey, schema.itemLabel]);

  if (selected && selectedIndex !== null) {
    return (
      <div className="mt-8">
        <button
          type="button"
          className="mb-4 text-sm font-semibold text-brand-purple hover:underline"
          onClick={() => onSelect(null)}
        >
          ← Back to all {schema.itemLabel.toLowerCase()}s
        </button>
        <section className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-brand-navy">Editing: {title}</h2>
          <div className="mt-5 space-y-4">
            {schema.fields.map((field) => (
              <FieldRenderer
                key={field.key}
                field={field}
                value={selected[field.key]}
                onChange={(next) => {
                  const copy = [...items];
                  copy[selectedIndex] = { ...selected, [field.key]: next };
                  onChange(copy);
                }}
              />
            ))}
          </div>
          <div className="mt-6 border-t border-brand-navy/10 pt-4">
            <button
              type="button"
              className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              onClick={() => {
                if (confirm(`Delete this ${schema.itemLabel.toLowerCase()}?`)) {
                  onChange(items.filter((_, i) => i !== selectedIndex));
                  onSelect(null);
                }
              }}
            >
              Delete {schema.itemLabel.toLowerCase()}
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-text-muted">
          {items.length} {schema.itemLabel.toLowerCase()}
          {items.length === 1 ? "" : "s"}
        </p>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            const next = [...items, schema.newItem()];
            onChange(next);
            onSelect(next.length - 1);
          }}
        >
          Add {schema.itemLabel.toLowerCase()}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-brand-navy/20 bg-white p-8 text-center">
          <p className="font-semibold text-brand-navy">Nothing here yet</p>
          <p className="mt-1 text-sm text-text-muted">
            Click “Add {schema.itemLabel.toLowerCase()}” to create the first one.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item, index) => {
            const itemTitle = String(item[schema.titleKey] || `${schema.itemLabel} ${index + 1}`);
            const subtitle = schema.subtitleKey
              ? String(item[schema.subtitleKey] || "")
              : "";
            const published =
              typeof item.published === "boolean" ? item.published : undefined;

            return (
              <button
                key={String(item.id || item.slug || index)}
                type="button"
                onClick={() => onSelect(index)}
                className="rounded-2xl border border-brand-navy/10 bg-white p-4 text-left shadow-sm transition hover:border-brand-purple"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold text-brand-navy">{itemTitle}</h3>
                    {subtitle ? (
                      <p className="mt-1 line-clamp-2 text-sm text-text-muted">{subtitle}</p>
                    ) : null}
                  </div>
                  {published !== undefined ? (
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        published
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {published ? "Published" : "Draft"}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-xs font-semibold text-brand-purple">Edit →</p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
