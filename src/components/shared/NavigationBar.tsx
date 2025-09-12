"use client";

import Link from "next/link";
import {
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
} from "lucide-react";
import BrowseDialog from "./BrowseDialog";
import { useAuthForm } from "@/hooks/useAuthForm";
import Image from "next/image";

export default function Navbar() {
  const { user, loading, handleLogout } = useAuthForm();

  return (
    <header className="w-full bg-background border-b border-border shadow-sm">
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
            <span className="hidden md:inline-block font-semibold text-sm text-foreground">Story Hub</span>
          </Link>
          <BrowseDialog />
          <nav className="hidden sm:flex items-center gap-3 ml-2">
            <Link href="/groups" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <Users size={14} /> <span className="hidden sm:inline">Groups</span>
            </Link>
            <Link href="/settings" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <Settings size={14} /> <span className="hidden sm:inline">Settings</span>
            </Link>
            <Link href="/help" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <HelpCircle size={14} /> <span className="hidden sm:inline">Help</span>
            </Link>
          </nav>
        </div>

        {/* Center: Search */}
        <div className="flex-1 mx-4 min-w-0 hidden sm:block">
          <Link href="/search" className="block">
            <div className="group flex items-center rounded-full bg-muted overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-ring">
              <label className="sr-only" htmlFor="main-search">
                Search
              </label>
              <div className="flex items-center gap-2 pl-4 pr-2 text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground">
                <span>Search</span>
              </div>

              <div className="flex-1 px-4 py-2 text-muted-foreground">
                Search stories, posts, and users...
              </div>
              <div className="px-4 text-muted-foreground group-hover:text-foreground transition">
                <Search size={18} />
              </div>
            </div>
          </Link>
        </div>

        {/* Mobile search button - larger hit area on phones */}
        <div className="sm:hidden">
          <Link href="/search">
            <button aria-label="Open search" className="p-3 text-muted-foreground touch-target">
              <Search size={18} />
            </button>
          </Link>
        </div>

        {/* Right: Theme + Auth */}
  <div className="flex items-center gap-2 flex-shrink-0">
          <ThemeToggle />
          {loading ? (
            <div className="w-24 h-8 bg-muted animate-pulse rounded-full" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User size={16} />
                  <span className="hidden sm:inline max-w-24 truncate">
                    {user.displayName || user.email?.split("@")[0] || "User"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href={`/${user.displayName || user.email?.split("@")[0]}/my-profile`} className="flex items-center gap-2">
                    <User size={16} />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2">
                    <Settings size={16} />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/community" className="flex items-center gap-2">
                    <Users size={16} />
                    Community
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help" className="flex items-center gap-2">
                    <HelpCircle size={16} />
                    Help
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-destructive focus:text-destructive"
                >
                  <LogOut size={16} />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="touch-target">
                <Link href="/login" className="flex items-center gap-1 px-3 py-2 sm:px-2 sm:py-1">
                  <LogIn size={16} />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              </Button>
              <Button size="sm" asChild className="touch-target">
                <Link href="/register" className="flex items-center gap-1 px-3 py-2 sm:px-2 sm:py-1">
                  <UserPlus size={16} />
                  <span className="hidden sm:inline">Sign Up</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
