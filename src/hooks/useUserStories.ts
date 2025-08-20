"use client";

import { useState, useEffect } from "react";
import type { Story } from "@/types/story";
import { useAuthForm } from "@/hooks/useAuthForm";

export function useUserStories(userId: string, storiesPerPage = 10) {
  const { user } = useAuthForm();
  const [stories, setStories] = useState<Story[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!userId) return; 

    async function fetchUserPosts() {
      try {
        const token = user ? await user.getIdToken() : null;

        const res = await fetch(`${BACKEND_URL}/user/posts/fetch/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch user posts", res.status);
          return;
        }

        const data: Story[] = await res.json();
        setStories(data);
      } catch (err) {
        console.error("Error fetching user posts:", err);
      }
    }

    fetchUserPosts();
  }, [userId, user, BACKEND_URL]);

  const filteredStories = stories.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStories.length / storiesPerPage);
  const startIndex = (currentPage - 1) * storiesPerPage;
  const paginatedStories = filteredStories.slice(
    startIndex,
    startIndex + storiesPerPage
  );

  return {
    stories: paginatedStories,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
  };
}
