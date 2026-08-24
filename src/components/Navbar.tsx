"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowDown, FaMoon, FaSun } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useTheme } from "./ThemeProvider";

const RESUME_URL = "https://drive.google.com/file/d/1pqIR7narHR8B6R2UQNMRTR4HyN_Sj5Lu/view?usp=sharing";
const EASE = [0.16, 1, 0.3, 1] as const;

const navLinks = [
  { id: "about",        label: "About" },
  { id: "profiles",     label: "CP" },
  { id: "skills",       label: "Skills" },
  { id: "projects",     label: "Projects" },
  { id: "achievements", label: "Awards" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = ["home", ...navLinks.map(l => l.id)];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActive(ids[i]); break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setDrawerOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[var(--border)] bg-[var(--bg-elev)]/80 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.18)]"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button
            onClick={() => goTo("home")}
            className="group flex items-center gap-2.5"
            aria-label="Home"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-strong)] overflow-hidden transition-all group-hover:border-[var(--accent)]/50 group-hover:shadow-[0_0_16px_var(--glow)]">
              <img src="/profile2.jpg" alt="Logo" className="h-full w-full object-cover object-top" />
            </span>
            <span className="hidden font-heading text-lg font-semibold text-[var(--fg)] sm:block">
              Siddhant
            </span>
          </button>

          {/* Center nav */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {navLinks.map(link => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => goTo(link.id)}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-[var(--fg)]"
                        : "text-[var(--fg-faint)] hover:text-[var(--fg)]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-bg"
                        className="absolute inset-0 -z-10 rounded-full bg-[var(--bg-soft)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-line"
                        className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                        style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-warm))" }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-soft)] text-[var(--fg-faint)] transition-all hover:border-[var(--accent)]/40 hover:text-[var(--accent)] hover:shadow-[0_0_12px_var(--glow)]"
            >
              {theme === "dark" ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
            </button>

            {/* CV button — desktop */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-2 rounded-full bg-[var(--accent-warm)] px-4 py-2 text-sm font-semibold text-black shadow-[0_0_16px_var(--glow-warm)] transition-all hover:scale-[1.04] hover:shadow-[0_0_28px_var(--glow-warm)] sm:inline-flex"
            >
              Download CV
              <FaArrowDown className="text-[10px] transition-transform group-hover:translate-y-0.5" />
            </a>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-soft)] transition-all hover:border-[var(--accent)]/40 hover:text-[var(--accent)] md:hidden"
            >
              <HiMenuAlt3 className="text-xl" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 36 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-72 flex-col bg-[var(--bg-elev)] border-l border-[var(--border)] px-6 py-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-heading text-xl font-bold text-[var(--fg)]">Menu</span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-faint)] hover:text-[var(--fg)]"
                >
                  <HiX className="text-xl" />
                </button>
              </div>

              <ul className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.4, ease: EASE }}
                  >
                    <button
                      onClick={() => goTo(link.id)}
                      className={`w-full rounded-xl px-4 py-3.5 text-left text-base font-medium transition-all ${
                        active === link.id
                          ? "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20"
                          : "text-[var(--fg-soft)] hover:bg-[var(--bg-soft)] hover:text-[var(--fg)]"
                      }`}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent-warm)] px-4 py-3 text-sm font-semibold text-black shadow-[0_0_20px_var(--glow-warm)]"
                >
                  Download CV <FaArrowDown className="text-[10px]" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
