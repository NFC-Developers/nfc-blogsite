"use client";

import React from "react";
import { UserCheck, UserX } from "lucide-react";
import Image from "next/image";

interface ProfileProps {
  name: string;
  username: string;
  description: string;
  isOnline: boolean;
  memberSince: string;
  children?: React.ReactNode;
}

export default function Profile({
  name,
  username,
  description,
  isOnline,
  memberSince,
  children,
}: ProfileProps) {
  return (
    <div className="w-full mx-auto bg-gray-700 shadow-lg overflow-hidden">
      <div className="flex items-center gap-10 p-6 bg-gray-800">
        <Image
          src="/images/profile-placeholder.jpg"
          alt="Profile Picture"
          width={150}
          height={150}
          className="inline-block"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">{name}</h2>
          <p className="text-indigo-200">@{username}</p>
          <p className="mt-1 text-indigo-100">{description}</p>
          <div className="flex items-center gap-3 mt-2 text-sm text-indigo-200">
            <span className="flex items-center gap-1">
              {isOnline ? (
                <UserCheck className="w-4 h-4 text-green-400" />
              ) : (
                <UserX className="w-4 h-4 text-red-400" />
              )}
              {isOnline ? "Online" : "Offline"}
            </span>
            <span>Member since {memberSince}</span>
          </div>
        </div>
      </div>
      <div className="p-6 text-indigo-100">{children}</div>
    </div>
  );
}
