"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import Image from "next/image";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/* ───────── Circular "Let's talk" CTA ───────── */
function LetsTalk() {
    return (
        <a
            href="tel:+918421036266"
            aria-label="Let's connect — call +91 8421036266"
            title="+91 8421036266"
            className="group relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32"
        >
            {/* Rotating text ring */}
            <svg viewBox="0 0 120 120" className="absolute inset-0 spin-slow text-[var(--fg)]">
                <defs>
                    {/* Full circle path */}
                    <path
                        id="circle-path"
                        d="M 60,60 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0"
                    />
                </defs>
                <text
                    fill="currentColor"
                    className="font-heading"
                    style={{ fontSize: "11px", letterSpacing: "0.24em" }}
                >
                    <textPath href="#circle-path" startOffset="0">
                        LET&apos;S CONNECT · LET&apos;S CONNECT ·
                    </textPath>
                </text>
            </svg>
            {/* Center button — phone */}
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--fg)] text-[var(--bg)] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] transition-transform group-hover:scale-110 sm:h-16 sm:w-16">
                <FaPhoneAlt className="text-base transition-transform group-hover:-rotate-12 sm:text-lg" />
            </span>
        </a>
    );
}

/* ───────── Aurora blobs (theme-aware) ───────── */
function AuroraBlobs() {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes blob-1 { 0%,100% { transform: translate(-5%,-5%) scale(1); } 50% { transform: translate(8%,12%) scale(1.15); } }
                @keyframes blob-2 { 0%,100% { transform: translate(10%,15%) scale(1); } 50% { transform: translate(-8%,-8%) scale(1.2); } }
                @keyframes blob-3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(6%,-10%) scale(1.1); } }
                .blob-1 { animation: blob-1 22s ease-in-out infinite; }
                .blob-2 { animation: blob-2 26s ease-in-out infinite; }
                .blob-3 { animation: blob-3 30s ease-in-out infinite; }
            `}} />
            <div className="blob-1 absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full blur-[110px]"
                style={{ background: "radial-gradient(circle, var(--blob-1) 0%, transparent 70%)" }} />
            <div className="blob-2 absolute -right-32 top-1/3 h-[24rem] w-[24rem] rounded-full blur-[110px]"
                style={{ background: "radial-gradient(circle, var(--blob-2) 0%, transparent 70%)" }} />
            <div className="blob-3 absolute left-1/3 bottom-0 h-[18rem] w-[18rem] rounded-full blur-[90px]"
                style={{ background: "radial-gradient(circle, var(--blob-3) 0%, transparent 70%)" }} />
        </div>
    );
}

/* ───────── Hero ───────── */
export default function HeroSection() {
    const socials = [
        { icon: <FaGithub />, href: "https://github.com/wsid24", label: "GitHub" },
        { icon: <SiLeetcode />, href: "https://leetcode.com/u/w_SiD24/", label: "LeetCode" },
        { icon: <FaXTwitter />, href: "https://x.com/w_SiD1024", label: "X" },
        { icon: <FaLinkedin />, href: "https://linkedin.com/in/siddhant-wani-6059972a5", label: "LinkedIn" },
        { icon: <FaEnvelope />, href: "mailto:siddhantpwani@gmail.com", label: "Email" },
    ];

    return (
        <section className="relative pt-28 sm:pt-32">
            <AuroraBlobs />

            <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4">
                {/* Stage — photo + flanking rails. Wide enough that rails sit OUTSIDE the photo. */}
                <div className="relative mx-auto w-full max-w-[820px]">
                    <div className="relative mx-auto aspect-[5/4] w-full max-w-[460px]">
                        {/* Portrait — clean rounded rectangle, no dome */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.2 }}
                            className="absolute inset-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.18)]"
                        >
                            <Image
                                src="/profile.png"
                                alt="Siddhant Wani"
                                fill
                                priority
                                sizes="(max-width: 768px) 90vw, 460px"
                                className="select-none object-cover"
                            />
                        </motion.div>

                        {/* Left social rail — sits OUTSIDE the photo's left edge */}
                        <ul className="absolute right-full top-1/2 z-20 mr-6 hidden -translate-y-1/2 flex-col gap-4 sm:flex">
                            {socials.map((s, i) => (
                                <motion.li
                                    key={s.label}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.6 + i * 0.06 }}
                                >
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elev)] text-[var(--fg-soft)] backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                                    >
                                        {s.icon}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Let's Connect — sits at the top-right, outside the photo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.85 }}
                            className="absolute left-full top-4 z-20 ml-4 hidden sm:block"
                        >
                            <LetsTalk />
                        </motion.div>
                    </div>
                </div>

                {/* Available pill */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 1.1 }}
                    className="mt-6 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elev)]/70 px-3.5 py-1.5 text-xs text-[var(--fg-soft)] backdrop-blur"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    Available for opportunities
                </motion.div>

                {/* Big name */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.5 }}
                    className="font-heading mt-6 text-center text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-tight"
                >
                    <span className="shimmer-text">Siddhant Wani</span>
                </motion.h1>

                {/* Role line */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.7 }}
                    className="mt-4 text-center text-xs font-medium uppercase tracking-[0.4em] text-[var(--fg-soft)] sm:text-sm"
                >
                    Full-Stack Engineer&nbsp; <span className="text-[var(--fg-dim)]">//</span> &nbsp;Competitive Programmer
                </motion.p>

                {/* Mobile-only socials row */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:hidden">
                    {socials.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target={s.href.startsWith("http") ? "_blank" : undefined}
                            rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            aria-label={s.label}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elev)]/70 text-[var(--fg-soft)] backdrop-blur"
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
