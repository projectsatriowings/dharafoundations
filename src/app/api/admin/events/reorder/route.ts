import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import sql from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    if (!Array.isArray(body.items)) {
      return NextResponse.json({ error: "items must be an array of { id, sort_order }" }, { status: 400 });
    }

    for (const item of body.items) {
      if (item.id !== undefined && item.sort_order !== undefined) {
        const idStr = String(item.id);
        const orderNum = Number(item.sort_order);
        await sql`
          UPDATE events
          SET sort_order = ${orderNum}
          WHERE id = ${idStr} OR slug = ${idStr}
        `;
      }
    }

    return NextResponse.json({ success: true, message: "Activities reordered successfully" });
  } catch (err: any) {
    console.error("POST /api/admin/events/reorder error:", err);
    return NextResponse.json({ error: err?.message || "Failed to reorder activities" }, { status: 500 });
  }
}
