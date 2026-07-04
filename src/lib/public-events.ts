import sql from "@/lib/db";
import { EVENTS_DATA, type Event } from "@/data/events";

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

    if (!rows || rows.length === 0) {
      return EVENTS_DATA;
    }

    return rows.map((r, idx): Event => {
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
        coverImage: r.cover_image_url,
        description: descList,
        galleryImages: [r.cover_image_url],
      };
    });
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
    const rows = await sql`
      SELECT * FROM events
      WHERE slug = ${slug} OR id::text = ${slug}
      LIMIT 1
    `;

    if (!rows || rows.length === 0) {
      const staticEvent = EVENTS_DATA.find((e) => e.id === slug || e.numericId === slug);
      return staticEvent || null;
    }

    const r = rows[0];

    const galleryRows = await sql`
      SELECT image_url
      FROM event_gallery_images
      WHERE event_id = ${r.id}
      ORDER BY sort_order ASC
    `;

    const videoRows = await sql`
      SELECT title, video_url
      FROM event_videos
      WHERE event_id = ${r.id}
      ORDER BY sort_order ASC
    `;

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

    const galleryUrls = galleryRows.map((g) => g.image_url);
    if (galleryUrls.length === 0 && r.cover_image_url) {
      galleryUrls.push(r.cover_image_url);
    }

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
      coverImage: r.cover_image_url,
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
