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

async function run() {
  try {
    const rows = await sql`SELECT id, slug, title, event_date, event_time FROM events WHERE slug = 'dhara-divine-awards'`;
    console.log('Current DB row:', rows);

    console.log('Updating event_date to 2026-01-24...');
    await sql`UPDATE events SET event_date = '2026-01-24' WHERE slug = 'dhara-divine-awards'`;
    
    const updated = await sql`SELECT id, slug, title, event_date, event_time FROM events WHERE slug = 'dhara-divine-awards'`;
    console.log('Updated DB row:', updated);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

run();
