"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getRatingColor, getTagColor } from "@/hooks/useStoryCard";
import type { Story } from "@/types/story";
import { InteractiveStarRating } from "./StarRating";
import { Tag } from "@prisma/client";

function TagDisp({ name, categoryId }: { name: string; categoryId?: string }) {
  const tagColor = getTagColor(categoryId || "default");
  return (
    <Link
      href={`/tag/${encodeURIComponent(name)}`}
      className={`inline-block rounded-sm px-2 py-1 text-white text-sm hover:underline ${tagColor}`}
    >
      {name}
    </Link>
  );
}

export default function StoryCard(props: Story & {large?: boolean}) {
  const [storyData, setStoryData] = useState<{
    authorName: string;
    createdAt: string;
    title: string;
    description: string;
    content: string;
    tags: Tag[];
    rating: string;
    views: number;
    stars: number;
  } | null>(null);

  useEffect(() => {
    async function fetchStoryDetails() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/stories/${props.id}`
        );
        if (!res.ok) throw new Error("Failed to fetch story");
        const data = await res.json();

        setStoryData({
          authorName: data.author?.name || "Unknown",
          createdAt: new Date(data.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          title: data.title,
          description: data.description,
          content: data.content,
          tags: data.tags || [],
          rating: data.rating,
          views: data.views,
          stars: data.stars,
        });
      } catch (err) {
        console.error("Error fetching story details:", err);
      }
    }

    fetchStoryDetails();
  }, [props.id]);

  const wordCount = storyData?.content
    ? storyData.content.trim().split(/\s+/).length
    : 0;

  const isLarge = props.large ?? true;

  return (
    <Card className={`w-full gap-1 ${isLarge ? "" : "text-sm"}`}>
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <div
            className={`inline-block rounded-sm text-center text-white ${isLarge ? "w-8 h-8 leading-8 text-xl" : "w-7 h-7 leading-7 text-lg"} ${getRatingColor(
              storyData?.rating || props.rating
            )}`}
          >
            {(storyData?.rating || props.rating)[0]}
          </div>
          <Link
            href={"/story/" + props.id}
            className={`font-bold hover:underline ${isLarge ? "ml-3 text-xl" : "ml-2 text-lg"}`}
          >
            {storyData?.title || props.title}
          </Link>
          <span className={`text-gray-500 ${isLarge ? "ml-2 text-lg" : "ml-1 text-base"}`}>
            by
            <Link
              href={"/user/" + props.author.firebaseUid}
              className="hover:underline ml-1"
            >
              {storyData?.authorName || "..."}
            </Link>
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-1 mb-2">
          {storyData?.tags?.map((tag, i) => (
            <TagDisp key={i} name={tag.name} categoryId={tag.categoryId} />
          ))}
        </div>
        <hr className="my-3" />
        {storyData?.description}
      </CardContent>

      <CardFooter>
        <div className="rounded-sm bg-gray-100 w-full p-2 text-sm text-gray-800 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {wordCount} words • {storyData?.views} views •{" "}
            <InteractiveStarRating rating={storyData?.stars || 0} />
            <span>{storyData?.stars}</span> stars
          </div>
          <div className="text-gray-500 text-xs">
            Created: {storyData?.createdAt}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
