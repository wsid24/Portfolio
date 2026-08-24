"use client";
import React from "react";
import { motion } from "framer-motion";
import { SiLeetcode, SiCodeforces, SiCodechef, SiMeta } from "react-icons/si";

const PLATFORMS = [
  {
    id: "leetcode",
    name: "LeetCode",
    badge: "Guardian",
    color: "#FFA116",
    icon: SiLeetcode,
    bgHover: "hover:bg-[#FFA116]/10",
    borderHover: "group-hover:border-[#FFA116]",
  },
  {
    id: "codeforces",
    name: "Codeforces",
    badge: "Expert",
    color: "#318CE7",
    icon: SiCodeforces,
    bgHover: "hover:bg-[#318CE7]/10",
    borderHover: "group-hover:border-[#318CE7]",
  },
  {
    id: "codechef",
    name: "CodeChef",
    badge: "⭐⭐⭐⭐⭐",
    color: "#5B4638",
    icon: SiCodechef,
    bgHover: "hover:bg-[#5B4638]/10",
    borderHover: "group-hover:border-[#5B4638]",
  },
  {
    id: "atcoder",
    name: "AtCoder",
    badge: "4 Kyu",
    color: "#FFFFFF",
    customIcon: true,
    bgHover: "hover:bg-[#FFFFFF]/10",
    borderHover: "group-hover:border-[#FFFFFF]",
  },
  {
    id: "metahackercup",
    name: "Meta Hacker Cup",
    badge: "Top 200 Global",
    color: "#0668E1",
    icon: SiMeta,
    bgHover: "hover:bg-[#0668E1]/10",
    borderHover: "group-hover:border-[#0668E1]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

export default function BrandStrip() {
  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-6"
        >
          {PLATFORMS.map((platform) => (
            <motion.div
              key={platform.id}
              variants={itemVariants}
              className={`group relative flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-glass)] px-6 py-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${platform.bgHover}`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] transition-colors duration-300 ${platform.borderHover}`}
              >
                {platform.customIcon ? (
                  <img src="/atcoder.png" alt="AtCoder" className="w-8 h-8 object-contain opacity-90" />
                ) : (
                  platform.icon && (
                    <platform.icon
                      className="text-3xl transition-colors duration-300"
                      style={{ color: platform.color }}
                    />
                  )
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-heading text-lg font-bold text-[var(--fg)]">
                  {platform.name}
                </span>
                <span
                  className="inline-block rounded bg-[var(--bg-elev)] px-2.5 py-0.5 text-xs font-semibold tracking-wide"
                  style={{ color: platform.color }}
                >
                  {platform.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
