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
import type { Tag } from "@/types/story";
import { InteractiveStarRating } from "./StarRating";

export interface StoryCardProps {
  storyID: string;
  title: string;
  authorID: string;
  tags: Tag[];
  summary: string;
  rating: string;
  coverImg?: string;
  words: number;
  views: number;
  stars: number;
}

function TagDisp(props: Tag) {
  const tagColor = getTagColor(props.type);
  return (
    <Link
      href={"/tag/" + encodeURIComponent(props.name)}
      className={`inline-block rounded-sm mr-1 text-white px-2 hover:underline ${tagColor}`}
    >
      {props.name}
    </Link>
  );
}


export default function StoryCard(props: StoryCardProps) {
  const tagList = props.tags.map((tag: Tag, index: number) => (
    <TagDisp key={index} {...tag} />
  ));

  const [storyData, setStoryData] = useState<{
    authorName: string;
    createdAt: string;
    title: string;
    description: string;
    content: string;
    tags: Tag[];
    rating: string;
    words: number;
    views: number;
    stars: number;
  } | null>(null);

  useEffect(() => {
    async function fetchStoryDetails() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getPosts/${props.storyID}`
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
          // updatedAt: new Date(data.updatedAt).toLocaleDateString("en-US", {
          //   year: "numeric",
          //   month: "short",  
          //   day: "numeric",
          // }),
          title: data.title,
          description: data.description,
          content: data.content,
          tags: data.tags,
          rating: data.rating,
          words: data.words,
          views: data.views,
          stars: data.stars,
        });
      } catch (err) {
        console.error("Error fetching story details:", err);
      }
    }

    fetchStoryDetails();
  }, [props.storyID]);

  const wordCount = storyData?.content
    ? storyData.content.trim().split(/\s+/).length
    : 0;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div
            className={`inline-block rounded-sm w-8 h-8 text-xl text-center leading-8 text-white ${getRatingColor(
              storyData?.rating || props.rating
            )}`}
          >
            {storyData?.rating || props.rating}
          </div>
          <Link
            href={"/story/" + props.storyID}
            className="ml-3 font-bold text-xl hover:underline"
          >
            {storyData?.title || props.title}
          </Link>
          <span className="ml-2 text-lg text-gray-500">
            by
            <Link
              href={"/user/" + props.authorID}
              className="hover:underline ml-1"
            >
              {storyData?.authorName || "..."}
            </Link>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {storyData?.tags?.map((tag, i) => (
          <TagDisp key={i} {...tag} />
        ))}
        <hr className="my-3" />
        {storyData?.description}
      </CardContent>
      <CardFooter>
        <div className="rounded-sm bg-gray-100 w-full p-2 text-sm text-gray-800 flex flex-col gap-1">
          <div>
            {wordCount} words • {storyData?.views} views •{" "}
            <InteractiveStarRating rating={storyData?.stars || 0} /> stars
          </div>
          <div className="text-gray-500 text-xs">
            Created: {storyData?.createdAt}
            {/* • Updated: {storyData?.updatedAt} */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
