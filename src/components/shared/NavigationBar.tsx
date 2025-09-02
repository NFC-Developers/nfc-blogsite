"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Input,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  ThemeToggle,
} from "@/components/ui";
import {
  Search,
  Users,
  Settings,
  HelpCircle,
  UserPlus,
  LogIn,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import BrowseDialog from "./BrowseDialog";
import { useAuthForm } from "@/hooks/useAuthForm";
import Image from "next/image";

export default function Navbar() {
  const { user, loading, handleLogout } = useAuthForm();
  const [searchCategory, setSearchCategory] = useState("Stories");

  return (
    <header className="w-full bg-gray-900 text-gray-200 shadow">
      <div className="mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 max-w-7xl">
        {/* Left: Logo + Browse + Nav links */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link href="/home" className="flex items-center gap-3">
            <Image
              src="/images/profile-placeholder.jpg"
              alt="LOGO"
              width={28}
              height={28}
              className="inline-block rounded-full"
            />
            <span className="hidden md:inline-block font-semibold text-sm text-gray-100">Story Hub</span>
          </Link>
          <BrowseDialog />
          <nav className="hidden sm:flex items-center gap-3 ml-2">
            <Link href="/groups" className="flex items-center gap-1 text-sm text-gray-200/90 hover:text-white">
              <Users size={14} /> <span className="hidden sm:inline">Groups</span>
            </Link>
            <Link href="/settings" className="flex items-center gap-1 text-sm text-gray-200/90 hover:text-white">
              <Settings size={14} /> <span className="hidden sm:inline">Settings</span>
            </Link>
            <Link href="/help" className="flex items-center gap-1 text-sm text-gray-200/90 hover:text-white">
              <HelpCircle size={14} /> <span className="hidden sm:inline">Help</span>
            </Link>
          </nav>
        </div>

        {/* Center: Search */}
        <div className="flex-1 mx-4 min-w-0 hidden sm:block">
          <div className="group flex items-center rounded-full bg-gray-800 overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500">
            <label className="sr-only" htmlFor="main-search">
              Search
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 pl-4 pr-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <span>{searchCategory}</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-32">
                <DropdownMenuItem onSelect={() => setSearchCategory("Stories")}>
                  Stories
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSearchCategory("Users")}>
                  Users
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSearchCategory("Groups")}>
                  Groups
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Input
              id="main-search"
              type="text"
              placeholder={`Search ${searchCategory.toLowerCase()}...`}
              className="bg-transparent border-0 focus:ring-0"
            />
            <button
              aria-label="Search"
              className="px-4 text-gray-400 group-hover:text-white transition"
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Mobile search button */}
        <div className="sm:hidden">
          <button aria-label="Open search" className="p-2 text-gray-200">
            <Search size={18} />
          </button>
        </div>

        {/* Right: Theme + Auth */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <ThemeToggle />
          {loading ? (
            <div className="w-24 h-8 bg-gray-300 animate-pulse rounded-full" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-gray-600 text-gray-800 bg-white hover:bg-gray-100"
                >
                  <User size={16} />
                  {user.displayName || user.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href={`/${user.displayName || user.email}/my-profile`}>My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/${user.displayName || user.email}/settings`}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="border-gray-600 text-gray-800 hover:bg-blue-50 px-3 py-1 text-sm">
                <Link href="/login" className="flex items-center gap-1"><LogIn size={14} /> Login</Link>
              </Button>
              <Button asChild className="bg-green-600 text-white hover:bg-blue-700 px-3 py-1 text-sm">
                <Link href="/register" className="flex items-center gap-1"><UserPlus size={14} /> Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
