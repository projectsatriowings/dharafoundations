import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { neon } from '@neondatabase/serverless';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const sql = neon(process.env.DATABASE_URL);

const ACTIVITIES = [
  {
    numericId: "50",
    legacyId: "40",
    uuid: "0054e6d5-2bde-4ce3-a07e-3fb8be44b1a4",
    slug: "digitisation-activities-wshg",
    folderName: "activity 1",
    title: "In Digitisation activities for Women Self Help Group society",
    category: "Women's Empowerment",
    date: "2026-01-01",
    time: "10:00 AM",
    location: "Cuddalore",
    p1: "Conducting digitisation activities for Women Self Help Group societies as part of a community empowerment and rural development initiative aimed at improving digital literacy, financial inclusion, and administrative efficiency among women members.",
    p2: "The initiative focused on introducing digital systems and technology-based practices to Self Help Groups (SHGs), enabling women to maintain records, manage accounts, conduct banking transactions, and access government welfare schemes more effectively. Training and guidance were provided to help members understand the use of digital tools, online services, and cashless transaction methods.",
    p3: "These activities were carried out to strengthen the functioning of Women Self Help Groups by promoting transparency, accuracy, and better communication through digitisation. The program also encouraged women to become more confident and independent in using technology for economic and social development."
  },
  {
    numericId: "51",
    legacyId: "39",
    uuid: "3dc970bf-4f6c-4f09-9ce4-2e7d0d3581f5",
    slug: "tribal-welfare-javadhu-hills",
    folderName: "activity 2",
    title: "In Tribal welfare activities at Javadhu hills",
    category: "Tribal Welfare",
    date: "2025-11-06",
    time: "10:00 AM",
    location: "Javadhu Hills",
    p1: "Conducting tribal welfare activities in Javadhu Hills as part of a social development and community upliftment initiative aimed at improving the living conditions and well-being of tribal communities residing in remote hill areas.",
    p2: "The welfare activities focused on supporting tribal families and children through the distribution of essential items, educational assistance, health awareness programs, and community support services. Special attention was given to improving access to basic necessities, promoting education among tribal children, and encouraging awareness about hygiene, health, and social welfare.",
    p3: "These activities were carried out to bridge the developmental gap in tribal areas and foster inclusive growth by extending compassionate support and practical resources. The initiative reflected a strong commitment to empowering marginalized hill communities and helping them lead healthier, more self-reliant lives."
  },
  {
    numericId: "52",
    legacyId: "38",
    uuid: "cf30f5d9-bb25-4ec4-a785-8c8502bd9625",
    slug: "diwali-dresses-home-children",
    folderName: "activity 3",
    title: "Providing Diwali Dresses To Home Children",
    category: "Children & Education",
    date: "2025-10-18",
    time: "10:00 AM",
    location: "Cuddalore",
    p1: "Providing Diwali dresses to home children in Cuddalore as part of a festive welfare and child support initiative aimed at spreading happiness, care, and celebration among underprivileged children during the auspicious occasion of Diwali.",
    p2: "The initiative focused on distributing new, colorful, and traditional festive attire to children residing in welfare homes, ensuring they feel cherished, included, and joyful during the festival of lights. Special attention was given to selecting comfortable and well-fitted dresses to make the festival truly memorable and special for every child.",
    p3: "This heartwarming activity was carried out to bring smiles, warmth, and emotional well-being to home children, reinforcing a sense of community love and belonging. By sharing the spirit of Diwali with those in need, the initiative highlighted the importance of compassion, kindness, and inclusive celebration."
  },
  {
    numericId: "53",
    legacyId: "37",
    uuid: "ed5f321e-8fa9-4b07-aa1a-c7bafbf13726",
    slug: "footwear-girl-children-annai-sathiya",
    folderName: "activity 4",
    title: "Providing footwear to all the girl children at Annai Sathiya District Govt Home",
    category: "Children & Education",
    date: "2025-04-14",
    time: "10:00 AM",
    location: "Cuddalore",
    p1: "Providing footwear to all the girl children at Annai Sathiya District Government Home as part of a social welfare and child support initiative aimed at ensuring comfort, hygiene, and well-being for the children residing in the government home.",
    p2: "The initiative focused on distributing quality footwear to every girl child in the home, helping them meet their daily needs with dignity and care. Proper footwear plays an important role in protecting children’s health, improving mobility, and supporting their participation in education and daily activities.",
    p3: "This thoughtful support was carried out with the objective of creating a positive impact on the lives of the children by addressing essential personal needs and fostering a safe, healthier environment. The program stands as a testament to dedicated community service and ongoing support for government-run child welfare institutions."
  },
  {
    numericId: "54",
    legacyId: "36",
    uuid: "7410752d-0c24-4bc3-afd7-785c5baa4b82",
    slug: "felicitation-sports-children-pongal",
    folderName: "activity 5",
    title: "Felicitation of Sports children at Cuddalore during Pongal festival",
    category: "Children & Education",
    date: "2025-01-14",
    time: "10:00 AM",
    location: "Cuddalore",
    p1: "Felicitation of young sports achievers in Cuddalore during the festive occasion of Pongal as part of a community encouragement and youth development initiative. The event was organized to recognize and honor talented children who have demonstrated excellence in sports, discipline, and competitive spirit.",
    p2: "The felicitation program featured the presentation of awards, certificates of appreciation, and encouraging gifts to children from various schools and sports academies across the district. By integrating the celebration of sportsmanship with the traditional Pongal festival, the initiative fostered pride, cultural heritage, and physical well-being.",
    p3: "This initiative was conducted to inspire active lifestyle choices, dedication, and self-confidence among the youth while expressing gratitude to coaches and parents. Honoring these young athletes encourages them to pursue higher athletic goals and bring glory to their community."
  },
  {
    numericId: "55",
    legacyId: "35",
    uuid: "f003f8c6-76c7-487b-8547-05bcb7957d3c",
    slug: "meal-food-carriers-govt-home",
    folderName: "activity 6",
    title: "Providing meal and food carriers to Govt Home Children",
    category: "Children & Education",
    date: "2024-09-17",
    time: "10:00 AM",
    location: "Cuddalore",
    p1: "Providing nutritious meals and food carriers to the children of Annai Sathiya District Government Home as part of a social welfare and community support initiative. This activity aims to support the health, well-being, and daily nutritional needs of the children residing in the government home by ensuring the availability of safe, hygienic, and wholesome food.",
    p2: "As part of the initiative, quality food carriers and serving containers were distributed to facilitate proper storage, transportation, and serving of meals in a clean and organized manner. The program reflects a commitment to child welfare, social responsibility, and compassionate community service, while also promoting dignity, care, and better living conditions for the children under government care.",
    p3: "The initiative was carried out with the objective of creating a positive impact on the lives of the children by extending support towards their basic needs and encouraging a healthier and more supportive environment within the government welfare institution."
  },
  {
    numericId: "56",
    legacyId: "34",
    uuid: "13799461-3c8a-426e-8187-69c836ee28c1",
    slug: "covid-19-relief",
    folderName: "activity 7",
    title: "COVID 19 Relief",
    category: "Sanatana Dharma",
    date: "2024-08-01",
    time: "10:00 AM",
    location: "Cuddalore",
    p1: "Conducting COVID-19 relief initiatives to support vulnerable families, daily wage earners, and communities affected by the pandemic across the region. The initiative focused on providing timely humanitarian aid to alleviate distress during challenging times.",
    p2: "As part of the relief efforts, dry ration kits, fresh groceries, hygiene supplies, masks, and sanitizers were systematically distributed to underprivileged households. Special focus was given to maintaining safety protocols while reaching out to elderly individuals, disabled persons, and families lacking basic sustenance.",
    p3: "This dedicated humanitarian effort helped sustain numerous families during critical lockdowns and healthcare emergencies, demonstrating strong solidarity, resilience, and community care during a global health crisis."
  }
];

