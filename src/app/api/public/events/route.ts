import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const events = await sql`
      SELECT id, slug, title, event_date, event_time, location_name,
             cover_image_url, status, category, updated_at
      FROM events
      WHERE status = 'published' OR status IS NULL
      ORDER BY event_date DESC
    `;
    return NextResponse.json({ events });
  } catch (err) {
    console.error("GET /api/public/events error:", err);
    return NextResponse.json({ error: "Failed to fetch public events" }, { status: 500 });
  }
}
