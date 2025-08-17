"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Users,
  Settings,
  HelpCircle,
  MessageCircle,
  UserPlus,
  LogIn,
} from "lucide-react";
import BrowseDialog from "./BrowseDialog";

export default function Navbar() {
  return (
    <header className="w-full">
      {/* Top Navbar */}
      <div className="w-full bg-gray-900 text-gray-200">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6 max-w-7xl">
          {/* Logo and Browse */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            </Link>
            <BrowseDialog />
          </div>

          {/* Search Bar */}
          <div className="flex flex-1 min-w-[150px] max-w-full items-center rounded bg-gray-800 overflow-hidden">
            <select className="bg-gray-800 py-2 px-2 text-gray-300 outline-none border-r border-gray-700">
              <option>Stories</option>
              <option>Users</option>
              <option>Groups</option>
            </select>
            <Input
              type="text"
              placeholder="Search..."
              className="flex-1 border-0 bg-gray-800 text-gray-200 placeholder-gray-400 focus-visible:ring-0 px-3 py-2 min-w-[100px]"
            />
            <button className="px-3 text-gray-300 hover:text-white">
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Menu */}
<div className="w-full bg-blue-800 text-gray-200">
  <div className="mx-auto flex items-center justify-between px-4 py-2 max-w-7xl flex-nowrap">

    {/* Left links */}
    <div className="flex items-center gap-2 flex-1 min-w-0">
      <Link href="/groups" className="flex items-center gap-1 text-[12px] sm:text-sm">
        <Users size={14} /> Groups
      </Link>
      <Link href="/settings" className="flex items-center gap-1 text-[12px] sm:text-sm">
        <Settings size={14} /> Settings
      </Link>
      <Link href="/help" className="flex items-center gap-1 text-[12px] sm:text-sm">
        <HelpCircle size={14} /> Help
      </Link>
      {/* <Link href="/chat" className="flex items-center gap-1 text-[12px] sm:text-sm">
        <MessageCircle size={14} /> Chat
      </Link> */}
    </div>

    {/* Right buttons */}
    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
      <Button
        asChild
        variant="outline"
        className="border-gray-600 text-gray-800 hover:bg-blue-50 px-1.5 py-0.5 text-[11px] sm:px-3 sm:py-1.5 sm:text-sm"
      >
        <Link href="/login" className="flex items-center gap-1">
          <LogIn size={14} /> Login
        </Link>
      </Button>

      <Button
        asChild
        className="bg-green-600 text-white hover:bg-blue-700 px-1.5 py-0.5 text-[11px] sm:px-3 sm:py-1.5 sm:text-sm"
      >
        <Link href="/register" className="flex items-center gap-1">
          <UserPlus size={14} /> Register
        </Link>
      </Button>
    </div>

  </div>
</div>


    </header>
  );
}
