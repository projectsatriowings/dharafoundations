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
    const { full_name, designation, short_bio, full_bio, photo_url, display_order } = body;

    const [updated] = await sql`
      UPDATE founders SET
        full_name = COALESCE(${full_name}, full_name),
        designation = COALESCE(${designation}, designation),
        short_bio = COALESCE(${short_bio}, short_bio),
        full_bio = ${full_bio || null},
        photo_url = ${photo_url || null},
        display_order = COALESCE(${display_order}, display_order)
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updated) return NextResponse.json({ error: "Founder not found" }, { status: 404 });
    return NextResponse.json({ founder: updated });
  } catch (err) {
    console.error("PUT /api/admin/founders/[id] error:", err);
    return NextResponse.json({ error: "Failed to update founder" }, { status: 500 });
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
    const [deleted] = await sql`DELETE FROM founders WHERE id = ${id} RETURNING id`;
    if (!deleted) return NextResponse.json({ error: "Founder not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/founders/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete founder" }, { status: 500 });
  }
}
