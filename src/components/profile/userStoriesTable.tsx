"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import StoryCardComponent from "@/components/shared/StoryCard";
import type { UserStoriesListProps } from "@/types/story";
import { useUserStories } from "@/hooks/useUserStories";

export default function UserStoriesList({ userId }: UserStoriesListProps) {
  const {
    stories,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useUserStories(userId, 10);

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mt-6 mr-4">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search stories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 bg-gray-700 text-white border-gray-600"
        />
      </div>

      <div className="flex flex-col gap-4">
        {stories.length > 0 ? (
          stories.map((story) => (
            <StoryCardComponent
              key={story.id}
              {...story}
            />
          ))
        ) : (
          <p className="text-gray-400">No stories found</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
