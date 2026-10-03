import { NextResponse } from "next/server";
import { isZoomBookingConfigured } from "@/lib/booking/config";
import { getBusyBlocks } from "@/lib/booking/zoom";
import {
  filterAvailableSlots,
  isBookingWeekday,
  listBookableDates,
  listDaySlotStarts,
} from "@/lib/booking/slots";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const configured = isZoomBookingConfigured();

  if (!date) {
    return NextResponse.json({
      configured,
      timezone: "Africa/Douala",
      dates: listBookableDates(60),
      hours: "08:00–17:00",
      days: "Monday–Saturday",
      provider: "zoom",
    });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !isBookingWeekday(date)) {
    return NextResponse.json(
      { message: "Pick a Monday–Saturday date.", slots: [], configured },
      { status: 400 },
    );
  }

  const candidates = listDaySlotStarts(date);
  if (!candidates.length) {
    return NextResponse.json({ date, slots: [], configured, provider: "zoom" });
  }

  try {
    const busy = await getBusyBlocks(
      candidates[0].start,
      candidates[candidates.length - 1].end,
    );
    const slots = filterAvailableSlots(candidates, busy);
    return NextResponse.json({
      date,
      slots,
      configured,
      timezone: "Africa/Douala",
      provider: "zoom",
    });
  } catch (error) {
    console.error("[booking/slots]", error);
    return NextResponse.json(
      {
        message: "Could not read Zoom availability.",
        slots: [],
        configured,
      },
      { status: 500 },
    );
  }
}
