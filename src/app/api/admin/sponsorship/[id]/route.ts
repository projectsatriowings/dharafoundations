import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const { tier_name, price_label, benefits, is_highlighted, sort_order } = body;

    const [updated] = await sql`
      UPDATE sponsor_tiers SET
        tier_name = COALESCE(${tier_name}, tier_name),
        price_label = COALESCE(${price_label}, price_label),
        benefits = COALESCE(${benefits}, benefits),
        is_highlighted = COALESCE(${is_highlighted}, is_highlighted),
        sort_order = COALESCE(${sort_order}, sort_order)
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updated) return NextResponse.json({ error: "Tier not found" }, { status: 404 });
    return NextResponse.json({ tier: updated });
  } catch (err) {
    console.error("PUT /api/admin/sponsorship/[id] error:", err);
    return NextResponse.json({ error: "Failed to update tier" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const [deleted] = await sql`DELETE FROM sponsor_tiers WHERE id = ${id} RETURNING id`;
    if (!deleted) return NextResponse.json({ error: "Tier not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/sponsorship/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete tier" }, { status: 500 });
  }
}
