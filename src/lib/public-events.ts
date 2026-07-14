import sql from "@/lib/db";
import { EVENTS_DATA, type Event, getCleanEventImage } from "@/data/events";

function formatEventDate(dateVal?: string | Date): string {
  if (!dateVal) return "Date TBA";
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return "Date TBA";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Date TBA";
  }
}

function formatEventTime(timeStr?: string): string {
  if (!timeStr) return "Time TBA";
  const [hoursStr, minutesStr] = timeStr.split(":");
  const hours = parseInt(hoursStr, 10);
  if (isNaN(hours)) return timeStr;
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = ((hours + 11) % 12) + 1;
  return `${formattedHours.toString().padStart(2, "0")}:${minutesStr || "00"} ${ampm}`;
}

/**
 * Fetches all published events from the Neon database and formats them
 * to match the public site's Event interface.
 * Falls back to static EVENTS_DATA if DB query fails.
 */
export async function getPublicEvents(): Promise<Event[]> {
  try {
    const rows = await sql`
      SELECT id, slug, title, event_date, event_time, location_name,
             latitude, longitude, cover_image_url, short_description,
             full_description, category
      FROM events
      WHERE status = 'published'
      ORDER BY event_date DESC
    `;

    let allGalleryRows: any[] = [];
    try {
      allGalleryRows = await sql`
        SELECT event_id, image_url, sort_order
        FROM event_gallery_images
        ORDER BY sort_order ASC
      `;
    } catch (gErr) {
      console.warn("Could not load gallery rows for public events:", gErr);
    }
    const galleryByEventId = new Map<string, string[]>();
    for (const g of allGalleryRows) {
      if (!g.image_url) continue;
      const key = String(g.event_id);
      if (!galleryByEventId.has(key)) galleryByEventId.set(key, []);
      galleryByEventId.get(key)!.push(g.image_url);
    }

    const dbEvents: Event[] = rows.map((r, idx): Event => {
      const descList: string[] = [];
      if (r.full_description) {
        const stripped = r.full_description.replace(/<[^>]+>/g, "\n").split("\n").map((s: string) => s.trim()).filter(Boolean);
        if (stripped.length > 0) descList.push(...stripped);
      }
      if (descList.length === 0 && r.short_description) {
        descList.push(r.short_description);
      }
      if (descList.length === 0) {
        descList.push("Join us for this community event.");
      }

      const cleanImg = getCleanEventImage(`${r.title || ""} ${r.slug || ""} ${r.cover_image_url || ""}`, r.cover_image_url);
      const evIdStr = String(r.id);
      const evSlugStr = String(r.slug || "");
      const matchedGallery = Array.from(new Set([
        ...(galleryByEventId.get(evIdStr) || []),
        ...(galleryByEventId.get(evSlugStr) || []),
      ]));

      return {
        id: r.slug || r.id.toString(),
        numericId: (idx + 40).toString(),
        title: r.title,
        category: r.category || "General",
        date: formatEventDate(r.event_date),
        time: formatEventTime(r.event_time),
        location: r.location_name,
        coordinates: {
          lat: Number(r.latitude || 13.0827),
          lng: Number(r.longitude || 80.2707),
        },
        coverImage: cleanImg,
        description: descList,
        galleryImages: matchedGallery,
      };
    });

    const existingSlugs = new Set(dbEvents.map((e) => e.id.toLowerCase()));
    const existingTitles = new Set(dbEvents.map((e) => e.title.toLowerCase().trim()));
    const staticFiltered = EVENTS_DATA.filter(
      (s) => !existingSlugs.has(s.id.toLowerCase()) && !existingTitles.has(s.title.toLowerCase().trim())
    );

    return [...dbEvents, ...staticFiltered];
  } catch (err) {
    console.warn("Falling back to static EVENTS_DATA due to DB error:", err);
    return EVENTS_DATA;
  }
}

