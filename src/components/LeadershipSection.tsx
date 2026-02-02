"use client";

import { motion } from "framer-motion";

interface ExperienceCardProps {
    title: string;
    organization: string;
    duration: string;
    points: string[];
    index: number;
}

function ExperienceCard({ title, organization, duration, points, index }: ExperienceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
            whileHover={{ y: -3 }}
            className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
        >
            {/* Header */}
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <p className="mt-1 text-base font-medium text-cyan-300">{organization}</p>
                </div>
                <span className="text-sm text-gray-400 sm:text-right">{duration}</span>
            </div>

            {/* Points */}
            <ul className="space-y-2">
                {points.map((point, idx) => (
                    <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + idx * 0.05, duration: 0.3 }}
                        className="flex gap-2 text-gray-300"
                    >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                        <span className="leading-relaxed">{point}</span>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
}

export default function LeadershipSection() {
    const experiences = [
        {
            title: "Competitive Programming Lead",
            organization: "PASC (PICT ACM Student Chapter)",
            duration: "Aug 2025 – Oct 2025",
            points: [
                "Collaborated with a 4–5 member team to design DSA contests",
                "Created 50+ original problems and test cases",
                "Balanced difficulty and improved contest quality",
                "Mentored juniors in debugging and problem solving",
            ],
        },
        {
            title: "Head – Data Structures Club",
            organization: "AI & DS Department, PICT",
            duration: "July 2025 – Present",
            points: [
                "Conducted post-contest discussions (Codeforces, LeetCode, CodeChef)",
                "Mentored 70+ students on algorithmic strategies",
                "Organized workshops on advanced data structures",
                "Improved average contest performance by 30%",
            ],
        },
    ];

    return (
        <section className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
            >
                <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                    Leadership & Experience
                </h2>
                <p className="text-lg text-gray-400">
                    Mentoring and leading technical communities
                </p>
            </motion.div>

            <div className="space-y-6">
                {experiences.map((exp, index) => (
                    <ExperienceCard
                        key={exp.title}
                        title={exp.title}
                        organization={exp.organization}
                        duration={exp.duration}
                        points={exp.points}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}
