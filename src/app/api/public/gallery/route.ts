import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let photos: any[] = [];
    let videos: any[] = [];
    try {
      photos = await sql`
        SELECT id, image_url, caption, category, is_featured, sort_order, created_at
        FROM gallery_photos
        WHERE (${!category || category === "all" || category === "photos"}::boolean OR category = ${category})
        ORDER BY sort_order ASC, created_at DESC
      `;
    } catch (dbErr) {
      try {
        photos = await sql`
          SELECT id, image_url, caption, category, is_featured, created_at
          FROM gallery_photos
          WHERE (${!category || category === "all" || category === "photos"}::boolean OR category = ${category})
          ORDER BY created_at DESC
        `;
      } catch (fallbackErr) {
        photos = [];
      }
    }

    try {
      videos = await sql`
        SELECT id, title, video_url, created_at
        FROM event_videos
        ORDER BY sort_order ASC, created_at DESC
      `;
    } catch (vidErr) {
      try {
        videos = await sql`
          SELECT id, title, video_url, created_at
          FROM event_videos
          ORDER BY created_at DESC
        `;
      } catch (fallbackVidErr) {
        videos = [];
      }
    }

    return NextResponse.json({ photos, videos });
  } catch (err) {
    console.error("GET /api/public/gallery outer error:", err);
    return NextResponse.json({ photos: [], videos: [] });
  }
}
