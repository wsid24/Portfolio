"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { SiCodeforces, SiLeetcode, SiCodechef, SiGithub } from "react-icons/si";
import { FaCode } from "react-icons/fa";

interface ProfileCardProps {
    platform: string;
    rating?: string;
    extra?: string;
    link: string;
    accent: string;
    icon: React.ReactNode;
    index: number;
}

function ProfileCard({ platform, rating, extra, link, accent, icon, index }: ProfileCardProps) {
    const [, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLAnchorElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const accentColors: Record<string, { border: string; glow: string; text: string }> = {
        cyan: {
            border: "border-cyan-500/50",
            glow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]",
            text: "text-cyan-400"
        },
        yellow: {
            border: "border-yellow-500/50",
            glow: "hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]",
            text: "text-yellow-400"
        },
        brown: {
            border: "border-orange-600/50",
            glow: "hover:shadow-[0_0_30px_rgba(234,88,12,0.3)]",
            text: "text-orange-500"
        },
        green: {
            border: "border-green-500/50",
            glow: "hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]",
            text: "text-green-400"
        },
        gray: {
            border: "border-gray-500/50",
            glow: "hover:shadow-[0_0_30px_rgba(107,114,128,0.3)]",
            text: "text-gray-400"
        }
    };

    const colors = accentColors[accent] || accentColors.gray;

    return (
        <motion.a
            ref={cardRef}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className={`group relative block rounded-xl border ${colors.border} bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 ${colors.glow}`}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className={`mb-3 text-4xl ${colors.text}`}>
                        {icon}
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-white">{platform}</h3>
                    {rating && (
                        <p className={`text-xl font-semibold ${colors.text}`}>
                            {rating}
                        </p>
                    )}
                    {extra && (
                        <p className="mt-1 text-sm text-gray-400">
                            {extra}
                        </p>
                    )}
                </div>
            </div>

            {/* Hover indicator */}
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 transition-colors group-hover:text-gray-300">
                <span>View Profile</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </div>
        </motion.a>
    );
}

export default function CodingProfiles() {
    const profiles = [
        {
            platform: "Codeforces",
            rating: "Expert (1721)",
            link: "https://codeforces.com/profile/w_SiD24",
            accent: "cyan",
            icon: <SiCodeforces />
        },
        {
            platform: "LeetCode",
            rating: "Guardian (2239)",
            extra: "Top 0.74% • 500+ Solved",
            link: "https://leetcode.com/u/w_SiD24/",
            accent: "yellow",
            icon: <SiLeetcode />
        },
        {
            platform: "CodeChef",
            rating: "4 Star (1809)",
            link: "https://www.codechef.com/users/insane_007",
            accent: "brown",
            icon: <SiCodechef />
        },
        {
            platform: "AtCoder",
            rating: "6 Kyu (857)",
            link: "https://atcoder.jp/users/w_SiD24",
            accent: "green",
            icon: <FaCode />
        },
        {
            platform: "GitHub",
            rating: "@wsid24",
            link: "https://github.com/wsid24",
            accent: "gray",
            icon: <SiGithub />
        }
    ];

    return (
        <section className="py-20">
            <div className="mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-4 text-4xl font-bold text-white md:text-5xl"
                >
                    Coding Profiles
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-400"
                >
                    Competitive programming achievements across platforms
                </motion.p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {profiles.map((profile, index) => (
                    <ProfileCard
                        key={profile.platform}
                        {...profile}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}
