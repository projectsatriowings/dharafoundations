import React from "react";
import sql from "@/lib/db";
import GalleryClient from "./GalleryClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GalleryPage() {
  let initialPhotos: any[] = [];

  try {
    const photos = await sql`
      SELECT id, image_url, caption, category, is_featured, sort_order, created_at
      FROM gallery_photos
      ORDER BY is_featured DESC, created_at DESC
    `;
    if (photos && Array.isArray(photos)) {
      initialPhotos = photos.map((p: any) => {
        const rawCat = (p.category || "").toLowerCase();
        const isDharma =
          rawCat === "sanatana dharma" ||
          rawCat === "sanatana_dharma" ||
          rawCat === "temple_heritage" ||
          rawCat.includes("temple") ||
          rawCat.includes("dharma") ||
          rawCat.includes("heritage") ||
          rawCat.includes("vedic") ||
          rawCat.includes("restoration");
        return {
          id: String(p.id),
          title: p.caption || "Sacred Seva",
          category: isDharma ? "Sanatana Dharma" : "Charity",
          desc: p.caption || "",
          src: p.image_url,
          pillBg: isDharma
            ? "bg-saffron-glow/90 text-deep-forest"
            : "bg-tertiary-container text-on-tertiary-container",
          type: "photo" as const,
        };
      });
    }
  } catch (err) {
    console.error("GalleryPage Server Component error:", err);
  }

  return <GalleryClient initialPhotos={initialPhotos} />;
}
