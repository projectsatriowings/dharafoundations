import { neon } from '@neondatabase/serverless';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const sql = neon(process.env.DATABASE_URL);

async function check() {
  const vids = await sql`SELECT * FROM event_videos WHERE event_id = '78872f2b-c7b5-4b97-aaca-a5568df3655f'`;
  console.log('Total Dhara Divine Awards videos in DB:', vids.length);
  vids.forEach((v, i) => console.log(`${i+1}. ${v.title} -> ${v.video_url}`));
}

check();
