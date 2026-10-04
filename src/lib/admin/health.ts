import { promises as fs } from "fs";
import path from "path";
import { isZoomBookingConfigured } from "@/lib/booking/config";
import {
  getBookingStats,
  listBookings,
  type BookingStats,
  type StoredBooking,
} from "@/lib/booking/store";
import { listJobApplications } from "@/lib/applications/store";
import { getCmsData } from "@/lib/cms/store";
import { getAnalyticsSummary, type AnalyticsSummary } from "@/lib/analytics/store";
import { listMedia } from "@/lib/media/store";
import type { JobApplication } from "@/lib/applications/store";
import type { CmsData } from "@/lib/cms/types";

export type HealthCheck = {
  id: string;
  label: string;
  status: "ok" | "warn" | "error";
  detail: string;
};

export type DashboardOverview = {
  health: HealthCheck[];
  healthScore: number;
  bookings: BookingStats;
  applications: { total: number; newCount: number };
  mediaCount: number;
  analytics: AnalyticsSummary;
  zoomConnected: boolean;
  recentBookings: StoredBooking[];
};

const emptyAnalytics = (): AnalyticsSummary => ({
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
});

const emptyBookingStats = (): BookingStats => ({
  total: 0,
  upcoming: 0,
  past: 0,
  next: null,
});

async function fileReadable(rel: string) {
  try {
    await fs.access(path.join(process.cwd(), rel));
    return true;
  } catch {
    return false;
  }
}

async function settled<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    console.error("[admin/health]", error);
    return fallback;
  }
}

export async function getDashboardOverview(): Promise<DashboardOverview> {
  const [cmsEn, cmsFr, bookings, bookingStats, applications, media, analytics] =
    await Promise.all([
      settled(getCmsData("en"), null as CmsData | null),
      settled(getCmsData("fr"), null as CmsData | null),
      settled(listBookings(), [] as StoredBooking[]),
      settled(getBookingStats(), emptyBookingStats()),
      settled(listJobApplications(), [] as JobApplication[]),
      settled(listMedia(), []),
      settled(getAnalyticsSummary(), emptyAnalytics()),
    ]);

  const zoomConnected = isZoomBookingConfigured();
  const enOk = Boolean(cmsEn?.home?.hero?.heading);
  const frOk = Boolean(cmsFr?.home?.hero?.heading);
  const uploadsOk = await fileReadable("public/uploads");
  const brandOk = await fileReadable("public/brand");

  const health: HealthCheck[] = [
    {
      id: "cms-en",
      label: "English content",
      status: enOk ? "ok" : "error",
      detail: enOk ? "Homepage content loaded" : "English CMS content missing",
    },
    {
      id: "cms-fr",
      label: "French content",
      status: frOk ? "ok" : "warn",
      detail: frOk ? "Homepage content loaded" : "French CMS content missing",
    },
    {
      id: "zoom",
      label: "Zoom booking",
      status: zoomConnected ? "ok" : "warn",
      detail: zoomConnected
        ? "Zoom credentials connected"
        : "Zoom not configured in environment",
    },
    {
      id: "brand",
      label: "Brand assets",
      status: brandOk ? "ok" : "warn",
      detail: brandOk ? "Brand folder available" : "public/brand folder missing",
    },
    {
      id: "uploads",
      label: "Media uploads",
      status: uploadsOk ? "ok" : "warn",
      detail: uploadsOk
        ? `${media.length} uploaded image${media.length === 1 ? "" : "s"}`
        : "Uploads folder will be created on first upload",
    },
    {
      id: "bookings",
      label: "Discovery bookings",
      status: "ok",
      detail: `${bookingStats.total} total · ${bookingStats.upcoming} upcoming`,
    },
    {
      id: "applications",
      label: "Job applications",
      status: applications.some((a) => a.status === "new") ? "warn" : "ok",
      detail: `${applications.length} total · ${applications.filter((a) => a.status === "new").length} new`,
    },
  ];

  const scoreParts: number[] = health.map((h) =>
    h.status === "ok" ? 1 : h.status === "warn" ? 0.6 : 0,
  );
  const healthScore = Math.round(
    (scoreParts.reduce((a, b) => a + b, 0) / Math.max(scoreParts.length, 1)) * 100,
  );

  return {
    health,
    healthScore,
    bookings: bookingStats,
    applications: {
      total: applications.length,
      newCount: applications.filter((a) => a.status === "new").length,
    },
    mediaCount: media.length,
    analytics,
    zoomConnected,
    recentBookings: bookings.slice(0, 5),
  };
}
