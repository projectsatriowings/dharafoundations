import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { EVENTS_DATA } from "@/data/events";
import { EventDetailClient } from "./EventDetailClient";

// Generate static params for both slug id (e.g. "dhara-divine-awards") and numericId (e.g. "41")
export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  
  for (const ev of EVENTS_DATA) {
    params.push({ slug: ev.id });
    if (ev.numericId) {
      params.push({ slug: ev.numericId });
    }
  }

  return params;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const event = EVENTS_DATA.find(
    (e) => e.id === resolvedParams.slug || e.numericId === resolvedParams.slug
  );

  if (!event) {
    return {
      title: "Event Not Found | Dhara Foundations",
    };
  }

  return {
    title: `${event.title} | Dhara Foundations Events`,
    description: event.description[0]?.slice(0, 160) || `Join us for ${event.title} organized by Dhara Foundations at ${event.location}.`,
    openGraph: {
      title: event.title,
      description: event.description[0]?.slice(0, 160),
      images: [{ url: event.coverImage }],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const event = EVENTS_DATA.find(
    (e) => e.id === resolvedParams.slug || e.numericId === resolvedParams.slug
  );

  if (!event) {
    notFound();
  }

  return <EventDetailClient event={event} />;
}
