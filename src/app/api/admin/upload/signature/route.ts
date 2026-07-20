import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const isVideo = searchParams.get("isVideo") === "true";

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "woo94xq2";
    const apiKey = process.env.CLOUDINARY_API_KEY || "524114697455986";
    const apiSecret = process.env.CLOUDINARY_API_SECRET || "6F64XOmg8ab7ZfLffRLC9muyuAQ";

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = isVideo ? "dhara_foundations/videos" : "dhara_foundations";

    // Simple SHA1 signature for Cloudinary upload (folder & timestamp sorted alphabetically)
    const strToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(strToSign).digest("hex");

    return NextResponse.json({
      signature,
      timestamp,
      folder,
      cloudName,
      apiKey,
      resourceType: isVideo ? "video" : "image"
    });
  } catch (err: any) {
    console.error("GET /api/admin/upload/signature error:", err);
    return NextResponse.json(
      { error: "Failed to generate upload signature" },
      { status: 500 }
    );
  }
}
