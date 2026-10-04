import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { getAnalyticsSummary } from "@/lib/analytics/store";
import { getDashboardOverview } from "@/lib/admin/health";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  if (searchParams.get("overview") === "1") {
    const overview = await getDashboardOverview();
    return NextResponse.json(overview);
  }

  const analytics = await getAnalyticsSummary();
  return NextResponse.json({ analytics });
}
