import { neon } from '@neondatabase/serverless';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('ERROR: DATABASE_URL not found');
  process.exit(1);
}

const sql = neon(dbUrl);

const DHARA_VIDEOS = [
  {
    title: "Thiru T.N. Vallinayagam, Hon'ble Justice (Retd.), Madras High Court.",
    url: "https://www.youtube.com/embed/J6BvffQ1ZKQ?autoplay=1",
  },
  {
    title: "Yatheeswar Raja-Spiritual Music Director",
    url: "https://www.youtube.com/embed/IILqWheG9f4?autoplay=1",
  },
  {
    title: "Mahout Receiving an Award",
    url: "https://www.youtube.com/embed/1T_SGxOs-CY?autoplay=1",
  },
  {
    title: "Dr. Rajeswari Ramachandran",
    url: "https://www.youtube.com/embed/oEsIdHha5uw?autoplay=1",
  },
  {
    title: "Traditional Sports Coach",
    url: "https://www.youtube.com/embed/VONlv_X9Aro?autoplay=1",
  },
  {
    title: "CA Prabakaran",
    url: "https://www.youtube.com/embed/3FQgwocLBnQ?autoplay=1",
  },
  {
    title: "Traditional Folk Artist Awardee",
    url: "https://www.youtube.com/embed/RnZUT2BE_rM?autoplay=1",
  },
  {
    title: "Traditional Puppet Art Master",
    url: "https://www.youtube.com/embed/2X9u2p0YxIw?autoplay=1",
  },
  {
    title: "Handicraft & Artisan Recognition",
    url: "https://www.youtube.com/embed/1lObOM1uqY8?autoplay=1",
  },
];

async function run() {
  try {
    console.log('Creating event_videos table...');
    await sql`
      CREATE TABLE IF NOT EXISTS event_videos (
        id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        event_id    UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
        title       TEXT NOT NULL,
        video_url   TEXT NOT NULL,
        sort_order  INTEGER NOT NULL DEFAULT 0,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_event_videos_event_id ON event_videos(event_id);`;
    console.log('Table created.');

    const [event] = await sql`SELECT id FROM events WHERE slug = 'dhara-divine-awards' LIMIT 1`;
    if (event) {
      console.log(`Found Dhara Divine Awards event ID: ${event.id}`);
      await sql`DELETE FROM event_videos WHERE event_id = ${event.id}`;
      
      for (let i = 0; i < DHARA_VIDEOS.length; i++) {
        const v = DHARA_VIDEOS[i];
        await sql`
          INSERT INTO event_videos (event_id, title, video_url, sort_order)
          VALUES (${event.id}, ${v.title}, ${v.url}, ${i})
        `;
      }
      console.log(`Seeded ${DHARA_VIDEOS.length} videos into event_videos.`);
    } else {
      console.log('Dhara Divine Awards event not found in DB.');
    }

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

run();
