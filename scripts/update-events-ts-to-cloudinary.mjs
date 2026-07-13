import fs from 'fs';

let content = fs.readFileSync('src/data/events.ts', 'utf8');

const map = {
  "/images/activities images/activity 1/img 1.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997177/dhara_foundations/activities/digitisation-activities-wshg/img_1.jpg",
  "/images/activities images/activity 1/img 2.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997178/dhara_foundations/activities/digitisation-activities-wshg/img_2.jpg",
  "/images/activities images/activity 1/img 3.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997180/dhara_foundations/activities/digitisation-activities-wshg/img_3.jpg",
  "/images/activities images/activity 1/img 4.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997182/dhara_foundations/activities/digitisation-activities-wshg/img_4.jpg",

  "/images/activities images/activity 2/img 1.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997186/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_1.jpg",
  "/images/activities images/activity 2/img 2.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997187/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_2.jpg",
  "/images/activities images/activity 2/img 3.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997189/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_3.jpg",
  "/images/activities images/activity 2/img 4.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997190/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_4.jpg",

  "/images/activities images/activity 3/img 1.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997194/dhara_foundations/activities/diwali-dresses-home-children/img_1.jpg",
  "/images/activities images/activity 3/img 2.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997195/dhara_foundations/activities/diwali-dresses-home-children/img_2.jpg",

  "/images/activities images/activity 4/img 1.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997199/dhara_foundations/activities/footwear-girl-children-annai-sathiya/img_1.jpg",
  "/images/activities images/activity 4/img 2.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997200/dhara_foundations/activities/footwear-girl-children-annai-sathiya/img_2.jpg",
  "/images/activities images/activity 4/img 3.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997202/dhara_foundations/activities/footwear-girl-children-annai-sathiya/img_3.jpg",
  "/images/activities images/activity 4/img 4.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997203/dhara_foundations/activities/footwear-girl-children-annai-sathiya/img_4.jpg",

  "/images/activities images/activity 5/img 1.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997207/dhara_foundations/activities/felicitation-sports-children-pongal/img_1.jpg",
  "/images/activities images/activity 5/img 2.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997208/dhara_foundations/activities/felicitation-sports-children-pongal/img_2.jpg",

  "/images/activities images/activity 6/img 1.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997211/dhara_foundations/activities/meal-food-carriers-govt-home/img_1.jpg",
  "/images/activities images/activity 6/img 2.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997213/dhara_foundations/activities/meal-food-carriers-govt-home/img_2.jpg",
  "/images/activities images/activity 6/img 3.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997214/dhara_foundations/activities/meal-food-carriers-govt-home/img_3.jpg",

  "/images/activities images/activity 7/img 1.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997218/dhara_foundations/activities/covid-19-relief/img_1.jpg",
  "/images/activities images/activity 7/img 2.jpg": "https://res.cloudinary.com/woo94xq2/image/upload/v1783997219/dhara_foundations/activities/covid-19-relief/img_2.jpg"
};

for (const [local, cloud] of Object.entries(map)) {
  content = content.replaceAll(local, cloud);
}

fs.writeFileSync('src/data/events.ts', content, 'utf8');
console.log('Successfully updated src/data/events.ts with exact Cloudinary HTTPS URLs!');
