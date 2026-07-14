import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { validateCoordinates } from "@/utils/validateCoords";
import { slugify } from "@/utils/slugify";
import { EVENTS_DATA, getCleanEventImage } from "@/data/events";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const year = searchParams.get("year");
    const location = searchParams.get("location");
    const search = searchParams.get("search");
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    let dbEvents: any[] = [];
    try {
      dbEvents = await sql`
        SELECT id, slug, title, event_date, event_time, location_name,
               cover_image_url, status, category, updated_at, sort_order
        FROM events
        ORDER BY sort_order ASC, event_date DESC
      `;
    } catch (dbErr) {
      console.warn("GET /api/admin/events: query with sort_order failed, trying without sort_order:", dbErr);
      try {
        dbEvents = await sql`
          SELECT id, slug, title, event_date, event_time, location_name,
                 cover_image_url, status, category, updated_at
          FROM events
          ORDER BY event_date DESC
        `;
      } catch (fallbackErr) {
        console.warn("GET /api/admin/events: events table query failed completely, using static fallback only:", fallbackErr);
        dbEvents = [];
      }
    }

    const existingSlugs = new Set((dbEvents || []).map((e: any) => (e.slug || "").toLowerCase()));
    const existingIds = new Set((dbEvents || []).map((e: any) => String(e.id || "").toLowerCase()));
    const existingTitles = new Set((dbEvents || []).map((e: any) => (e.title || "").toLowerCase().trim()));

    const staticMapped = EVENTS_DATA.filter(
      (e) => !existingSlugs.has(e.id.toLowerCase()) && !existingIds.has(e.id.toLowerCase()) && !existingTitles.has(e.title.toLowerCase().trim())
    ).map((e) => {
      const cleanImg = getCleanEventImage(`${e.title || ""} ${e.id || ""} ${e.coverImage || ""}`, e.coverImage);
      const isSanatana =
        e.category === "Sanatana Dharma" ||
        (e.title && e.title.toLowerCase().includes("temple")) ||
        (e.title && e.title.toLowerCase().includes("girivalam")) ||
        (e.title && e.title.toLowerCase().includes("pooja"));

      return {
        id: e.id, // Use unique string id/slug to guarantee no collision with DB numeric IDs
        slug: e.id,
        title: e.title,
        event_date: e.date,
        event_time: e.time || "09:00",
        location_name: e.location || "Cuddalore / Tamil Nadu",
        cover_image_url: cleanImg,
        status: "published",
        category: e.category || (isSanatana ? "Sanatana Dharma" : "Welfare Drives"),
        updated_at: new Date().toISOString(),
      };
    });

    const allEvents = (dbEvents || []).concat(staticMapped);

    // Apply filtering on combined events
    const filteredEvents = allEvents.filter((ev: any) => {
      if (status && status !== "all" && ev.status !== status) return false;
      if (year && year !== "all") {
        const evYear = new Date(ev.event_date).getFullYear().toString();
        if (evYear !== year) return false;
      }
      if (location && location !== "all" && !((ev.location_name || "").toLowerCase().includes(location.toLowerCase()))) return false;
      if (search && !((ev.title || "").toLowerCase().includes(search.toLowerCase()))) return false;
      return true;
    });

    const paginatedEvents = filteredEvents.slice(offset, offset + limit);

    return NextResponse.json({
      events: paginatedEvents,
      pagination: {
        total: filteredEvents.length,
        page,
        limit,
        totalPages: Math.ceil(filteredEvents.length / limit),
      },
    });
  } catch (err) {
    console.error("GET /api/admin/events outer error, returning static events fallback:", err);
    const fallbackEvents = EVENTS_DATA.map((e) => {
      const cleanImg = getCleanEventImage(`${e.title || ""} ${e.id || ""} ${e.coverImage || ""}`, e.coverImage);
      const isSanatana =
        e.category === "Sanatana Dharma" ||
        (e.title && e.title.toLowerCase().includes("temple")) ||
        (e.title && e.title.toLowerCase().includes("girivalam")) ||
        (e.title && e.title.toLowerCase().includes("pooja"));

      return {
        id: e.id,
        slug: e.id,
        title: e.title,
        event_date: e.date,
        event_time: e.time || "09:00",
        location_name: e.location || "Cuddalore / Tamil Nadu",
        cover_image_url: cleanImg,
        status: "published",
        category: e.category || (isSanatana ? "Sanatana Dharma" : "Welfare Drives"),
        updated_at: new Date().toISOString(),
      };
    });

    return NextResponse.json({
      events: fallbackEvents,
      pagination: {
        total: fallbackEvents.length,
        page: 1,
        limit: fallbackEvents.length,
        totalPages: 1,
      },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      event_date,
      event_time,
      location_name,
      latitude,
      longitude,
      cover_image_url,
      short_description,
      full_description,
      category,
      show_register_btn = true,
      cta_label = "Register Yourself",
      enable_social_share = false,
      twitter_share_url,
      facebook_share_url,
      pinterest_share_url,
      instagram_share_url,
      status = "draft",
      meta_title,
      meta_description,
      gallery_images = [],
      video_links = [],
    } = body;

    if (!title || !event_date || !event_time || !location_name || !cover_image_url) {
      return NextResponse.json(
        { error: "Missing required fields: title, event_date, event_time, location_name, cover_image_url" },
        { status: 400 }
      );
    }

    const latNum = latitude !== null && latitude !== "" && latitude !== undefined ? Number(latitude) : null;
    const lngNum = longitude !== null && longitude !== "" && longitude !== undefined ? Number(longitude) : null;
    const coordCheck = validateCoordinates(latNum, lngNum);
    if (!coordCheck.valid) {
      return NextResponse.json({ error: coordCheck.error }, { status: 400 });
    }

    let slug = slugify(title);
    const existing = await sql`SELECT id FROM events WHERE slug = ${slug}`;
    if (existing.length > 0) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const [newEvent] = await sql`
      INSERT INTO events (
        slug, title, event_date, event_time, location_name,
        latitude, longitude, cover_image_url, short_description,
        full_description, category, status
      ) VALUES (
        ${slug}, ${title}, ${event_date}, ${event_time}, ${location_name},
        ${latNum}, ${lngNum}, ${cover_image_url}, ${short_description || null},
        ${full_description || null}, ${category || "General"}, ${status}
      )
      RETURNING *
    `;

    if (Array.isArray(gallery_images) && gallery_images.length > 0) {
      for (let i = 0; i < gallery_images.length; i++) {
        const img = gallery_images[i];
        if (img.url) {
          await sql`
            INSERT INTO event_gallery_images (event_id, image_url, caption, sort_order)
            VALUES (${newEvent.id}, ${img.url}, ${img.caption || null}, ${i})
          `;
        }
      }
    }

    if (Array.isArray(video_links) && video_links.length > 0) {
      for (let i = 0; i < video_links.length; i++) {
        const vid = video_links[i];
        if (vid.url) {
          await sql`
            INSERT INTO event_videos (event_id, title, video_url, sort_order)
            VALUES (${newEvent.id}, ${vid.title || "Event Video"}, ${vid.url}, ${i})
          `;
        }
      }
    }

    return NextResponse.json({ event: newEvent }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/events error:", err);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
