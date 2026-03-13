"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

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
            period: "2023 — Present",
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
            >
                <h2 className="font-heading text-4xl text-white mb-12">
                    <span className="brushstroke text-teal-400">Education</span>
                </h2>
            </motion.div>

            <div className="relative ml-4 border-l border-white/10 pl-8 space-y-10">
                {entries.map((entry, index) => (
                    <motion.div
                        key={entry.institution}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="relative"
                    >
                        {/* Timeline dot */}
                        <div className="absolute -left-[41px] top-1 h-3 w-3 rounded-full border-2 border-white/30 bg-[#030303]" />

                        <h3 className="text-lg font-bold text-white">{entry.institution}</h3>
                        <p className="text-sm text-gray-400 mt-0.5">{entry.degree}</p>
                        {entry.score && (
                            <p className="text-sm text-teal-400 font-semibold mt-0.5">{entry.score}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                            {entry.period} · <FaMapMarkerAlt className="text-[10px]" /> {entry.location}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
