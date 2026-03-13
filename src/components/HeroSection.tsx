"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import Image from "next/image";
import { useEffect, useState, useMemo, useCallback } from "react";

/* ──── Full-screen Animated Heatmap Grid ──── */

function FullScreenHeatmap({ heatmap }: { heatmap: Record<string, number> }) {
    // Build grid data — 14 rows × 28 columns
    const ROWS = 14;
    const COLS = 28;

    const cells = useMemo(() => {
        const now = new Date();
        const result: {
            count: number;
            index: number;
            animDelay: number;
            animDuration: number;
        }[] = [];
        const totalCells = ROWS * COLS;
        for (let i = 0; i < totalCells; i++) {
            const date = new Date(now);
            date.setDate(date.getDate() - (totalCells - i));
            const ts = Math.floor(
                new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / 1000
            ).toString();

            // Generate deterministic pseudo-random values based on index to ensure stable SSR/hydration
            // Delay between 0s and 5s
            const animDelay = (i * 137) % 5000 / 1000;
            // Duration between 2s and 4s
            const animDuration = 2 + ((i * 97) % 2000 / 1000);

            result.push({
                count: heatmap[ts] || 0,
                index: i,
                animDelay,
                animDuration
            });
        }
        return result;
    }, [heatmap]);

    const getColor = useCallback((count: number) => {
        if (count === 0) return `rgba(20,184,166,0.18)`;
        if (count <= 1) return `rgba(20,184,166,0.35)`;
        if (count <= 3) return `rgba(20,184,166,0.5)`;
        if (count <= 5) return `rgba(20,184,166,0.65)`;
        if (count <= 8) return `rgba(20,184,166,0.85)`;
        return `rgba(20,184,166,1)`;
    }, []);

    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                gap: "3px",
                padding: "3px",
            }}
        >
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes tile-breathe {
                    0%, 100% { opacity: 0.2; filter: brightness(0.7); }
                    50% { opacity: 1; filter: brightness(1.3); }
                }
            `}} />
            {cells.map((cell) => (
                <div
                    key={cell.index}
                    className="rounded-[4px] will-change-[opacity,filter]"
                    style={{
                        backgroundColor: getColor(cell.count),
                        animation: `tile-breathe ${cell.animDuration}s ease-in-out infinite`,
                        animationDelay: `${cell.animDelay}s`,
                    }}
                />
            ))}
            {/* Radial fade to blend edges into background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 70% 65% at center 40%, transparent 10%, #030303 85%)",
                }}
            />
        </div>
    );
}

/* ──── Main HeroSection ──── */

export default function HeroSection() {
    const [heatmap, setHeatmap] = useState<Record<string, number>>({});

    useEffect(() => {
        fetch("/api/leetcode")
            .then((r) => r.json())
            .then((data) => {
                if (data.heatmap && Object.keys(data.heatmap).length > 0) {
                    setHeatmap(data.heatmap);
                }
            })
            .catch(() => { });
    }, []);

    const socials = [
        { icon: <FaGithub />, href: "https://github.com/wsid24", label: "GitHub", color: "#e6edf3" },
        { icon: <SiLeetcode />, href: "https://leetcode.com/u/w_SiD24/", label: "LeetCode", color: "#FFA116" },
        { icon: <FaXTwitter />, href: "#", label: "X", color: "#ffffff" },
        { icon: <FaLinkedin />, href: "https://linkedin.com/in/siddhant-wani-6059972a5", label: "LinkedIn", color: "#0A66C2" },
        { icon: <FaEnvelope />, href: "mailto:siddhantpwani@gmail.com", label: "Email", color: "#EA4335" },
    ];

    return (
        <section className="relative flex flex-col items-center justify-center py-28 sm:py-36 text-center overflow-hidden min-h-[90vh]">
            {/* Full-screen Animated Heatmap Background */}
            <FullScreenHeatmap heatmap={heatmap} />

            {/* Avatar — large size */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative mb-8 z-10"
            >
                <div className="relative h-36 w-36 sm:h-44 sm:w-44 overflow-hidden rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 p-[3px] shadow-[0_0_40px_rgba(20,184,166,0.25)]">
                    <div className="h-full w-full rounded-full overflow-hidden bg-[#030303]">
                        <Image
                            src="/profile.png"
                            alt="Siddhant Wani"
                            width={176}
                            height={176}
                            className="h-full w-full object-cover"
                            priority
                        />
                    </div>
                </div>
            </motion.div>

            {/* Name */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white mb-4 z-10"
            >
                Siddhant Wani
            </motion.h1>

            {/* Title */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xs sm:text-sm tracking-[0.25em] uppercase text-gray-400 mb-4 font-medium z-10"
            >
                Full Stack Developer | Competitive Programmer
            </motion.p>

            {/* Quick stats under name */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="mb-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 z-10"
            >
                <span className="flex items-center gap-1.5">
                    📍 Pune, India
                </span>
                <span className="hidden sm:inline text-white/10">|</span>
                <span className="flex items-center gap-1.5">
                    🎓 BE — AI & Data Science
                </span>
                <span className="hidden sm:inline text-white/10">|</span>
                <span className="flex items-center gap-1.5">
                    🏆 Expert on Codeforces
                </span>
            </motion.div>

            {/* Available badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-10 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-md z-10"
            >
                <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                Available for opportunities
            </motion.div>

            {/* Social Icons — colorful */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-4 z-10"
            >
                {socials.map((social) => (
                    <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:scale-110 backdrop-blur-sm"
                        style={{ color: social.color }}
                    >
                        {social.icon}
                    </a>
                ))}
            </motion.div>
        </section>
    );
}
