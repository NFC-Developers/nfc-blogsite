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

export default function StoryCard(props: Story & {fetchData?: boolean}) {
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

  return (
    <Card className="w-full border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Story Thumbnail/Cover */}
          <div className="flex-shrink-0">
            {props.coverImg ? (
              <img 
                src={props.coverImg} 
                alt={storyData?.title || props.title}
                className="w-16 h-20 object-cover rounded border border-gray-300"
              />
            ) : (
              <div className="w-16 h-20 bg-gray-200 rounded border border-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-xs">No Image</span>
              </div>
            )}
          </div>

          {/* Story Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-2">
              <div
                className={`flex-shrink-0 inline-block rounded text-center text-white w-6 h-6 leading-6 text-sm font-bold ${getRatingColor(
                  storyData?.rating || props.rating
                )}`}
              >
                {(storyData?.rating || props.rating)[0]}
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={"/story/" + props.id}
                  className="font-semibold hover:underline text-red-600 block truncate"
                >
                  {storyData?.title || props.title}
                </Link>
                <p className="text-sm text-gray-600">
                  by{" "}
                  <Link
                    href={"/user/" + props.author.firebaseUid}
                    className="hover:underline text-red-600"
                  >
                    {storyData?.authorName || props.author.displayName || "Unknown"}
                  </Link>
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-2">
              {storyData?.tags?.slice(0, 4).map((tag, i) => (
                <TagDisp key={i} name={tag.name} categoryId={tag.categoryId} />
              ))}
              {(storyData?.tags?.length || 0) > 4 && (
                <span className="text-xs text-gray-500">+{(storyData?.tags?.length || 0) - 4} more</span>
              )}
            </div>

            {/* Description */}
            <div className="text-sm text-gray-700 mb-3 line-clamp-2">
              {description}
            </div>

            {/* Stats */}
            <div className="text-xs text-gray-500 flex items-center gap-3">
              <span>{wordCount} words</span>
              <span>•</span>
              <span>{storyData?.views || 0} views</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <InteractiveStarRating rating={storyData?.stars || 0} />
                <span>{storyData?.stars || 0}</span>
              </div>
              <span>•</span>
              <span>{storyData?.createdAt}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
