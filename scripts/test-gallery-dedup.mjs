async function verify() {
  const ids = ['50', '51', '52', '53', '54', '55', '56'];
  for (const id of ids) {
    const res = await fetch(`http://localhost:3000/sevas/${id}`);
    const html = await res.text();
    // match all image src tags inside the event gallery grid
    const matches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
    const activityImgs = matches.filter(url => url.includes('activities images'));
    console.log(`/sevas/${id} -> Total activity images rendered: ${activityImgs.length} | Unique count: ${new Set(activityImgs).size}`);
  }
}

verify().catch(console.error);