async function run() {
  console.log("Starting upload of all 7 activity photo archives to Cloudinary...");
  const uploadedManifest = {};

  for (const act of ACTIVITIES) {
    const localDir = path.join("public", "images", "activities images", act.folderName);
    if (!fs.existsSync(localDir)) {
      console.warn(`Local directory not found: ${localDir}`);
      continue;
    }

    const files = fs.readdirSync(localDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    // Sort files naturally (img 1.jpg, img 2.jpg, etc.)
    files.sort((a, b) => {
      const numA = parseInt(a.match(/\d+/) ? a.match(/\d+/)[0] : '0', 10);
      const numB = parseInt(b.match(/\d+/) ? b.match(/\d+/)[0] : '0', 10);
      return numA - numB;
    });

    console.log(`Uploading ${files.length} images from ${localDir} (${act.slug})...`);
    const cloudinaryUrls = [];

    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(localDir, files[i]);
      const publicId = `img_${i + 1}`;
      const folderPath = `dhara_foundations/activities/${act.slug}`;

      try {
        const res = await cloudinary.uploader.upload(filePath, {
          folder: folderPath,
          public_id: publicId,
          overwrite: true,
          resource_type: 'image'
        });
        console.log(` -> Uploaded ${files[i]} to ${res.secure_url}`);
        cloudinaryUrls.push(res.secure_url);
      } catch (err) {
        console.error(`Error uploading ${filePath}:`, err.message);
      }
    }

    if (cloudinaryUrls.length > 0) {
      uploadedManifest[act.slug] = cloudinaryUrls;
      const coverUrl = cloudinaryUrls[0];
      const fullDesc = `${act.p1}\n\n${act.p2}\n\n${act.p3}`;

      // Update Postgres events table for all IDs
      const allIds = Array.from(new Set([act.uuid, act.slug, act.numericId, act.legacyId]));
      for (const idStr of allIds) {
        await sql`
          UPDATE events
          SET cover_image_url = ${coverUrl},
              short_description = ${act.p1},
              full_description = ${fullDesc},
              status = 'published'
          WHERE id::text = ${idStr} OR slug = ${idStr}
        `;
      }

      // Sync gallery images in Postgres
      for (const idStr of allIds) {
        await sql`DELETE FROM event_gallery_images WHERE event_id::text = ${idStr}`;
        for (let i = 0; i < cloudinaryUrls.length; i++) {
          await sql`
            INSERT INTO event_gallery_images (event_id, image_url, sort_order)
            VALUES (${idStr}, ${cloudinaryUrls[i]}, ${i})
          `;
        }
      }
      console.log(`Synchronized Postgres for ${act.slug} with Cloudinary URLs.`);
    }
  }

  // Save manifest to json file for updating events.ts
  fs.writeFileSync("scripts/cloudinary-manifest.json", JSON.stringify(uploadedManifest, null, 2));
  console.log("Completed Cloudinary upload and DB sync! Manifest saved to scripts/cloudinary-manifest.json.");
}

run().catch(console.error);
