import { NextResponse } from "next/server";
import { getDiscountState } from "@/lib/auth/accounts";
import { getSession } from "@/lib/auth/session";
import { buildQuote, quoteLines } from "@/lib/pricing";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

  const body = (await request.json().catch(() => null)) as {
    items?: { variantSlug: string; quantity: number }[];
  } | null;

  const parsed = quoteLines(body?.items ?? []);
  if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const discountState = await getDiscountState(session.id);
  return NextResponse.json(buildQuote(parsed.lines, discountState));
}
