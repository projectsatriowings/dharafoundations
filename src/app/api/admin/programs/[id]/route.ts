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
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const [prog] = await sql`SELECT * FROM programs WHERE id = ${id}`;
    if (!prog) return NextResponse.json({ error: "Program not found" }, { status: 404 });
    return NextResponse.json({ program: prog });
  } catch (err) {
    console.error("GET /api/admin/programs/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch program" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const { title, category, icon_name, short_description, full_description, display_order, status } = body;

    const [updated] = await sql`
      UPDATE programs SET
        title = COALESCE(${title}, title),
        category = COALESCE(${category}, category),
        icon_name = COALESCE(${icon_name}, icon_name),
        short_description = COALESCE(${short_description}, short_description),
        full_description = ${full_description || null},
        display_order = COALESCE(${display_order}, display_order),
        status = COALESCE(${status}, status)
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updated) return NextResponse.json({ error: "Program not found" }, { status: 404 });
    return NextResponse.json({ program: updated });
  } catch (err) {
    console.error("PUT /api/admin/programs/[id] error:", err);
    return NextResponse.json({ error: "Failed to update program" }, { status: 500 });
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
    const [deleted] = await sql`DELETE FROM programs WHERE id = ${id} RETURNING id`;
    if (!deleted) return NextResponse.json({ error: "Program not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/programs/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete program" }, { status: 500 });
  }
}
