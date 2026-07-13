import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function run() {
  // Activity 6: Providing meal and food carriers to Govt Home Children
  const m1 = "Providing nutritious meals and food carriers to the children of Annai Sathiya District Government Home as part of a social welfare and community support initiative. This activity aims to support the health, well-being, and daily nutritional needs of the children residing in the government home by ensuring the availability of safe, hygienic, and wholesome food.";
  const m2 = "As part of the initiative, quality food carriers and serving containers were distributed to facilitate proper storage, transportation, and serving of meals in a clean and organized manner. The program reflects a commitment to child welfare, social responsibility, and compassionate community service, while also promoting dignity, care, and better living conditions for the children under government care.";
  const m3 = "The initiative was carried out with the objective of creating a positive impact on the lives of the children by extending support towards their basic needs and encouraging a healthier and more secure living environment.";
  const mealFull = `${m1}\n\n${m2}\n\n${m3}`;

  const existingMeal = await sql`SELECT id FROM events WHERE slug = 'meal-food-carriers-govt-home' OR id = 55`;
  if (existingMeal.length > 0) {
    await sql`
      UPDATE events
      SET slug = 'meal-food-carriers-govt-home',
          title = 'Providing meal and food carriers to Govt Home Children',
          location_name = 'Cuddalore',
          event_date = '2024-09-17',
          cover_image_url = '/images/activities images/activity 6/img 1.jpg',
          category = 'Welfare Drives',
          short_description = ${m1},
          full_description = ${mealFull},
          status = 'published'
      WHERE id = ${existingMeal[0].id}
    `;
  } else {
    await sql`
      INSERT INTO events (id, slug, title, event_date, event_time, location_name, cover_image_url, category, short_description, full_description, status)
      VALUES (55, 'meal-food-carriers-govt-home', 'Providing meal and food carriers to Govt Home Children', '2024-09-17', '01:00 PM', 'Cuddalore', '/images/activities images/activity 6/img 1.jpg', 'Welfare Drives', ${m1}, ${mealFull}, 'published')
    `;
  }

  await sql`DELETE FROM event_gallery_images WHERE event_id IN ('55', 'meal-food-carriers-govt-home', '35')`;

  const mealImages = [
    '/images/activities images/activity 6/img 1.jpg',
    '/images/activities images/activity 6/img 2.jpg',
    '/images/activities images/activity 6/img 3.jpg'
  ];

  for (let i = 0; i < mealImages.length; i++) {
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('55', ${mealImages[i]}, ${i})`;
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('meal-food-carriers-govt-home', ${mealImages[i]}, ${i})`;
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('35', ${mealImages[i]}, ${i})`;
  }

  // Activity 7: COVID 19 Relief
  const c1 = "COVID-19 Relief activities were carried out as part of a humanitarian and community welfare initiative to support poor and economically affected families during the coronavirus pandemic and lockdown period. The initiative focused on providing essential food items such as rice, vegetables, groceries, and other daily necessities to needy people who faced financial difficulties and food shortages during the crisis.";
  const c2 = "Special efforts were taken to identify vulnerable families, elderly people, daily wage workers, and underprivileged communities who were severely impacted by the pandemic. Through the distribution of relief materials and essential supplies, the program aimed to reduce hardship and ensure that basic needs were met during challenging times.";
  const c3 = "The COVID-19 relief initiative reflected compassion, social responsibility, and commitment towards public welfare by extending timely support to affected communities. It also promoted unity, care, and humanitarian service during a period of global health emergency and uncertainty.";
  const covidFull = `${c1}\n\n${c2}\n\n${c3}`;

  const existingCovid = await sql`SELECT id FROM events WHERE slug = 'covid-19-relief' OR id = 56`;
  if (existingCovid.length > 0) {
    await sql`
      UPDATE events
      SET slug = 'covid-19-relief',
          title = 'COVID 19 Relief',
          location_name = 'Chennai',
          event_date = '2020-02-03',
          cover_image_url = '/images/activities images/activity 7/img 1.jpg',
          category = 'Welfare Drives',
          short_description = ${c1},
          full_description = ${covidFull},
          status = 'published'
      WHERE id = ${existingCovid[0].id}
    `;
  } else {
    await sql`
      INSERT INTO events (id, slug, title, event_date, event_time, location_name, cover_image_url, category, short_description, full_description, status)
      VALUES (56, 'covid-19-relief', 'COVID 19 Relief', '2020-02-03', '09:00 AM', 'Chennai', '/images/activities images/activity 7/img 1.jpg', 'Welfare Drives', ${c1}, ${covidFull}, 'published')
    `;
  }

  await sql`DELETE FROM event_gallery_images WHERE event_id IN ('56', 'covid-19-relief', '34')`;

  const covidImages = [
    '/images/activities images/activity 7/img 1.jpg',
    '/images/activities images/activity 7/img 2.jpg'
  ];

  for (let i = 0; i < covidImages.length; i++) {
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('56', ${covidImages[i]}, ${i})`;
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('covid-19-relief', ${covidImages[i]}, ${i})`;
    await sql`INSERT INTO event_gallery_images (event_id, image_url, sort_order) VALUES ('34', ${covidImages[i]}, ${i})`;
  }

  console.log("Postgres rows 55 & 56 (`meal-food-carriers-govt-home` & `covid-19-relief`) and gallery images updated cleanly!");
}

run().catch(console.error);
