import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function run() {
  // Activity 4: Providing footwear to all the girl children at Annai Sathiya District Govt Home
  const f1 = "Providing footwear to all the girl children at Annai Sathiya District Government Home as part of a social welfare and child support initiative aimed at ensuring comfort, hygiene, and well-being for the children residing in the government home.";
  const f2 = "The initiative focused on distributing quality footwear to every girl child in the home, helping them meet their daily needs with dignity and care. Proper footwear plays an important role in protecting children’s health, improving mobility, and supporting their participation in education and daily activities.";
  const footwearFull = `${f1}\n\n${f2}`;

  const existingFootwear = await sql`SELECT id FROM events WHERE slug = 'footwear-girl-children-annai-sathiya' OR id = 53`;
  if (existingFootwear.length > 0) {
    await sql`
      UPDATE events
      SET slug = 'footwear-girl-children-annai-sathiya',
          title = 'Providing footwear to all the girl children at Annai Sathiya District Govt Home',
          location_name = 'Cuddalore',
          event_date = '2025-04-14',
          cover_image_url = '/images/activities images/activity 4/img 1.jpg',
          category = 'Children & Education',
          short_description = ${f1},
          full_description = ${footwearFull},
          status = 'published'
      WHERE id = ${existingFootwear[0].id}
    `;
  } else {
    await sql`
      INSERT INTO events (id, slug, title, event_date, event_time, location_name, cover_image_url, category, short_description, full_description, status)
      VALUES (53, 'footwear-girl-children-annai-sathiya', 'Providing footwear to all the girl children at Annai Sathiya District Govt Home', '2025-04-14', '01:00 PM', 'Cuddalore', '/images/activities images/activity 4/img 1.jpg', 'Children & Education', ${f1}, ${footwearFull}, 'published')
    `;
  }

  await sql`DELETE FROM event_gallery_images WHERE event_id IN ('53', 'footwear-girl-children-annai-sathiya', '37')`;

  const footwearImages = [
    '/images/activities images/activity 4/img 1.jpg',
    '/images/activities images/activity 4/img 2.jpg',
    '/images/activities images/activity 4/img 3.jpg',
    '/images/activities images/activity 4/img 4.jpg'
  ];

  for (let i = 0; i < footwearImages.length; i++) {
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('53', ${footwearImages[i]}, ${i})`;
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('footwear-girl-children-annai-sathiya', ${footwearImages[i]}, ${i})`;
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('37', ${footwearImages[i]}, ${i})`;
  }

  // Activity 5: Felicitation of Sports children at Cuddalore during Pongal festival
  const s1 = "Felicitation of young sports achievers in Cuddalore during the festive occasion of Pongal as part of a community encouragement and youth development initiative. The event was organized to recognize and honor talented children who have excelled in various sports and athletic activities through their hard work, dedication, and achievements.";
  const s2 = "As part of the celebration, the children were appreciated and encouraged with honors, gifts, and motivational support to inspire them to continue pursuing excellence in sports. The Pongal festival provided a meaningful platform to celebrate not only cultural traditions but also the spirit of discipline, teamwork, and perseverance demonstrated by the young athletes.";
  const sportsFull = `${s1}\n\n${s2}`;

  const existingSports = await sql`SELECT id FROM events WHERE slug = 'felicitation-sports-children-pongal' OR id = 54`;
  if (existingSports.length > 0) {
    await sql`
      UPDATE events
      SET slug = 'felicitation-sports-children-pongal',
          title = 'Felicitation of Sports children at Cuddalore during Pongal festival',
          location_name = 'Cuddalore',
          event_date = '2025-01-14',
          cover_image_url = '/images/activities images/activity 5/img 1.jpg',
          category = 'Children & Education',
          short_description = ${s1},
          full_description = ${sportsFull},
          status = 'published'
      WHERE id = ${existingSports[0].id}
    `;
  } else {
    await sql`
      INSERT INTO events (id, slug, title, event_date, event_time, location_name, cover_image_url, category, short_description, full_description, status)
      VALUES (54, 'felicitation-sports-children-pongal', 'Felicitation of Sports children at Cuddalore during Pongal festival', '2025-01-14', '06:00 PM', 'Cuddalore', '/images/activities images/activity 5/img 1.jpg', 'Children & Education', ${s1}, ${sportsFull}, 'published')
    `;
  }

  await sql`DELETE FROM event_gallery_images WHERE event_id IN ('54', 'felicitation-sports-children-pongal', '36')`;

  const sportsImages = [
    '/images/activities images/activity 5/img 1.jpg',
    '/images/activities images/activity 5/img 2.jpg'
  ];

  for (let i = 0; i < sportsImages.length; i++) {
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('54', ${sportsImages[i]}, ${i})`;
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('felicitation-sports-children-pongal', ${sportsImages[i]}, ${i})`;
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('36', ${sportsImages[i]}, ${i})`;
  }

  console.log("Postgres rows 53 & 54 (`footwear-girl-children-annai-sathiya` & `felicitation-sports-children-pongal`) and gallery images updated cleanly!");
}

run().catch(console.error);
