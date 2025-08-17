"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import BrowseDialog from "./BrowseDialog";

export default function Navbar() {
  return (
    <header className="w-full">
      <div className="w-full border-b bg-gray-900 text-gray-200">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            </Link>
            <BrowseDialog />
          </div>

          <div className="flex w-full items-center rounded bg-gray-800 sm:w-auto">
            <select className="hidden bg-gray-800 px-2 text-gray-300 outline-none sm:block border-r border-gray-700">
              <option>Stories</option>
              <option>Users</option>
              <option>Groups</option>
            </select>
            <Input
              type="text"
              placeholder="Search..."
              className="w-full border-0 bg-gray-800 text-gray-200 placeholder-gray-400 focus-visible:ring-0 sm:w-56"
            />
            <button className="px-3 text-gray-300 hover:text-white">
              <Search size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full bg-blue-800 text-gray-200">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-2 text-sm sm:px-6">
          <Link href="/groups" className="hover:underline">Groups</Link>
          <Link href="/settings" className="hover:underline">Settings</Link>
          <Link href="/help" className="hover:underline">Help</Link>
          <Link href="/chat" className="hover:underline">Chat</Link>
        </div>
      </div>
    </header>
  );
}
