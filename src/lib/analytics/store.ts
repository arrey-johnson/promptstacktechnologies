import { promises as fs } from "fs";
import path from "path";
import { createHash } from "crypto";

export type AnalyticsEvent = {
  id: string;
  ts: string;
  path: string;
  referrer: string;
  visitorId: string;
  sessionId: string;
  locale?: string;
  userAgent?: string;
};

type AnalyticsStore = {
  events: AnalyticsEvent[];
};

const DATA_DIR = path.join(process.cwd(), "data", "analytics");
const STORE_FILE = path.join(DATA_DIR, "events.json");
const MAX_EVENTS = 20_000;

async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Ignore on read-only filesystems.
  }
}

async function readStore(): Promise<AnalyticsStore> {
  try {
    await ensureDir();
    const raw = await fs.readFile(STORE_FILE, "utf8");
    const parsed = JSON.parse(raw) as AnalyticsStore;
    return { events: Array.isArray(parsed.events) ? parsed.events : [] };
  } catch {
    return { events: [] };
  }
}

async function writeStore(store: AnalyticsStore) {
  await ensureDir();
  try {
    await fs.writeFile(STORE_FILE, JSON.stringify(store, null, 2), "utf8");
  } catch (error) {
    console.error("[analytics] write failed", error);
  }
}

function dayKey(iso: string) {
  return iso.slice(0, 10);
}

export async function recordPageView(input: {
  path: string;
  referrer?: string;
  visitorId: string;
  sessionId: string;
  locale?: string;
  userAgent?: string;
}) {
  const store = await readStore();
  const cleanPath = (input.path || "/").slice(0, 300);
  if (cleanPath.startsWith("/admin") || cleanPath.startsWith("/api")) return;

  store.events.push({
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    ts: new Date().toISOString(),
    path: cleanPath,
    referrer: (input.referrer || "").slice(0, 400),
    visitorId: input.visitorId.slice(0, 64),
    sessionId: input.sessionId.slice(0, 64),
    locale: input.locale?.slice(0, 8),
    userAgent: input.userAgent?.slice(0, 200),
  });

  if (store.events.length > MAX_EVENTS) {
    store.events = store.events.slice(-MAX_EVENTS);
  }

  await writeStore(store);
}

export type AnalyticsSummary = {
  totalPageViews: number;
  uniqueVisitors: number;
  sessions: number;
  todayPageViews: number;
  todayVisitors: number;
  last7DaysPageViews: number;
  last7DaysVisitors: number;
  topPages: Array<{ path: string; views: number }>;
  topReferrers: Array<{ referrer: string; views: number }>;
  daily: Array<{ date: string; pageViews: number; visitors: number }>;
  recent: Array<{ ts: string; path: string; referrer: string }>;
};

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const { events } = await readStore();
  const now = new Date();
  const today = dayKey(now.toISOString());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekAgoKey = dayKey(weekAgo.toISOString());

  const pageCounts = new Map<string, number>();
  const referrerCounts = new Map<string, number>();
  const dailyViews = new Map<string, number>();
  const dailyVisitors = new Map<string, Set<string>>();
  const allVisitors = new Set<string>();
  const allSessions = new Set<string>();
  const todayVisitors = new Set<string>();
  const weekVisitors = new Set<string>();
  let todayPageViews = 0;
  let last7DaysPageViews = 0;

  for (const event of events) {
    allVisitors.add(event.visitorId);
    allSessions.add(event.sessionId);
    pageCounts.set(event.path, (pageCounts.get(event.path) || 0) + 1);

    const ref = event.referrer?.trim() || "Direct / unknown";
    let refLabel = ref;
    try {
      if (ref.startsWith("http")) refLabel = new URL(ref).hostname;
    } catch {
      /* keep */
    }
    referrerCounts.set(refLabel, (referrerCounts.get(refLabel) || 0) + 1);

    const day = dayKey(event.ts);
    dailyViews.set(day, (dailyViews.get(day) || 0) + 1);
    if (!dailyVisitors.has(day)) dailyVisitors.set(day, new Set());
    dailyVisitors.get(day)!.add(event.visitorId);

    if (day === today) {
      todayPageViews += 1;
      todayVisitors.add(event.visitorId);
    }
    if (day >= weekAgoKey) {
      last7DaysPageViews += 1;
      weekVisitors.add(event.visitorId);
    }
  }

  const topPages = [...pageCounts.entries()]
    .map(([pathName, views]) => ({ path: pathName, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  const topReferrers = [...referrerCounts.entries()]
    .map(([referrer, views]) => ({ referrer, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 8);

  const daily: AnalyticsSummary["daily"] = [];
  for (let i = 13; i >= 0; i -= 1) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const key = dayKey(d.toISOString());
    daily.push({
      date: key,
      pageViews: dailyViews.get(key) || 0,
      visitors: dailyVisitors.get(key)?.size || 0,
    });
  }

  const recent = [...events]
    .slice(-20)
    .reverse()
    .map((e) => ({ ts: e.ts, path: e.path, referrer: e.referrer || "Direct" }));

  return {
    totalPageViews: events.length,
    uniqueVisitors: allVisitors.size,
    sessions: allSessions.size,
    todayPageViews,
    todayVisitors: todayVisitors.size,
    last7DaysPageViews,
    last7DaysVisitors: weekVisitors.size,
    topPages,
    topReferrers,
    daily,
    recent,
  };
}

/** Stable anonymous id helper for server-side hashing if needed. */
export function hashVisitorSeed(seed: string) {
  return createHash("sha256").update(seed).digest("hex").slice(0, 32);
}
