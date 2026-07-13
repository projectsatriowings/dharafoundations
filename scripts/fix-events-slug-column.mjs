import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function fixEventsTable() {
  console.log("Checking and adding slug column to events table...");
  try {
    await sql`ALTER TABLE events ADD COLUMN IF NOT EXISTS slug TEXT;`;
    console.log("Added slug column successfully or it already existed.");

    const events = await sql`SELECT id, title, slug FROM events;`;
    console.log(`Found ${events.length} events in DB.`);

    for (const ev of events) {
      if (!ev.slug || ev.slug.trim() === '') {
        const baseSlug = (ev.title || 'event')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        const finalSlug = baseSlug || `event-${ev.id}`;
        console.log(`Updating event ID ${ev.id} ("${ev.title}") with slug: "${finalSlug}"`);
        await sql`UPDATE events SET slug = ${finalSlug} WHERE id = ${ev.id};`;
      }
    }

    // Try adding unique constraint if not exists (ignore if duplicate/already added)
    try {
      await sql`ALTER TABLE events ADD CONSTRAINT events_slug_key UNIQUE (slug);`;
      console.log("Added unique constraint on events.slug");
    } catch (err) {
      // Constraint might already exist or duplicates need handling
      console.log("Unique constraint notice:", err.message);
    }

    const updated = await sql`SELECT id, slug, title FROM events;`;
    console.log("All events now have slugs:", updated);
  } catch (error) {
    console.error("Error fixing events table:", error);
  }
}

fixEventsTable();
