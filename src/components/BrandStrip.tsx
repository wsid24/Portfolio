"use client";

import { motion } from "framer-motion";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";
import { FaMeta } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const brands = [
    { name: "LeetCode", icon: <SiLeetcode />, href: "https://leetcode.com/u/w_SiD24/" },
    { name: "Codeforces", icon: <SiCodeforces />, href: "https://codeforces.com/profile/w_SiD24" },
    { name: "CodeChef", icon: <SiCodechef />, href: "https://www.codechef.com/users/insane_007" },
    { name: "AtCoder", icon: <FaCode />, href: "https://atcoder.jp/users/w_SiD24" },
    { name: "Meta Hacker Cup", icon: <FaMeta />, href: "https://drive.google.com/file/d/1fyfoUT58o77GQvvdOLx5EOk-yZCI_JSN/view?usp=sharing" },
];

export default function BrandStrip() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            className="relative mt-16 border-y border-[var(--border)] bg-[var(--bg-elev)]/40 py-8 backdrop-blur-md"
        >
            <p className="mb-6 text-center text-[10px] font-semibold uppercase tracking-[0.4em] text-[var(--fg-faint)]">
                Active across competitive programming platforms
            </p>
            <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-5 px-4 fade-mask-x sm:gap-x-14">
                {brands.map((brand, i) => (
                    <motion.li
                        key={brand.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: i * 0.06 }}
                    >
                        <a
                            href={brand.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={brand.name}
                            className="group flex items-center gap-2.5 text-[var(--fg-faint)] transition-colors hover:text-[var(--fg)]"
                        >
                            <span className="text-2xl">{brand.icon}</span>
                            <span className="text-base font-semibold tracking-tight sm:text-lg">
                                {brand.name}
                            </span>
                        </a>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
}
