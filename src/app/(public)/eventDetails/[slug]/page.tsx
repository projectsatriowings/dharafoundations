import { redirect } from "next/navigation";
import { EVENTS_DATA } from "@/data/events";

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const ev of EVENTS_DATA) {
    if (ev.numericId) {
      params.push({ slug: ev.numericId });
    }
    params.push({ slug: ev.id });
  }
  return params;
}

export default async function EventDetailsRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const event = EVENTS_DATA.find((e) => e.numericId === slug || e.id === slug);

  if (event) {
    const isAward = event.id.toLowerCase().includes("award") || event.category.toLowerCase().includes("award");
    if (isAward) {
      redirect(`/events/${event.id}`);
    } else {
      redirect(`/sevas/${event.id}`);
    }
  } else {
    redirect(`/events`);
  }
}
