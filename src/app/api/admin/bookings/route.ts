import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { getBookingStats, listBookings } from "@/lib/booking/store";
import { isZoomBookingConfigured } from "@/lib/booking/config";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const [bookings, stats] = await Promise.all([listBookings(), getBookingStats()]);
  return NextResponse.json({
    bookings,
    stats,
    zoomConnected: isZoomBookingConfigured(),
  });
}
