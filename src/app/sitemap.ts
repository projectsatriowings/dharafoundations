import { MetadataRoute } from 'next';
import sql from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dharafoundations.in";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/gallery",
    "/news",
    "/sevas",
    "/vision-mission",
    "/founder-message",
    "/partnership",
    "/events",
    "/registrations",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic News Articles
  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await sql`
      SELECT slug, updated_at, publish_date 
      FROM news_articles 
      WHERE status = 'published'
    `;
    newsRoutes = articles.map((article: any) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: article.updated_at ? new Date(article.updated_at) : new Date(article.publish_date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.error("Failed to fetch news for sitemap", err);
  }

  // Dynamic Events
  let eventRoutes: MetadataRoute.Sitemap = [];
  try {
    const events = await sql`
      SELECT slug, updated_at, event_date 
      FROM events 
      WHERE status = 'published'
    `;
    eventRoutes = events.map((event: any) => ({
      url: `${baseUrl}/events/${event.slug}`,
      lastModified: event.updated_at ? new Date(event.updated_at) : new Date(event.event_date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.error("Failed to fetch events for sitemap", err);
  }

  return [...staticRoutes, ...newsRoutes, ...eventRoutes];
}
