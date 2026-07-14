import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";
import { EVENTS_DATA, getCleanEventImage } from "../src/data/events.js";

const sql = neon(process.env.DATABASE_URL);

async function cleanAndSync() {
  console.log("Cleaning fake legacy dummy events (42, 44, 45, 46)...");
  const fakeIds = ["42", "44", "45", "46", "legacy-event-42", "legacy-event-44", "legacy-event-45", "legacy-event-46"];
  await sql`DELETE FROM event_gallery_images WHERE event_id = ANY(${fakeIds})`;
  await sql`DELETE FROM event_videos WHERE event_id = ANY(${fakeIds})`;
  await sql`DELETE FROM events WHERE id = ANY(${fakeIds}) OR slug = ANY(${fakeIds}) OR title LIKE 'Legacy Event%' OR title LIKE 'Jagatgurus Shri. Shri. Shri. Aacharyas blessed and...'`;
  console.log("Cleaned fake legacy dummy events successfully.");

  console.log("Syncing all authentic real activities from src/data/events.ts into DB if missing...");
  for (const act of EVENTS_DATA) {
    const cleanImg = getCleanEventImage(`${act.title} ${act.id} ${act.coverImage}`, act.coverImage);
    const isSanatana =
      act.category === "Sanatana Dharma" ||
      act.title.toLowerCase().includes("temple") ||
      act.title.toLowerCase().includes("girivalam") ||
      act.title.toLowerCase().includes("pooja");
    const category = act.category || (isSanatana ? "Sanatana Dharma" : "Welfare Drives");
    const idStr = act.numericId || act.id;

    // Check if event already exists
    const [existing] = await sql`
      SELECT id FROM events WHERE id = ${idStr} OR slug = ${act.id} LIMIT 1
    `;

    if (!existing) {
      await sql`
        INSERT INTO events (
          id, slug, title, event_date, event_time, location_name,
          cover_image_url, short_description, full_description,
          category, status
        ) VALUES (
          ${idStr}, ${act.id}, ${act.title}, ${act.date}, ${act.time || "09:00"}, ${act.location || "Tamil Nadu"},
          ${cleanImg}, ${act.description[0] || ""}, ${act.description.join("\n\n")},
          ${category}, 'published'
        )
      `;
      console.log(`Inserted missing real activity: ${act.title} (${act.id})`);
    }

    // Ensure gallery images are seeded if empty for this event
    const galRows = await sql`SELECT id FROM event_gallery_images WHERE event_id = ${idStr} OR event_id = ${act.id} LIMIT 1`;
    if ((!galRows || galRows.length === 0) && Array.isArray(act.galleryImages) && act.galleryImages.length > 0) {
      for (let i = 0; i < act.galleryImages.length; i++) {
        await sql`
          INSERT INTO event_gallery_images (event_id, image_url, caption, sort_order)
          VALUES (${idStr}, ${act.galleryImages[i]}, null, ${i})
        `;
      }
      console.log(`Seeded ${act.galleryImages.length} gallery photos for ${act.id}`);
    }
  }

  console.log("Sync complete! Let's check exact remaining DB rows:");
  const remaining = await sql`SELECT id, slug, title, status FROM events ORDER BY id ASC`;
  console.log(JSON.stringify(remaining, null, 2));
}

cleanAndSync().catch(console.error);
