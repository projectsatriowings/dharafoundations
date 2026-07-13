import { NextResponse } from "next/server";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await sql`SELECT id, slug, title, status, cover_image_url FROM events`;
    const galleryCount = await sql`SELECT count(*) FROM event_gallery_images`;
    return NextResponse.json({ success: true, count: rows.length, rows, galleryCount });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 });
  }
}
