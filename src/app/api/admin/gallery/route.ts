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

    let photos: any[] = [];
    try {
      photos = await sql`
        SELECT id, image_url, caption, category, is_featured, sort_order, created_at
        FROM gallery_photos
        WHERE (${!category || category === "all"}::boolean OR category = ${category})
        ORDER BY sort_order ASC, created_at DESC
      `;
    } catch (dbErr) {
      console.warn("GET /api/admin/gallery: sort_order query failed, retrying without sort_order:", dbErr);
      try {
        photos = await sql`
          SELECT id, image_url, caption, category, is_featured, created_at
          FROM gallery_photos
          WHERE (${!category || category === "all"}::boolean OR category = ${category})
          ORDER BY created_at DESC
        `;
      } catch (fallbackErr) {
        console.warn("GET /api/admin/gallery: table query failed, returning empty photos list:", fallbackErr);
        photos = [];
      }
    }

    return NextResponse.json({ photos });
  } catch (err) {
    console.error("GET /api/admin/gallery outer error:", err);
    return NextResponse.json({ photos: [] });
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
