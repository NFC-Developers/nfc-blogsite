"use client";

import React from "react";
import Profile from "@/components/profile/profileHeader";
import Navbar from "@/components/shared/NavigationBar";
import Link from "next/link";
import { Button, ThemeToggle } from "@/components/ui";
import { useAuthForm } from "@/hooks/useAuthForm";
import UserStoriesList from "@/components/profile/userStoriesTable"; 

export default function MemberPage() {
  const { user, loading } = useAuthForm();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 flex flex-col justify-center items-center px-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Authentication Required</h1>
            <p className="text-gray-600 dark:text-gray-400">You must be logged in to view your profile.</p>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const username = user.displayName || user.email?.split("@")[0] || "unknown";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header Card */}
        <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl mb-8 overflow-hidden">
          <Profile
            name={user.displayName || "Anonymous"}
            username={username}
            description="A writer or such."
            isOnline={true}
            memberSince={user.metadata.creationTime || "Unknown"}
          />

          {/* Button below the profile card in the normal flow so it cannot be overlapped */}
          <div className="p-6 flex justify-start">
            <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 transform hover:scale-[1.02] transition-all duration-200">
              <Link href={`/${username}/post`} className="inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Create New Post
              </Link>
            </Button>
          </div>
        </div>

        {/* Stories Section */}
        <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Your Stories
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and view all your published stories</p>
          </div>
          
          <UserStoriesList userId={user.uid} />
        </div>
      </div>
    </div>
  );
}
