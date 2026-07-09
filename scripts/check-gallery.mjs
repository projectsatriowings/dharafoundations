import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function run() {
  const rows = await sql`SELECT id, image_url, caption, category FROM gallery_photos ORDER BY id ASC`;
  console.log(JSON.stringify(rows, null, 2));
}

run();
