import sql from "@/lib/db";
import { SIX_MODERN_CARDS, type NewsArticle } from "@/data/news";

export { SIX_MODERN_CARDS, type NewsArticle };

export async function getPublicNews(): Promise<NewsArticle[]> {
  try {
    const rows = await sql`
      SELECT id, slug, headline, publish_date, read_time_minutes, excerpt, body_content,
             featured_image_url, is_external, external_url, status, priority
      FROM news_articles
      WHERE status = 'published' OR status IS NULL
      ORDER BY priority DESC, publish_date DESC
    `;

    if (!rows || rows.length === 0) {
      return SIX_MODERN_CARDS;
    }

    return rows.map((art: any) => {
      const dateStr = art.publish_date
        ? new Date(art.publish_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "2025";
      const slugStr = art.slug || art.id.toString();
      const staticMatch = SIX_MODERN_CARDS.find((s) => s.slug === slugStr || s.id === slugStr);

      return {
        id: slugStr,
        slug: slugStr,
        title: art.headline || staticMatch?.title || "News Article",
        date: dateStr,
        img: art.featured_image_url || staticMatch?.img || "/images/news/card-1.jpg",
        isDoc: slugStr.includes("reg-cert") || slugStr.includes("gov-") || staticMatch?.isDoc,
        category: staticMatch?.category || "Press Release",
        excerpt: art.excerpt || staticMatch?.excerpt || "",
        body_content: art.body_content || staticMatch?.body_content || "<p>Detailed report to be updated.</p>",
        read_time_minutes: art.read_time_minutes || staticMatch?.read_time_minutes || 3,
        is_external: art.is_external || false,
        external_url: art.external_url || "",
      };
    });
  } catch (err) {
    console.warn("Falling back to static SIX_MODERN_CARDS due to DB error:", err);
    return SIX_MODERN_CARDS;
  }
}

export async function getPublicNewsBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const rows = await sql`
      SELECT id, slug, headline, publish_date, read_time_minutes, excerpt, body_content,
             featured_image_url, is_external, external_url, status
      FROM news_articles
      WHERE (slug = ${slug} OR id::text = ${slug}) AND (status = 'published' OR status IS NULL)
      LIMIT 1
    `;

    if (rows && rows.length > 0) {
      const art = rows[0];
      const dateStr = art.publish_date
        ? new Date(art.publish_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "2025";
      const slugStr = art.slug || art.id.toString();
      const staticMatch = SIX_MODERN_CARDS.find((s) => s.slug === slugStr || s.id === slugStr || s.id === slug);

      return {
        id: slugStr,
        slug: slugStr,
        title: art.headline || staticMatch?.title || "News Article",
        date: dateStr,
        img: art.featured_image_url || staticMatch?.img || "/images/news/card-1.jpg",
        isDoc: slugStr.includes("reg-cert") || slugStr.includes("gov-") || staticMatch?.isDoc,
        category: staticMatch?.category || "Press Release",
        excerpt: art.excerpt || staticMatch?.excerpt || "",
        body_content: art.body_content || staticMatch?.body_content || "<p>Detailed report to be updated.</p>",
        read_time_minutes: art.read_time_minutes || staticMatch?.read_time_minutes || 3,
        is_external: art.is_external || false,
        external_url: art.external_url || "",
      };
    }
  } catch (err) {
    console.warn("DB error in getPublicNewsBySlug, checking static data:", err);
  }

  const staticMatch = SIX_MODERN_CARDS.find((s) => s.slug === slug || s.id === slug);
  return staticMatch || null;
}
