import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { listJobApplications, resumeAbsolutePath } from "@/lib/applications/store";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "id is required." }, { status: 400 });
  }

  const applications = await listJobApplications();
  const application = applications.find((item) => item.id === id);
  if (!application?.resumeStoredAs) {
    return NextResponse.json({ message: "Resume not found." }, { status: 404 });
  }

  const filePath = resumeAbsolutePath(application.resumeStoredAs);
  try {
    const bytes = await fs.readFile(filePath);
    const fileName = application.resumeFileName || application.resumeStoredAs;
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileName.replace(/"/g, "")}"`,
      },
    });
  } catch {
    return NextResponse.json({ message: "Resume file missing." }, { status: 404 });
  }
}
