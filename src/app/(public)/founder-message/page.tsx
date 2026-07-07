import React from "react";
import { getPublicFounders } from "@/lib/public-founders";
import { FounderMessageClient } from "./FounderMessageClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function FounderMessagePage() {
  const founders = await getPublicFounders();
  return <FounderMessageClient initialFounders={founders} />;
}
