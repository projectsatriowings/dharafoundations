import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

const EVENTS_DATA = [
  {
    slug: "raghavendra-bhoomi-pooja",
    numericId: "45",
    title: "Bhoomi Pooja Performed for Raghavendra Temple",
    category: "Sanatana Dharma",
    date: "2025-01-15",
    time: "09:00:00",
    location: "Cuddalore",
    coverImage: "/images/events/raghavendra-bhoomi-pooja.jpg",
    shortDescription: "A Bhoomi Pooja ceremony was conducted for the construction of a new Sri Raghavendra Swamigal Temple at Cuddalore.",
    fullDescription: "A Bhoomi Pooja ceremony was conducted for the construction of a new Sri Raghavendra Swamigal Temple at Cuddalore. Devotees, organizers, and priests participated in the sacred ritual and offered special prayers seeking divine blessings for the successful completion of the temple project. The event was held with traditional Vedic rituals and spiritual devotion."
  },
  {
    slug: "masi-pournami-girivalam",
    numericId: "44",
    title: "Masi Pournami Maha Girivalam",
    category: "Sanatana Dharma",
    date: "2026-03-02",
    time: "18:00:00",
    location: "Thirupparankundram, Madurai",
    coverImage: "/images/events/masi-pournami-girivalam.jpg",
    shortDescription: "Join thousands of devotees for the sacred Masi Pournami Girivalam around the holy hill of Thirupparankundram.",
    fullDescription: "Join thousands of devotees for the sacred Masi Pournami Girivalam around the holy hill of Thirupparankundram. Experience divine chanting, community annadanam, and spiritual enlightenment during this auspicious full moon evening."
  },
  {
    slug: "cuddalore-temple-restoration",
    title: "Ancient Shiva Temple Restoration Project",
    category: "Sanatana Dharma",
    date: "2025-11-20",
    time: "08:30:00",
    location: "Cuddalore District",
    coverImage: "/images/events/cuddalore-temple-restoration.jpg",
    shortDescription: "Phase 2 of our initiative to restore and renovate ancient, forgotten Shiva temples across rural Cuddalore.",
    fullDescription: "Phase 2 of our initiative to restore and renovate ancient, forgotten Shiva temples across rural Cuddalore. This project involves structural repairs, consecration of the garbhagriha, and establishing regular nitya pooja schemes."
  },
  {
    slug: "digital-literacy-shg",
    title: "Digital Financial Literacy & Livelihood Workshop for SHGs",
    category: "Charity & Welfare",
    date: "2025-10-14",
    time: "10:00:00",
    location: "Chengalpattu Community Center",
    coverImage: "/images/events/shg-digital-literacy.jpg",
    shortDescription: "Empowering 150+ women from rural Self-Help Groups with digital banking, UPI safety, and micro-entrepreneurship skills.",
    fullDescription: "Empowering 150+ women from rural Self-Help Groups with digital banking, UPI safety, and micro-entrepreneurship skills. Conducted in collaboration with local banking officers and financial counselors."
  }
];

async function seedEvents() {
  console.log("Seeding static events into Postgres events table...");
  try {
    for (const ev of EVENTS_DATA) {
      await sql.query(`
        INSERT INTO events (
          slug, title, event_date, event_time, location_name,
          cover_image_url, short_description, full_description, category, status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'published')
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          event_date = EXCLUDED.event_date,
          event_time = EXCLUDED.event_time,
          location_name = EXCLUDED.location_name,
          cover_image_url = EXCLUDED.cover_image_url,
          short_description = EXCLUDED.short_description,
          full_description = EXCLUDED.full_description,
          category = EXCLUDED.category,
          status = 'published';
      `, [
        ev.slug, ev.title, ev.date, ev.time, ev.location,
        ev.coverImage, ev.shortDescription, ev.fullDescription, ev.category
      ]);
      console.log(`Upserted event: "${ev.title}" (${ev.slug})`);
    }
    console.log("All events synced successfully!");
  } catch (err) {
    console.error("Error seeding events:", err);
  }
}

seedEvents();
