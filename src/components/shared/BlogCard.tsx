"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import Link from "next/link";
import { BlogCardProp } from "@/types/blog";

export default function BlogCard(props: BlogCardProp & { fetchData?: boolean }) {
  const [blogCardData, setBlogPostData] = useState<BlogCardProp | null>(null);

  useEffect(() => {
    async function fetchBlogPostDetails() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${props.id}`
        );
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();

        setBlogPostData({
          id: data.id,
          author: {
            displayName: data.author.name,
            firebaseUid: data.author.firebaseUid
          },
          createdAt: new Date(data.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
          }),
          title: data.title,
          content: data.content,
          views: data.views
        });
      } catch (err) {
        console.error("Error fetching story details:", err);
      }
    }

    if (props.fetchData || props.fetchData === undefined) fetchBlogPostDetails();
  }, [props.fetchData, props.id]);

  const shortened = (blogCardData?.content || props.content).length > 400;
  const shownContent = (blogCardData?.content || props.content).slice(0,400) + (shortened ? "..." : "");
  const blogURL = `/blog/${blogCardData?.id || props.id}`;

  return (
    <Card className={`w-full gap-1`}>
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <a
            href={blogURL}
            className="text-ellipsis font-bold hover:underline text-xl"
          >
            {blogCardData?.title || props.title}
          </a>
          <div className="text-gray-500">
            {blogCardData?.createdAt || props.createdAt}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-evenly gap-4 pb-4">
        {shownContent}
        {shortened ? <a className="text-blue-600 hover:underline" href="blogURL">Read More</a> : <></>}
      </CardContent>

      <CardFooter>
        <div className="rounded-sm bg-gray-100 w-full p-2 text-sm text-gray-800 flex gap-1 justify-between">
          <div className="flex items-center gap-2">
            <Link
              href={"/user/" + props.author.firebaseUid}
              className="hover:underline font-bold"
            >
              {blogCardData?.author.displayName || props.author.displayName || "..."}
            </Link> • {blogCardData?.views || props.views} views
          </div>
          <a 
            href={`/report`} // placeholder
            className="hover:bg-red-400 rounded-sm p-1 font-bold"
          >Report</a>
        </div>
      </CardFooter>
    </Card>
  );
}
