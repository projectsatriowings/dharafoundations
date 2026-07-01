-- ═══════════════════════════════════
-- DHARA FOUNDATIONS — SEED DATA
-- Run this AFTER schema.sql
-- ═══════════════════════════════════

-- ─────────────────────────────────
-- ADMIN USER (dharafoundation.com / admin123)
-- Password hash: bcrypt(admin123, 10 rounds)
-- ─────────────────────────────────
INSERT INTO admin_users (email, password_hash) VALUES
  ('dharafoundation.com', '$2b$10$Oz6a8Mkd01vTM9k4kuVPue9699uj6rYtOMEbTSSepsCH23xFFuzCi');

-- ─────────────────────────────────
-- EXISTING EVENTS (migrated from src/data/events.ts)
-- ─────────────────────────────────
INSERT INTO events (slug, title, event_date, event_time, location_name, latitude, longitude, cover_image_url, short_description, full_description, category, status) VALUES
(
  'dhara-divine-awards',
  'Dhara Divine Awards',
  '2026-01-24', '09:00',
  'Chetpet, Chennai',
  13.0714000, 80.2417000,
  '/Event images/05.jpg',
  'A prestigious initiative to recognize individuals and organizations dedicated to selfless service and humanitarian work.',
  '<p>The Dhara Divine Awards is a prestigious initiative organized by the Dhara Foundations to recognize and celebrate individuals, social organizations, philanthropists, spiritual leaders, and change-makers who dedicate their lives to selfless service and humanitarian work inspired by spiritual values.</p><p>The event is envisioned as a grand gathering of social reformers, CSR leaders, volunteers, NGOs, and spiritually inspired service organizations from different sectors. More than 500 distinguished guests and participants are expected to attend the celebration.</p><p>Formal invitations were extended to Hon''ble Union Finance Minister Nirmala Sitharaman and Lawyer and former Member of the Tamil Nadu Legislative Assembly Vanathi Srinivasan to grace the Dhara Divine Awards Ceremony.</p>',
  'Awards & Recognition',
  'published'
),
(
  'digitisation-activities-wshg',
  'In Digitisation activities for Women Self Help Group society',
  '2026-01-01', '13:00',
  'Cuddalore',
  11.7480000, 79.7714000,
  '/images/gallery-3.png',
  'Comprehensive digitisation training and financial literacy workshops for Women Self Help Group societies in Cuddalore district.',
  '<p>The Dhara Foundations initiated comprehensive digitisation training and financial literacy workshops for Women Self Help Group (SHG) societies in Cuddalore district.</p><p>Empowering rural women with modern digital tools enables seamless record keeping, transparent micro-finance management, and greater economic independence for thousands of families across the region.</p>',
  'Women''s Empowerment',
  'published'
),
(
  'tribal-welfare-javadhu-hills',
  'In Tribal welfare activities at Javadhu hills',
  '2025-11-06', '14:00',
  'Vellore',
  12.5855000, 78.8687000,
  '/images/gallery-2.png',
  'Tribal welfare outreach across remote hamlets in Javadhu Hills focusing on healthcare, nutrition, and clothing distribution.',
  '<p>A comprehensive tribal welfare outreach conducted across remote hamlets in the Javadhu Hills near Vellore, focusing on basic healthcare, nutrition, and warm clothing distribution.</p><p>Volunteers hiked into interior tribal villages to deliver essential supplies, study kits for children, and conduct general medical screening camps.</p>',
  'Welfare Drives',
  'published'
),
(
  'diwali-dresses-home-children',
  'Providing Diwali Dresses To Home Children',
  '2025-10-18', '13:00',
  'Cuddalore',
  11.7480000, 79.7714000,
  '/images/event-1.png',
  'Distributing brand new traditional Diwali dresses, festive sweets, and firecrackers to children in government care homes.',
  '<p>Celebrating the Festival of Lights by distributing brand new traditional Diwali dresses, festive sweets, and firecrackers to children residing in government care homes across Cuddalore.</p><p>Bringing joy, warmth, and a festive family spirit to orphan and destitute children during the auspicious occasion of Deepavali.</p>',
  'Children & Education',
  'published'
),
(
  'footwear-girl-children-annai-sathiya',
  'Providing footwear to all the girl children at Annai Sathiya District Govt Home',
  '2025-04-14', '13:00',
  'Cuddalore',
  11.7480000, 79.7714000,
  '/images/event-3.png',
  'Distributing high-quality, durable footwear to all girl children at the Annai Sathiya District Government Home.',
  '<p>Dhara Foundations distributed high-quality, durable footwear to all girl children residing at the Annai Sathiya District Government Home in Cuddalore on Tamil New Year''s Day.</p><p>Ensuring health, hygiene, and dignity for young girls through daily essential supplies and continued mentorship.</p>',
  'Children & Education',
  'published'
),
(
  'felicitation-sports-children-pongal',
  'Felicitation of Sports children at Cuddalore during Pongal festival',
  '2025-01-14', '18:00',
  'Cuddalore',
  11.7480000, 79.7714000,
  '/Event images/22.jpg',
  'Felicitating outstanding young sports achievers from government schools and orphanages during Pongal celebrations.',
  '<p>During the grand Pongal harvest festival celebrations, Dhara Foundations organized a special ceremony to felicitate outstanding young sports achievers from government schools and orphanages in Cuddalore.</p><p>Recognizing athletic excellence and providing sports kits, trophies, and scholarships to inspire the youth to pursue healthy physical development.</p>',
  'Children & Education',
  'published'
),
(
  'meal-food-carriers-govt-home',
  'Providing meal and food carriers to Govt Home Children',
  '2024-09-17', '13:00',
  'Cuddalore',
  11.7480000, 79.7714000,
  '/Event images/18.jpg',
  'Providing wholesome festive meals along with stainless steel food carriers and water bottles to government home children.',
  '<p>An Anna Daanam service providing wholesome festive meals along with stainless steel food carriers and water bottles to children at government welfare homes in Cuddalore.</p><p>Nourishing the body and soul through traditional hospitality and selfless service.</p>',
  'Welfare Drives',
  'published'
),
(
  'covid-19-relief',
  'COVID 19 Relief',
  '2020-02-03', '09:00',
  'Chennai',
  13.0827000, 80.2707000,
  '/Event images/52.jpg',
  'COVID-19 emergency relief distributing grocery kits, medical supplies, masks, and daily cooked meals to vulnerable families.',
  '<p>Extensive COVID-19 pandemic emergency relief operations conducted across Chennai, distributing grocery kits, medical supplies, masks, and daily cooked meals to stranded daily-wage laborers and vulnerable families.</p><p>Working on the frontlines during national lockdowns to ensure no family went hungry during the crisis.</p>',
  'Welfare Drives',
  'published'
);

-- ─────────────────────────────────
-- SEED GALLERY IMAGES FOR FIRST EVENT
-- ─────────────────────────────────
INSERT INTO event_gallery_images (event_id, image_url, caption, sort_order)
SELECT e.id, img.url, img.caption, img.sort_order
FROM events e,
(VALUES
  ('/Event images/05.jpg', 'Dhara Divine Awards ceremony', 0),
  ('/Event images/18.jpg', 'Award recipients', 1),
  ('/Event images/22.jpg', 'Guest speakers', 2),
  ('/Event images/52.jpg', 'Community gathering', 3),
  ('/images/event-1.png', 'Event highlights', 4),
  ('/images/event-2.png', 'Cultural performances', 5)
) AS img(url, caption, sort_order)
WHERE e.slug = 'dhara-divine-awards';
