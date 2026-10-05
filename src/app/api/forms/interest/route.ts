import { NextResponse } from "next/server";
import { getNotifyToEmail, sendMail } from "@/lib/email/mailer";
import { interestAdminEmail } from "@/lib/email/templates";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    product?: string;
  };

  if (!body.name || !body.email || !body.product) {
    return NextResponse.json(
      { message: "Name, email, and product are required." },
      { status: 400 },
    );
  }

  console.info("[product-interest]", {
    ...body,
    receivedAt: new Date().toISOString(),
  });

  const admin = interestAdminEmail({
    name: body.name,
    email: body.email,
    product: body.product,
  });
  await sendMail({
    to: getNotifyToEmail(),
    subject: admin.subject,
    text: admin.text,
    html: admin.html,
    replyTo: admin.replyTo,
  });

  return NextResponse.json({
    message: "Thanks — your interest was recorded.",
  });
}
