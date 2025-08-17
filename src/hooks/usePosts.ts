import { useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function usePosts() {
  const [messages, setMessages] = useState<string[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/posts`);
      const data = await res.json();
      setMessages(data.map((p: any) => `${p.id}: ${p.title} by ${p.authorId}`));
    } catch (err) {
      console.error(err);
      setMessages([`Error fetching: ${err}`]);
    }
  };

  const createPost = async (
    title: string,
    content: string,
    authorId: string,
    email: string,
  ) => {
    try {
      const res = await fetch(`${BACKEND_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, authorId, email }),
      });
      const post = await res.json();
      setMessages((prev) => [...prev, `Post created: ${post.id}`]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, `Error: ${err}`]);
    }
  };

  return { messages, setMessages, fetchPosts, createPost };
}
