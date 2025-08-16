"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-purple-600 shadow-sm text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left section: Logo + Navigation */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            <span className="font-bold text-lg">MyApp</span>
          </Link>

          {/* Navigation links */}
          <nav className="flex items-center space-x-3 text-sm font-medium">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>|</span>
            <Link href="/settings" className="hover:underline">
              Settings
            </Link>
            <span>|</span>
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-6">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full text-black"
          />
        </div>

        {/* Login Button */}
        <div>
          <Button asChild className="bg-white text-purple-600 hover:bg-gray-100">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
