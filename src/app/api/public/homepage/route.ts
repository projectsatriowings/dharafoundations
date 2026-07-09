import { NextResponse } from "next/server";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await sql`SELECT * FROM homepage_stats ORDER BY sort_order ASC`;
    const galleryRows = await sql`SELECT id, title, description, image_url AS image, sort_order FROM homepage_interactive_gallery ORDER BY sort_order ASC`;
    const [configRow] = await sql`SELECT hero_image_url, intro_video_1_url, intro_video_2_url FROM site_settings WHERE id = 1`;

    const config = {
      hero_image_url:
        !configRow?.hero_image_url ||
        configRow.hero_image_url === "/images/about.png" ||
        configRow.hero_image_url === "/images/hero-devi.png"
          ? "https://res.cloudinary.com/woo94xq2/video/upload/v1783059459/dhara_foundations/videos/viqfipyzkvrkvumsuksg.mp4"
          : configRow.hero_image_url,
      intro_video_1_url:
        configRow?.intro_video_1_url ||
        process.env.NEXT_PUBLIC_INTRO_VIDEO_1 ||
        "https://res.cloudinary.com/woo94xq2/video/upload/v1783059459/dhara_foundations/videos/viqfipyzkvrkvumsuksg.mp4",
      intro_video_2_url:
        configRow?.intro_video_2_url ||
        process.env.NEXT_PUBLIC_INTRO_VIDEO_2 ||
        "https://res.cloudinary.com/woo94xq2/video/upload/v1783059473/dhara_foundations/videos/osokgojzgb0sdg1vlywr.mp4",
    };

    return NextResponse.json({ stats, config, gallery: galleryRows });
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
        hero_image_url: "https://res.cloudinary.com/woo94xq2/video/upload/v1783059459/dhara_foundations/videos/viqfipyzkvrkvumsuksg.mp4",
        intro_video_1_url: process.env.NEXT_PUBLIC_INTRO_VIDEO_1 || "https://res.cloudinary.com/woo94xq2/video/upload/v1783059459/dhara_foundations/videos/viqfipyzkvrkvumsuksg.mp4",
        intro_video_2_url: process.env.NEXT_PUBLIC_INTRO_VIDEO_2 || "https://res.cloudinary.com/woo94xq2/video/upload/v1783059473/dhara_foundations/videos/osokgojzgb0sdg1vlywr.mp4",
      },
      gallery: [
        { title: "Spiritualism", description: "Ceremony with spiritual leaders in saffron robes", image: "/images/gallery-1.png", sort_order: 0 },
        { title: "Temple Restoration", description: "Traditional prayers & architectural renovation", image: "/images/gallery-2.png", sort_order: 1 },
        { title: "Community Welfare", description: "Festive temple processions & rural support", image: "/images/gallery-3.png", sort_order: 2 },
        { title: "Sacred Heritage", description: "Sacred ash and rudraksha devotional offerings", image: "/images/about.png", sort_order: 3 },
        { title: "Vedic Traditions", description: "Timeless rituals preserving ancient wisdom", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", sort_order: 4 }
      ]
    });
  }
}
