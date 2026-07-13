import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function check() {
  const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
  for (const t of tables) {
    try {
      const rows = await sql(`SELECT * FROM ${t.table_name}`);
      for (const r of rows) {
        if (JSON.stringify(r).includes('0054e6d5')) {
          console.log(`Found 0054e6d5 in table ${t.table_name}:`, r);
        }
      }
    } catch (e) {}
  }
}
check().catch(console.error);
