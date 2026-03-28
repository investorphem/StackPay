"use client";
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  return (
    <div className="flex bg-gray-900 p-1 rounded-full border border-gray-800">
      <button onClick={() => setTheme("light")} className={`p-2 rounded-full ${theme === 'light' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-gray-300'}`}><FiSun size={14}/></button>
      <button onClick={() => setTheme("dark")} className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-gray-300'}`}><FiMoon size={14}/></button>
    </div>
  );
}
