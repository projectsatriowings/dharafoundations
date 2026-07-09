import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublicEventBySlug } from "@/lib/public-events";
import { EventDetailClient } from "../../events/[slug]/EventDetailClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const event = await getPublicEventBySlug(resolvedParams.slug);

  if (!event) {
    return {
      title: "Seva Activity Not Found | Dhara Foundations",
    };
  }

  return {
    title: `${event.title} | Dhara Foundations Sevas`,
    description: event.description[0]?.slice(0, 160) || `Learn about ${event.title} organized by Dhara Foundations at ${event.location}.`,
    openGraph: {
      title: event.title,
      description: event.description[0]?.slice(0, 160),
      images: [{ url: event.coverImage }],
    },
  };
}

export default async function SevaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const event = await getPublicEventBySlug(resolvedParams.slug);

  if (!event) {
    notFound();
  }

  return <EventDetailClient event={event} />;
}
