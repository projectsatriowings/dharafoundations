import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const founders = await sql`SELECT * FROM founders ORDER BY display_order ASC, created_at ASC`;
    return NextResponse.json({ founders });
  } catch (err) {
    console.error("GET /api/admin/founders error:", err);
    return NextResponse.json({ error: "Failed to fetch founders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { full_name, designation, short_bio, full_bio, photo_url, display_order = 0 } = body;

    if (!full_name || !designation || !short_bio) {
      return NextResponse.json({ error: "Name, designation, and short bio are required" }, { status: 400 });
    }

    const [f] = await sql`
      INSERT INTO founders (full_name, designation, short_bio, full_bio, photo_url, display_order)
      VALUES (${full_name}, ${designation}, ${short_bio}, ${full_bio || null}, ${photo_url || null}, ${display_order})
      RETURNING *
    `;

    await sql`
      INSERT INTO activity_log (action, entity_type, entity_title)
      VALUES ('Added founder profile', 'About/Founders', ${full_name})
    `;

    return NextResponse.json({ founder: f }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/founders error:", err);
    return NextResponse.json({ error: "Failed to create founder profile" }, { status: 500 });
  }
}
