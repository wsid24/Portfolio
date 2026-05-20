"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
    theme: Theme;
    toggle: () => void;
    setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    // Mirror what the no-FOUC inline script in layout.tsx already wrote to <html>
    const [theme, setThemeState] = useState<Theme>("dark");

    useEffect(() => {
        const stored = (typeof window !== "undefined"
            ? (localStorage.getItem("theme") as Theme | null)
            : null) || "dark";
        setThemeState(stored);
    }, []);

    const applyTheme = (t: Theme) => {
        const root = document.documentElement;
        if (t === "dark") {
            root.classList.add("dark");
            root.dataset.theme = "dark";
            root.style.colorScheme = "dark";
        } else {
            root.classList.remove("dark");
            root.dataset.theme = "light";
            root.style.colorScheme = "light";
        }
    };

    const setTheme = (t: Theme) => {
        setThemeState(t);
        localStorage.setItem("theme", t);
        applyTheme(t);
    };

    const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

    // Keep DOM in sync when state changes for any reason
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        // Fallback so a stray useTheme() outside the provider doesn't crash SSR
        return {
            theme: "dark",
            toggle: () => { },
            setTheme: () => { },
        };
    }
    return ctx;
}
