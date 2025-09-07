"use client";

import React from "react";
import {
  UserCheck,
  UserX,
  Book,
  User,
  Mail,
  AlertTriangle,
  FileText,
  Users,
} from "lucide-react";
import Image from "next/image";

interface ProfileProps {
  name: string;
  username: string;
  description: string;
  isOnline: boolean;
  memberSince: string;
  stats?: {
    stories?: number;
    blogs?: number;
    followers?: number;
    following?: number;
  };
  children?: React.ReactNode;
}

export default function Profile({
  name,
  username,
  description,
  isOnline,
  memberSince,
  stats = {},
  children,
}: ProfileProps) {
  const {
    stories = 0,
    blogs = 0,
    followers = 0,
    following = 0,
  } = stats;

  const menuItems = [
    { label: "Stories", value: stories, icon: <FileText className="w-4 h-4" /> },
    { label: "Blogs", value: blogs, icon: <Book className="w-4 h-4" /> },
    { label: "Followers", value: followers, icon: <Users className="w-4 h-4" /> },
    { label: "Following", value: following, icon: <User className="w-4 h-4" /> },
    { label: "Library", icon: <Book className="w-4 h-4" /> },
    { label: "About", icon: <User className="w-4 h-4" /> },
    { label: "Mail", icon: <Mail className="w-4 h-4" /> },
    { label: "Report", icon: <AlertTriangle className="w-4 h-4 text-orange-500" /> },
  ];

  return (
    <div className="relative w-full mx-auto bg-card shadow-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 p-6 bg-muted">
        <Image
          src="/images/profile-placeholder.jpg"
          alt="Profile Picture"
          width={150}
          height={150}
          className="inline-block border-4 border-border shadow-lg w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40"
        />
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-foreground">{name}</h2>
          <p className="text-primary text-lg">@{username}</p>
          <p className="mt-1 text-muted-foreground italic">{description}</p>

          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              {isOnline ? (
                <UserCheck className="w-4 h-4 text-green-500" />
              ) : (
                <UserX className="w-4 h-4 text-red-500" />
              )}
              {isOnline ? "Online" : "Offline"}
            </span>
            <span className="text-muted-foreground">| Member since {memberSince}</span>
          </div>
        </div>
      </div>

      {/* Give children extra bottom padding so the absolute stats bar doesn't overlap interactive elements like buttons */}
      <div className="p-6 text-foreground pb-0 sm:pb-20">{children}</div>

      {/* Stats bar: static on small screens (so it occupies flow and doesn't overlap), horizontal-scrollable if needed; absolute on larger screens */}
      <div className="static sm:absolute sm:bottom-0 sm:right-0 sm:left-0 bg-muted/80 backdrop-blur-sm h-auto sm:h-20">
        <div className="w-full flex overflow-x-auto sm:overflow-visible">
          {menuItems.map((item, index) => (
            <button
              key={index}
              type="button"
              aria-label={item.label}
              className="p-4 min-w-[110px] sm:flex-1 flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-all duration-200 group"
            >
              {item.value !== undefined && (
                <div className="text-xl font-bold text-foreground">{item.value}</div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground">
                {item.icon}
                <span>{item.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
