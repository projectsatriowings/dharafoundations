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
    console.log('Updating status to published for dhara-divine-awards...');
    await sql`UPDATE events SET status = 'published' WHERE slug = 'dhara-divine-awards'`;
    
    const updated = await sql`SELECT slug, title, status FROM events WHERE slug = 'dhara-divine-awards'`;
    console.log('Updated DB row:', updated);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

run();
