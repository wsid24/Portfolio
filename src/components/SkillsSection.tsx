"use client";

import { motion } from "framer-motion";

interface SkillGroupProps {
    title: string;
    skills: string[];
    index: number;
    highlight?: boolean;
}

function SkillGroup({ title, skills, index, highlight = false }: SkillGroupProps) {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.1,
                duration: 0.4,
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={`rounded-xl border backdrop-blur-sm transition-all duration-300 ${highlight
                    ? "border-purple-500/40 bg-purple-500/5 hover:border-purple-400/60 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]"
                    : "border-white/10 bg-white/5 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                } p-6`}
        >
            <h3 className={`mb-4 text-xl font-semibold ${highlight ? "text-purple-300" : "text-cyan-300"}`}>
                {title}
            </h3>
            <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, idx) => (
                    <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + idx * 0.03, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${highlight
                                ? "bg-purple-500/20 text-purple-200 hover:bg-purple-500/30"
                                : "bg-cyan-500/15 text-gray-300 hover:bg-cyan-500/25"
                            }`}
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
}

export default function SkillsSection() {
    const skillGroups = [
        {
            title: "Languages",
            skills: ["C++", "Python", "Java", "JavaScript"],
            highlight: false,
        },
        {
            title: "Frameworks & Backend",
            skills: ["React", "Node.js", "Express.js", "Socket.IO"],
            highlight: false,
        },
        {
            title: "Databases & Tools",
            skills: ["MongoDB", "Git", "CMake", "Postman", "Vercel", "Render"],
            highlight: false,
        },
        {
            title: "Core CS Fundamentals",
            skills: [
                "Object Oriented Programming (OOPS)",
                "Operating Systems",
                "DBMS",
                "Computer Networks",
                "Data Structures & Algorithms",
                "System Design Basics",
            ],
            highlight: true,
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
                    Technical Skills
                </h2>
                <p className="text-lg text-gray-400">
                    Core competencies and technical expertise
                </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {skillGroups.map((group, index) => (
                    <SkillGroup
                        key={group.title}
                        title={group.title}
                        skills={group.skills}
                        index={index}
                        highlight={group.highlight}
                    />
                ))}
            </div>
        </section>
    );
}
