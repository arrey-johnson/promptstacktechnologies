import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { listJobApplications, updateApplicationStatus } from "@/lib/applications/store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const applications = await listJobApplications();
  return NextResponse.json({ applications });
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { id?: string; status?: "new" | "reviewed" | "archived" };
  if (!body.id || !body.status) {
    return NextResponse.json({ message: "id and status are required." }, { status: 400 });
  }

  const updated = await updateApplicationStatus(body.id, body.status);
  if (!updated) {
    return NextResponse.json({ message: "Application not found." }, { status: 404 });
  }
  return NextResponse.json({ application: updated });
}
