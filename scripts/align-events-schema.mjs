import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function alignEventsSchema() {
  console.log("Aligning events table schema with API requirements...");
  try {
    await sql.query(`
      ALTER TABLE events
      ADD COLUMN IF NOT EXISTS slug TEXT,
      ADD COLUMN IF NOT EXISTS title TEXT,
      ADD COLUMN IF NOT EXISTS event_date TEXT,
      ADD COLUMN IF NOT EXISTS event_time TEXT,
      ADD COLUMN IF NOT EXISTS location_name TEXT,
      ADD COLUMN IF NOT EXISTS latitude NUMERIC(10, 7),
      ADD COLUMN IF NOT EXISTS longitude NUMERIC(10, 7),
      ADD COLUMN IF NOT EXISTS cover_image_url TEXT,
      ADD COLUMN IF NOT EXISTS short_description TEXT,
      ADD COLUMN IF NOT EXISTS full_description TEXT,
      ADD COLUMN IF NOT EXISTS category TEXT,
      ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published',
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
    `);
    console.log("Added all missing columns to events table successfully.");

    const rows = await sql.query(`SELECT id, type, content, slug, title FROM events;`);
    console.log(`Found ${rows.length} rows in events table.`);

    for (const row of rows) {
      if (!row.slug || !row.title) {
        let title = row.title;
        if (!title || title.trim() === '') {
          if (row.content && row.content.length > 5) {
            title = row.content.substring(0, 50) + '...';
          } else {
            title = `Legacy Event #${row.id}`;
          }
        }
        let slug = row.slug;
        if (!slug || slug.trim() === '') {
          slug = `legacy-event-${row.id}`;
        }
        await sql.query(`
          UPDATE events
          SET title = $1,
              slug = $2,
              event_date = COALESCE(event_date, '2025-01-01'),
              event_time = COALESCE(event_time, '10:00 AM'),
              location_name = COALESCE(location_name, 'Dhara Foundation'),
              cover_image_url = COALESCE(cover_image_url, '/images/banner.png'),
              status = COALESCE(status, 'published'),
              category = COALESCE(category, 'Sanatana Dharma')
          WHERE id = $3;
        `, [title, slug, row.id]);
        console.log(`Updated legacy row ID ${row.id} with slug "${slug}" and title "${title}"`);
      }
    }

    try {
      await sql.query(`CREATE UNIQUE INDEX IF NOT EXISTS events_slug_idx ON events (slug);`);
      console.log("Created unique index on events(slug).");
    } catch (e) {
      console.log("Unique index notice:", e.message);
    }

    console.log("Events schema alignment completed successfully!");
  } catch (err) {
    console.error("Error aligning events schema:", err);
  }
}

alignEventsSchema();
