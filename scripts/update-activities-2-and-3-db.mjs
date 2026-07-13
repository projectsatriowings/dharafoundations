import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function run() {
  // Activity 2: Tribal Welfare at Javadhu Hills
  const t1 = "Conducting tribal welfare activities in Javadhu Hills as part of a social development and community upliftment initiative aimed at improving the living conditions and well-being of tribal communities residing in remote hill areas.";
  const t2 = "The welfare activities focused on supporting tribal families and children through the distribution of essential items, educational assistance, health awareness programs, and community support services. Special attention was given to improving access to basic necessities, promoting education among tribal children, and encouraging awareness about hygiene, health, and social welfare.";
  const tribalFull = `${t1}\n\n${t2}`;

  // Insert or update tribal welfare event in DB
  const existingTribal = await sql`SELECT id FROM events WHERE slug = 'tribal-welfare-javadhu-hills' OR id = 51`;
  if (existingTribal.length > 0) {
    await sql`
      UPDATE events
      SET slug = 'tribal-welfare-javadhu-hills',
          title = 'In Tribal welfare activities at Javadhu hills',
          location_name = 'Javadhu Hills, Vellore',
          event_date = '2025-11-06',
          cover_image_url = '/images/activities images/activity 2/img 1.jpg',
          category = 'Welfare Drives',
          short_description = ${t1},
          full_description = ${tribalFull},
          status = 'published'
      WHERE id = ${existingTribal[0].id}
    `;
  } else {
    await sql`
      INSERT INTO events (id, slug, title, event_date, event_time, location_name, cover_image_url, category, short_description, full_description, status)
      VALUES (51, 'tribal-welfare-javadhu-hills', 'In Tribal welfare activities at Javadhu hills', '2025-11-06', '02:00 PM', 'Javadhu Hills, Vellore', '/images/activities images/activity 2/img 1.jpg', 'Welfare Drives', ${t1}, ${tribalFull}, 'published')
    `;
  }

  // Clear existing gallery images for tribal welfare
  await sql`DELETE FROM event_gallery_images WHERE event_id IN ('51', 'tribal-welfare-javadhu-hills', '39')`;

  const tribalImages = [
    '/images/activities images/activity 2/img 1.jpg',
    '/images/activities images/activity 2/img 2.jpg',
    '/images/activities images/activity 2/img 3.jpg',
    '/images/activities images/activity 2/img 4.jpg'
  ];

  for (let i = 0; i < tribalImages.length; i++) {
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('51', ${tribalImages[i]}, ${i})`;
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('tribal-welfare-javadhu-hills', ${tribalImages[i]}, ${i})`;
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('39', ${tribalImages[i]}, ${i})`;
  }

  // Activity 3: Diwali Dresses to Home Children
  const d1 = "Providing Diwali dresses to home children in Cuddalore as part of a festive welfare and child support initiative aimed at spreading happiness, care, and celebration among underprivileged children during the occasion of Diwali.";
  const d2 = "The initiative focused on distributing new dresses and festive clothing to children residing in government and charitable homes, enabling them to celebrate the festival with joy, dignity, and confidence. The program sought to create memorable moments for the children by ensuring they could participate in the festive celebrations with enthusiasm and a sense of belonging.";
  const d3 = "Through this compassionate effort, special attention was given to promoting the emotional well-being and happiness of the children while encouraging community support and social responsibility. The distribution of Diwali dresses symbolized love, care, and inclusion, helping bring smiles and festive cheer to the young beneficiaries.";
  const d4 = "The initiative reflects a commitment towards child welfare, humanitarian service, and community development by supporting the needs of children and making festival celebrations more meaningful and joyful for those living in care homes.";
  const diwaliFull = `${d1}\n\n${d2}\n\n${d3}\n\n${d4}`;

  const existingDiwali = await sql`SELECT id FROM events WHERE slug = 'diwali-dresses-home-children' OR id = 52`;
  if (existingDiwali.length > 0) {
    await sql`
      UPDATE events
      SET slug = 'diwali-dresses-home-children',
          title = 'Providing Diwali Dresses To Home Children',
          location_name = 'Cuddalore',
          event_date = '2025-10-18',
          cover_image_url = '/images/activities images/activity 3/img 1.jpg',
          category = 'Children & Education',
          short_description = ${d1},
          full_description = ${diwaliFull},
          status = 'published'
      WHERE id = ${existingDiwali[0].id}
    `;
  } else {
    await sql`
      INSERT INTO events (id, slug, title, event_date, event_time, location_name, cover_image_url, category, short_description, full_description, status)
      VALUES (52, 'diwali-dresses-home-children', 'Providing Diwali Dresses To Home Children', '2025-10-18', '01:00 PM', 'Cuddalore', '/images/activities images/activity 3/img 1.jpg', 'Children & Education', ${d1}, ${diwaliFull}, 'published')
    `;
  }

  await sql`DELETE FROM event_gallery_images WHERE event_id IN ('52', 'diwali-dresses-home-children', '38')`;

  const diwaliImages = [
    '/images/activities images/activity 3/img 1.jpg',
    '/images/activities images/activity 3/img 2.jpg'
  ];

  for (let i = 0; i < diwaliImages.length; i++) {
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('52', ${diwaliImages[i]}, ${i})`;
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('diwali-dresses-home-children', ${diwaliImages[i]}, ${i})`;
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('38', ${diwaliImages[i]}, ${i})`;
  }

  console.log("Postgres rows 51 & 52 (`tribal-welfare-javadhu-hills` & `diwali-dresses-home-children`) and gallery images updated cleanly!");
}

run().catch(console.error);
