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
  updateProfile,
  User,
  getIdToken,
} from "firebase/auth";
import { z } from "zod";
import type { AuthErrors, UseAuthFormReturn, AuthMode } from "@/types/auth";

const baseSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const registerSchema = baseSchema.extend({
  username: z.string().min(3, "Username must be at least 3 characters long"),
});

export function useAuthForm(mode?: AuthMode): UseAuthFormReturn {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState<AuthErrors>({});
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Listen to Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Pre-register user in backend
  const preRegisterUser = async (firebaseUser: User) => {
    try {
      const idToken = await getIdToken(firebaseUser, true);
      await fetch(`${BACKEND_URL}/users/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          name: firebaseUser.displayName || username || "Anonymous",
          description: "",
          birthdate: null,
        }),
      });
    } catch (err) {
      console.error("Failed to pre-register user:", err);
    }
  };

  const handleSubmit = async () => {
    if (!mode) return;
    const schemaToUse = mode === "register" ? registerSchema : baseSchema;
    const result = schemaToUse.safeParse({ email, password, username });

    if (!result.success) {
      const fieldErrors: AuthErrors = {};
      result.error.issues.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
        if (err.path[0] === "username") fieldErrors.username = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    try {
      if (mode === "login") {
        const userCred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setMessage(`Logged in as ${userCred.user.email}`);

        await preRegisterUser(userCred.user); // ✅ pre-register
        router.push("/home");
      } else {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (username) {
          await updateProfile(userCred.user, { displayName: username });
        }
        setMessage(`User created: ${username || userCred.user.email}`);

        await preRegisterUser(userCred.user); // ✅ pre-register
        router.push("/home");
      }
    } catch (err: unknown) {
      handleFirebaseError(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(auth, provider);
      setMessage(
        `Logged in as ${userCred.user.displayName || userCred.user.email}`
      );

      await preRegisterUser(userCred.user); // ✅ pre-register
      router.push("/home");
    } catch (err: unknown) {
      if (process.env.NODE_ENV === "development") {
        console.error("Google login error:", err);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/home");
  };

  const handleFirebaseError = (err: unknown) => {
    const fieldErrors: AuthErrors = {};
    if (typeof err === "object" && err !== null && "code" in err) {
      const code = (err as { code: string }).code;
      if (code === "auth/user-not-found")
        fieldErrors.email = "Account does not exist";
      else if (code === "auth/wrong-password")
        fieldErrors.password = "Incorrect password";
      else if (code === "auth/email-already-in-use")
        fieldErrors.email = "Email is already registered";
      else setMessage(getErrorMessage(err, "An unknown error occurred"));
    } else {
      setMessage("An unknown error occurred");
    }
    setErrors(fieldErrors);
  };

  const getErrorMessage = (err: unknown, fallback: string) =>
    err &&
    typeof err === "object" &&
    "message" in err &&
    typeof (err as { message: unknown }).message === "string"
      ? (err as { message: string }).message
      : fallback;

  return {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    errors,
    message,
    user,
    loading,
    handleSubmit,
    handleGoogleLogin,
    handleLogout,
  };
}
