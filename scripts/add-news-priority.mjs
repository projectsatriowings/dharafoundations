import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log("Adding priority column to news_articles...");
  try {
    await sql`ALTER TABLE news_articles ADD COLUMN priority INT DEFAULT 0;`;
    console.log("Successfully added priority column.");
  } catch (err) {
    if (err.message && err.message.includes("already exists")) {
      console.log("Priority column already exists.");
    } else {
      console.error("Error:", err);
    }
  }
}

migrate();
