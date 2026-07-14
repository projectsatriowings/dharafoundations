import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { validateCoordinates } from "@/utils/validateCoords";
import { EVENTS_DATA, getCleanEventImage } from "@/data/events";
import { slugify } from "@/utils/slugify";

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

    let [event] = await sql`
      SELECT * FROM events WHERE id = ${id} OR slug = ${id}
    `;

    const isEventInDb = Boolean(event);

    if (!event) {
      const staticEvent = EVENTS_DATA.find((e) => e.id === id || e.numericId === id);
      if (!staticEvent) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
      const cleanImg = getCleanEventImage(`${staticEvent.title} ${staticEvent.id} ${staticEvent.coverImage}`, staticEvent.coverImage);
      const isSanatana =
        staticEvent.category === "Sanatana Dharma" ||
        staticEvent.title.toLowerCase().includes("temple") ||
        staticEvent.title.toLowerCase().includes("girivalam") ||
        staticEvent.title.toLowerCase().includes("pooja");

      event = {
        id: staticEvent.numericId || staticEvent.id,
        slug: staticEvent.id,
        title: staticEvent.title,
        event_date: staticEvent.date,
        event_time: staticEvent.time || "09:00",
        location_name: staticEvent.location || "Cuddalore / Tamil Nadu",
        cover_image_url: cleanImg,
        short_description: staticEvent.description[0] || "",
        full_description: staticEvent.description.join("\n\n"),
        category: staticEvent.category || (isSanatana ? "Sanatana Dharma" : "Welfare Drives"),
        status: "published",
      };
    }

    const gallery = await sql`
      SELECT id, image_url AS url, caption, sort_order
      FROM event_gallery_images
      WHERE event_id = ${event.id || id} OR event_id = ${event.slug || id}
      ORDER BY sort_order ASC
    `;

    const seenUrls = new Set<string>();
    const dedupedGallery: any[] = [];
    for (const item of Array.isArray(gallery) ? gallery : []) {
      if (item && item.url && !seenUrls.has(item.url)) {
        seenUrls.add(item.url);
        dedupedGallery.push(item);
      }
    }
    let galleryList = dedupedGallery;

    const staticEventForGallery = EVENTS_DATA.find(
      (e) => e.id === id || e.numericId === id || e.id === event?.slug
    );
    // Only fallback to static gallery images if the event has NEVER been saved in the database AND DB gallery is completely empty
    if (!isEventInDb && galleryList.length === 0 && staticEventForGallery && Array.isArray(staticEventForGallery.galleryImages)) {
      galleryList = staticEventForGallery.galleryImages.map((imgUrl, idx) => ({
        id: `static-${idx}`,
        url: imgUrl,
        caption: "",
        sort_order: idx,
      }));
    }

    const videos = await sql`
      SELECT id, title, video_url AS url, sort_order
      FROM event_videos
      WHERE event_id = ${event.id || id} OR event_id = ${event.slug || id}
      ORDER BY sort_order ASC
    `;

    const seenVideos = new Set<string>();
    const dedupedVideos: any[] = [];
    for (const item of Array.isArray(videos) ? videos : []) {
      if (item && item.url && !seenVideos.has(item.url)) {
        seenVideos.add(item.url);
        dedupedVideos.push(item);
      }
    }

    return NextResponse.json({ event: { ...event, gallery_images: galleryList, video_links: dedupedVideos } });
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

    let [updatedEvent] = await sql`
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
        status = ${status || "draft"}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updatedEvent) {
      const [inserted] = await sql`
        INSERT INTO events (
          id, slug, title, event_date, event_time, location_name,
          latitude, longitude, cover_image_url, short_description, full_description,
          category, status
        ) VALUES (
          ${id}, ${slugify(title || id)}, ${title}, ${event_date}, ${event_time || "09:00"}, ${location_name || "Tamil Nadu"},
          ${latNum}, ${lngNum}, ${cover_image_url}, ${short_description || null}, ${full_description || null},
          ${category || "General"}, ${status || "published"}
        )
        RETURNING *
      `;
      updatedEvent = inserted;
    }

    // Replace gallery images (delete across all possible IDs/slugs and re-insert exactly once)
    const targetEventId = String(updatedEvent?.id || id);
    const targetEventSlug = String(updatedEvent?.slug || id);
    await sql`DELETE FROM event_gallery_images WHERE event_id = ${id} OR event_id = ${targetEventId} OR event_id = ${targetEventSlug}`;

    if (Array.isArray(gallery_images)) {
      const seenPutUrls = new Set<string>();
      let sortOrder = 0;
      for (let i = 0; i < gallery_images.length; i++) {
        const img = gallery_images[i];
        if (img && img.url && !seenPutUrls.has(img.url)) {
          seenPutUrls.add(img.url);
          await sql`
            INSERT INTO event_gallery_images (event_id, image_url, caption, sort_order)
            VALUES (${targetEventId}, ${img.url}, ${img.caption || null}, ${sortOrder++})
          `;
        }
      }
    }

    // Replace event videos (only if array is provided and not empty, or if explicitly requested)
    if (Array.isArray(video_links) && video_links.length > 0) {
      await sql`DELETE FROM event_videos WHERE event_id = ${id} OR event_id = ${targetEventId} OR event_id = ${targetEventSlug}`;
      const seenPutVids = new Set<string>();
      let vidOrder = 0;
      for (let i = 0; i < video_links.length; i++) {
        const vid = video_links[i];
        if (vid && vid.url && !seenPutVids.has(vid.url)) {
          seenPutVids.add(vid.url);
          await sql`
            INSERT INTO event_videos (event_id, title, video_url, sort_order)
            VALUES (${targetEventId}, ${vid.title || "Event Video"}, ${vid.url}, ${vidOrder++})
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
