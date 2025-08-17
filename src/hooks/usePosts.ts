import { useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Post {
  id: string | number;
  title: string;
  authorId: string;
  [key: string]: unknown; 
}

export function usePosts() {
  const [messages, setMessages] = useState<string[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/posts`);
      const data: Post[] = await res.json(); // type the fetched array
      setMessages(data.map((p) => `${p.id}: ${p.title} by ${p.authorId}`));
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setMessages([`Error fetching: ${err.message}`]);
      } else {
        setMessages([`Error fetching: Unknown error`]);
      }
    }
  };

  const createPost = async (
    title: string,
    content: string,
    authorId: string,
    email: string
  ) => {
    try {
      const res = await fetch(`${BACKEND_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, authorId, email }),
      });
      const post: Post = await res.json();
      setMessages((prev) => [...prev, `Post created: ${post.id}`]);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setMessages((prev) => [...prev, `Error: ${err.message}`]);
      } else {
        setMessages((prev) => [...prev, `Error: Unknown error`]);
      }
    }
  };

  return { messages, setMessages, fetchPosts, createPost };
}
