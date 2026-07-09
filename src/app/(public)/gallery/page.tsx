import React from "react";
import sql from "@/lib/db";
import { EVENTS_DATA, getCleanEventImage } from "@/data/events";
import GalleryClient from "./GalleryClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GalleryPage() {
  let initialPhotos: any[] = [];
  let initialEvents: any[] = [];

  try {
    const photos = await sql`
      SELECT id, image_url, caption, category, is_featured, sort_order, created_at
      FROM gallery_photos
      ORDER BY is_featured DESC, created_at DESC
    `;
    if (photos && Array.isArray(photos)) {
      initialPhotos = photos.map((p: any) => {
        const rawCat = (p.category || "").toLowerCase();
        const isDharma = !(
          rawCat.includes("children") ||
          rawCat.includes("education") ||
          rawCat.includes("charity") ||
          rawCat.includes("welfare") ||
          rawCat.includes("livelihood") ||
          rawCat.includes("shg") ||
          rawCat.includes("anna daanam")
        );
        return {
          id: String(p.id),
          title: p.caption || "Sacred Seva",
          category: isDharma ? "Sanatana Dharma" : "Charity",
          desc: p.caption || "",
          src: p.image_url,
          pillBg: isDharma
            ? "bg-saffron-glow/90 text-deep-forest"
            : "bg-tertiary-container text-on-tertiary-container",
          type: "photo" as const,
        };
      });
    }
  } catch (err) {
    console.error("GalleryPage Server Component error (photos):", err);
  }

  if (initialPhotos.length === 0) {
    initialPhotos = [
      {
        id: "9c07531c-d88c-4421-baf8-6ec63a903fad",
        title: "kodai for temple",
        category: "Sanatana Dharma",
        desc: "Devotional offering presented to the temple",
        src: "/images/gallery-3.png",
        pillBg: "bg-saffron-glow/90 text-deep-forest",
        type: "photo",
      },
      {
        id: "dd11d903-9f36-4eb1-bae3-eab1a53d8aab",
        title: "Cuddalore Raghavendra Temple",
        category: "Sanatana Dharma",
        desc: "Bhoomi Pooja Performed for Raghavendra Temple",
        src: "/images/gallery-2.png",
        pillBg: "bg-saffron-glow/90 text-deep-forest",
        type: "photo",
      },
      {
        id: "e64cfc3f-ecef-44b4-b497-26a648067f46",
        title: "Poojya Sri Vidya Vallabha Madhava Theertha Swamigal",
        category: "Sanatana Dharma",
        desc: "Brindavana Kumbabhishekam ceremony",
        src: "/images/gallery-1.png",
        pillBg: "bg-saffron-glow/90 text-deep-forest",
        type: "photo",
      },
      {
        id: "4fe72d6b-caae-4c9e-8c48-81667a385d13",
        title: "Youth Heritage Walk",
        category: "Charity",
        desc: "Inspiring youth to connect with traditional roots.",
        src: "/images/volunteer.png",
        pillBg: "bg-tertiary-container text-on-tertiary-container",
        type: "photo",
      },
      {
        id: "956f329c-a805-4db2-9433-fbe7e6124a04",
        title: "Vriksharopan Initiative",
        category: "Charity",
        desc: "Planting saplings and fostering green cover.",
        src: "/images/event-2.png",
        pillBg: "bg-tertiary-container text-on-tertiary-container",
        type: "photo",
      },
    ];
  }

  try {
    const dbEvents = await sql`
      SELECT id, slug, title, event_date, event_time, location_name,
             cover_image_url, status, category, updated_at
      FROM events
      WHERE status = 'published' OR status IS NULL
      ORDER BY event_date DESC
    `;
    if (dbEvents && Array.isArray(dbEvents) && dbEvents.length > 0) {
      initialEvents = dbEvents.map((ev: any) => {
        const cleanImg = getCleanEventImage(`${ev.title || ""} ${ev.slug || ""} ${ev.cover_image_url || ""}`, ev.cover_image_url);
        let dateStr = "Upcoming";
        if (ev.event_date) {
          if (ev.event_date instanceof Date) {
            dateStr = ev.event_date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
          } else if (typeof ev.event_date === "string") {
            const str = ev.event_date;
            if (str.includes("T") || str.match(/^\d{4}-\d{2}-\d{2}/)) {
              const parsed = new Date(str);
              if (!isNaN(parsed.getTime())) {
                dateStr = parsed.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
              } else {
                dateStr = str;
              }
            } else {
              dateStr = str;
            }
          } else {
            dateStr = String(ev.event_date);
          }
        }
        return {
          id: ev.id || ev.slug,
          title: ev.title,
          category: ev.category || "Charity",
          date: dateStr,
          time: ev.event_time || "10:00 AM",
          location: ev.location_name || "Tamil Nadu",
          mapsUrl: `https://www.google.com/maps?q=${encodeURIComponent(ev.location_name || "Tamil Nadu")}`,
          img: cleanImg || "/images/event-1.png",
          desc: ev.short_description || ev.desc || "Dedicated seva and welfare drive uplifting communities and preserving cultural heritage across Tamil Nadu.",
        };
      });
    }
  } catch (err) {
    console.warn("GalleryPage Server Component error (events), using static fallback:", err);
  }

  const existingSlugs = new Set(initialEvents.map((e: any) => String(e.id || "").toLowerCase()));
  const existingTitles = new Set(initialEvents.map((e: any) => (e.title || "").toLowerCase().trim()));

  const staticEventsMapped = EVENTS_DATA.filter(
    (ev) => !existingSlugs.has(ev.id.toLowerCase()) && !existingTitles.has(ev.title.toLowerCase().trim())
  ).map((ev) => ({
    id: ev.id,
    title: ev.title,
    category: ev.category,
    date: ev.date,
    time: ev.time,
    location: ev.location,
    mapsUrl: `https://www.google.com/maps?q=${ev.coordinates.lat},${ev.coordinates.lng}`,
    img: ev.coverImage,
    desc: ev.description[0],
  }));

  initialEvents = [...initialEvents, ...staticEventsMapped];

  return <GalleryClient initialPhotos={initialPhotos} initialEvents={initialEvents} />;
}
