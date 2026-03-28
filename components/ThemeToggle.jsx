"use client";

import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  // 1. On initial load, check the browser memory for a saved theme
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("stackpay-theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // 2. Whenever the theme state changes, update the HTML class AND save to memory
  useEffect(() => {
    if (!mounted) return; // Wait for the browser to take over from the server

    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("stackpay-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("stackpay-theme", "light");
    }
  }, [theme, mounted]);

  // Prevent UI flashing or hydration mismatch during SSR
  if (!mounted) return null;

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-full border border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <button 
        onClick={() => setTheme("light")} 
        className={`p-2 rounded-full transition-colors duration-300 ${
          theme === 'light' 
            ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-white shadow-sm' 
            : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
        }`}
      >
        <FiSun size={14}/>
      </button>
      <button 
        onClick={() => setTheme("dark")} 
        className={`p-2 rounded-full transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' 
            : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
        }`}
      >
        <FiMoon size={14}/>
      </button>
    </div>
  );
}
