"use client";

import Link from "next/link";
import { useAuthForm } from "@/hooks/useAuthForm";
import type { AuthFormProps } from "@/types/auth";
import Image from "next/image";

export default function AuthForm({ mode }: AuthFormProps) {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 via-rose-400 to-indigo-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/90 backdrop-blur-lg shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h1>
        <p className="text-gray-600 text-center mt-2 text-sm">
          {mode === "login"
            ? "Log in to share and explore stories"
            : "Create an account to start sharing your ideas"}
        </p>

        {/* Email */}
        <div className="mt-6">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mt-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {mode === "register" && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            {errors.username && (
              <p className="text-red-600 text-sm mt-1">{errors.username}</p>
            )}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className={`w-full mt-6 py-3 rounded-lg font-semibold transition text-white ${
            mode === "login"
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {mode === "login" ? "Login" : "Register"}
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg bg-white hover:bg-gray-50 transition"
        >
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={20} 
            height={20}
            className="inline-block"
          />
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-indigo-600 hover:underline"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
            </>
          )}
        </p>

        {message && (
          <div className="mt-3 text-sm text-center text-gray-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
