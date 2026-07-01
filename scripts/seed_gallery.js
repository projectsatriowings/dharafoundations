require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

const DEFAULT_PHOTOS = [
  { caption: "Kanchipuram Heritage Project", category: "temple_heritage", image_url: "/images/gallery-1.png" },
  { caption: "Anna Daanam Drive", category: "community_welfare", image_url: "/images/gallery-2.png" },
  { caption: "Annual Cultural Gala", category: "events", image_url: "/images/gallery-3.png" },
  { caption: "Artisan Workshops", category: "temple_heritage", image_url: "/images/event-1.png" },
  { caption: "Vriksharopan Initiative", category: "community_welfare", image_url: "/images/event-2.png" },
  { caption: "Deepotsav Celebrations", category: "events", image_url: "/images/event-3.png" },
  { caption: "Chola Mandapam Conservation", category: "temple_heritage", image_url: "/Event images/05.jpg" },
  { caption: "Goshala Seva & Care", category: "community_welfare", image_url: "/Event images/18.jpg" },
  { caption: "Vedic Chanting Mahotsav", category: "events", image_url: "/Event images/22.jpg" },
  { caption: "Women Craftsmanship Drive", category: "women_empowerment", image_url: "/Event images/52.jpg" },
  { caption: "Youth Heritage Walk", category: "events", image_url: "/images/volunteer.png" },
  { caption: "Palm-Leaf Scripture Preservation", category: "temple_heritage", image_url: "/images/about.png" },
];

async function seed() {
  try {
    console.log("Dropping restrictive category check constraints to allow custom categories...");
    await sql`ALTER TABLE gallery_photos DROP CONSTRAINT IF EXISTS gallery_photos_category_check`;
    await sql`ALTER TABLE events DROP CONSTRAINT IF EXISTS events_category_check`;
    await sql`ALTER TABLE programs DROP CONSTRAINT IF EXISTS programs_category_check`;

    for (const item of DEFAULT_PHOTOS) {
      const existing = await sql`SELECT id FROM gallery_photos WHERE image_url = ${item.image_url}`;
      if (existing.length === 0) {
        await sql`
          INSERT INTO gallery_photos (image_url, caption, category, is_featured)
          VALUES (${item.image_url}, ${item.caption}, ${item.category}, false)
        `;
        console.log(`Inserted: ${item.caption}`);
      } else {
        console.log(`Already exists: ${item.caption}`);
      }
    }
    console.log("Seeding complete!");
  } catch (err) {
    console.error("Error seeding:", err);
  }
}

seed();
