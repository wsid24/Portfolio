"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowDown, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";

const RESUME_URL = "https://drive.google.com/file/d/1Qn3oQXuYsL7u7ZG2ssfqYMLw17Q5lvVi/view?usp=sharing";

const navLinks = [
    { id: "about", label: "About" },
    { id: "profiles", label: "CP" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "achievements", label: "Awards" },
];

export default function Navbar() {
    const [active, setActive] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggle } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 24);
            const ids = ["home", ...navLinks.map((l) => l.id)];
            for (let i = ids.length - 1; i >= 0; i--) {
                const el = document.getElementById(ids[i]);
                if (el && el.getBoundingClientRect().top <= 180) {
                    setActive(ids[i]);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const goTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "border-b border-black/[0.06] bg-[var(--bg)]/85 backdrop-blur-xl dark:border-white/[0.06]"
                    : "border-b border-transparent bg-transparent"
            }`}
        >
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Wordmark */}
                <button
                    onClick={() => goTo("home")}
                    className="group flex items-center gap-2 transition-opacity hover:opacity-80"
                    aria-label="Home"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="font-heading text-xl tracking-tight text-[var(--fg)]">
                        Portfolio
                    </span>
                </button>

                {/* Center nav — hidden on mobile */}
                <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
                    {navLinks.map((link) => {
                        const isActive = active === link.id;
                        return (
                            <li key={link.id}>
                                <button
                                    onClick={() => goTo(link.id)}
                                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                                        isActive
                                            ? "text-[var(--fg)]"
                                            : "text-[var(--fg-faint)] hover:text-[var(--fg)]"
                                    }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-active"
                                            className="absolute inset-0 -z-10 rounded-full bg-black/[0.06] dark:bg-white/[0.08]"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>

                {/* Right cluster: theme + CTA */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggle}
                        aria-label="Toggle theme"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/40 text-[var(--fg)] backdrop-blur-md transition-all hover:scale-105 hover:bg-white/60 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
                    >
                        {theme === "dark" ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
                    </button>

                    <a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full bg-[var(--fg)] px-4 py-2.5 text-sm font-medium text-[var(--bg)] transition-all hover:scale-[1.03] sm:px-5"
                    >
                        <span className="hidden sm:inline">Download CV</span>
                        <span className="sm:hidden">CV</span>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--bg)]/15 transition-transform group-hover:translate-y-0.5">
                            <FaArrowDown className="text-[10px]" />
                        </span>
                    </a>
                </div>
            </nav>
        </motion.header>
    );
}
