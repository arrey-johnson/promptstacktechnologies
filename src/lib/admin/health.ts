import { promises as fs } from "fs";
import path from "path";
import { isZoomBookingConfigured } from "@/lib/booking/config";
import { getBookingStats, listBookings } from "@/lib/booking/store";
import { listJobApplications } from "@/lib/applications/store";
import { getCmsData } from "@/lib/cms/store";
import { getAnalyticsSummary } from "@/lib/analytics/store";
import { listMedia } from "@/lib/media/store";

export type HealthCheck = {
  id: string;
  label: string;
  status: "ok" | "warn" | "error";
  detail: string;
};

export type DashboardOverview = {
  health: HealthCheck[];
  healthScore: number;
  bookings: Awaited<ReturnType<typeof getBookingStats>>;
  applications: { total: number; newCount: number };
  mediaCount: number;
  analytics: Awaited<ReturnType<typeof getAnalyticsSummary>>;
  zoomConnected: boolean;
  recentBookings: Awaited<ReturnType<typeof listBookings>>;
};

async function fileReadable(rel: string) {
  try {
    await fs.access(path.join(process.cwd(), rel));
    return true;
  } catch {
    return false;
  }
}

export async function getDashboardOverview(): Promise<DashboardOverview> {
  const [cmsEn, cmsFr, bookings, bookingStats, applications, media, analytics] =
    await Promise.all([
      getCmsData("en"),
      getCmsData("fr"),
      listBookings(),
      getBookingStats(),
      listJobApplications(),
      listMedia(),
      getAnalyticsSummary(),
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
