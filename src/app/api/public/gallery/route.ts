import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";

const DEFAULT_PHOTOS = [
  { caption: "Kanchipuram Heritage Project", category: "Temple Restoration", image_url: "/images/gallery-1.png" },
  { caption: "Anna Daanam Drive", category: "Community Service", image_url: "/images/gallery-2.png" },
  { caption: "Annual Cultural Gala", category: "Events", image_url: "/images/gallery-3.png" },
  { caption: "Artisan Workshops", category: "Temple Restoration", image_url: "/images/event-1.png" },
  { caption: "Vriksharopan Initiative", category: "Community Service", image_url: "/images/event-2.png" },
  { caption: "Deepotsav Celebrations", category: "Events", image_url: "/images/event-3.png" },
  { caption: "Chola Mandapam Conservation", category: "Temple Restoration", image_url: "/Event images/05.jpg" },
  { caption: "Goshala Seva & Care", category: "Community Service", image_url: "/Event images/18.jpg" },
  { caption: "Vedic Chanting Mahotsav", category: "Events", image_url: "/Event images/22.jpg" },
  { caption: "Women Craftsmanship Drive", category: "Community Service", image_url: "/Event images/52.jpg" },
  { caption: "Youth Heritage Walk", category: "Events", image_url: "/images/volunteer.png" },
  { caption: "Palm-Leaf Scripture Preservation", category: "Temple Restoration", image_url: "/images/about.png" },
];

export async function GET(req: NextRequest) {
  try {
    const [{ count }] = await sql`SELECT COUNT(*) FROM gallery_photos`;
    if (Number(count) < 5) {
      for (const item of DEFAULT_PHOTOS) {
        await sql`
          INSERT INTO gallery_photos (image_url, caption, category, is_featured)
          SELECT ${item.image_url}, ${item.caption}, ${item.category}, false
          WHERE NOT EXISTS (
            SELECT 1 FROM gallery_photos WHERE image_url = ${item.image_url}
          )
        `;
      }
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const photos = await sql`
      SELECT id, image_url, caption, category, is_featured, sort_order, created_at
      FROM gallery_photos
      WHERE (${!category || category === "all"}::boolean OR category = ${category})
      ORDER BY is_featured DESC, created_at DESC
    `;

    return NextResponse.json({ photos });
  } catch (err) {
    console.error("GET /api/public/gallery error:", err);
    return NextResponse.json({ error: "Failed to fetch gallery photos" }, { status: 500 });
  }
}
