import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function check() {
  const columns = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'contact_submissions'`;
  console.log(columns);
}

check().catch(console.error);
