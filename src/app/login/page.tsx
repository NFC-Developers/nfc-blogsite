"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      setMessage(`Logged in as ${userCred.user.uid}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(`Login failed: ${err.message}`);
      } else {
        setMessage("Login failed: Unknown error");
      }
    }
  };

  const handleSignup = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      setMessage(`User created with UID: ${userCred.user.uid}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(`Signup failed: ${err.message}`);
      } else {
        setMessage("Signup failed: Unknown error");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4 p-8 border rounded shadow max-w-sm w-full">
        <h1 className="text-xl font-bold">Firebase Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
        <button
          onClick={handleSignup}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Signup
        </button>
        {message && <div className="text-sm text-gray-600">{message}</div>}
      </div>
    </div>
  );
}
