import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { v2 as cloudinary } from "cloudinary";
import { neon } from "@neondatabase/serverless";

// ─── CONFIGURATION ─────────────────────────────────────────────────────────────
// Replace these with your NEW Cloudinary account credentials when ready,
// or add them to .env.local as NEW_CLOUDINARY_CLOUD_NAME, NEW_CLOUDINARY_API_KEY, NEW_CLOUDINARY_API_SECRET
const OLD_CONFIG = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "woo94xq2",
  api_key: process.env.CLOUDINARY_API_KEY || "524114697455986",
  api_secret: process.env.CLOUDINARY_API_SECRET || "6F64XOmg8ab7ZfLffRLC9muyuAQ",
};

const NEW_CONFIG = {
  cloud_name: process.env.NEW_CLOUDINARY_CLOUD_NAME || "YOUR_NEW_CLOUD_NAME",
  api_key: process.env.NEW_CLOUDINARY_API_KEY || "YOUR_NEW_API_KEY",
  api_secret: process.env.NEW_CLOUDINARY_API_SECRET || "YOUR_NEW_API_SECRET",
};

async function migrateCloudinaryAccount() {
  console.log("=== DHARA FOUNDATION CLOUDINARY ACCOUNT MIGRATION TOOL ===");
  console.log(`Old Cloud Name: ${OLD_CONFIG.cloud_name}`);
  console.log(`New Cloud Name: ${NEW_CONFIG.cloud_name}`);

  if (NEW_CONFIG.cloud_name === "YOUR_NEW_CLOUD_NAME") {
    console.error("\n[ERROR] Please edit scripts/migrate-cloudinary-account.mjs or set NEW_CLOUDINARY_* environment variables before running!");
    process.exit(1);
  }

  // 1. Fetch all resources from Old Account
  cloudinary.config(OLD_CONFIG);
  console.log("\n[Step 1] Fetching all images and videos from Old Cloudinary Account...");

  let allAssets = [];
  for (const resourceType of ["image", "video"]) {
    let nextCursor = null;
    do {
      const res = await cloudinary.api.resources({
        resource_type: resourceType,
        max_results: 500,
        next_cursor: nextCursor,
      });
      if (res.resources) {
        allAssets.push(...res.resources);
      }
      nextCursor = res.next_cursor;
    } while (nextCursor);
  }

  console.log(`Found ${allAssets.length} total assets (` +
    `${allAssets.filter(a => a.resource_type === "image").length} images, ` +
    `${allAssets.filter(a => a.resource_type === "video").length} videos) across all folders.`
  );

  // 2. Upload to New Account
  console.log("\n[Step 2] Uploading assets to New Cloudinary Account...");
  cloudinary.config(NEW_CONFIG);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < allAssets.length; i++) {
    const asset = allAssets[i];
    const oldUrl = asset.secure_url || asset.url;
    const publicId = asset.public_id; // e.g. "dhara_foundations/videos/event_123"
    const folder = publicId.includes("/") ? publicId.substring(0, publicId.lastIndexOf("/")) : "";
    const cleanId = publicId.includes("/") ? publicId.substring(publicId.lastIndexOf("/") + 1) : publicId;

    process.stdout.write(`[${i + 1}/${allAssets.length}] Uploading ${asset.resource_type} '${publicId}'... `);
    try {
      await cloudinary.uploader.upload(oldUrl, {
        resource_type: asset.resource_type,
        folder: folder || undefined,
        public_id: cleanId,
        overwrite: true,
      });
      console.log("SUCCESS");
      successCount++;
    } catch (err) {
      console.log(`FAILED (${err.message || err})`);
      failCount++;
    }
  }

  console.log(`\nUpload Phase Finished! Success: ${successCount}, Failed: ${failCount}`);

  // 3. Update Database URLs
  if (!process.env.DATABASE_URL) {
    console.log("\n[Step 3] No DATABASE_URL found in .env.local, skipping automatic database URL update.");
    return;
  }

  console.log("\n[Step 3] Updating Postgres Database URLs from old cloud name to new cloud name...");
  const sql = neon(process.env.DATABASE_URL);
  const oldDomain = `res.cloudinary.com/${OLD_CONFIG.cloud_name}`;
  const newDomain = `res.cloudinary.com/${NEW_CONFIG.cloud_name}`;

  // Update tables
  const tablesToUpdate = [
    { table: "events", columns: ["image_url", "gallery", "video_links"] },
    { table: "seva_activities", columns: ["image_url", "detail_images"] },
    { table: "seva_photos", columns: ["image_url"] },
    { table: "seva_highlights", columns: ["image_url"] },
    { table: "news", columns: ["image_url"] },
    { table: "homepage_hero", columns: ["image_url"] },
  ];

  for (const { table, columns } of tablesToUpdate) {
    try {
      for (const col of columns) {
        await sql(`UPDATE ${table} SET ${col} = REPLACE(${col}::text, ${oldDomain}, ${newDomain})::jsonb WHERE ${col}::text LIKE '%' || ${oldDomain} || '%' AND jsontypeof(${col}) IS NOT NULL`);
      }
      console.log(`Updated database table '${table}' successfully.`);
    } catch (e) {
      // If column is text or array instead of jsonb
      for (const col of columns) {
        try {
          await sql(`UPDATE ${table} SET ${col} = REPLACE(${col}::text, '${oldDomain}', '${newDomain}') WHERE ${col}::text LIKE '%${oldDomain}%'`);
        } catch (err2) {
          // Ignore if table/col does not exist
        }
      }
    }
  }

  console.log("\n================ MIGRATION COMPLETED SUCCESSFULLY ================");
  console.log(`IMPORTANT NEXT STEP: Don't forget to update your .env.local file:`);
  console.log(`CLOUDINARY_CLOUD_NAME="${NEW_CONFIG.cloud_name}"`);
  console.log(`CLOUDINARY_API_KEY="${NEW_CONFIG.api_key}"`);
  console.log(`CLOUDINARY_API_SECRET="${NEW_CONFIG.api_secret}"`);
}

migrateCloudinaryAccount().catch(console.error);
