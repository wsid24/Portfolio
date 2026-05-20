"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface TimelineEntry {
    institution: string;
    degree: string;
    score?: string;
    period: string;
    location: string;
}

export default function EducationSection() {
    const entries: TimelineEntry[] = [
        {
            institution: "Pune Institute of Computer Technology",
            degree: "BE — AI & Data Science",
            score: "9.45 CGPA",
            period: "2023 — 2027",
            location: "Pune",
        },
        {
            institution: "Maharana Pratap High School",
            degree: "HSC — 12th Grade",
            score: "78%",
            period: "2021 — 2023",
            location: "Dhule",
        },
        {
            institution: "North Point School",
            degree: "SSC — 10th Grade",
            score: "96%",
            period: "2011 — 2021",
            location: "Dhule",
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
                    Background
                </p>
                <h2 className="font-heading text-4xl text-[var(--fg)] sm:text-5xl">
                    <span className="brushstroke">Education</span>
                </h2>
            </motion.div>

            <div className="relative ml-4 space-y-10 border-l border-[var(--border-strong)] pl-8">
                {entries.map((entry, index) => (
                    <motion.div
                        key={entry.institution}
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: index * 0.08 }}
                        className="group relative"
                    >
                        <div className="absolute -left-[41px] top-1.5 flex h-3 w-3 items-center justify-center">
                            <span className="absolute h-3 w-3 rounded-full border border-[var(--border-strong)] bg-[var(--bg)] transition-all group-hover:scale-110 group-hover:border-[var(--fg)]" />
                            <span className="absolute h-1.5 w-1.5 rounded-full bg-[var(--fg-faint)] transition-all group-hover:bg-[var(--fg)]" />
                        </div>

                        <h3 className="text-lg font-semibold text-[var(--fg)]">{entry.institution}</h3>
                        <p className="mt-0.5 text-sm text-[var(--fg-soft)]">{entry.degree}</p>
                        {entry.score && (
                            <p className="mt-1 inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--bg-soft)] px-2 py-0.5 text-xs font-semibold text-[var(--fg)]">
                                {entry.score}
                            </p>
                        )}
                        <p className="mt-2 flex items-center gap-2 text-xs text-[var(--fg-faint)]">
                            {entry.period}
                            <span className="h-1 w-1 rounded-full bg-[var(--fg-dim)]" />
                            <FaMapMarkerAlt className="text-[10px]" /> {entry.location}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
