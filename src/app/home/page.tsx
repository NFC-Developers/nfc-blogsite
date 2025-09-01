"use client";

import { Announcement } from "@/components/shared/Announcement";
import Navbar from "@/components/shared/NavigationBar";
import { StoryList } from "@/components/shared/StoryList";
import Sidebar from "@/components/shared/Sidebar";
import { useHome } from "@/hooks/useHome";
import Image from "next/image";

export default function HomePage() {
  const { getTop, getNewest, getLatestUpdate, loading } = useHome();

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-800">
      <Navbar />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-2xl font-bold flex flex-col items-center gap-4 py-12 text-white">
              Loading... Hold on
              <Image alt="nwero" src="/images/nwero.png" width={100} height={100}/>
            </div>
          ) : (
            <>
              {/* Featured Story Section */}
              <div className="mb-6">
                <Announcement stories={getTop()}/>
              </div>
              
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
                {/* Left Column - Story Lists */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <StoryList title="New Stories" stories={getNewest()} />
                    <StoryList title="Latest Updates" stories={getLatestUpdate()} />
                  </div>
                </div>
                
                {/* Right Column - Sidebar */}
                <Sidebar />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
