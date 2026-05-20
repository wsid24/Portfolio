"use client";

import { motion } from "framer-motion";
import { FaMedal, FaExternalLinkAlt } from "react-icons/fa";

interface Achievement {
    title: string;
    organization: string;
    rank: string;
    detail: string;
    date: string;
    link?: string;
    linkLabel?: string;
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: index * 0.08 }}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)]/60 p-6 backdrop-blur-sm transition-all duration-500 hover:border-[var(--border-strong)] hover:shadow-[0_20px_40px_-25px_rgba(0,0,0,0.18)]"
        >
            <div className="mb-4 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] text-[var(--fg)] transition-transform duration-500 group-hover:scale-110">
                    <FaMedal className="text-lg" />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--fg-faint)]">
                    {achievement.date}
                </span>
            </div>

            <h3 className="font-heading text-xl text-[var(--fg)]">{achievement.title}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--fg-faint)]">
                {achievement.organization}
            </p>

            <div className="my-4 inline-flex items-center gap-2 self-start rounded-full border border-[var(--border-strong)] bg-[var(--bg-soft)] px-3 py-1 text-xs font-semibold text-[var(--fg)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--fg)]" />
                {achievement.rank}
            </div>

            <p className="text-sm leading-relaxed text-[var(--fg-soft)]">{achievement.detail}</p>

            {achievement.link && (
                <a
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 self-start rounded-md border border-[var(--border)] px-3 py-1.5 text-[11px] font-medium text-[var(--fg-soft)] transition-all hover:border-[var(--border-strong)] hover:bg-[var(--bg-soft)] hover:text-[var(--fg)]"
                >
                    {achievement.linkLabel ?? "Read more"}
                    <FaExternalLinkAlt className="text-[9px]" />
                </a>
            )}
        </motion.div>
    );
}

export default function AchievementsSection() {
    const achievements: Achievement[] = [
        {
            title: "Meta Hacker Cup — Round 3 (Semi-finals)",
            organization: "Meta",
            rank: "Global Rank 186 / 20,000+",
            detail:
                "Advanced to Round 3 of Meta's flagship global competitive programming contest. Hacker Cup is always a thrill — especially the unique submission flow where you only get a stressful 6-minute timer to download the massive input file, run your code locally, and submit the output and source before the clock runs out.",
            date: "Oct 2025",
            link: "https://drive.google.com/file/d/1fyfoUT58o77GQvvdOLx5EOk-yZCI_JSN/view?usp=sharing",
            linkLabel: "View certificate",
        },
        {
            title: "Barclays Hack-O-Hire — Finalist",
            organization: "Barclays",
            rank: "Top 100 of 25,000+",
            detail:
                "Shortlisted as a finalist in Barclays' flagship hackathon, selected from a pool of 25,000+ applicants across India.",
            date: "2025",
            link: "https://www.linkedin.com/posts/siddhant-wani-6059972a5_hackohire-teamgenify-barclayshackathon-ugcPost-7323579469355540483-EGRN",
            linkLabel: "LinkedIn",
        },
        {
            title: "HackerRank Orchestrate Hackathon",
            organization: "HackerRank",
            rank: "Rank 151 / 1,349 · 12,885 registrants",
            detail:
                "Built a fault-tolerant AI support agent over HackerRank, Claude, and Visa docs in 24 hours — hybrid retrieval, LLM self-audit, and 3-strike escalation to a human. Defended the design in a 30-minute AI-judge interview with full repo access.",
            date: "May 2026",
            link: "https://www.linkedin.com/feed/update/urn:li:activity:7460983995749715970/",
            linkLabel: "Read the writeup",
        },
    ];

    return (
        <section className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                className="mb-12"
            >
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-[var(--fg-faint)]">
                    Recognition
                </p>
                <h2 className="font-heading text-4xl text-[var(--fg)] sm:text-5xl">
                    <span className="brushstroke-underline">Achievements</span>
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {achievements.map((achievement, index) => (
                    <AchievementCard
                        key={achievement.title}
                        achievement={achievement}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}
