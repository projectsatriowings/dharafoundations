import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function check() {
  const columns = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'news_articles'`;
  console.log(columns);
}

check().catch(console.error);
