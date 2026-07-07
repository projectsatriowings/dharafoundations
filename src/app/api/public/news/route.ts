import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { SIX_MODERN_CARDS } from "@/data/news";

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
    console.warn("GET /api/public/news DB error/timeout, returning static fallback:", err);
    const fallbackArticles = SIX_MODERN_CARDS.map((art) => ({
      id: art.id,
      slug: art.slug || art.id,
      headline: art.title,
      publish_date: art.date,
      read_time_minutes: art.read_time_minutes,
      excerpt: art.excerpt,
      body_content: art.body_content,
      featured_image_url: art.img,
      is_external: art.is_external || false,
      external_url: art.external_url || "",
      status: "published",
      updated_at: null,
    }));
    return NextResponse.json({ articles: fallbackArticles });
  }
}
