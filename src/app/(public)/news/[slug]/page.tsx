import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublicNewsBySlug } from "@/lib/public-news";
import { NewsDetailClient } from "./NewsDetailClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getPublicNewsBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: "Article Not Found | Dhara Foundations",
    };
  }

  return {
    title: `${article.title} | Dhara Foundations News`,
    description: article.excerpt?.slice(0, 160) || `Read more about ${article.title} on Dhara Foundations.`,
    openGraph: {
      title: article.title,
      description: article.excerpt?.slice(0, 160),
      images: [{ url: article.img }],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const article = await getPublicNewsBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return <NewsDetailClient article={article} />;
}
