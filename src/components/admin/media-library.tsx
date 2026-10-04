"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/lib/media/store";

export function MediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to load media.");
        return;
      }
      setItems(data.items || []);
    } catch {
      setError("Failed to load media.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    setStatus(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/media", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Upload failed.");
        return;
      }
      setStatus("Picture uploaded.");
      await load();
    } catch {
      setError("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function remove(name: string) {
    if (!confirm("Delete this picture? Pages that use it will lose the image.")) return;
    const res = await fetch(`/api/admin/media?name=${encodeURIComponent(name)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      setError("Could not delete that picture.");
      return;
    }
    setStatus("Picture deleted.");
    await load();
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">Media library</h1>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            Upload pictures once, then reuse them anywhere in the website manager. JPG, PNG, WebP,
            GIF, or SVG up to 8 MB.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Uploading…" : "Upload picture"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
          e.target.value = "";
        }}
      />

      {loading ? <p className="mt-8 text-sm text-text-muted">Loading…</p> : null}
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {status ? <p className="mt-4 text-sm font-medium text-green-700">{status}</p> : null}

      {!loading && items.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-brand-navy/20 bg-white p-8 text-center text-sm text-text-muted">
          No pictures yet. Click “Upload picture” to add your first one.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.name}
              className="overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt="" className="aspect-square w-full object-cover" />
              <div className="space-y-2 p-3">
                <p className="truncate text-sm font-semibold text-brand-navy">{item.name}</p>
                <p className="truncate text-xs text-text-muted">{item.url}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn-secondary flex-1 !px-2 !py-1.5 text-xs"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(item.url);
                        setStatus("Picture path copied.");
                      } catch {
                        setStatus(item.url);
                      }
                    }}
                  >
                    Copy path
                  </button>
                  {item.url.startsWith("/uploads/") ? (
                    <button
                      type="button"
                      className="rounded-lg border border-red-200 px-2 py-1.5 text-xs font-semibold text-red-600"
                      onClick={() => void remove(item.name)}
                    >
                      Delete
                    </button>
                  ) : (
                    <span className="rounded-lg bg-surface-soft px-2 py-1.5 text-xs text-text-muted">
                      Brand
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