/**
 * Fetches a single event by slug or numeric ID along with its gallery images.
 */
export async function getPublicEventBySlug(slug: string): Promise<Event | null> {
  try {
    const aliasMap: Record<string, string> = {
      "50": "digitisation-activities-wshg",
      "51": "tribal-welfare-javadhu-hills",
      "52": "diwali-dresses-home-children",
      "53": "footwear-girl-children-annai-sathiya",
      "54": "felicitation-sports-children-pongal",
      "55": "meal-food-carriers-govt-home",
      "56": "covid-19-relief",
    };
    const lookupSlug = aliasMap[slug] || slug;

    const rows = await sql`
      SELECT * FROM events
      WHERE slug = ${lookupSlug} OR id::text = ${lookupSlug} OR (slug = 'dhara-divine-awards' AND ${lookupSlug} = 'dhara-divine-awards-2026')
      LIMIT 1
    `;

    if (!rows || rows.length === 0) {
      const staticEvent = EVENTS_DATA.find((e) => e.id === lookupSlug || e.numericId === lookupSlug);
      return staticEvent || null;
    }

    const r = rows[0];

    let galleryRows: any[] = [];
    try {
      galleryRows = await sql`
        SELECT image_url
        FROM event_gallery_images
        WHERE event_id::text = ${String(r.id)} OR event_id::text = ${String(r.slug || '')} OR event_id::text = ${String(lookupSlug)} OR event_id::text = ${String(slug)}
        ORDER BY sort_order ASC
      `;
    } catch (gErr) {
      console.warn("Could not fetch gallery images for event:", gErr);
    }

    let videoRows: any[] = [];
    try {
      videoRows = await sql`
        SELECT title, video_url
        FROM event_videos
        WHERE event_id::text = ${String(r.id)} OR event_id::text = ${String(r.slug || '')} OR event_id::text = ${String(lookupSlug)} OR event_id::text = ${String(slug)}
        ORDER BY sort_order ASC
      `;
    } catch (vErr) {
      console.warn("Could not fetch video rows for event:", vErr);
    }

    const descList: string[] = [];
    if (r.full_description) {
      const stripped = r.full_description.replace(/<[^>]+>/g, "\n").split("\n").map((s: string) => s.trim()).filter(Boolean);
      if (stripped.length > 0) descList.push(...stripped);
    }
    if (descList.length === 0 && r.short_description) {
      descList.push(r.short_description);
    }
    if (descList.length === 0) {
      descList.push("Join us for this community event.");
    }

    const cleanImg = getCleanEventImage(`${r.title || ""} ${r.slug || ""} ${r.cover_image_url || ""}`, r.cover_image_url);
    const galleryUrls = Array.from(new Set(galleryRows.map((g) => g.image_url).filter(Boolean)));

    const videoLinks = videoRows.map((v) => ({
      title: v.title || "Event Video",
      url: v.video_url,
    }));

    return {
      id: r.slug || r.id.toString(),
      title: r.title,
      category: r.category || "General",
      date: formatEventDate(r.event_date),
      time: formatEventTime(r.event_time),
      location: r.location_name,
      coordinates: {
        lat: Number(r.latitude || 13.0827),
        lng: Number(r.longitude || 80.2707),
      },
      coverImage: cleanImg,
      description: descList,
      galleryImages: galleryUrls,
      videoLinks: videoLinks.length > 0 ? videoLinks : undefined,
      socialLinks: {
        twitter: r.twitter_share_url || undefined,
        facebook: r.facebook_share_url || undefined,
        pinterest: r.pinterest_share_url || undefined,
        instagram: r.instagram_share_url || undefined,
      },
    };
  } catch (err) {
    console.warn("Falling back to static EVENTS_DATA for slug due to DB error:", err);
    const staticEvent = EVENTS_DATA.find((e) => e.id === slug || e.numericId === slug);
    return staticEvent || null;
  }
}
