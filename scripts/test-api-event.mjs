import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function check() {
  const galleryRows = await sql`
    SELECT * FROM event_gallery_images WHERE event_id IN ('50', 'digitisation-activities-wshg', '40')
  `;
  console.log("DB gallery rows count for event 50:", galleryRows.length);
  const uniqueUrls = Array.from(new Set(galleryRows.map(g => g.image_url)));
  console.log("Unique image URLs count:", uniqueUrls.length);
  console.log("Unique URLs:", uniqueUrls);
}
check().catch(console.error);
