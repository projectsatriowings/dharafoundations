async function check() {
  const res = await fetch('http://localhost:3000/sevas/50');
  const html = await res.text();
  const srcs = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
  console.log("Image srcs count:", srcs.length);
  console.log("Sample image srcs:", srcs);
}
check().catch(console.error);
