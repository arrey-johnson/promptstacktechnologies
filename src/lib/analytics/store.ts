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

export type AnalyticsBackend = "redis" | "filesystem" | "none";

export type AnalyticsPersistResult = {
  ok: boolean;
  backend: AnalyticsBackend;
  error?: string;
};

type AnalyticsStoreFile = {
  events: AnalyticsEvent[];
};

const DATA_DIR = path.join(process.cwd(), "data", "analytics");
const STORE_FILE = path.join(DATA_DIR, "events.json");
const MAX_EVENTS = 20_000;
const REDIS_LIST_KEY = "pst:analytics:events";

function dayKey(iso: string) {
  return iso.slice(0, 10);
}

function redisConfig() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    "";
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    "";
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

export function isAnalyticsRedisConfigured() {
  return Boolean(redisConfig());
}

async function redisCommand<T = unknown>(command: Array<string | number>): Promise<T> {
  const config = redisConfig();
  if (!config) throw new Error("Redis is not configured");

  const res = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  const payload = (await res.json()) as { result?: T; error?: string };
  if (!res.ok || payload.error) {
    throw new Error(payload.error || `Redis command failed (${res.status})`);
  }
  return payload.result as T;
}

async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    /* read-only hosts */
  }
}

async function filesystemWritable() {
  await ensureDir();
  const probe = path.join(DATA_DIR, `.write-probe-${process.pid}`);
  try {
    await fs.writeFile(probe, "ok", "utf8");
    await fs.unlink(probe);
    return true;
  } catch {
    try {
      await fs.unlink(probe);
    } catch {
      /* ignore */
    }
    return false;
  }
}

async function readFilesystemEvents(): Promise<AnalyticsEvent[]> {
  try {
    await ensureDir();
    const raw = await fs.readFile(STORE_FILE, "utf8");
    const parsed = JSON.parse(raw) as AnalyticsStoreFile;
    return Array.isArray(parsed.events) ? parsed.events : [];
  } catch {
    return [];
  }
}

async function writeFilesystemEvents(events: AnalyticsEvent[]) {
  await ensureDir();
  await fs.writeFile(
    STORE_FILE,
    JSON.stringify({ events } satisfies AnalyticsStoreFile, null, 2),
    "utf8",
  );
}

async function readRedisEvents(): Promise<AnalyticsEvent[]> {
  const rows = await redisCommand<string[]>(["LRANGE", REDIS_LIST_KEY, "0", "-1"]);
  if (!Array.isArray(rows)) return [];
  const events: AnalyticsEvent[] = [];
  for (const row of rows) {
    try {
      const parsed = typeof row === "string" ? JSON.parse(row) : row;
      if (parsed && typeof parsed === "object" && "path" in parsed) {
        events.push(parsed as AnalyticsEvent);
      }
    } catch {
      /* skip bad rows */
    }
  }
  return events;
}

async function appendRedisEvent(event: AnalyticsEvent) {
  await redisCommand(["RPUSH", REDIS_LIST_KEY, JSON.stringify(event)]);
  // Keep only the newest MAX_EVENTS entries.
  await redisCommand(["LTRIM", REDIS_LIST_KEY, `-${MAX_EVENTS}`, "-1"]);
}

export async function getAnalyticsBackend(): Promise<{
  backend: AnalyticsBackend;
  writable: boolean;
  detail: string;
}> {
  if (isAnalyticsRedisConfigured()) {
    try {
      await redisCommand(["PING"]);
      return {
        backend: "redis",
        writable: true,
        detail: "Visitor stats persist in Redis (production-safe).",
      };
    } catch (error) {
      return {
        backend: "none",
        writable: false,
        detail:
          error instanceof Error
            ? `Redis configured but unreachable: ${error.message}`
            : "Redis configured but unreachable.",
      };
    }
  }

  if (await filesystemWritable()) {
    return {
      backend: "filesystem",
      writable: true,
      detail: "Visitor stats persist on this server’s disk (fine for local/VPS).",
    };
  }

  return {
    backend: "none",
    writable: false,
    detail:
      "Visitor tracking cannot save on this host. Add free Upstash Redis env vars (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN) in production.",
  };
}

async function readAllEvents(): Promise<AnalyticsEvent[]> {
  if (isAnalyticsRedisConfigured()) {
    try {
      return await readRedisEvents();
    } catch (error) {
      console.error("[analytics] redis read failed", error);
      // Fall through to filesystem if Redis fails mid-flight.
    }
  }
  return readFilesystemEvents();
}

export async function recordPageView(input: {
  path: string;
  referrer?: string;
  visitorId: string;
  sessionId: string;
  locale?: string;
  userAgent?: string;
}): Promise<AnalyticsPersistResult> {
  const cleanPath = (input.path || "/").slice(0, 300);
  if (cleanPath.startsWith("/admin") || cleanPath.startsWith("/api")) {
    return { ok: true, backend: "none" };
  }

  const event: AnalyticsEvent = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    ts: new Date().toISOString(),
    path: cleanPath,
    referrer: (input.referrer || "").slice(0, 400),
    visitorId: input.visitorId.slice(0, 64),
    sessionId: input.sessionId.slice(0, 64),
    locale: input.locale?.slice(0, 8),
    userAgent: input.userAgent?.slice(0, 200),
  };

  if (isAnalyticsRedisConfigured()) {
    try {
      await appendRedisEvent(event);
      return { ok: true, backend: "redis" };
    } catch (error) {
      console.error("[analytics] redis write failed", error);
      return {
        ok: false,
        backend: "none",
        error: error instanceof Error ? error.message : "Redis write failed",
      };
    }
  }

  try {
    const events = await readFilesystemEvents();
    events.push(event);
    const trimmed =
      events.length > MAX_EVENTS ? events.slice(-MAX_EVENTS) : events;
    await writeFilesystemEvents(trimmed);
    return { ok: true, backend: "filesystem" };
  } catch (error) {
    console.error("[analytics] filesystem write failed", error);
    return {
      ok: false,
      backend: "none",
      error:
        error instanceof Error
          ? error.message
          : "Could not save visitor stats on this host",
    };
  }
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
  backend: AnalyticsBackend;
  writable: boolean;
  persistenceDetail: string;
};

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const [{ backend, writable, detail }, events] = await Promise.all([
    getAnalyticsBackend(),
    readAllEvents(),
  ]);

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
    backend,
    writable,
    persistenceDetail: detail,
  };
}

export function hashVisitorSeed(seed: string) {
  return createHash("sha256").update(seed).digest("hex").slice(0, 32);
}

export function emptyAnalyticsSummary(
  detail = "No visitor data yet.",
): AnalyticsSummary {
  return {
    totalPageViews: 0,
    uniqueVisitors: 0,
    sessions: 0,
    todayPageViews: 0,
    todayVisitors: 0,
    last7DaysPageViews: 0,
    last7DaysVisitors: 0,
    topPages: [],
    topReferrers: [],
    daily: [],
    recent: [],
    backend: "none",
    writable: false,
    persistenceDetail: detail,
  };
}
