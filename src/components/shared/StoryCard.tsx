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
          return <Star key={i} size={16} className="text-orange-500" fill="currentColor" />;
        } else if (i + 0.5 === roundedStars) {
          return <StarHalf key={i} size={16} className="text-orange-500" fill="currentColor" />;
        } else {
          return <Star key={i} size={16} className="text-gray-300" />;
        }
      })}
    </div>
  );
}

export default function StoryCard(props: StoryCardProps) {
  const ratingColor = getRatingColor(props.rating);
  const tagList = props.tags.map((tag: Tag, index: number) => <TagDisp key={index} {...tag} />);
  const summary = props.summary.split("\n").map((str: string, index: number) => (
    <span key={index}>
      {str}
      <br />
    </span>
  ));

  const [authorName, setAuthorName] = useState<string>("..."); // placeholder

  useEffect(() => {
    async function fetchAuthor() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${props.authorID}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setAuthorName(data.name || "Unknown");
      } catch (err) {
        console.error("Error fetching author:", err);
        setAuthorName("Unknown");
      }
    }

    fetchAuthor();
  }, [props.authorID]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div
            className={`inline-block rounded-sm w-8 h-8 text-xl text-center leading-8 text-white ${ratingColor}`}
          >
            {props.rating}
          </div>
          <Link
            href={"/story/" + props.storyID}
            className="ml-3 font-bold text-xl hover:underline"
          >
            {props.title}
          </Link>
          <span className="ml-2 text-lg text-gray-500">
            by
            <Link href={"/user/" + props.authorID} className="hover:underline ml-1">
              {authorName}
            </Link>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tagList}
        <hr className="my-3" />
        {summary}
      </CardContent>
      <CardFooter>
        <div className="rounded-sm bg-gray-100 w-full p-2 text-sm text-gray-800">
          {props.words} words • {props.views} views • <StarRating stars={props.stars} /> {props.stars} stars
        </div>
      </CardFooter>
    </Card>
  );
}
