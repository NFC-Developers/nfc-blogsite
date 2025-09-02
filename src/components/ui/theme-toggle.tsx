"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const THEME_KEY = "site-theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after hydration
  useEffect(() => {
    setMounted(true);
    
    // Initialize theme after mount
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === "dark" || stored === "light") {
        setTheme(stored);
        return;
      }
    } catch {
      /* ignore */
    }
    
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    try {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem(THEME_KEY, "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem(THEME_KEY, "light");
      }
    } catch {
      /* ignore */
    }
  }, [theme, mounted]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Don't render until after hydration to prevent mismatch
  if (!mounted) {
    return (
      <div className="inline-flex items-center justify-center rounded-md p-2 w-9 h-9">
        {/* Empty placeholder with same dimensions */}
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={toggle}
      className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
}
