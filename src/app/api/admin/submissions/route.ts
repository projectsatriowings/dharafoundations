import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const tab = searchParams.get("tab") || "contact";

    if (tab === "contact") {
      const items = await sql`SELECT * FROM contact_submissions ORDER BY submitted_at DESC`;
      return NextResponse.json({ items });
    } else if (tab === "registrations") {
      const items = await sql`SELECT * FROM event_registrations ORDER BY submitted_at DESC`;
      return NextResponse.json({ items });
    } else if (tab === "sponsorship") {
      const items = await sql`SELECT * FROM sponsor_enquiries ORDER BY submitted_at DESC`;
      return NextResponse.json({ items });
    }

    return NextResponse.json({ items: [] });
  } catch (err) {
    console.error("GET /api/admin/submissions error:", err);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, type, status } = await req.json();

    if (type === "contact") {
      await sql`UPDATE contact_submissions SET status = ${status} WHERE id = ${id}`;
    } else if (type === "registrations") {
      await sql`UPDATE event_registrations SET status = ${status} WHERE id = ${id}`;
    } else if (type === "sponsorship") {
      await sql`UPDATE sponsor_enquiries SET status = ${status} WHERE id = ${id}`;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT /api/admin/submissions error:", err);
    return NextResponse.json({ error: "Failed to update submission status" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, type } = await req.json();
    if (type === "contact") {
      await sql`DELETE FROM contact_submissions WHERE id = ${id}`;
    } else if (type === "registrations") {
      await sql`DELETE FROM event_registrations WHERE id = ${id}`;
    } else if (type === "sponsorship") {
      await sql`DELETE FROM sponsor_enquiries WHERE id = ${id}`;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/submissions error:", err);
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
  }
}
