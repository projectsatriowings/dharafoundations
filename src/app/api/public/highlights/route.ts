import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const DEFAULT_TOP_HIGHLIGHTS = [
  { id: 1, pillar: "charity", badge: "Welfare Drives", title: "Providing meal and food carriers to Govt Home Children", description: "Providing nutritious meals and food carriers to the children of Annai Sathiya District Government Home as part of a social welfare and community support initiative.", image_url: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997211/dhara_foundations/activities/meal-food-carriers-govt-home/img_1.jpg", link_url: "/sevas/meal-food-carriers-govt-home", sort_order: 1 },
  { id: 2, pillar: "charity", badge: "Welfare Drives", title: "In Tribal welfare activities at Javadhu hills", description: "Conducting tribal welfare activities in Javadhu Hills as part of a social development and community upliftment initiative aimed at improving the living conditions of tribal communities.", image_url: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997186/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_1.jpg", link_url: "/sevas/tribal-welfare-javadhu-hills", sort_order: 2 },
  { id: 3, pillar: "charity", badge: "Women's Empowerment", title: "In Digitisation activities for Women Self Help Group society", description: "Conducting digitisation activities for Women Self Help Group societies as part of a community empowerment initiative aimed at improving digital literacy and financial inclusion.", image_url: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997177/dhara_foundations/activities/digitisation-activities-wshg/img_1.jpg", link_url: "/sevas/digitisation-activities-wshg", sort_order: 3 },
  { id: 4, pillar: "sanatana_dharma", badge: "Sanatana Dharma", title: "Masi Pournami Maha Girivalam", description: "A religious awareness procession organized to promote the Masi Pournami Maha Girivalam at Thirupparankundram with devotees and spiritual devotion.", image_url: "/images/events/masi-pournami-girivalam.jpg", link_url: "/sevas/masi-pournami-girivalam", sort_order: 4 },
  { id: 5, pillar: "sanatana_dharma", badge: "Sanatana Dharma", title: "Brindavana Kumbabhishekam ceremony", description: "The Maha Kumbabhishekam Vaibhavam of Shri Raghavendra Swamigal Dakshina Bikshalaya Brindavanam celebrated in a grand spiritual manner at Anaikuppam, Cuddalore.", image_url: "/images/events/brindavana-kumbabhishekam.jpg", link_url: "/sevas/brindavana-kumbabhishekam", sort_order: 5 },
  { id: 6, pillar: "sanatana_dharma", badge: "Sanatana Dharma", title: "Devotional offering presented to the temple", description: "As a mark of faith and devotion, the Kodai was respectfully presented to the temple as a devotional contribution symbolizing spiritual dedication and support.", image_url: "/images/events/devotional-offering-kodai.jpg", link_url: "/sevas/devotional-offering-kodai", sort_order: 6 },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pillar = searchParams.get("pillar");

    let highlights: any[] = [];
    try {
      highlights = await sql`
        SELECT id, pillar, badge, title, description, image_url, link_url, sort_order
        FROM seva_highlights
        WHERE (${!pillar || pillar === "all"}::boolean OR pillar = ${pillar})
        ORDER BY sort_order ASC, id ASC
      `;
    } catch (dbErr) {
      try {
        highlights = await sql`
          SELECT id, pillar, badge, title, description, image_url, link_url
          FROM seva_highlights
          WHERE (${!pillar || pillar === "all"}::boolean OR pillar = ${pillar})
          ORDER BY id ASC
        `;
      } catch (fallbackErr) {
        highlights = [];
      }
    }

    if (!highlights || highlights.length === 0) {
      const filteredDefaults = DEFAULT_TOP_HIGHLIGHTS.filter(h => !pillar || pillar === "all" || h.pillar === pillar);
      return NextResponse.json({ highlights: filteredDefaults });
    }

    return NextResponse.json({ highlights });
  } catch (err) {
    console.error("GET /api/public/highlights outer error:", err);
    return NextResponse.json({ highlights: DEFAULT_TOP_HIGHLIGHTS });
  }
}
