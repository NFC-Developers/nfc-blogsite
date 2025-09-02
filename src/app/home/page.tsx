"use client";

import { Announcement } from "@/components/shared/Announcement";
import Navbar from "@/components/shared/NavigationBar";
import Link from "next/link";
import { StoryList } from "@/components/shared/StoryList";
import { useHome } from "@/hooks/useHome";
import Image from "next/image";

export default function HomePage() {
  const { getTop, getNewest, getLatestUpdate, loading } = useHome();

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      <Navbar />

      <main className="flex-1 px-4 sm:px-8 lg:px-12 py-6 flex flex-col gap-8 max-w-7xl mx-auto w-full">
        {loading ? (
          <section aria-busy="true" aria-label="Loading stories" className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
            <div className="relative">
              <Image
                alt="nwero"
                src="/images/nwero.png"
                width={96}
                height={96}
                className="animate-pulse rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">Loading Stories...</h2>
              <p className="text-gray-600 dark:text-gray-400">Discovering amazing content for you</p>
            </div>
          </section>
        ) : (
          <>
            {/* Welcome Section */}
            <section className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Welcome to Your Story Hub
              </h1>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Discover hand-picked stories, connect with writers, and dive into worlds of imagination.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/stories"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition"
                >
                  Browse Stories
                </Link>

                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 transition"
                >
                  Write a Story
                </Link>
              </div>
            </section>

            {/* Featured Section */}
            <section className="mb-12">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/10 dark:border-gray-700/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                      <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full hidden sm:block" />
                      Featured Stories
                    </h2>
                    <Announcement stories={getTop()} />
                  </div>

                  <div className="hidden md:block">
                    <div className="rounded-xl overflow-hidden shadow-inner bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 p-4">
                      <Image src="/images/nwero.png" alt="featured" width={240} height={240} className="rounded-xl mx-auto" />
                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Editors' picks and highlighted writers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Story Lists Grid */}
            <section aria-label="Story lists">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 dark:border-gray-700/30">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full hidden sm:block" />
                    New Stories
                  </h2>
          <StoryList title="New Stories" stories={getNewest()} />
                </div>

                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 dark:border-gray-700/30">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full hidden sm:block" />
                    Latest Updates
                  </h2>
                  <StoryList title="Latest Updates" stories={getLatestUpdate()} />
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
