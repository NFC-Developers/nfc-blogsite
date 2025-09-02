"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import Link from "next/link";
import { getRatingColor, getTagColor, getWordCount } from "@/hooks/useStoryCard";
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

export default function StoryCard(props: Story & {fetchData?: boolean; compact?: boolean}) {
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

    if (props.fetchData || props.fetchData === undefined) fetchStoryDetails();
  }, [props.fetchData, props.id]);

  const wordCount = getWordCount(props.content);

  // don't delete this. it's needed to make line breaks appear
  const description = props.description.split("\n").map((str,index)=><span key={index}>{str}<br/></span>);

  const compact = !!props.compact;

  return (
    <Card className={`w-full gap-1 ${compact ? 'py-2 px-3' : ''}`}>
      <CardHeader>
        <CardTitle className={compact ? "flex items-center gap-3" : "flex flex-col sm:flex-row sm:items-center sm:gap-2"}>
          <div
            className={`shrink-0 inline-block rounded-sm text-center text-white ${compact ? 'w-7 h-7 leading-7 text-lg mr-2' : 'mr-3 w-8 h-8 leading-8 text-xl'} ${getRatingColor(
              storyData?.rating || props.rating
            )}`}
          >
            {(storyData?.rating || props.rating)[0]}
          </div>

          <Link
            href={"/story/" + props.id}
            className={compact ? "font-semibold hover:underline text-sm truncate" : "text-ellipsis font-bold hover:underline text-xl"}
          >
            {storyData?.title || props.title}
          </Link>

          {!compact && (
            <span className="shrink-0 text-gray-500 ml-2 text-lg">
              by
              <Link
                href={"/user/" + props.author.firebaseUid}
                className="hover:underline ml-1"
              >
                {storyData?.authorName || "..."}
              </Link>
            </span>
          )}
        </CardTitle>
      </CardHeader>

      {!compact && (
        <CardContent>
          <div className="flex flex-wrap gap-1 mb-2">
            {storyData?.tags?.map((tag, i) => (
              <TagDisp key={i} name={tag.name} categoryId={tag.categoryId} />
            ))}
          </div>
          <hr className="my-3" />
          {description}
        </CardContent>
      )}

      <CardFooter>
        <div className={`rounded-sm ${compact ? 'bg-transparent p-0' : 'bg-gray-100 w-full p-2'} text-sm text-gray-800 flex ${compact ? 'items-center gap-3' : 'flex-col gap-1'}`}>
          <div className={compact ? 'flex items-center gap-3 text-gray-300 text-sm' : 'flex items-center gap-2'}>
            <span className="font-medium">{wordCount} words</span>
            {!compact && (
              <>
                • {storyData?.views} views •{' '}
                <InteractiveStarRating rating={storyData?.stars || 0} />
                <span>{storyData?.stars}</span> stars
              </>
            )}
          </div>

          {!compact && (
            <div className="text-gray-500 text-xs">
              Created: {storyData?.createdAt}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
