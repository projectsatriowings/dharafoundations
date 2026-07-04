import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { EVENTS_DATA, getCleanEventImage } from "@/data/events";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const events = await sql`
      SELECT id, slug, title, event_date, event_time, location_name,
             cover_image_url, status, category, updated_at
      FROM events
      WHERE status = 'published' OR status IS NULL
      ORDER BY event_date DESC
    `;

    const cleanEvents = events.map((ev) => {
      const cleanImg = getCleanEventImage(`${ev.title || ""} ${ev.slug || ""} ${ev.cover_image_url || ""}`, ev.cover_image_url);
      return {
        ...ev,
        cover_image_url: cleanImg,
      };
    });

    return NextResponse.json({ events: cleanEvents });
  } catch (err) {
    console.warn("GET /api/public/events DB error, returning static fallback:", err);
    const fallbackEvents = EVENTS_DATA.map((e) => ({
      id: e.numericId || e.id,
      slug: e.id,
      title: e.title,
      event_date: e.date,
      event_time: e.time,
      location_name: e.location,
      cover_image_url: e.coverImage,
      status: "published",
      category: e.category,
      updated_at: null,
    }));
    return NextResponse.json({ events: fallbackEvents });
  }
}
