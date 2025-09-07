"use client";

import { useState, useEffect } from "react";
import type { Story } from "@/types/story";
import { useAuthForm } from "@/hooks/useAuthForm";

export function useUserStories(userId: string, storiesPerPage = 10) {
  const { user } = useAuthForm(); // Firebase user
  const [stories, setStories] = useState<Story[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Base URL for API (use NEXT_PUBLIC_BACKEND_URL for external backend, otherwise call internal Next API)
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!userId) return;

    const fetchUserPosts = async () => {
      try {
        const token = user ? await user.getIdToken() : null;

        // compute derived values inside the effect so linting of hook deps is satisfied
        const apiBase = (BACKEND_URL || "").replace(/\/$/, "");
        const isLocalBackend = apiBase === "http://localhost:3000" || apiBase === "http://127.0.0.1:3000";

        // Prefer external backend if configured, otherwise hit our internal Next API at /api/user/posts
        const endpoint = apiBase && !isLocalBackend ? `${apiBase}/user/posts/${userId}` : `/api/user/posts/${userId}`;
        const res = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch user posts", res.status);
          setStories([]); // Clear on failure
          return;
        }

        const data: Story[] = await res.json();
        setStories(data);
      } catch (err) {
        console.error("Error fetching user posts:", err);
        setStories([]);
      }
    };

    fetchUserPosts();
  }, [userId, user, BACKEND_URL]);

  // Filtering
  const filteredStories = stories.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
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
