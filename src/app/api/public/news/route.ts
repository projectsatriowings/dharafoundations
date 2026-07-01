import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const articles = await sql`
      SELECT id, slug, headline, publish_date, read_time_minutes,
             featured_image_url, is_external, status, updated_at
      FROM news_articles
      WHERE status = 'published' OR status IS NULL
      ORDER BY publish_date DESC
    `;
    return NextResponse.json({ articles });
  } catch (err) {
    console.error("GET /api/public/news error:", err);
    return NextResponse.json({ error: "Failed to fetch public news" }, { status: 500 });
  }
}
