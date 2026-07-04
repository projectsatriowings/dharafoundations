import { neon } from '@neondatabase/serverless';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const sql = neon(process.env.DATABASE_URL);

async function check() {
  const articles = await sql`
    SELECT id, slug, headline, publish_date, read_time_minutes,
           featured_image_url, is_external, status, updated_at
    FROM news_articles
    WHERE status = 'published' OR status IS NULL
    ORDER BY publish_date DESC
  `;
  console.log('Total published news articles in DB:', articles.length);
  articles.forEach((a, i) => console.log(`${i+1}. [${a.publish_date}] ${a.headline} (${a.slug})`));
}

check();
