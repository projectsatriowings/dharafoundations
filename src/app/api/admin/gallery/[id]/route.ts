import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const { caption, category, is_featured } = body;

    const [updated] = await sql`
      UPDATE gallery_photos SET
        caption = COALESCE(${caption}, caption),
        category = COALESCE(${category}, category),
        is_featured = COALESCE(${is_featured}, is_featured)
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updated) return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    return NextResponse.json({ photo: updated });
  } catch (err) {
    console.error("PUT /api/admin/gallery/[id] error:", err);
    return NextResponse.json({ error: "Failed to update photo" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const [deleted] = await sql`DELETE FROM gallery_photos WHERE id = ${id} RETURNING id`;
    if (!deleted) return NextResponse.json({ error: "Photo not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/gallery/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 });
  }
}
