import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function run() {
  const p1 = "Conducting digitisation activities for Women Self Help Group societies as part of a community empowerment and rural development initiative aimed at improving digital literacy, financial inclusion, and administrative efficiency among women members.";
  const p2 = "The initiative focused on introducing digital systems and technology-based practices to Self Help Groups (SHGs), enabling women to maintain records, manage accounts, conduct banking transactions, and access government welfare schemes more effectively. Training and guidance were provided to help members understand the use of digital tools, online services, and cashless transaction methods.";
  const p3 = "These activities were carried out to strengthen the functioning of Women Self Help Groups by promoting transparency, accuracy, and better communication through digitisation. The program also encouraged women to become more confident and independent in using technology for economic and social development.";

  const fullDesc = `${p1}\n\n${p2}\n\n${p3}`;

  // Alter event_gallery_images and event_videos columns to VARCHAR to accept integer IDs like '50'
  try {
    await sql.query(`ALTER TABLE event_gallery_images ALTER COLUMN event_id TYPE VARCHAR(255) USING event_id::text;`);
  } catch (e) { console.log("event_gallery_images alter note:", e.message); }

  try {
    await sql.query(`ALTER TABLE event_videos ALTER COLUMN event_id TYPE VARCHAR(255) USING event_id::text;`);
  } catch (e) { console.log("event_videos alter note:", e.message); }

  // Update row 50 in events table
  await sql`
    UPDATE events
    SET slug = 'digitisation-activities-wshg',
        title = 'In Digitisation activities for Women Self Help Group society',
        location_name = 'Cuddalore',
        event_date = '2026-01-01',
        cover_image_url = '/images/activities images/activity 1/img 1.jpg',
        category = 'Women''s Empowerment',
        short_description = ${p1},
        full_description = ${fullDesc}
    WHERE id = 50
  `;

  // Clear any existing gallery images for event 50 and slug
  await sql`DELETE FROM event_gallery_images WHERE event_id IN ('50', 'digitisation-activities-wshg')`;

  // Insert the 4 images from activity 1 for both ID '50' and slug 'digitisation-activities-wshg'
  const images = [
    '/images/activities images/activity 1/img 1.jpg',
    '/images/activities images/activity 1/img 2.jpg',
    '/images/activities images/activity 1/img 3.jpg',
    '/images/activities images/activity 1/img 4.jpg'
  ];

  for (let i = 0; i < images.length; i++) {
    await sql`
      INSERT INTO event_gallery_images (event_id, image_url, sort_order)
      VALUES ('50', ${images[i]}, ${i})
    `;
    await sql`
      INSERT INTO event_gallery_images (event_id, image_url, sort_order)
      VALUES ('digitisation-activities-wshg', ${images[i]}, ${i})
    `;
  }

  console.log("Postgres row 50, slug, and gallery images updated cleanly!");
}

run().catch(console.error);
