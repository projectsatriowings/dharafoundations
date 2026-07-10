import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function run() {
  await sql`UPDATE events SET category = ${"Women's Empowerment"} WHERE slug = 'digitisation-activities-wshg'`;
  const r = await sql`SELECT id, slug, title, category FROM events WHERE slug = 'digitisation-activities-wshg'`;
  console.log("Updated:", JSON.stringify(r, null, 2));
}

run();
