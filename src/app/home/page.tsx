"use client";

import { Announcement } from "@/components/shared/Announcement";
import Navbar from "@/components/shared/NavigationBar";
import { StoryList } from "@/components/shared/StoryList";
import { useHome } from "@/hooks/useHome";

export default function HomePage() {
  const { getTop, getNewest, getLatestUpdate } = useHome();

  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 p-8 sm:p-20 flex flex-col gap-8">
        <Announcement stories={getTop()}/>
        <div className="flex gap-4 sm:flex-row flex-col">
          <StoryList title="New Stories" stories={getNewest()} />
          <StoryList title="Latest Updates" stories={getLatestUpdate()} />
        </div>
      </main>
    </div>
  );
}
