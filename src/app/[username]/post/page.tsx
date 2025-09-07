"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "@/components/shared/NavigationBar";
import PostForm from "@/components/profile/add/saveStoryForm";
import { usePosts } from "@/hooks/usePosts";
import { Rating ,Tag} from "@/types/post";


export default function AddPostPage() {
  const [user, setUser] = useState<User | null>(null);
  const { messages, createPost } = usePosts();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const handlePostSubmit = async (title: string, content: string, selectedTags: Tag[], rating: Rating, isExplicit: boolean, description?: string) => {
    if (!user) return;
    await createPost(title, content, selectedTags, rating, isExplicit, description);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 dark:from-gray-900 dark:via-slate-900 dark:to-pink-950">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-8 sm:p-20 gap-8">
        {!user ? (
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-destructive">⚠️ You must log in first to create posts.</p>
          </div>
        ) : (
          <PostForm onSubmit={handlePostSubmit} />
        )}

        <div className="flex flex-col gap-2 mt-4 w-full max-w-[1000px]">
          {messages.map((msg, i) => (
            <div key={i} className="bg-muted p-2 rounded break-words text-destructive">{msg}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
