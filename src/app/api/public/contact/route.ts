import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import nodemailer from "nodemailer";

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

    // Send automated Thank You email
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER || "techgeninvt@gmail.com",
          pass: process.env.EMAIL_PASS || "lsxs qhsp uwbg sidd",
        },
      });

      const mailOptions = {
        from: '"Dhara Foundation" <techgeninvt@gmail.com>',
        to: email,
        subject: "Thank You for Contacting Dhara Foundation",
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaec; border-radius: 10px;">
            <h2 style="color: #8a5000; margin-bottom: 20px;">Thank You for Reaching Out!</h2>
            <p style="font-size: 16px; color: #333; line-height: 1.5;">Dear <strong>${fullName}</strong>,</p>
            <p style="font-size: 16px; color: #333; line-height: 1.5;">
              We have received your message regarding "<strong>${subject}</strong>". Thank you for taking the time to contact Dhara Foundation.
            </p>
            <p style="font-size: 16px; color: #333; line-height: 1.5;">
              Our team will review your inquiry and get back to you as soon as possible.
            </p>
            <br/>
            <p style="font-size: 16px; color: #333; margin-bottom: 5px;">Warm Regards,</p>
            <p style="font-size: 16px; color: #8a5000; font-weight: bold; margin-top: 0;">Dhara Foundation Team</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.error("Failed to send thank you email:", emailErr);
      // We don't fail the whole request if the email fails, we just log it.
    }

    return NextResponse.json({ success: true, message: "Contact submission received" });
  } catch (err) {
    console.error("POST /api/public/contact error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
