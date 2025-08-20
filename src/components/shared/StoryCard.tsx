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
import { Star, StarHalf } from "lucide-react";
import { getRatingColor, getTagColor } from "@/hooks/useStoryCard";
import type { Tag } from "@/types/story";

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

function StarRating({ stars }: { stars: number }) {
  const totalStars = 5;
  const roundedStars = Math.round(stars * 2) / 2;

  return (
    <div className="inline-flex align-text-top gap-0.5">
      {Array.from({ length: totalStars }).map((_, i: number) => {
        if (i + 1 <= roundedStars) {
          return (
            <Star
              key={i}
              size={16}
              className="text-orange-500"
              fill="currentColor"
            />
          );
        } else if (i + 0.5 === roundedStars) {
          return (
            <StarHalf
              key={i}
              size={16}
              className="text-orange-500"
              fill="currentColor"
            />
          );
        } else {
          return <Star key={i} size={16} className="text-gray-300" />;
        }
      })}
    </div>
  );
}

export default function StoryCard(props: StoryCardProps) {
  const ratingColor = getRatingColor(props.rating);
  const tagList = props.tags.map((tag: Tag, index: number) => (
    <TagDisp key={index} {...tag} />
  ));
  const summary = props.summary
    .split("\n")
    .map((str: string, index: number) => (
      <span key={index}>
        {str}
        <br />
      </span>
    ));

  const [storyData, setStoryData] = useState<{
    authorName: string;
    createdAt: string;
    // updatedAt: string;
    title: string;
    description: string;
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
            {storyData?.words} words • {storyData?.views} views •{" "}
            <StarRating stars={storyData?.stars || 0} /> {storyData?.stars}{" "}
            stars
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
