import { neon } from '@neondatabase/serverless';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('ERROR: DATABASE_URL not found');
  process.exit(1);
}

const sql = neon(dbUrl);

const NEWS_ARTICLES = [
  {
    slug: "reg-cert",
    headline: "Dhara Foundation – Registrations & Certifications",
    publish_date: "2025-02-20",
    read_time_minutes: 3,
    excerpt: "Official documentation, NGO registrations, 80G/12A compliance, and recognition certificates.",
    body_content: "<p>Dhara Foundation is officially registered under the Indian Trusts Act and holds valid 80G and 12A certifications, ensuring full transparency and tax benefits for all contributors and donors.</p>",
    featured_image_url: "/images/news/card-1.jpg",
    status: "published"
  },
  {
    slug: "gov-maharashtra",
    headline: "Governor of Maharashtra Appreciates DHARA Divine Awards",
    publish_date: "2025-08-31",
    read_time_minutes: 4,
    excerpt: "Honourable Governor of Maharashtra extends formal appreciation and commendation for the Dhara Divine Awards.",
    body_content: "<p>In a prestigious recognition of cultural and social service, the Hon'ble Governor of Maharashtra expressed heartfelt appreciation for Dhara Foundation's efforts in honoring grassroots artisans and community leaders.</p>",
    featured_image_url: "/images/news/card-2.png",
    status: "published"
  },
  {
    slug: "sendoff-ceremony",
    headline: "Send-Off Ceremony in Honour of His Excellency, Hon. Governor",
    publish_date: "2026-05-30",
    read_time_minutes: 3,
    excerpt: "A grand farewell and send-off ceremony organized in honour of His Excellency, the Hon'ble Governor.",
    body_content: "<p>Dhara Foundation participated in and organized a dignified send-off ceremony celebrating the tenure and social contributions of His Excellency, the Hon'ble Governor.</p>",
    featured_image_url: "/images/news/card-3.jpg",
    status: "published"
  },
  {
    slug: "mupperum-vizha",
    headline: "Mupperum Vizha",
    publish_date: "2024-01-28",
    read_time_minutes: 5,
    excerpt: "Celebrating a historic threefold cultural and community welfare festival with thousands of beneficiaries.",
    body_content: "<p>The Mupperum Vizha brought together community leaders, social workers, and cultural performers for a massive celebration of heritage, unity, and welfare distribution.</p>",
    featured_image_url: "/images/news/card-4.jpg",
    status: "published"
  },
  {
    slug: "ambedkar-award",
    headline: "Dr. Ambedkar Seva Rathna Award",
    publish_date: "2024-10-25",
    read_time_minutes: 3,
    excerpt: "Dhara Foundation honored with the prestigious Dr. Ambedkar Seva Rathna Award for exemplary social service.",
    body_content: "<p>In recognition of our relentless work in tribal welfare, women empowerment, and child education, Dhara Foundation was conferred the Dr. Ambedkar Seva Rathna Award.</p>",
    featured_image_url: "/images/news/card-5.jpg",
    status: "published"
  },
  {
    slug: "dhara-divine-awards",
    headline: "DHARA Divine Awards",
    publish_date: "2026-01-24",
    read_time_minutes: 4,
    excerpt: "Annual flagship ceremony felicitating unsung heroes, traditional artisans, and grassroots changemakers.",
    body_content: "<p>The Dhara Divine Awards is our flagship national ceremony dedicated to honoring spiritual leaders, traditional sports coaches, folk artists, and community changemakers.</p>",
    featured_image_url: "/images/news/card-6.jpg",
    status: "published"
  }
];

async function run() {
  try {
    console.log('Seeding news articles into news_articles table...');
    for (const art of NEWS_ARTICLES) {
      await sql`
        INSERT INTO news_articles (
          slug, headline, publish_date, read_time_minutes, excerpt, body_content, featured_image_url, status
        )
        VALUES (
          ${art.slug}, ${art.headline}, ${art.publish_date}, ${art.read_time_minutes},
          ${art.excerpt}, ${art.body_content}, ${art.featured_image_url}, ${art.status}
        )
        ON CONFLICT (slug) DO UPDATE SET
          headline = EXCLUDED.headline,
          publish_date = EXCLUDED.publish_date,
          read_time_minutes = EXCLUDED.read_time_minutes,
          excerpt = EXCLUDED.excerpt,
          body_content = EXCLUDED.body_content,
          featured_image_url = EXCLUDED.featured_image_url,
          status = EXCLUDED.status;
      `;
    }
    console.log('Successfully seeded 6 news articles!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding news:', err);
    process.exit(1);
  }
}

run();
