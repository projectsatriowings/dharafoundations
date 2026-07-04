import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { validateCoordinates } from "@/utils/validateCoords";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const [event] = await sql`
      SELECT * FROM events WHERE id = ${id}
    `;

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const gallery = await sql`
      SELECT id, image_url AS url, caption, sort_order
      FROM event_gallery_images
      WHERE event_id = ${id}
      ORDER BY sort_order ASC
    `;

    const videos = await sql`
      SELECT id, title, video_url AS url, sort_order
      FROM event_videos
      WHERE event_id = ${id}
      ORDER BY sort_order ASC
    `;

    return NextResponse.json({ event: { ...event, gallery_images: gallery, video_links: videos } });
  } catch (err) {
    console.error(`GET /api/admin/events/[id] error:`, err);
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
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
      show_register_btn,
      cta_label,
      enable_social_share,
      twitter_share_url,
      facebook_share_url,
      pinterest_share_url,
      instagram_share_url,
      status,
      meta_title,
      meta_description,
      gallery_images = [],
      video_links = [],
    } = body;

    const latNum = latitude !== null && latitude !== "" && latitude !== undefined ? Number(latitude) : null;
    const lngNum = longitude !== null && longitude !== "" && longitude !== undefined ? Number(longitude) : null;
    const coordCheck = validateCoordinates(latNum, lngNum);
    if (!coordCheck.valid) {
      return NextResponse.json({ error: coordCheck.error }, { status: 400 });
    }

    const [updatedEvent] = await sql`
      UPDATE events SET
        title = ${title},
        event_date = ${event_date},
        event_time = ${event_time},
        location_name = ${location_name},
        latitude = ${latNum},
        longitude = ${lngNum},
        cover_image_url = ${cover_image_url},
        short_description = ${short_description || null},
        full_description = ${full_description || null},
        category = ${category || "General"},
        show_register_btn = ${show_register_btn ?? true},
        cta_label = ${cta_label || "Register Yourself"},
        enable_social_share = ${enable_social_share ?? false},
        twitter_share_url = ${twitter_share_url || null},
        facebook_share_url = ${facebook_share_url || null},
        pinterest_share_url = ${pinterest_share_url || null},
        instagram_share_url = ${instagram_share_url || null},
        status = ${status || "draft"},
        meta_title = ${meta_title || title},
        meta_description = ${meta_description || short_description || null}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Replace gallery images (delete and re-insert)
    await sql`DELETE FROM event_gallery_images WHERE event_id = ${id}`;

    if (Array.isArray(gallery_images) && gallery_images.length > 0) {
      for (let i = 0; i < gallery_images.length; i++) {
        const img = gallery_images[i];
        if (img.url) {
          await sql`
            INSERT INTO event_gallery_images (event_id, image_url, caption, sort_order)
            VALUES (${id}, ${img.url}, ${img.caption || null}, ${i})
          `;
        }
      }
    }

    // Replace event videos (only if array is provided and not empty, or if explicitly requested)
    if (Array.isArray(video_links) && video_links.length > 0) {
      await sql`DELETE FROM event_videos WHERE event_id = ${id}`;
      for (let i = 0; i < video_links.length; i++) {
        const vid = video_links[i];
        if (vid.url) {
          await sql`
            INSERT INTO event_videos (event_id, title, video_url, sort_order)
            VALUES (${id}, ${vid.title || "Event Video"}, ${vid.url}, ${i})
          `;
        }
      }
    } else if (body.clear_videos === true) {
      await sql`DELETE FROM event_videos WHERE event_id = ${id}`;
    }

    return NextResponse.json({ event: updatedEvent });
  } catch (err) {
    console.error(`PUT /api/admin/events/[id] error:`, err);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const [deleted] = await sql`
      DELETE FROM events WHERE id = ${id} RETURNING id
    `;

    if (!deleted) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: deleted.id });
  } catch (err) {
    console.error(`DELETE /api/admin/events/[id] error:`, err);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
