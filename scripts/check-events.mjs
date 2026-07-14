import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function check() {
  const rows = await sql`SELECT id, slug, title, status, category FROM events ORDER BY id ASC`;
  console.log(JSON.stringify(rows, null, 2));
}

check().catch(console.error);
