"use client";

import React from "react";
import { Input } from "@/components/ui";
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
    <div className="p-4 sm:p-6">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search stories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3"
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
          <p className="text-muted-foreground">No stories found</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded text-sm ${
                page === currentPage
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
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
