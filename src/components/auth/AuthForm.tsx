"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthForm } from "@/hooks/useAuthForm";
import type { AuthMode } from "@/types/auth";
import { ThemeToggle } from "@/components/ui";

interface AuthFormProps {
  mode: AuthMode;
}

export function AuthForm({ mode }: AuthFormProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    errors,
    handleSubmit,
    handleGoogleLogin,
  } = useAuthForm(mode);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 dark:from-gray-900 dark:via-slate-900 dark:to-pink-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="relative mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
              {mode === "login" ? "Welcome Back" : "Join Us"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {mode === "login" 
                ? "Sign in to your account to continue" 
                : "Create your account to get started"
              }
            </p>
          </div>

          {/* Theme toggle positioned in top-right of the form header */}
          <div className="absolute right-0 top-0">
            <ThemeToggle />
          </div>
        </div>

        {/* Form Container */}
    {/* Make the card transparent to avoid visual conflict with the page background.
      Keep a subtle border and reduced shadow for separation, and increase width. */}
  <div className="auth-card bg-transparent border border-gray-800/20 dark:border-white/10 rounded-2xl shadow-sm p-8">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:outline-none transition-all"
              />
              {errors.email && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:outline-none transition-all"
              />
              {errors.password && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Username Field (Register only) */}
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:outline-none transition-all"
                />
                {errors.username && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.username}</p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-lg font-semibold transition-all duration-200 text-white bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 dark:focus:ring-offset-gray-800"
            >
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
              <span className="px-3 text-gray-500 dark:text-gray-400 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
            </div>

            {/* Google Sign-in Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 py-3 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width={20} 
                height={20}
                className="inline-block"
              />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Continue with Google
              </span>
            </button>
          </form>

          {/* Footer Links */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 underline transition-colors"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 underline transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

// named + default export to avoid import mismatch
export default AuthForm;
