"use client";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import PostForm from "@/components/member/add/saveStoryForm";
import Navbar from "@/components/shared/NavigationBar";

export default function AddPostPage() {
  const [user, setUser] = useState<User | null>(null);
  const { messages, createPost } = usePosts();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => setUser(firebaseUser));
    return () => unsub();
  }, []);

  const handlePostSubmit = async (title: string, content: string) => {
    if (!user) return;
    await createPost(title, content, user.uid, user.email || `${user.uid}@example.com`);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-8 sm:p-20 gap-8 bg-indigo-50">
        {!user ? (
          <p className="text-red-500">⚠️ You must log in first to create posts.</p>
        ) : (
          <PostForm onSubmit={handlePostSubmit} />
        )}

        <div className="flex flex-col gap-2 mt-4 w-full max-w-[1000px]">
          {messages.map((msg, i) => (
            <div key={i} className="bg-gray-100 p-2 rounded break-words text-red-500">
              {msg}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
