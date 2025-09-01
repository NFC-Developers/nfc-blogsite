"use client";

import Link from "next/link";
import { useAuthForm } from "@/hooks/useAuthForm";
import type { AuthFormProps } from "@/types/auth";
import Image from "next/image";

export default function ImprovedAuthForm({ mode }: AuthFormProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    errors,
    message,
    handleSubmit,
    handleGoogleLogin,
  } = useAuthForm(mode);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/home" className="inline-flex items-center gap-2">
            <Image
              src="/images/profile-placeholder.jpg"
              alt="FictionSite"
              width={40} 
              height={40} 
              className="rounded-full"
            />
            <span className="text-2xl font-bold text-gray-800">FictionSite</span>
          </Link>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            {mode === "login" ? "Sign In" : "Create Account"}
          </h1>
          <p className="text-gray-600 text-center mb-6 text-sm">
            {mode === "login"
              ? "Welcome back! Please sign in to your account."
              : "Join our community of storytellers and readers."}
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {mode === "register" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
              {errors.username && (
                <p className="text-red-600 text-sm mt-1">{errors.username}</p>
              )}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className={`w-full py-2.5 rounded-md font-medium transition-colors ${
              mode === "login"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-md bg-white hover:bg-gray-50 transition-colors"
          >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              width={18} 
              height={18}
              className="inline-block"
            />
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>

          <div className="text-center text-sm text-gray-600 mt-6">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign up here
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in here
                </Link>
              </>
            )}
          </div>

          {mode === "login" && (
            <div className="text-center mt-4">
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot your password?
              </Link>
            </div>
          )}

          {message && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700 text-center">
              {message}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <Link href="/home" className="hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
