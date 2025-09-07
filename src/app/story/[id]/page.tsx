"use client";
import React, { useEffect, useState } from "react";
import type { Story } from "../../../types/story";
import StoryDetail from "@/components/shared/StoryDetail";

export default function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";
        const url = base ? `${base.replace(/\/$/,"")}/stories/${id}` : `/api/stories/${id}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to load story: ${res.status}`);
        const data = await res.json();
        if (mounted) setStory(data);
      } catch (err) {
        console.error(err);
        let msg = "Failed to load story";
        if (err instanceof Error) msg = err.message;
        if (mounted) setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [params, id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!story) return <div className="min-h-screen flex items-center justify-center">Story not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 dark:from-gray-900 dark:via-slate-900 dark:to-pink-950 py-8">
      <div className="container mx-auto px-4">
        <StoryDetail story={story} />
      </div>
    </div>
  );
}
