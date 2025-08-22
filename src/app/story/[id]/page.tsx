// app/story/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import StoryHeader from "@/components/story/StoryHeader";
import StoryStats from "@/components/story/StoryStats";
import StoryContent from "@/components/story/StoryContent";
import StoryNavigation from "@/components/story/StoryNavigation";
import { useParams } from "next/navigation";
import Navbar from "@/components/shared/NavigationBar";
export default function StoryViewPage() {
  const { id } = useParams(); 
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchStory() {
      try {
        const res = await fetch(`/api/stories/${id}`);
        const data = await res.json();
        setStory(data);
      } catch (err) {
        console.error("Error fetching story:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStory();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading story...</p>;
  // if (!story) return <p className="text-center py-10">Story not found.</p>;

  return (
    <>
    <Navbar/>
    <div className="container w-full py-6">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <StoryHeader story={story} />
        </CardHeader>
        <CardContent>
          <StoryStats stats={story.stats} published={story.published} />
          <StoryContent content={story.content} />
          <StoryNavigation />
        </CardContent>
      </Card>
    </div>
  </>
  );
}
