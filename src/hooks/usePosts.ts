import { useState } from "react";
import { Post, Tag, Rating } from "@/types/post";
import { auth } from "@/lib/firebase";
import { getIdToken } from "firebase/auth";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const apiBase = (BACKEND_URL || "").replace(/\/$/, "");
const isLocalBackend = apiBase === "http://localhost:3000" || apiBase === "http://127.0.0.1:3000";

export function usePosts() {
  const [messages, setMessages] = useState<string[]>([]);

  const fetchPosts = async () => {
    try {
  const endpoint = apiBase && !isLocalBackend ? `${apiBase}/user/posts` : `/api/user/posts`;
  const res = await fetch(endpoint);
      if (!res.ok) throw new Error(res.statusText);
      const data: Post[] = await res.json();
      setMessages(data.map(p => JSON.stringify(p)));
    } catch (err: unknown) {
      setMessages([`Error fetching: ${err instanceof Error ? err.message : "Unknown error"}`]);
    }
  };

  const createPost = async (
    title: string,
    content: string,
    selectedTags: Tag[],
    rating: Rating = "GENERAL",
    isExplicit: boolean = false,
    description: string = ""
  ) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not signed in");

      const idToken = await getIdToken(user, true);

      // Only send valid tags
      const tags = selectedTags
        .filter(tag => tag.name && tag.categoryName)
        .map(tag => ({ name: tag.name, categoryName: tag.categoryName }));

      const payload = { title, content, description, tags, rating, isExplicit };

      const res = await fetch(`${BACKEND_URL}/user/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(`Failed to create post: ${res.statusText} - ${errMsg}`);
      }

      const post: Post = await res.json();
      setMessages(prev => [...prev, `Post created: ${post.id}`]);
    } catch (err: unknown) {
      setMessages(prev => [
        ...prev,
        `Error: ${err instanceof Error ? err.message : "Unknown error"}`,
      ]);
    }
  };

  return { messages, setMessages, fetchPosts, createPost };
}
