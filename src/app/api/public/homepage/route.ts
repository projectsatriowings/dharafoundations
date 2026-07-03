import { NextResponse } from "next/server";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await sql`SELECT * FROM homepage_stats ORDER BY sort_order ASC`;
    const [configRow] = await sql`SELECT hero_image_url, intro_video_1_url, intro_video_2_url FROM site_settings WHERE id = 1`;

    const config = {
      hero_image_url: (!configRow?.hero_image_url || configRow.hero_image_url === "/images/about.png") ? "/images/hero-devi.png" : configRow.hero_image_url,
      intro_video_1_url: configRow?.intro_video_1_url || process.env.NEXT_PUBLIC_INTRO_VIDEO_1 || "https://res.cloudinary.com/woo94xq2/video/upload/v1783059459/dhara_foundations/videos/viqfipyzkvrkvumsuksg.mp4",
      intro_video_2_url: configRow?.intro_video_2_url || process.env.NEXT_PUBLIC_INTRO_VIDEO_2 || "https://res.cloudinary.com/woo94xq2/video/upload/v1783059473/dhara_foundations/videos/osokgojzgb0sdg1vlywr.mp4",
    };

    return NextResponse.json({ stats, config });
  } catch (err) {
    console.error("GET /api/public/homepage error:", err);
    return NextResponse.json({ error: "Failed to fetch public homepage content" }, { status: 500 });
  }
}
