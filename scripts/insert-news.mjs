import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function run() {
  console.log("Inserting 2 new news articles into the database...");

  // Article 1: Dhara Foundation Gifts to Children
  await sql`
    INSERT INTO news_articles (slug, headline, publish_date, read_time_minutes, excerpt, body_content, featured_image_url, status)
    VALUES (
      'dhara-gifts-children-cuddalore',
      'Dhara Foundation Distributes Gifts to Children at Welfare Home',
      '2025-09-15',
      3,
      'On Tamil New Year and Ambedkar Jayanti, Dhara Foundation distributed birthday gifts and shoes to school children at Annai Sathya Children Welfare Home in Cuddalore.',
      '<p>On September 15, commemorating both Tamil New Year and the birth anniversary of Dr. B.R. Ambedkar, Dhara Foundation organized a heartfelt gift distribution drive at the Annai Sathya Kuzhanthai Nala Pengal Kaapagatham (Children & Women''s Welfare Home) in Cuddalore.</p><p>Under the leadership of Vinodhra Raghavendra, State Secretary of the BJP Aanmeegam and Aalaya Membership Division, birthday gifts and brand-new shoes were distributed to all the school children residing at the welfare home. The event was organized in partnership with the Dhara Pavundation (Foundation) team from Cuddalore.</p><p>The ceremony was attended by Annai Sathya Kuzhanthai Nala Kaapagam Chairperson P.A.J., Maaanagar Thunaithalaiver Ezhumalai, Former General Secretary Baakar, Dr. Karunaagaran, Advocate Chandrasekar, Muthu Kumarasaamy, Vaithiyanathan, Murugan, and several other dignitaries and well-wishers. The event was widely covered by local Tamil press.</p>',
      '/images/news/dhara-gifts-children.jpg',
      'published'
    )
    ON CONFLICT (slug) DO UPDATE SET
      headline = EXCLUDED.headline,
      publish_date = EXCLUDED.publish_date,
      excerpt = EXCLUDED.excerpt,
      body_content = EXCLUDED.body_content,
      featured_image_url = EXCLUDED.featured_image_url,
      status = EXCLUDED.status
  `;

  // Article 2: Dhara Foundations Diwali Clothes Distribution
  await sql`
    INSERT INTO news_articles (slug, headline, publish_date, read_time_minutes, excerpt, body_content, featured_image_url, status)
    VALUES (
      'dhara-diwali-clothes-distribution',
      'Dhara Foundations Distributes New Clothes to Children Ahead of Diwali',
      '2025-10-18',
      3,
      'Ahead of Diwali, Dhara Foundations distributed new clothes (Puthadai) to school children at Annai Sathya Sevai Illam in Cuddalore.',
      '<p>Ahead of the Diwali festival, Dhara Foundations organized a special new clothes (Puthadai) distribution drive for the underprivileged school children residing at the Annai Sathya Sevai Illam (Service Home) in Cuddalore.</p><p>Advocate Shankar, representing Dhara Foundations, led the distribution ceremony and personally handed over the new clothes to the children, extending warm Diwali wishes and blessings. The children at the Annai Sathya Sevai Illam were overjoyed to receive their brand-new festival attire.</p><p>The event was graced by Vijayakumar, Dr. Karunaagaran, Semmandalam Ezhumalai, and many other community leaders and supporters. This initiative is part of Dhara Foundations'' continuing commitment to uplifting underprivileged children through acts of compassion and celebration during festive occasions.</p>',
      '/images/news/dhara-diwali-clothes.jpg',
      'published'
    )
    ON CONFLICT (slug) DO UPDATE SET
      headline = EXCLUDED.headline,
      publish_date = EXCLUDED.publish_date,
      excerpt = EXCLUDED.excerpt,
      body_content = EXCLUDED.body_content,
      featured_image_url = EXCLUDED.featured_image_url,
      status = EXCLUDED.status
  `;

  const rows = await sql`SELECT id, slug, headline, publish_date, status FROM news_articles ORDER BY publish_date DESC`;
  console.log("All news_articles in DB:");
  console.log(JSON.stringify(rows, null, 2));
}

run();
