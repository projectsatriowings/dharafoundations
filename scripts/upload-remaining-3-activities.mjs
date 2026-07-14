import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config({ path: ".env.local" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const REMAINING = [
  { folder: "activity 5", slug: "felicitation-sports-children-pongal" },
  { folder: "activity 6", slug: "meal-food-carriers-govt-home" },
  { folder: "activity 7", slug: "covid-19-relief" }
];

async function run() {
  console.log("Uploading remaining 3 activity folders to Cloudinary...");
  for (const item of REMAINING) {
    const dir = path.join(process.cwd(), "public", "images", "activities images", item.folder);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    for (const f of files) {
      const filePath = path.join(dir, f);
      const publicId = `dhara_foundations/activities/${item.slug}/${f.replace(/\.[^/.]+$/, "").replace(/\s+/g, "_")}`;
      try {
        const res = await cloudinary.uploader.upload(filePath, {
          public_id: publicId,
          overwrite: true,
          resource_type: "image"
        });
        console.log(`Uploaded ${item.folder}/${f} -> ${res.secure_url}`);
      } catch (e) {
        console.error(`Error uploading ${filePath}:`, e);
      }
    }
  }
}

run();
