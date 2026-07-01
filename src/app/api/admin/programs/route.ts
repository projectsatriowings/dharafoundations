import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const programs = await sql`
      SELECT * FROM programs ORDER BY display_order ASC, created_at DESC
    `;
    return NextResponse.json({ programs });
  } catch (err) {
    console.error("GET /api/admin/programs error:", err);
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const {
      title,
      category = "community_welfare",
      icon_name = "Heart",
      short_description,
      full_description,
      display_order = 0,
      status = "draft",
    } = body;

    if (!title || !short_description) {
      return NextResponse.json({ error: "Title and short description are required" }, { status: 400 });
    }

    const [prog] = await sql`
      INSERT INTO programs (title, category, icon_name, short_description, full_description, display_order, status)
      VALUES (${title}, ${category}, ${icon_name}, ${short_description}, ${full_description || null}, ${display_order}, ${status})
      RETURNING *
    `;

    await sql`
      INSERT INTO activity_log (action, entity_type, entity_title)
      VALUES ('Created', 'Program Initiative', ${title})
    `;

    return NextResponse.json({ program: prog }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/programs error:", err);
    return NextResponse.json({ error: "Failed to create program" }, { status: 500 });
  }
}
