import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { deleteMedia, listMedia, saveUploadedImage } from "@/lib/media/store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const items = await listMedia();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Choose an image file to upload." }, { status: 400 });
    }
    const bytes = Buffer.from(await file.arrayBuffer());
    const item = await saveUploadedImage({ fileName: file.name, bytes });
    return NextResponse.json({ ok: true, item });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  if (!name) {
    return NextResponse.json({ message: "Missing file name." }, { status: 400 });
  }
  const ok = await deleteMedia(name);
  if (!ok) {
    return NextResponse.json({ message: "Could not delete that image." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
