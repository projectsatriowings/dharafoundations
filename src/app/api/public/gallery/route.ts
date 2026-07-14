import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const photos = await sql`
      SELECT id, image_url, caption, category, is_featured, sort_order, created_at
      FROM gallery_photos
      WHERE (${!category || category === "all" || category === "photos"}::boolean OR category = ${category})
      ORDER BY sort_order ASC, created_at DESC
    `;

    const videos = await sql`
      SELECT id, title, video_url, created_at
      FROM event_videos
      ORDER BY sort_order ASC, created_at DESC
    `;

    return NextResponse.json({ photos, videos });
  } catch (err) {
    console.error("GET /api/public/gallery error:", err);
    return NextResponse.json({ error: "Failed to fetch gallery photos" }, { status: 500 });
  }
}
