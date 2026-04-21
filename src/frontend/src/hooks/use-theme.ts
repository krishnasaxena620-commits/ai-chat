import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function getInitialTheme(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark") return true;
    if (stored === "light") return false;
  } catch {
    // localStorage unavailable
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(isDark: boolean) {
  const root = document.documentElement;
  if (isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export interface UseThemeReturn {
  isDark: boolean;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const initial = getInitialTheme();
    applyTheme(initial);
    return initial;
  });

  // Sync with system preference changes (only when user hasn't set a preference)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          setIsDark(e.matches);
          applyTheme(e.matches);
        }
      } catch {
        // ignore
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return { isDark, toggleTheme };
}
