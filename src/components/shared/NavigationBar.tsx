"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Search,
  Users,
  Settings,
  HelpCircle,
  User,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import BrowseDialog from "./BrowseDialog";
import { useAuthForm } from "@/hooks/useAuthForm";
import Image from "next/image";

export default function Navbar() {
  const { user, loading, handleLogout } = useAuthForm();
  return (
    <header className="w-full">
      {/* Top Navigation - Dark Theme */}
      <div className="w-full bg-gray-800 text-gray-200">
        <div className="mx-auto flex items-center justify-between px-4 py-2 max-w-7xl">
          {/* Logo and Browse */}
          <div className="flex items-center gap-4">
            <Link href="/home" className="flex items-center gap-2">
              <Image
                src="/images/profile-placeholder.jpg"
                alt="Fiction Site"
                width={40} 
                height={40} 
                className="rounded-full"
              />
              <span className="text-xl font-bold text-white hidden sm:block">FictionSite</span>
            </Link>
            <BrowseDialog />
          </div>

          {/* Search Bar */}
          <div className="flex flex-1 max-w-lg items-center mx-4">
            <div className="flex w-full bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm">
              <select className="bg-white text-gray-700 px-3 py-2 text-sm border-r border-gray-300 outline-none focus:bg-gray-50">
                <option>Stories</option>
                <option>Users</option>
                <option>Groups</option>
              </select>
              <input
                type="text"
                placeholder="Search stories, users, or groups..."
                className="flex-1 px-3 py-2 text-gray-900 placeholder-gray-500 border-0 outline-none focus:ring-0"
              />
              <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 text-white transition-colors">
                <Search size={16} />
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3 text-sm">
            {loading ? (
              <div className="w-20 h-8 bg-gray-700 animate-pulse rounded" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-200 hover:text-white hover:bg-gray-700">
                    <User size={16} className="mr-2" />
                    {user.displayName || user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href={`/${user.displayName || user.email}/my-profile`}>
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${user.displayName || user.email}/settings`}>
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-1 rounded transition-colors"
                >
                  LOGIN
                </Link>
                <Link 
                  href="/register" 
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-1 rounded transition-colors"
                >
                  SIGN UP
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Blue Theme */}
      <div className="w-full bg-blue-600 text-white">
        <div className="mx-auto flex items-center justify-between px-4 py-2 max-w-7xl">
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/groups" className="flex items-center gap-1 hover:text-blue-200">
              <Users size={14} /> GROUPS
            </Link>
            <Link href="/settings" className="flex items-center gap-1 hover:text-blue-200">
              <Settings size={14} /> SETTINGS
            </Link>
            <Link href="/help" className="flex items-center gap-1 hover:text-blue-200">
              <HelpCircle size={14} /> HELP
            </Link>
            <Link href="/chat" className="flex items-center gap-1 hover:text-blue-200">
              CHAT
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
