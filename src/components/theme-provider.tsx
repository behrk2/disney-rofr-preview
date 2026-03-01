"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system" | "mouse";
type ResolvedTheme = "light" | "dark" | "mouse";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const STORAGE_KEY = "theme";

function systemPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system" || stored === "mouse") return stored;
  return "system";
}

function applyTheme(theme: Theme): ResolvedTheme {
  const root = document.documentElement;
  const resolved: ResolvedTheme =
    theme === "system" ? (systemPrefersDark() ? "dark" : "light") : theme;
  root.classList.remove("dark", "mouse");
  if (resolved === "dark") root.classList.add("dark");
  if (resolved === "mouse") root.classList.add("mouse");
  return resolved;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme());
  const [systemDark, setSystemDark] = useState<boolean>(() => systemPrefersDark());
  const resolvedTheme: ResolvedTheme =
    theme === "system" ? (systemDark ? "dark" : "light") : theme;

  useEffect(() => {
    applyTheme(theme);
  }, [theme, systemDark]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      setSystemDark(e.matches);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (next: Theme) => {
        setThemeState(next);
        window.localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
      },
    }),
    [theme, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
