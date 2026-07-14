import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const pillar = searchParams.get("pillar");

    const highlights = await sql`
      SELECT id, pillar, badge, title, description, image_url, link_url, sort_order
      FROM seva_highlights
      WHERE (${!pillar || pillar === "all"}::boolean OR pillar = ${pillar})
      ORDER BY sort_order ASC, id ASC
    `;

    return NextResponse.json({ highlights });
  } catch (err: any) {
    console.error("GET /api/admin/highlights error:", err);
    return NextResponse.json({ error: "Failed to fetch highlights" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      pillar = "charity",
      badge = "Highlight",
      title = "New Highlight",
      description = "",
      image_url = "/images/event-1.png",
      link_url = "",
      sort_order = 1,
    } = body;

    const [inserted] = await sql`
      INSERT INTO seva_highlights (pillar, badge, title, description, image_url, link_url, sort_order)
      VALUES (${pillar}, ${badge}, ${title}, ${description}, ${image_url}, ${link_url}, ${Number(sort_order)})
      RETURNING *
    `;

    return NextResponse.json({ highlight: inserted });
  } catch (err: any) {
    console.error("POST /api/admin/highlights error:", err);
    return NextResponse.json({ error: err?.message || "Failed to create highlight" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, pillar, badge, title, description, image_url, link_url, sort_order } = body;

    if (!id) {
      return NextResponse.json({ error: "Highlight ID required" }, { status: 400 });
    }

    const [updated] = await sql`
      UPDATE seva_highlights
      SET
        pillar = ${pillar || "charity"},
        badge = ${badge || "Highlight"},
        title = ${title || ""},
        description = ${description || ""},
        image_url = ${image_url || "/images/event-1.png"},
        link_url = ${link_url || ""},
        sort_order = ${Number(sort_order || 1)}
      WHERE id = ${Number(id)}
      RETURNING *
    `;

    return NextResponse.json({ highlight: updated });
  } catch (err: any) {
    console.error("PUT /api/admin/highlights error:", err);
    return NextResponse.json({ error: err?.message || "Failed to update highlight" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Highlight ID required" }, { status: 400 });
    }

    await sql`DELETE FROM seva_highlights WHERE id = ${Number(id)}`;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE /api/admin/highlights error:", err);
    return NextResponse.json({ error: err?.message || "Failed to delete highlight" }, { status: 500 });
  }
}
