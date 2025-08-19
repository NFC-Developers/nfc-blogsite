"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { StoryCard } from "@/components/shared/StoryCard";
import type { StoryCardProps } from "@/types/story";
import type { Tag } from "@/types/story"; 

// Define Story type for mock/fetching
type Story = {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
};

interface UserStoriesListProps {
  userId: string;
}

export default function UserStoriesList({ userId }: UserStoriesListProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const STORIES_PER_PAGE = 10;

  useEffect(() => {
    const mockStories: Story[] = Array.from({ length: 23 }, (_, i) => ({
      id: (i + 1).toString(),
      title: `Story ${i + 1}`,
      summary: `This is the summary for story ${i + 1}`,
      createdAt: "2025-08-01",
    }));
    setStories(mockStories);
  }, [userId]);

  const filteredStories = stories.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredStories.length / STORIES_PER_PAGE);
  const startIndex = (currentPage - 1) * STORIES_PER_PAGE;
  const paginatedStories = filteredStories.slice(
    startIndex,
    startIndex + STORIES_PER_PAGE
  );

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mt-6 mr-4">
      {/* Search bar */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search stories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 bg-gray-700 text-white border-gray-600"
        />
      </div>

      {/* Stories List: single column */}
      <div className="flex flex-col gap-4">
        {paginatedStories.length > 0 ? (
          paginatedStories.map((story) => (
            <StoryCard
              key={story.id}
              storyID={0}
              title={story.title}
              authorName=""
              authorID={0}
              tags={[]}
              summary={story.summary}
              rating=""
              coverImg=""
              words={0}
              views={0}
              stars={0}
            />
          ))
        ) : (
          <p className="text-gray-400">No stories found</p>
        )}
      </div>

      {/* Pagination Controls */}
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
