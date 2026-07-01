import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tiers = await sql`SELECT * FROM sponsor_tiers ORDER BY sort_order ASC, created_at ASC`;
    return NextResponse.json({ tiers });
  } catch (err) {
    console.error("GET /api/admin/sponsorship error:", err);
    return NextResponse.json({ error: "Failed to fetch sponsor tiers" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { tier_name, price_label, benefits = [], is_highlighted = false, sort_order = 0 } = body;

    if (!tier_name || !price_label) {
      return NextResponse.json({ error: "Tier name and price label are required" }, { status: 400 });
    }

    const [t] = await sql`
      INSERT INTO sponsor_tiers (tier_name, price_label, benefits, is_highlighted, sort_order)
      VALUES (${tier_name}, ${price_label}, ${benefits}, ${is_highlighted}, ${sort_order})
      RETURNING *
    `;

    await sql`
      INSERT INTO activity_log (action, entity_type, entity_title)
      VALUES ('Created package', 'Sponsorship Tier', ${tier_name})
    `;

    return NextResponse.json({ tier: t }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/sponsorship error:", err);
    return NextResponse.json({ error: "Failed to create sponsor tier" }, { status: 500 });
  }
}
