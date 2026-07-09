import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const photos = await sql`
      SELECT id, image_url, caption, category, is_featured, sort_order, created_at
      FROM gallery_photos
      WHERE (${!category || category === "all"}::boolean OR category = ${category})
      ORDER BY is_featured DESC, created_at DESC
    `;

    return NextResponse.json({ photos });
  } catch (err) {
    console.error("GET /api/admin/gallery error:", err);
    return NextResponse.json({ error: "Failed to fetch gallery photos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { image_url, caption = "", category = "charity", is_featured = false } = body;

    if (!image_url) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    const [photo] = await sql`
      INSERT INTO gallery_photos (image_url, caption, category, is_featured)
      VALUES (${image_url}, ${caption}, ${category}, ${is_featured})
      RETURNING *
    `;

    await sql`
      INSERT INTO activity_log (action, entity_type, entity_title)
      VALUES ('Uploaded photo to', 'Gallery', ${category})
    `;

    return NextResponse.json({ photo }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/gallery error:", err);
    return NextResponse.json({ error: "Failed to create gallery photo" }, { status: 500 });
  }
}
