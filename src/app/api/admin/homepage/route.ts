import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const stats = await sql`SELECT * FROM homepage_stats ORDER BY sort_order ASC`;
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
        "https://res.cloudinary.com/woo94xq2/video/upload/v1783059459/dhara_foundations/videos/viqfipyzkvrkvumsuksg.mp4",
      intro_video_2_url:
        configRow?.intro_video_2_url ||
        "https://res.cloudinary.com/woo94xq2/video/upload/v1783059473/dhara_foundations/videos/osokgojzgb0sdg1vlywr.mp4",
    };

    return NextResponse.json({ stats, config });
  } catch (err) {
    console.error("GET /api/admin/homepage error:", err);
    return NextResponse.json({ error: "Failed to fetch homepage data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { stats, config } = await req.json();

    if (config) {
      await sql`
        UPDATE site_settings SET
          hero_image_url = COALESCE(${config.hero_image_url}, hero_image_url),
          intro_video_1_url = COALESCE(${config.intro_video_1_url}, intro_video_1_url),
          intro_video_2_url = COALESCE(${config.intro_video_2_url}, intro_video_2_url)
        WHERE id = 1
      `;
    }

    if (Array.isArray(stats)) {
      const existing = await sql`SELECT id FROM homepage_stats`;
      const incomingIds = stats.map((s: any) => s.id).filter(Boolean);
      for (const row of existing) {
        if (!incomingIds.includes(row.id)) {
          await sql`DELETE FROM homepage_stats WHERE id = ${row.id}`;
        }
      }

      for (let i = 0; i < stats.length; i++) {
        const st = stats[i];
        const order = typeof st.sort_order === "number" ? st.sort_order : i;
        if (st.id) {
          await sql`
            UPDATE homepage_stats SET
              stat_value = ${st.stat_value},
              stat_label = ${st.stat_label},
              sort_order = ${order}
            WHERE id = ${st.id}
          `;
        } else {
          await sql`
            INSERT INTO homepage_stats (stat_value, stat_label, sort_order)
            VALUES (${st.stat_value}, ${st.stat_label}, ${order})
          `;
        }
      }
    }

    await sql`
      INSERT INTO activity_log (action, entity_type, entity_title)
      VALUES ('Updated', 'Homepage Content', 'Hero Banner, Videos & Impact Counters')
    `;

    const updatedStats = await sql`SELECT * FROM homepage_stats ORDER BY sort_order ASC`;
    const [updatedConfigRow] = await sql`SELECT hero_image_url, intro_video_1_url, intro_video_2_url FROM site_settings WHERE id = 1`;

    return NextResponse.json({
      stats: updatedStats,
      config: {
        hero_image_url: (!updatedConfigRow?.hero_image_url || updatedConfigRow.hero_image_url === "https://res.cloudinary.com/woo94xq2/video/upload/v1783348864/dhara_foundations/videos/injjcsbcbzokjavsswoc.mp4") ? "https://res.cloudinary.com/woo94xq2/video/upload/v1783059459/dhara_foundations/videos/viqfipyzkvrkvumsuksg.mp4" : updatedConfigRow.hero_image_url,
        intro_video_1_url: updatedConfigRow?.intro_video_1_url || "",
        intro_video_2_url: updatedConfigRow?.intro_video_2_url || "",
      },
    });
  } catch (err) {
    console.error("PUT /api/admin/homepage error:", err);
    return NextResponse.json({ error: "Failed to update homepage content" }, { status: 500 });
  }
}
