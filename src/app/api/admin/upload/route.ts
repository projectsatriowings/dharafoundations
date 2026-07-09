import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const isVideo =
      file.type.startsWith("video/") ||
      /\.(mp4|webm|mov|avi|mkv|m4v)$/i.test(file.name);
    const isImage =
      file.type.startsWith("image/") ||
      /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name);

    if (!isVideo && !isImage) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPG, PNG, WEBP, GIF, MP4, WEBM, MOV." },
        { status: 400 }
      );
    }

    const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024; // 100MB for video, 10MB for image

    // Validate size
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size exceeds limit (${isVideo ? "100MB" : "10MB"}).` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Use Cloudinary credentials from env or fallback to project configuration
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "woo94xq2";
    const apiKey = process.env.CLOUDINARY_API_KEY || "524114697455986";
    const apiSecret = process.env.CLOUDINARY_API_SECRET || "6F64XOmg8ab7ZfLffRLC9muyuAQ";

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = isVideo ? "dhara_foundations/videos" : "dhara_foundations";
    const resourceType = isVideo ? "video" : "image";

    // Simple SHA1 signature for Cloudinary upload (folder & timestamp sorted alphabetically)
    const crypto = await import("crypto");
    const strToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(strToSign).digest("hex");

    const mimeType = file.type || (isVideo ? "video/mp4" : "image/jpeg");
    const cleanFilename = file.name || (isVideo ? "video.mp4" : "image.jpg");

    const uploadForm = new FormData();
    const fileObj = new File([buffer], cleanFilename, { type: mimeType });
    uploadForm.append("file", fileObj);
    uploadForm.append("api_key", apiKey);
    uploadForm.append("timestamp", timestamp);
    uploadForm.append("folder", folder);
    uploadForm.append("signature", signature);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      { method: "POST", body: uploadForm }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error?.message || "Cloudinary upload failed");
    }

    return NextResponse.json({ url: data.secure_url });
  } catch (err: any) {
    console.error("POST /api/admin/upload error:", err);
    return NextResponse.json(
      { error: err?.message || "File upload to Cloudinary failed" },
      { status: 500 }
    );
  }
}
