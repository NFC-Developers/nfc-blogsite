"use client";

import { Announcement } from "@/components/shared/Announcement";
import BlogCard from "@/components/shared/BlogCard";
import Navbar from "@/components/shared/NavigationBar";
import { StoryList } from "@/components/shared/StoryList";
import { useHome } from "@/hooks/useHome";

export default function HomePage() {
  const { getTop, getNewest, getLatestUpdate } = useHome();

  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 p-8 sm:p-20 flex flex-col gap-8">
        <BlogCard id={"1234"} title={"Test Title"} createdAt={"Aug 22, 2025, 3:27 PM"} views={0} author={{
          displayName: "TheTastyPi",
          firebaseUid: "3414134314"
        }} content={"This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee This is a blog. Yippee "} fetchData={false} />
        <Announcement stories={getTop()}/>
        <div className="flex gap-4 sm:flex-row flex-col">
          <StoryList title="New Stories" stories={getNewest()} />
          <StoryList title="Latest Updates" stories={getLatestUpdate()} />
        </div>
      </main>
    </div>
  );
}
