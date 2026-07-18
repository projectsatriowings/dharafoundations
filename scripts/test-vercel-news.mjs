async function test() {
  try {
    const res = await fetch('https://dhara-foundation.vercel.app/api/admin/news');
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

test();
