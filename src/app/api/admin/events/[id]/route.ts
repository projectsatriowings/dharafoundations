import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { validateCoordinates } from "@/utils/validateCoords";
import { EVENTS_DATA, getCleanEventImage } from "@/data/events";
import { slugify } from "@/utils/slugify";

// Helper to find any activity from sync list if needed
const SYNC_ACTIVITIES_MAP = [
  { numericId: "50", legacyId: "40", uuid: "0054e6d5-2bde-4ce3-a07e-3fb8be44b1a4", slug: "digitisation-activities-wshg", title: "In Digitisation activities for Women Self Help Group society", category: "Women's Empowerment", date: "2026-01-01", time: "10:00 AM", location: "Cuddalore", cover: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997177/dhara_foundations/activities/digitisation-activities-wshg/img_1.jpg", p1: "Conducting digitisation activities for Women Self Help Group societies as part of a community empowerment and rural development initiative aimed at improving digital literacy, financial inclusion, and administrative efficiency among women members.", p2: "The initiative focused on introducing digital systems and technology-based practices to Self Help Groups (SHGs), enabling women to maintain records, manage accounts, conduct banking transactions, and access government welfare schemes more effectively. Training and guidance were provided to help members understand the use of digital tools, online services, and cashless transaction methods.", p3: "These activities were carried out to strengthen the functioning of Women Self Help Groups by promoting transparency, accuracy, and better communication through digitisation. The program also encouraged women to become more confident and independent in using technology for economic and social development.", gallery: ["https://res.cloudinary.com/woo94xq2/image/upload/v1783997177/dhara_foundations/activities/digitisation-activities-wshg/img_1.jpg", "https://res.cloudinary.com/woo94xq2/image/upload/v1783997178/dhara_foundations/activities/digitisation-activities-wshg/img_2.jpg", "https://res.cloudinary.com/woo94xq2/image/upload/v1783997180/dhara_foundations/activities/digitisation-activities-wshg/img_3.jpg", "https://res.cloudinary.com/woo94xq2/image/upload/v1783997182/dhara_foundations/activities/digitisation-activities-wshg/img_4.jpg"] },
  { numericId: "51", legacyId: "39", uuid: "3dc970bf-4f6c-4f09-9ce4-2e7d0d3581f5", slug: "tribal-welfare-javadhu-hills", title: "In Tribal welfare activities at Javadhu hills", category: "Tribal Welfare", date: "2025-11-06", time: "10:00 AM", location: "Javadhu Hills", cover: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997186/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_1.jpg", p1: "Conducting tribal welfare activities in Javadhu Hills as part of a social development and community upliftment initiative aimed at improving the living conditions and well-being of tribal communities residing in remote hill areas.", p2: "The welfare activities focused on supporting tribal families and children through the distribution of essential items, educational assistance, health awareness programs, and community support services. Special attention was given to improving access to basic necessities, promoting education among tribal children, and encouraging awareness about hygiene, health, and social welfare.", p3: "These activities were carried out to bridge the developmental gap in tribal areas and foster inclusive growth by extending compassionate support and practical resources. The initiative reflected a strong commitment to empowering marginalized hill communities and helping them lead healthier, more self-reliant lives.", gallery: ["https://res.cloudinary.com/woo94xq2/image/upload/v1783997186/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_1.jpg", "https://res.cloudinary.com/woo94xq2/image/upload/v1783997187/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_2.jpg", "https://res.cloudinary.com/woo94xq2/image/upload/v1783997189/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_3.jpg", "https://res.cloudinary.com/woo94xq2/image/upload/v1783997190/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_4.jpg"] },
  { numericId: "52", legacyId: "38", uuid: "cf30f5d9-bb25-4ec4-a785-8c8502bd9625", slug: "diwali-dresses-home-children", title: "Providing Diwali Dresses To Home Children", category: "Children & Education", date: "2025-10-18", time: "10:00 AM", location: "Cuddalore", cover: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997194/dhara_foundations/activities/diwali-dresses-home-children/img_1.jpg", p1: "Providing Diwali dresses to home children in Cuddalore as part of a festive welfare and child support initiative aimed at spreading happiness, care, and celebration among underprivileged children during the auspicious occasion of Diwali.", p2: "The initiative focused on distributing new, colorful, and traditional festive attire to children residing in welfare homes, ensuring they feel cherished, included, and joyful during the festival of lights. Special attention was given to selecting comfortable and well-fitted dresses to make the festival truly memorable and special for every child.", p3: "This heartwarming activity was carried out to bring smiles, warmth, and emotional well-being to home children, reinforcing a sense of community love and belonging. By sharing the spirit of Diwali with those in need, the initiative highlighted the importance of compassion, kindness, and inclusive celebration.", gallery: ["https://res.cloudinary.com/woo94xq2/image/upload/v1783997194/dhara_foundations/activities/diwali-dresses-home-children/img_1.jpg", "https://res.cloudinary.com/woo94xq2/image/upload/v1783997195/dhara_foundations/activities/diwali-dresses-home-children/img_2.jpg", "https://res.cloudinary.com/woo94xq2/image/upload/v1783997197/dhara_foundations/activities/diwali-dresses-home-children/img_3.jpg", "https://res.cloudinary.com/woo94xq2/image/upload/v1783997198/dhara_foundations/activities/diwali-dresses-home-children/img_4.jpg"] }
];

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

    let event: any = null;
    try {
      const rows = await sql`
        SELECT * FROM events WHERE id = ${id} OR slug = ${id}
      `;
      if (Array.isArray(rows) && rows.length > 0) event = rows[0];
    } catch (dbErr) {
      console.warn(`GET /api/admin/events/${id}: query by exact ID failed, retrying with text cast/slug:`, dbErr);
      try {
        const fallbackRows = await sql`
          SELECT * FROM events WHERE slug = ${id} OR CAST(id AS TEXT) = ${id}
        `;
        if (Array.isArray(fallbackRows) && fallbackRows.length > 0) event = fallbackRows[0];
      } catch (fallbackErr) {
        event = null;
      }
    }

    const isEventInDb = Boolean(event);

    if (!event) {
      // Check EVENTS_DATA first
      let staticEvent = EVENTS_DATA.find((e) => e.id === id || e.numericId === id || e.id.toLowerCase() === id.toLowerCase());
      let syncMatch = SYNC_ACTIVITIES_MAP.find((a) => a.uuid === id || a.slug === id || a.numericId === id || a.legacyId === id);

      if (!staticEvent && !syncMatch) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      if (staticEvent) {
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
      } else if (syncMatch) {
        event = {
          id: syncMatch.uuid || syncMatch.numericId,
          slug: syncMatch.slug,
          title: syncMatch.title,
          event_date: syncMatch.date,
          event_time: syncMatch.time || "10:00 AM",
          location_name: syncMatch.location || "Cuddalore",
          cover_image_url: syncMatch.cover,
          short_description: syncMatch.p1 || "",
          full_description: [syncMatch.p1, syncMatch.p2, syncMatch.p3].filter(Boolean).join("\n\n"),
          category: syncMatch.category || "Welfare Drives",
          status: "published",
        };
      }
    }

    let galleryList: any[] = [];
    try {
      const gallery = await sql`
        SELECT id, image_url AS url, caption, sort_order
        FROM event_gallery_images
        WHERE event_id = ${event.id || id} OR event_id = ${event.slug || id}
        ORDER BY sort_order ASC
      `;
      if (Array.isArray(gallery)) {
        const seenUrls = new Set<string>();
        for (const item of gallery) {
          if (item && item.url && !seenUrls.has(item.url)) {
            seenUrls.add(item.url);
            galleryList.push(item);
          }
        }
      }
    } catch (galErr) {
      console.warn(`GET /api/admin/events/${id}: gallery query with sort_order failed, trying without sort_order:`, galErr);
      try {
        const gallery = await sql`
          SELECT id, image_url AS url, caption
          FROM event_gallery_images
          WHERE event_id = ${event?.id || id} OR event_id = ${event?.slug || id} OR CAST(event_id AS TEXT) = ${id}
        `;
        if (Array.isArray(gallery)) {
          const seenUrls = new Set<string>();
          for (const item of gallery) {
            if (item && item.url && !seenUrls.has(item.url)) {
              seenUrls.add(item.url);
              galleryList.push(item);
            }
          }
        }
      } catch (fallbackGalErr) {
        galleryList = [];
      }
    }

    const staticEventForGallery = EVENTS_DATA.find(
      (e) => e.id === id || e.numericId === id || e.id === event?.slug
    );
    const syncEventForGallery = SYNC_ACTIVITIES_MAP.find(
      (a) => a.uuid === id || a.slug === id || a.numericId === id || a.legacyId === id || a.slug === event?.slug
    );

    // Only fallback to static gallery images if galleryList is empty
    if (galleryList.length === 0) {
      if (staticEventForGallery && Array.isArray(staticEventForGallery.galleryImages) && staticEventForGallery.galleryImages.length > 0) {
        galleryList = staticEventForGallery.galleryImages.map((imgUrl, idx) => ({
          id: `static-${idx}`,
          url: imgUrl,
          caption: "",
          sort_order: idx,
        }));
      } else if (syncEventForGallery && Array.isArray(syncEventForGallery.gallery) && syncEventForGallery.gallery.length > 0) {
        galleryList = syncEventForGallery.gallery.map((imgUrl, idx) => ({
          id: `sync-${idx}`,
          url: imgUrl,
          caption: "",
          sort_order: idx,
        }));
      }
    }

    let dedupedVideos: any[] = [];
    try {
      const videos = await sql`
        SELECT id, title, video_url AS url, sort_order
        FROM event_videos
        WHERE event_id = ${event.id || id} OR event_id = ${event.slug || id}
        ORDER BY sort_order ASC
      `;
      if (Array.isArray(videos)) {
        const seenVideos = new Set<string>();
        for (const item of videos) {
          if (item && item.url && !seenVideos.has(item.url)) {
            seenVideos.add(item.url);
            dedupedVideos.push(item);
          }
        }
      }
    } catch (vidErr) {
      try {
        const videos = await sql`
          SELECT id, title, video_url AS url
          FROM event_videos
          WHERE event_id = ${event?.id || id} OR event_id = ${event?.slug || id} OR CAST(event_id AS TEXT) = ${id}
        `;
        if (Array.isArray(videos)) {
          const seenVideos = new Set<string>();
          for (const item of videos) {
            if (item && item.url && !seenVideos.has(item.url)) {
              seenVideos.add(item.url);
              dedupedVideos.push(item);
            }
          }
        }
      } catch (fallbackVidErr) {
        dedupedVideos = [];
      }
    }

    return NextResponse.json({ event: { ...event, gallery_images: galleryList, video_links: dedupedVideos } });
  } catch (err: any) {
    console.error(`GET /api/admin/events/[id] outer error:`, err);
    // If anything fails inside outer block, try one last static skeleton rescue before 500 error!
    try {
      const { id } = await params;
      let staticRes = EVENTS_DATA.find((e) => e.id === id || e.numericId === id);
      let syncRes = SYNC_ACTIVITIES_MAP.find((a) => a.uuid === id || a.slug === id || a.numericId === id);
      if (staticRes || syncRes) {
        const t = staticRes ? staticRes.title : syncRes?.title || "Seva Activity";
        const c = staticRes ? staticRes.coverImage : syncRes?.cover || "";
        const p = staticRes ? staticRes.description.join("\n\n") : [syncRes?.p1, syncRes?.p2, syncRes?.p3].filter(Boolean).join("\n\n");
        return NextResponse.json({
          event: {
            id: id,
            slug: staticRes ? staticRes.id : syncRes?.slug || id,
            title: t,
            event_date: staticRes ? staticRes.date : syncRes?.date || "2026-01-01",
            event_time: "10:00 AM",
            location_name: "Cuddalore / Tamil Nadu",
            cover_image_url: c,
            short_description: p.slice(0, 150),
            full_description: p,
            category: "Welfare Drives",
            status: "published",
            gallery_images: [],
            video_links: []
          }
        });
      }
    } catch (rescueErr) {}
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

    let updatedEvent: any = null;
    try {
      const rows = await sql`
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
        WHERE id = ${id} OR slug = ${id}
        RETURNING *
      `;
      if (Array.isArray(rows) && rows.length > 0) updatedEvent = rows[0];
    } catch (updErr) {
      try {
        const fallbackRows = await sql`
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
          WHERE slug = ${id} OR CAST(id AS TEXT) = ${id}
          RETURNING *
        `;
        if (Array.isArray(fallbackRows) && fallbackRows.length > 0) updatedEvent = fallbackRows[0];
      } catch (fallbackUpdErr) {}
    }

    if (!updatedEvent) {
      try {
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
      } catch (insErr) {
        // If insert with exact ID fails (e.g. string uuid into int column), try inserting with just slug or safe cast
        const [insertedCast] = await sql`
          INSERT INTO events (
            slug, title, event_date, event_time, location_name,
            latitude, longitude, cover_image_url, short_description, full_description,
            category, status
          ) VALUES (
            ${slugify(title || id)}, ${title}, ${event_date}, ${event_time || "09:00"}, ${location_name || "Tamil Nadu"},
            ${latNum}, ${lngNum}, ${cover_image_url}, ${short_description || null}, ${full_description || null},
            ${category || "General"}, ${status || "published"}
          )
          RETURNING *
        `;
        updatedEvent = insertedCast;
      }
    }

    // Replace gallery images
    const targetEventId = String(updatedEvent?.id || id);
    const targetEventSlug = String(updatedEvent?.slug || id);
    try {
      await sql`DELETE FROM event_gallery_images WHERE event_id = ${id} OR event_id = ${targetEventId} OR event_id = ${targetEventSlug} OR CAST(event_id AS TEXT) = ${id}`;
    } catch (delGalErr) {}

    if (Array.isArray(gallery_images)) {
      const seenPutUrls = new Set<string>();
      let sortOrder = 0;
      for (let i = 0; i < gallery_images.length; i++) {
        const img = gallery_images[i];
        if (img && img.url && !seenPutUrls.has(img.url)) {
          seenPutUrls.add(img.url);
          try {
            await sql`
              INSERT INTO event_gallery_images (event_id, image_url, caption, sort_order)
              VALUES (${targetEventId}, ${img.url}, ${img.caption || null}, ${sortOrder++})
            `;
          } catch (insGalErr) {
            try {
              await sql`
                INSERT INTO event_gallery_images (event_id, image_url, caption)
                VALUES (${targetEventId}, ${img.url}, ${img.caption || null})
              `;
            } catch (insGalErr2) {}
          }
        }
      }
    }

    // Replace event videos
    if (Array.isArray(video_links) && video_links.length > 0) {
      try {
        await sql`DELETE FROM event_videos WHERE event_id = ${id} OR event_id = ${targetEventId} OR event_id = ${targetEventSlug} OR CAST(event_id AS TEXT) = ${id}`;
      } catch (delVidErr) {}
      const seenPutVids = new Set<string>();
      let vidOrder = 0;
      for (let i = 0; i < video_links.length; i++) {
        const vid = video_links[i];
        if (vid && vid.url && !seenPutVids.has(vid.url)) {
          seenPutVids.add(vid.url);
          try {
            await sql`
              INSERT INTO event_videos (event_id, title, video_url, sort_order)
              VALUES (${targetEventId}, ${vid.title || "Event Video"}, ${vid.url}, ${vidOrder++})
            `;
          } catch (insVidErr) {
            try {
              await sql`
                INSERT INTO event_videos (event_id, title, video_url)
                VALUES (${targetEventId}, ${vid.title || "Event Video"}, ${vid.url})
              `;
            } catch (insVidErr2) {}
          }
        }
      }
    } else if (body.clear_videos === true) {
      try {
        await sql`DELETE FROM event_videos WHERE event_id = ${id} OR CAST(event_id AS TEXT) = ${id}`;
      } catch (delVidErr2) {}
    }

    return NextResponse.json({ event: updatedEvent });
  } catch (err: any) {
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

    let deleted: any = null;
    try {
      const rows = await sql`
        DELETE FROM events WHERE id = ${id} OR slug = ${id} RETURNING id
      `;
      if (Array.isArray(rows) && rows.length > 0) deleted = rows[0];
    } catch (delErr) {
      try {
        const fallbackRows = await sql`
          DELETE FROM events WHERE slug = ${id} OR CAST(id AS TEXT) = ${id} RETURNING id
        `;
        if (Array.isArray(fallbackRows) && fallbackRows.length > 0) deleted = fallbackRows[0];
      } catch (fallbackDelErr) {}
    }

    if (!deleted) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: deleted.id });
  } catch (err) {
    console.error(`DELETE /api/admin/events/[id] error:`, err);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
