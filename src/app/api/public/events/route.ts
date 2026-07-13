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

    const formatDisplayDate = (val: any): string => {
      if (!val) return "Upcoming";
      if (typeof val === "object" && val instanceof Date) {
        return val.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
      }
      const str = String(val);
      if (str.includes("T") || str.match(/^\d{4}-\d{2}-\d{2}/)) {
        const parsed = new Date(str);
        if (!isNaN(parsed.getTime())) {
          return parsed.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
        }
      }
      return str;
    };

    const cleanEvents = (events || []).map((ev: any) => {
      const cleanImg = getCleanEventImage(`${ev.title || ""} ${ev.slug || ""} ${ev.cover_image_url || ""}`, ev.cover_image_url);
      return {
        ...ev,
        event_date: formatDisplayDate(ev.event_date),
        cover_image_url: cleanImg,
        short_description: ev.short_description || ev.desc || "Dedicated seva and welfare drive uplifting communities across Tamil Nadu.",
      };
    });

    const existingSlugs = new Set(cleanEvents.map((e: any) => (e.slug || String(e.id || "")).toLowerCase()));
    const existingTitles = new Set(cleanEvents.map((e: any) => (e.title || "").toLowerCase().trim()));
    const existingImages = new Set(cleanEvents.map((e: any) => (e.cover_image_url || "").toLowerCase().trim()));

    const staticMapped = EVENTS_DATA.filter(
      (e) => !existingSlugs.has(e.id.toLowerCase()) && !existingTitles.has(e.title.toLowerCase().trim()) && !existingImages.has((e.coverImage || "").toLowerCase().trim())
    ).map((e) => ({
      id: e.numericId || e.id,
      slug: e.id,
      title: e.title,
      event_date: e.date,
      event_time: e.time,
      location_name: e.location,
      cover_image_url: e.coverImage,
      short_description: e.description[0] || "",
      desc: e.description[0] || "",
      status: "published",
      category: e.category,
      updated_at: null,
    }));

    return NextResponse.json({ events: [...cleanEvents, ...staticMapped] });
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
      short_description: e.description[0] || "",
      desc: e.description[0] || "",
      status: "published",
      category: e.category,
      updated_at: null,
    }));
    return NextResponse.json({ events: fallbackEvents });
  }
}
