"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition-all duration-300 hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}