"use client";

import Navbar from "@/components/shared/NavigationBar";
import Link from "next/link";
import { usePosts } from "@/hooks/usePosts";

export default function HomePage() {
  const { messages, fetchPosts } = usePosts();

  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 p-8 sm:p-20 flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Welcome to NFC Blog</h1>

        <Link href="/member/add">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-max">
            Add a Post
          </button>
        </Link>

        <button
          onClick={fetchPosts}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-max"
        >
          Fetch Posts
        </button>

        <div className="flex flex-col gap-2 mt-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="bg-gray-100 p-2 rounded break-words text-red-500"
            >
              {msg}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
