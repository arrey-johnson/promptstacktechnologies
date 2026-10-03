import { NextResponse } from "next/server";

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

  return NextResponse.json({
    message: "Thanks — your interest was recorded.",
  });
}
