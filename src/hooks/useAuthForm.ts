"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export function useAuth(mode?: "login" | "register") {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔹 Track current user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // 🔹 Login / Register handler
  const handleSubmit = async () => {
    if (!mode) return;
    const result = schema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.issues.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    try {
      if (mode === "login") {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        setMessage(`Logged in as ${userCred.user.email}`);
        router.push("/home");
      } else {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        setMessage(`User created: ${userCred.user.email}`);
        router.push("/home");
      }
    } catch (err: unknown) {
      handleFirebaseError(err);
    }
  };

  // 🔹 Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(auth, provider);
      setMessage(`Logged in as ${userCred.user.displayName || userCred.user.email}`);
      router.push("/home");
    } catch (err: unknown) {
      setMessage(getErrorMessage(err, "Google login failed"));
    }
  };

  // 🔹 Logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/home");
  };

  // 🔹 Error handling helper
  const handleFirebaseError = (err: unknown) => {
    const fieldErrors: { email?: string; password?: string } = {};
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      typeof (err as { code: unknown }).code === "string"
    ) {
      const code = (err as { code: string }).code;
      if (code === "auth/user-not-found") fieldErrors.email = "Account does not exist";
      else if (code === "auth/wrong-password") fieldErrors.password = "Incorrect password";
      else if (code === "auth/email-already-in-use") fieldErrors.email = "Email is already registered";
      else setMessage(getErrorMessage(err, "An unknown error occurred"));
    } else {
      setMessage("An unknown error occurred");
    }
    setErrors(fieldErrors);
  };

  // 🔹 Safe message getter
  const getErrorMessage = (err: unknown, fallback: string) =>
    err && typeof err === "object" && "message" in err && typeof (err as { message: unknown }).message === "string"
      ? (err as { message: string }).message
      : fallback;

  return {
    // state
    email,
    setEmail,
    password,
    setPassword,
    errors,
    message,
    user,
    loading,

    // actions
    handleSubmit,
    handleGoogleLogin,
    handleLogout,
  };
}
