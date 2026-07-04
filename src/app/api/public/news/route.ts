import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const articles = await sql`
      SELECT id, slug, headline, publish_date, read_time_minutes, excerpt, body_content,
             featured_image_url, is_external, external_url, status, updated_at
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
