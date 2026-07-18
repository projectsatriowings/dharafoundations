import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function check() {
  // Check if priority column exists
  const columns = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'news_articles' AND column_name = 'priority'`;
  console.log("Priority column exists:", columns.length > 0);
  
  if (columns.length === 0) {
    console.log("Adding priority column...");
    await sql`ALTER TABLE news_articles ADD COLUMN priority INT DEFAULT 0`;
    console.log("Added!");
  }
  
  // Test the exact query from the route
  try {
    const articles = await sql`
      SELECT id, slug, headline, publish_date, read_time_minutes, excerpt, body_content,
             featured_image_url, is_external, external_url, status, priority, updated_at
      FROM news_articles
      ORDER BY priority DESC, publish_date DESC
    `;
    console.log("Query works! Articles found:", articles.length);
  } catch (err) {
    console.error("Query failed:", err.message);
  }
}

check().catch(console.error);
