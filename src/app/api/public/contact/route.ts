import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, subject, message } = body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fullName = `${firstName} ${lastName}`.trim();

    await sql`
      INSERT INTO contact_submissions (
        id, 
        submitted_at, 
        email, 
        phone, 
        subject, 
        message, 
        status, 
        full_name
      ) VALUES (
        gen_random_uuid(), 
        NOW(), 
        ${email}, 
        ${phone || null}, 
        ${subject}, 
        ${message}, 
        'new', 
        ${fullName}
      )
    `;

    return NextResponse.json({ success: true, message: "Contact submission received" });
  } catch (err) {
    console.error("POST /api/public/contact error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
