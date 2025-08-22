"use client";

import React from "react";
import Profile from "@/components/profile/profileHeader";
import Navbar from "@/components/shared/NavigationBar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthForm } from "@/hooks/useAuthForm";
import UserStoriesList from "@/components/profile/userStoriesTable"; 
// import type { UserStoriesListProps } from "@/types/story";

export default function MemberPage() {
  const { user, loading } = useAuthForm();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-white gap-4">
        <p>You must be logged in to view this page.</p>
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const username = user.displayName || user.email?.split("@")[0] || "unknown";

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gray-900">
        <Profile
          name={user.displayName || "Anonymous"}
          username={username}
          description="A writer or such."
          isOnline={true}
          memberSince={user.metadata.creationTime || "Unknown"}
        >
        </Profile>
        <div className="space-y-4 text-white px-4 py-6">
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Link href={`/${username}/post`}>Add a Post</Link>
        </Button>
      </div>
        
        <UserStoriesList userId={user.uid} />
      </div>
    </>
  );
}
