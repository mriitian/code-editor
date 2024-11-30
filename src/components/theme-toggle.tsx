"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, themes } = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-10 h-10 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        aria-label="Toggle theme"
      >
        <svg
          className={`h-5 w-5 text-gray-700 dark:text-gray-200 transition-transform ${
            menuOpen ? "rotate-90" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          {menuOpen ? (
            // Moon icon when menu is open
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-7.364l-2.121 2.121M6.757 6.757L4.636 4.636m12.728 12.728l-2.121-2.121M6.757 17.243l-2.121-2.121"
            />
          ) : (
            // Sun icon by default
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 5a5 5 0 110 10 5 5 0 010-10z"
            />
          )}
        </svg>
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg z-10">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => {
                setTheme(theme);
                setMenuOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {capitalize(theme)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
