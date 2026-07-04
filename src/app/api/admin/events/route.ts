import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { validateCoordinates } from "@/utils/validateCoords";
import { slugify } from "@/utils/slugify";

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

    const events = await sql`
      SELECT id, slug, title, event_date, event_time, location_name,
             cover_image_url, status, category, updated_at
      FROM events
      WHERE (${!status || status === "all"}::boolean OR status = ${status})
        AND (${!year || year === "all"}::boolean OR EXTRACT(YEAR FROM event_date)::text = ${year})
        AND (${!location || location === "all"}::boolean OR location_name ILIKE ${"%" + (location || "") + "%"})
        AND (${!search}::boolean OR title ILIKE ${"%" + (search || "") + "%"})
      ORDER BY event_date DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const [{ count }] = await sql`
      SELECT COUNT(*)
      FROM events
      WHERE (${!status || status === "all"}::boolean OR status = ${status})
        AND (${!year || year === "all"}::boolean OR EXTRACT(YEAR FROM event_date)::text = ${year})
        AND (${!location || location === "all"}::boolean OR location_name ILIKE ${"%" + (location || "") + "%"})
        AND (${!search}::boolean OR title ILIKE ${"%" + (search || "") + "%"})
    `;

    return NextResponse.json({
      events,
      pagination: {
        total: Number(count),
        page,
        limit,
        totalPages: Math.ceil(Number(count) / limit),
      },
    });
  } catch (err) {
    console.error("GET /api/admin/events error:", err);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
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
        full_description, category, show_register_btn, cta_label,
        enable_social_share, twitter_share_url, facebook_share_url,
        pinterest_share_url, instagram_share_url, status,
        meta_title, meta_description
      ) VALUES (
        ${slug}, ${title}, ${event_date}, ${event_time}, ${location_name},
        ${latNum}, ${lngNum}, ${cover_image_url}, ${short_description || null},
        ${full_description || null}, ${category || "General"}, ${show_register_btn}, ${cta_label},
        ${enable_social_share}, ${twitter_share_url || null}, ${facebook_share_url || null},
        ${pinterest_share_url || null}, ${instagram_share_url || null}, ${status},
        ${meta_title || title}, ${meta_description || short_description || null}
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
