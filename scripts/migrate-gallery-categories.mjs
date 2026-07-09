import { neon } from '@neondatabase/serverless';
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("No DATABASE_URL found in .env.local");
  process.exit(1);
}

const sql = neon(connectionString);

async function migrate() {
  try {
    console.log("Migrating gallery photo categories to 'charity' and 'sanatana_dharma'...");
    
    // Update Sanatana Dharma / Temple Heritage related
    const r1 = await sql`
      UPDATE gallery_photos 
      SET category = 'sanatana_dharma'
      WHERE category = 'temple_heritage' 
         OR category ILIKE '%temple%' 
         OR category ILIKE '%sanatana%' 
         OR category ILIKE '%dharma%'
         OR category ILIKE '%restoration%'
      RETURNING id
    `;
    console.log(`Updated ${r1.length} photos to 'sanatana_dharma'`);

    // Update all others to 'charity'
    const r2 = await sql`
      UPDATE gallery_photos 
      SET category = 'charity'
      WHERE category != 'sanatana_dharma'
      RETURNING id
    `;
    console.log(`Updated ${r2.length} photos to 'charity'`);

    console.log("Migration complete!");
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

migrate();
