import React from "react";
import RegistrationsDetailClient from "./RegistrationsDetailClient";
import { REGISTRATION_DOCS } from "@/data/registrations";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function RegistrationDetailPage({ params }: Props) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug || "");
  const normalized = decoded.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  
  // Safe lookup: try normalized -> decoded -> exact -> fallback to 12a-registration
  const docKey = REGISTRATION_DOCS[normalized] ? normalized : (REGISTRATION_DOCS[decoded] ? decoded : (REGISTRATION_DOCS[slug] ? slug : "12a-registration"));

  return <RegistrationsDetailClient slug={docKey} />;
}
