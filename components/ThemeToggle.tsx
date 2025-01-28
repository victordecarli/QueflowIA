'use client';

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 transition-opacity hover:opacity-80"
      aria-label={`Switch theme`}
    >
      <div className="relative w-5 h-5">
        <Sun className="absolute inset-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-900 dark:text-gray-400 w-5 h-5" strokeWidth={2.5} />
        <Moon className="absolute inset-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-900 dark:text-gray-400 w-5 h-5" strokeWidth={2.5} />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
