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
    console.warn("GET /api/public/homepage DB timeout/error, returning static fallback:", err);
    return NextResponse.json({
      stats: [
        { id: 1, label: "TEMPLES RESTORED", value: "100+", sort_order: 1 },
        { id: 2, label: "MEALS SERVED", value: "50,000+", sort_order: 2 },
        { id: 3, label: "STUDENTS SUPPORTED", value: "2,500+", sort_order: 3 },
        { id: 4, label: "ACTIVE VOLUNTEERS", value: "500+", sort_order: 4 },
      ],
      config: {
        hero_image_url: "/images/hero-devi.png",
        intro_video_1_url: process.env.NEXT_PUBLIC_INTRO_VIDEO_1 || "https://res.cloudinary.com/woo94xq2/video/upload/v1783059459/dhara_foundations/videos/viqfipyzkvrkvumsuksg.mp4",
        intro_video_2_url: process.env.NEXT_PUBLIC_INTRO_VIDEO_2 || "https://res.cloudinary.com/woo94xq2/video/upload/v1783059473/dhara_foundations/videos/osokgojzgb0sdg1vlywr.mp4",
      }
    });
  }
}
