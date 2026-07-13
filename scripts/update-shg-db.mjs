import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function run() {
  await sql`
    UPDATE events
    SET slug = 'digitisation-activities-wshg',
        title = 'In Digitisation activities for Women Self Help Group society',
        location_name = 'Cuddalore',
        event_date = '2026-01-01',
        cover_image_url = '/images/events/event-digitisation-women-shg.jpg',
        category = 'Women''s Empowerment',
        short_description = 'The Dhara Foundations initiated comprehensive digitisation training and financial literacy workshops for Women Self Help Group (SHG) societies in Cuddalore district.'
    WHERE id = 50
  `;
  console.log("Postgres row 50 updated to In Digitisation activities for Women Self Help Group society!");
}

run().catch(console.error);
