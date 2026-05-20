"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from "react-icons/fa";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function Footer() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const formatted = now.toLocaleTimeString("en-IN", {
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZone: "Asia/Kolkata",
            });
            setTime(formatted.toUpperCase() + " IST");
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="relative border-t border-[var(--border)] py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
                className="flex flex-col items-center gap-8"
            >
                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[var(--fg-faint)]">
                    Get in touch
                </p>

                <a
                    href="https://drive.google.com/file/d/1Qn3oQXuYsL7u7ZG2ssfqYMLw17Q5lvVi/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-[var(--fg)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-all duration-300 hover:scale-[1.03]"
                >
                    <FaFileAlt className="text-xs" />
                    View Résumé
                    <span className="ml-0.5 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </a>

                <div className="flex items-center gap-3">
                    <a
                        href="https://github.com/wsid24"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-soft)] text-[var(--fg-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://linkedin.com/in/siddhant-wani-6059972a5"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-soft)] text-[var(--fg-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="mailto:siddhantpwani@gmail.com"
                        aria-label="Email"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-soft)] text-[var(--fg-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                    >
                        <FaEnvelope />
                    </a>
                </div>

                <p className="font-mono text-sm tracking-[0.3em] text-[var(--fg-faint)]">{time}</p>
                <p className="text-xs text-[var(--fg-dim)]">© 2026 Siddhant Wani · Crafted in Pune</p>
            </motion.div>
        </footer>
    );
}
