"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface TimelineEntry {
    institution: string;
    degree: string;
    score?: string;
    period: string;
    location: string;
    highlight?: boolean;
}

export default function EducationSection() {
    const entries: TimelineEntry[] = [
        {
            institution: "Pune Institute of Computer Technology",
            degree: "BE — AI & Data Science",
            score: "9.40 CGPA",
            period: "2023 — 2027",
            location: "Pune",
            highlight: true,
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
                <p className="section-label mb-3">Background</p>
                <h2 className="font-heading text-4xl text-[var(--fg)] sm:text-5xl">
                    <span className="brushstroke-underline">Education</span>
                </h2>
            </motion.div>

            <div className="relative ml-2 space-y-8 border-l-2 border-[var(--border)] pl-8">
                {entries.map((entry, index) => (
                    <motion.div
                        key={entry.institution}
                        initial={{ opacity: 0, x: -28 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: index * 0.1 }}
                        className="group relative"
                    >
                        {/* Timeline dot */}
                        <div className="absolute -left-[42px] top-1 flex h-5 w-5 items-center justify-center">
                            {entry.highlight ? (
                                <>
                                    <span
                                        className="absolute h-5 w-5 rounded-full opacity-40 glow-pulse"
                                        style={{ background: "var(--accent)" }}
                                    />
                                    <span
                                        className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full border-2"
                                        style={{ borderColor: "var(--accent)", background: "var(--bg)" }}
                                    >
                                        <FaGraduationCap className="text-[8px]" style={{ color: "var(--accent)" }} />
                                    </span>
                                </>
                            ) : (
                                <span
                                    className="h-2.5 w-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg)] transition-all group-hover:border-[var(--accent)]/50 group-hover:bg-[var(--accent)]/10"
                                />
                            )}
                        </div>

                        {/* Card */}
                        <motion.div
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                            className={`relative overflow-hidden rounded-xl border p-5 backdrop-blur-sm transition-all duration-400 ${
                                entry.highlight
                                    ? "border-[var(--accent)]/25 bg-[var(--accent)]/5 shadow-[0_0_30px_rgba(167,139,250,0.07)]"
                                    : "border-[var(--border)] bg-[var(--bg-soft)] hover:border-[var(--border-strong)]"
                            }`}
                        >
                            {entry.highlight && (
                                <div
                                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl opacity-20"
                                    style={{ background: "var(--accent)" }}
                                />
                            )}

                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-base font-semibold text-[var(--fg)] leading-snug">
                                        {entry.institution}
                                    </h3>
                                    <p className="mt-1 text-sm text-[var(--fg-soft)]">{entry.degree}</p>
                                </div>

                                {entry.score && (
                                    <span
                                        className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold"
                                        style={{
                                            background: entry.highlight ? "var(--accent)" : "var(--bg-soft)",
                                            color: entry.highlight ? "white" : "var(--fg)",
                                            border: entry.highlight ? "none" : "1px solid var(--border)",
                                        }}
                                    >
                                        {entry.score}
                                    </span>
                                )}
                            </div>

                            <p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[var(--fg-faint)]">
                                <span>{entry.period}</span>
                                <span className="h-1 w-1 rounded-full bg-[var(--fg-dim)]" />
                                <FaMapMarkerAlt className="text-[10px]" />
                                <span>{entry.location}</span>
                            </p>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
