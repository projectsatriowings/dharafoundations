import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function run() {
  await sql`UPDATE news_articles SET headline = 'Dhara Foundation News Coverage in Dhinamalar Part 1' WHERE slug = 'dhara-gifts-children-cuddalore'`;
  await sql`UPDATE news_articles SET headline = 'Dhara Foundation News Coverage in Dhinamalar Part 2' WHERE slug = 'dhara-diwali-clothes-distribution'`;

  const rows = await sql`SELECT slug, headline FROM news_articles WHERE slug IN ('dhara-gifts-children-cuddalore', 'dhara-diwali-clothes-distribution')`;
  console.log("Updated:", JSON.stringify(rows, null, 2));
}

run();
