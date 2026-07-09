import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function run() {
  console.log("Restoring original gallery image URLs (/images/gallery-3.png, etc.) while keeping exact captions...");
  
  // Row 1: kodai for temple -> /images/gallery-3.png
  await sql`
    UPDATE gallery_photos 
    SET caption = 'kodai for temple', 
        image_url = '/images/gallery-3.png' 
    WHERE id = '9c07531c-d88c-4421-baf8-6ec63a903fad'
  `;

  // Row 2: Cuddalore Raghavendra Temple -> /images/gallery-2.png
  await sql`
    UPDATE gallery_photos 
    SET caption = 'Cuddalore Raghavendra Temple', 
        image_url = '/images/gallery-2.png' 
    WHERE id = 'dd11d903-9f36-4eb1-bae3-eab1a53d8aab'
  `;

  // Row 3: Poojya Sri Vidya Vallabha Madhava Theertha Swamigal -> /images/gallery-1.png
  await sql`
    UPDATE gallery_photos 
    SET caption = 'Poojya Sri Vidya Vallabha Madhava Theertha Swamigal', 
        image_url = '/images/gallery-1.png' 
    WHERE id = 'e64cfc3f-ecef-44b4-b497-26a648067f46'
  `;

  const updatedRows = await sql`SELECT id, image_url, caption, category FROM gallery_photos ORDER BY id ASC`;
  console.log("Updated rows in gallery_photos:");
  console.log(JSON.stringify(updatedRows, null, 2));
}

run();
