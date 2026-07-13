async function run() {
  const slugs = [
    '50', 'digitisation-activities-wshg',
    '51', 'tribal-welfare-javadhu-hills',
    '52', 'diwali-dresses-home-children',
    '53', 'footwear-girl-children-annai-sathiya',
    '54', 'felicitation-sports-children-pongal',
    '55', 'meal-food-carriers-govt-home',
    '56', 'covid-19-relief'
  ];
  for (const slug of slugs) {
    const r = await fetch(`http://localhost:3000/sevas/${slug}`);
    const html = await r.text();
    const imgs = [...html.matchAll(/src=["'](\/images\/activities images\/[^"']+)["']/g)].map(m => m[1]);
    const isError = html.includes("Unterminated regexp literal") || html.includes("Parsing ecmascript source code failed");
    console.log(`/sevas/${slug} -> Status: ${r.status} | Has syntax error: ${isError} | Total images: ${imgs.length} | Unique count: ${new Set(imgs).size}`);
  }
}
run().catch(console.error);
