import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  if (password === ADMIN_PASSWORD) {
    return NextResponse.json({ success: true, message: "Login successful" });
  } else {
    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
  }
}
