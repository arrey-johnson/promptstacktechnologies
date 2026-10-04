"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/locale";
import type { FieldDef } from "@/lib/cms/admin-schema";

export function LocaleTabs({
  locale,
  onChange,
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-brand-navy/15 bg-white p-0.5">
      {(["en", "fr"] as Locale[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
          className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
            locale === code ? "bg-brand-purple text-white" : "text-brand-navy hover:bg-surface-soft"
          }`}
        >
          {code === "en" ? "English" : "Français"}
        </button>
      ))}
    </div>
  );
}

export function SaveBar({
  pending,
  status,
  statusTone = "neutral",
  onSave,
  viewHref,
}: {
  pending: boolean;
  status: string | null;
  statusTone?: "neutral" | "success" | "error";
  onSave: () => void;
  viewHref?: string;
}) {
  const tone =
    statusTone === "success"
      ? "text-green-700"
      : statusTone === "error"
        ? "text-red-600"
        : "text-brand-purple";

  return (
    <div className="sticky bottom-0 z-10 -mx-5 mt-8 border-t border-brand-navy/10 bg-white/95 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn-primary" onClick={onSave} disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </button>
        {viewHref ? (
          <a href={viewHref} target="_blank" rel="noreferrer" className="btn-secondary">
            View page
          </a>
        ) : null}
        {status ? <p className={`text-sm font-medium ${tone}`}>{status}</p> : null}
      </div>
    </div>
  );
}

function FieldLabel({
  label,
  help,
  htmlFor,
}: {
  label: string;
  help?: string;
  htmlFor?: string;
}) {
  return (
    <div className="mb-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-brand-navy">
        {label}
      </label>
      {help ? <p className="mt-0.5 text-xs text-text-muted">{help}</p> : null}
    </div>
  );
}

const inputClass =
  "min-h-11 w-full rounded-lg border border-brand-navy/15 bg-white px-3 text-sm text-brand-navy outline-none focus:border-brand-purple";
const textareaClass =
  "min-h-28 w-full rounded-lg border border-brand-navy/15 bg-white px-3 py-2 text-sm text-brand-navy outline-none focus:border-brand-purple";

export function TextField({
  label,
  help,
  value,
  onChange,
}: {
  label: string;
  help?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <FieldLabel label={label} help={help} htmlFor={id} />
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

export function TextAreaField({
  label,
  help,
  value,
  onChange,
}: {
  label: string;
  help?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <FieldLabel label={label} help={help} htmlFor={id} />
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={textareaClass}
      />
    </div>
  );
}

export function ToggleField({
  label,
  help,
  value,
  onChange,
}: {
  label: string;
  help?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-brand-navy/10 bg-white p-3">
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 accent-[rgb(168_0_230)]"
      />
      <span>
        <span className="block text-sm font-semibold text-brand-navy">{label}</span>
        {help ? <span className="mt-0.5 block text-xs text-text-muted">{help}</span> : null}
      </span>
    </label>
  );
}

export function ImageField({
  label,
  help,
  value,
  onChange,
}: {
  label: string;
  help?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const src = value?.trim();
  const [uploading, setUploading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [library, setLibrary] = useState<Array<{ name: string; url: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/media", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Upload failed.");
        return;
      }
      onChange(data.item.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function openLibrary() {
    setPickerOpen(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (res.ok) setLibrary(data.items || []);
    } catch {
      setError("Could not load your picture library.");
    }
  }

  return (
    <div>
      <div className="mb-1.5">
        <p className="text-sm font-semibold text-brand-navy">{label}</p>
        <p className="mt-0.5 text-xs text-text-muted">
          {help || "Upload a new picture or pick one you already uploaded. No tech skills needed."}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-primary"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Uploading…" : "Upload picture"}
        </button>
        <button type="button" className="btn-secondary" onClick={() => void openLibrary()}>
          Choose from library
        </button>
        {src ? (
          <button
            type="button"
            className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600"
            onClick={() => onChange("")}
          >
            Remove picture
          </button>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void uploadFile(file);
          e.target.value = "";
        }}
      />

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}

      {src ? (
        <div className="mt-3 overflow-hidden rounded-lg border border-brand-navy/10 bg-surface-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src.split("?")[0]} alt="" className="h-40 w-full object-cover" />
          <p className="truncate px-3 py-2 text-xs text-text-muted">{src}</p>
        </div>
      ) : (
        <p className="mt-3 rounded-lg border border-dashed border-brand-navy/20 bg-white px-3 py-6 text-center text-sm text-text-muted">
          No picture selected yet.
        </p>
      )}

      {pickerOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/50 p-4">
          <div className="max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-brand-navy/10 px-5 py-4">
              <div>
                <h3 className="text-lg font-bold text-brand-navy">Picture library</h3>
                <p className="text-sm text-text-muted">Click a picture to use it.</p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-brand-navy/15 px-3 py-1.5 text-sm font-semibold"
                onClick={() => setPickerOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="max-h-[65vh] overflow-y-auto p-5">
              {library.length === 0 ? (
                <p className="text-sm text-text-muted">
                  No uploaded pictures yet. Use “Upload picture” first.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {library.map((item) => (
                    <button
                      key={item.url}
                      type="button"
                      className="overflow-hidden rounded-xl border border-brand-navy/10 text-left hover:border-brand-purple"
                      onClick={() => {
                        onChange(item.url);
                        setPickerOpen(false);
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.url} alt="" className="aspect-square w-full object-cover" />
                      <p className="truncate px-2 py-1.5 text-[11px] text-text-muted">{item.name}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function moveItem<T>(list: T[], index: number, direction: -1 | 1): T[] {
  const next = index + direction;
  if (next < 0 || next >= list.length) return list;
  const copy = [...list];
  const [item] = copy.splice(index, 1);
  copy.splice(next, 0, item);
  return copy;
}

export function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  switch (field.type) {
    case "text":
      return (
        <TextField
          label={field.label}
          help={field.help}
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
        />
      );
    case "textarea":
      return (
        <TextAreaField
          label={field.label}
          help={field.help}
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
        />
      );
    case "boolean":
      return (
        <ToggleField
          label={field.label}
          help={field.help}
          value={Boolean(value)}
          onChange={onChange}
        />
      );
    case "image":
      return (
        <ImageField
          label={field.label}
          help={field.help}
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
        />
      );
    case "cta":
    case "link":
    case "object": {
      const obj = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
      const fields = field.fields || [];
      return (
        <div className="space-y-3 rounded-xl border border-brand-navy/10 bg-white p-4">
          <p className="text-sm font-bold text-brand-navy">{field.label}</p>
          {field.help ? <p className="text-xs text-text-muted">{field.help}</p> : null}
          <div className="space-y-3">
            {fields.map((child) => (
              <FieldRenderer
                key={child.key}
                field={child}
                value={obj[child.key]}
                onChange={(next) => onChange({ ...obj, [child.key]: next })}
              />
            ))}
          </div>
        </div>
      );
    }
    case "stringList": {
      const list = Array.isArray(value) ? (value as string[]) : [];
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-brand-navy">{field.label}</p>
              {field.help ? <p className="text-xs text-text-muted">{field.help}</p> : null}
            </div>
            <button
              type="button"
              className="rounded-lg border border-brand-navy/15 px-3 py-1.5 text-xs font-semibold hover:bg-surface-soft"
              onClick={() => onChange([...list, field.newItem ? String(field.newItem()) : ""])}
            >
              Add {field.itemLabel || "item"}
            </button>
          </div>
          <div className="space-y-2">
            {list.map((item, index) => (
              <div key={index} className="flex gap-2">
                <textarea
                  value={item}
                  onChange={(e) => {
                    const next = [...list];
                    next[index] = e.target.value;
                    onChange(next);
                  }}
                  className="min-h-16 flex-1 rounded-lg border border-brand-navy/15 bg-white px-3 py-2 text-sm"
                />
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    className="rounded border border-brand-navy/10 px-2 py-1 text-xs"
                    onClick={() => onChange(moveItem(list, index, -1))}
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="rounded border border-brand-navy/10 px-2 py-1 text-xs"
                    onClick={() => onChange(moveItem(list, index, 1))}
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="rounded border border-red-200 px-2 py-1 text-xs text-red-600"
                    onClick={() => onChange(list.filter((_, i) => i !== index))}
                    aria-label="Remove"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            {list.length === 0 ? (
              <p className="text-xs text-text-muted">No items yet. Click Add to create one.</p>
            ) : null}
          </div>
        </div>
      );
    }
    case "linkList":
    case "featureList":
    case "objectList": {
      const list = Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
      const fields = field.fields || [];
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-brand-navy">{field.label}</p>
              {field.help ? <p className="text-xs text-text-muted">{field.help}</p> : null}
            </div>
            <button
              type="button"
              className="rounded-lg border border-brand-navy/15 px-3 py-1.5 text-xs font-semibold hover:bg-surface-soft"
              onClick={() =>
                onChange([
                  ...list,
                  (field.newItem?.() as Record<string, unknown>) ||
                    Object.fromEntries(fields.map((f) => [f.key, f.type === "stringList" ? [] : ""])),
                ])
              }
            >
              Add {field.itemLabel || "item"}
            </button>
          </div>
          <div className="space-y-3">
            {list.map((item, index) => (
              <div
                key={index}
                className="space-y-3 rounded-xl border border-brand-navy/10 bg-surface-soft/60 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold tracking-wide text-brand-purple uppercase">
                    {field.itemLabel || "Item"} {index + 1}
                  </p>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      className="rounded border border-brand-navy/10 bg-white px-2 py-1 text-xs"
                      onClick={() => onChange(moveItem(list, index, -1))}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="rounded border border-brand-navy/10 bg-white px-2 py-1 text-xs"
                      onClick={() => onChange(moveItem(list, index, 1))}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="rounded border border-red-200 bg-white px-2 py-1 text-xs text-red-600"
                      onClick={() => {
                        if (confirm(`Remove this ${field.itemLabel || "item"}?`)) {
                          onChange(list.filter((_, i) => i !== index));
                        }
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  {fields.map((child) => (
                    <FieldRenderer
                      key={child.key}
                      field={child}
                      value={item[child.key]}
                      onChange={(next) => {
                        const copy = [...list];
                        copy[index] = { ...item, [child.key]: next };
                        onChange(copy);
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
            {list.length === 0 ? (
              <p className="text-xs text-text-muted">No items yet. Click Add to create one.</p>
            ) : null}
          </div>
        </div>
      );
    }
    default:
      return null;
  }
}
