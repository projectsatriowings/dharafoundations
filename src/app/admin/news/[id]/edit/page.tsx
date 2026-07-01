"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { NewsForm } from "@/components/admin/NewsForm";
import { Loader2 } from "lucide-react";

export default function EditNewsPage() {
  const params = useParams();
  const id = params?.id as string;
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/news/${id}`)
      .then((res) => res.json())
      .then((d) => setData(d.article))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen flex bg-[#fbf9f4]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar email="Admin" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit News Article</h1>
          {loading ? (
            <div className="flex items-center justify-center py-20 text-[#8a5000]">
              <Loader2 size={32} className="animate-spin" />
            </div>
          ) : data ? (
            <NewsForm initialData={data} isEdit={true} />
          ) : (
            <p className="text-red-600">Article not found.</p>
          )}
        </main>
      </div>
    </div>
  );
}
