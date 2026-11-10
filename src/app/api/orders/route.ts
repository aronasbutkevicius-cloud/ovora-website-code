import { NextResponse } from "next/server";
import { getDiscountState, placeOrder } from "@/lib/auth/accounts";
import { getSession } from "@/lib/auth/session";
import { isResearchPurpose } from "@/lib/compliance";
import { buildQuote, quoteLines } from "@/lib/pricing";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

  const body = (await request.json().catch(() => null)) as {
    items?: { variantSlug: string; quantity: number }[];
    researchPurpose?: string;
    researchAck?: boolean;
    email?: string;
    fullName?: string;
    address1?: string;
    city?: string;
    stateRegion?: string;
    postal?: string;
  } | null;

  if (body?.researchAck !== true) {
    return NextResponse.json(
      { error: "Confirm the research-use acknowledgment to continue." },
      { status: 400 },
    );
  }
  const researchPurpose = body?.researchPurpose?.trim() ?? "";
  if (!isResearchPurpose(researchPurpose)) {
    return NextResponse.json({ error: "Select a research purpose." }, { status: 400 });
  }
  if (
    !body?.email?.trim() ||
    !body.fullName?.trim() ||
    !body.address1?.trim() ||
    !body.city?.trim() ||
    !body.stateRegion?.trim() ||
    !body.postal?.trim()
  ) {
    return NextResponse.json({ error: "Complete the required shipping fields." }, { status: 400 });
  }

  const parsed = quoteLines(body.items ?? []);
  if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const discountState = await getDiscountState(session.id);
  const quote = buildQuote(parsed.lines, discountState);
  if (quote.lines.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  try {
    const order = await placeOrder({
      userId: session.id,
      items: quote.lines,
      subtotalCents: quote.subtotalCents,
      discountCents: quote.discountCents,
      shippingCents: quote.shippingCents,
      totalCents: quote.totalCents,
      researchPurpose,
      applyDiscount: quote.discountCents > 0,
    });
    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      subtotalCents: order.subtotalCents,
      discountCents: order.discountCents,
      shippingCents: order.shippingCents,
      totalCents: order.totalCents,
      discountApplied: order.discountCents > 0,
    });
  } catch {
    return NextResponse.json(
      { error: "The order summary could not be saved. Nothing was charged." },
      { status: 503 },
    );
  }
}
