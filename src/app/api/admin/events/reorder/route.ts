import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import sql from "@/lib/db";
import { EVENTS_DATA, getCleanEventImage } from "@/data/events";
import { slugify } from "@/utils/slugify";

const SYNC_ACTIVITIES_MAP = [
  { numericId: "50", legacyId: "40", uuid: "0054e6d5-2bde-4ce3-a07e-3fb8be44b1a4", slug: "digitisation-activities-wshg", title: "In Digitisation activities for Women Self Help Group society", category: "Women's Empowerment", date: "2026-01-01", time: "10:00 AM", location: "Cuddalore", cover: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997177/dhara_foundations/activities/digitisation-activities-wshg/img_1.jpg", p1: "Conducting digitisation activities for Women Self Help Group societies as part of a community empowerment and rural development initiative." },
  { numericId: "51", legacyId: "39", uuid: "3dc970bf-4f6c-4f09-9ce4-2e7d0d3581f5", slug: "tribal-welfare-javadhu-hills", title: "In Tribal welfare activities at Javadhu hills", category: "Tribal Welfare", date: "2025-11-06", time: "10:00 AM", location: "Javadhu Hills", cover: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997186/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_1.jpg", p1: "Conducting tribal welfare activities in Javadhu Hills as part of a social development and community upliftment initiative." },
  { numericId: "52", legacyId: "38", uuid: "cf30f5d9-bb25-4ec4-a785-8c8502bd9625", slug: "diwali-dresses-home-children", title: "Providing Diwali Dresses To Home Children", category: "Children & Education", date: "2025-10-18", time: "10:00 AM", location: "Cuddalore", cover: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997194/dhara_foundations/activities/diwali-dresses-home-children/img_1.jpg", p1: "Providing Diwali dresses to home children in Cuddalore as part of a festive welfare and child support initiative." }
];

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    if (!Array.isArray(body.items)) {
      return NextResponse.json({ error: "items must be an array of { id, sort_order }" }, { status: 400 });
    }

    for (const item of body.items) {
      if (item.id !== undefined && item.sort_order !== undefined) {
        const idStr = String(item.id);
        const orderNum = Number(item.sort_order);
        let updated: any = null;

        try {
          const rows = await sql`
            UPDATE events
            SET sort_order = ${orderNum}
            WHERE id = ${idStr} OR slug = ${idStr}
            RETURNING id
          `;
          if (Array.isArray(rows) && rows.length > 0) updated = rows[0];
        } catch (dbErr) {
          try {
            const fallbackRows = await sql`
              UPDATE events
              SET sort_order = ${orderNum}
              WHERE slug = ${idStr} OR CAST(id AS TEXT) = ${idStr}
              RETURNING id
            `;
            if (Array.isArray(fallbackRows) && fallbackRows.length > 0) updated = fallbackRows[0];
          } catch (fallbackErr) {}
        }

        // If row doesn't exist yet in events Postgres table (e.g., static Seva activity being ordered for the first time)
        if (!updated) {
          const staticEvent = EVENTS_DATA.find((e) => e.id === idStr || e.numericId === idStr || e.id.toLowerCase() === idStr.toLowerCase());
          const syncMatch = SYNC_ACTIVITIES_MAP.find((a) => a.uuid === idStr || a.slug === idStr || a.numericId === idStr || a.legacyId === idStr);

          if (staticEvent || syncMatch) {
            const title = staticEvent ? staticEvent.title : syncMatch?.title || idStr;
            const slug = staticEvent ? staticEvent.id : syncMatch?.slug || slugify(idStr);
            const event_date = staticEvent ? staticEvent.date : syncMatch?.date || "2026-01-01";
            const location_name = staticEvent ? staticEvent.location : syncMatch?.location || "Tamil Nadu";
            const cover = staticEvent ? getCleanEventImage(`${staticEvent.title} ${staticEvent.id} ${staticEvent.coverImage}`, staticEvent.coverImage) : syncMatch?.cover || "";
            const desc = staticEvent ? (staticEvent.description[0] || "") : (syncMatch?.p1 || "");
            const isSanatana = staticEvent ? (staticEvent.category === "Sanatana Dharma" || title.toLowerCase().includes("temple") || title.toLowerCase().includes("girivalam") || title.toLowerCase().includes("pooja")) : false;
            const category = staticEvent ? (staticEvent.category || (isSanatana ? "Sanatana Dharma" : "Welfare Drives")) : (syncMatch?.category || "Welfare Drives");

            try {
              await sql`
                INSERT INTO events (
                  id, slug, title, event_date, event_time, location_name,
                  cover_image_url, short_description, category, status, sort_order
                ) VALUES (
                  ${idStr}, ${slug}, ${title}, ${event_date}, '09:00', ${location_name},
                  ${cover}, ${desc}, ${category}, 'published', ${orderNum}
                )
              `;
            } catch (insErr) {
              try {
                await sql`
                  INSERT INTO events (
                    slug, title, event_date, event_time, location_name,
                    cover_image_url, short_description, category, status, sort_order
                  ) VALUES (
                    ${slug}, ${title}, ${event_date}, '09:00', ${location_name},
                    ${cover}, ${desc}, ${category}, 'published', ${orderNum}
                  )
                `;
              } catch (insErr2) {}
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true, message: "Activities reordered successfully" });
  } catch (err: any) {
    console.error("POST /api/admin/events/reorder error:", err);
    return NextResponse.json({ error: err?.message || "Failed to reorder activities" }, { status: 500 });
  }
}
