import React from "react";
import { getPublicNews } from "@/lib/public-news";
import { NewsListClient } from "./NewsListClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewsPage() {
  const articles = await getPublicNews();
  return <NewsListClient initialArticles={articles} />;
}
