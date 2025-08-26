"use client";

import { Announcement } from "@/components/shared/Announcement";
import BlogCard from "@/components/shared/BlogCard";
import Navbar from "@/components/shared/NavigationBar";
import { StoryList } from "@/components/shared/StoryList";
import { useHome } from "@/hooks/useHome";
import Image from "next/image";

export default function HomePage() {
  const { getTop, getNewest, getLatestUpdate, loading } = useHome();

  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 p-8 sm:p-20 flex flex-col gap-8">
        {loading ? <div className="text-2xl font-bold flex flex-col items-center gap-4">
          Loading... Hold on
          <Image alt="nwero" src="/images/nwero.png" width={100} height={100}/>
        </div> :
        <><Announcement stories={getTop()}/>
        <div className="flex gap-4 sm:flex-row flex-col">
          <StoryList title="New Stories" stories={getNewest()} />
          <StoryList title="Latest Updates" stories={getLatestUpdate()} />
        </div></>}
      </main>
    </div>
  );
}
