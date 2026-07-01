import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const [article] = await sql`SELECT * FROM news_articles WHERE id = ${id}`;

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch (err) {
    console.error("GET /api/admin/news/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
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

    const [updated] = await sql`
      UPDATE news_articles SET
        headline = ${headline},
        publish_date = ${publish_date},
        read_time_minutes = ${read_time_minutes},
        excerpt = ${excerpt || null},
        body_content = ${body_content || null},
        featured_image_url = ${featured_image_url},
        is_external = ${is_external},
        external_url = ${external_url || null},
        tags = ${tags},
        status = ${status},
        meta_title = ${meta_title || headline},
        meta_description = ${meta_description || excerpt || null}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updated) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    await sql`
      INSERT INTO activity_log (action, entity_type, entity_title)
      VALUES ('Updated', 'News Article', ${headline})
    `;

    return NextResponse.json({ article: updated });
  } catch (err) {
    console.error("PUT /api/admin/news/[id] error:", err);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const [deleted] = await sql`DELETE FROM news_articles WHERE id = ${id} RETURNING headline`;

    if (!deleted) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    await sql`
      INSERT INTO activity_log (action, entity_type, entity_title)
      VALUES ('Deleted', 'News Article', ${deleted.headline})
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/news/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}
