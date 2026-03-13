"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaHome, FaUser, FaTrophy, FaGraduationCap, FaWrench, FaFolder, FaFileAlt } from "react-icons/fa";

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("home");

    const navLinks = [
        { id: "home", icon: FaHome, label: "Home" },
        { id: "about", icon: FaUser, label: "About" },
        { id: "profiles", icon: FaTrophy, label: "CP" },
        { id: "education", icon: FaGraduationCap, label: "Education" },
        { id: "skills", icon: FaWrench, label: "Skills" },
        { id: "projects", icon: FaFolder, label: "Projects" },
        { id: "resume", icon: FaFileAlt, label: "Resume" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map((l) => l.id);
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 200) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollToSection = (id: string) => {
        if (id === "resume") {
            window.open("https://drive.google.com/file/d/1iURHR70w8TE5m4nsQcFbM0ehokiUtC_r/view?usp=sharing", "_blank");
            return;
        }
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <motion.nav
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
            className="fixed top-6 right-4 z-50 rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 px-2 py-3 shadow-2xl shadow-black/50 backdrop-blur-2xl"
        >
            <ul className="flex flex-col items-center gap-1">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = activeSection === link.id;

                    return (
                        <li key={link.id} className="relative">
                            <button
                                onClick={() => scrollToSection(link.id)}
                                className={`group relative flex items-center justify-center rounded-xl p-2.5 transition-all duration-300
                                    ${isActive ? "text-white" : "text-gray-500 hover:text-gray-300"}
                                `}
                                aria-label={link.label}
                            >
                                <Icon className="text-2xl transition-transform duration-300 group-hover:scale-110" />

                                {/* Tooltip — left side */}
                                <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur-xl transition-all duration-200 group-hover:opacity-100">
                                    {link.label}
                                </span>

                                {/* Active indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavBg"
                                        className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.06]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </motion.nav>
    );
}
