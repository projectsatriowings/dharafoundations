import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { slugify } from "@/utils/slugify";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const articles = await sql`
      SELECT id, slug, headline, publish_date, read_time_minutes, excerpt, body_content,
             featured_image_url, is_external, external_url, status, priority, updated_at
      FROM news_articles
      WHERE (${!status || status === "all"}::boolean OR status = ${status})
        AND (${!search}::boolean OR headline ILIKE ${"%" + (search || "") + "%"})
      ORDER BY priority DESC, publish_date DESC
    `;

    return NextResponse.json({ articles });
  } catch (err) {
    console.error("GET /api/admin/news error:", err);
    return NextResponse.json({ error: "Failed to fetch news articles" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      headline,
      publish_date,
      read_time_minutes = 3,
      excerpt,
      body_content,
      featured_image_url,
      is_external = false,
      external_url,
      tags = [],
      status = "draft",
      meta_title,
      meta_description,
    } = body;

    if (!headline || !publish_date || !featured_image_url) {
      return NextResponse.json(
        { error: "Headline, publish date, and featured image are required" },
        { status: 400 }
      );
    }

    let slug = slugify(headline);
    const existing = await sql`SELECT id FROM news_articles WHERE slug = ${slug}`;
    if (existing.length > 0) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const [article] = await sql`
      INSERT INTO news_articles (
        slug, headline, publish_date, read_time_minutes, excerpt,
        body_content, featured_image_url, is_external, external_url,
        tags, status, meta_title, meta_description
      ) VALUES (
        ${slug}, ${headline}, ${publish_date}, ${read_time_minutes}, ${excerpt || null},
        ${body_content || null}, ${featured_image_url}, ${is_external}, ${external_url || null},
        ${tags}, ${status}, ${meta_title || headline}, ${meta_description || excerpt || null}
      )
      RETURNING *
    `;

    // Log activity
    await sql`
      INSERT INTO activity_log (action, entity_type, entity_title)
      VALUES (${status === 'published' ? 'Published' : 'Created draft'}, 'News Article', ${headline})
    `;

    return NextResponse.json({ article }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/news error:", err);
    return NextResponse.json({ error: "Failed to create news article" }, { status: 500 });
  }
}
