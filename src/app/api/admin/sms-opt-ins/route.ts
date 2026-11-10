import { NextResponse } from "next/server";
import { listSmsOptIns } from "@/lib/auth/accounts";

export async function GET(request: Request) {
  const expected = process.env.ADMIN_EXPORT_TOKEN?.trim();
  const header = request.headers.get("authorization") ?? "";
  if (!expected || header !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const optIns = await listSmsOptIns();
    return NextResponse.json({ optIns });
  } catch {
    return NextResponse.json({ error: "The opt-in list could not be read." }, { status: 503 });
  }
}
