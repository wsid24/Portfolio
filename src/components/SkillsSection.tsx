"use client";

import { motion } from "framer-motion";
import {
    SiCplusplus, SiPython, SiJavascript, SiReact, SiNextdotjs,
    SiNodedotjs, SiExpress, SiSocketdotio, SiMongodb,
    SiGit, SiGithub, SiPostman, SiVercel, SiCmake, SiRender,
    SiDocker, SiFastapi, SiRedis, SiPostgresql,
    SiMysql, SiElasticsearch, SiLangchain, SiSpringboot
} from "react-icons/si";
import { FaJava, FaDatabase, FaNetworkWired, FaServer, FaCodeBranch, FaCubes, FaBrain } from "react-icons/fa";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface SkillBadge {
    name: string;
    icon: React.ReactNode;
}

interface SkillCategory {
    title: string;
    skills: SkillBadge[];
}

function Badge({ name, icon, delay }: SkillBadge & { delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay }}
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-elev)]/60 px-3.5 py-2 text-sm text-[var(--fg-soft)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--bg-elev)] hover:text-[var(--fg)]"
        >
            <span className="text-base text-[var(--fg-soft)]">{icon}</span>
            <span>{name}</span>
        </motion.div>
    );
}

export default function SkillsSection() {
    const coreSubjects: SkillBadge[] = [
        { name: "Data Structures & Algorithms", icon: <FaCubes /> },
        { name: "Object-Oriented Programming", icon: <FaCodeBranch /> },
        { name: "Database Management Systems", icon: <FaDatabase /> },
        { name: "Computer Networks", icon: <FaNetworkWired /> },
        { name: "Operating Systems", icon: <FaServer /> },
        { name: "System Design", icon: <FaCubes /> },
        { name: "LLM Security Awareness", icon: <FaBrain /> },
    ];

    const categories: SkillCategory[] = [
        {
            title: "LANGUAGES",
            skills: [
                { name: "C++", icon: <SiCplusplus /> },
                { name: "Java", icon: <FaJava /> },
                { name: "Python", icon: <SiPython /> },
                { name: "JavaScript", icon: <SiJavascript /> },
                { name: "SQL", icon: <FaDatabase /> },
            ],
        },
        {
            title: "FRAMEWORKS & LIBRARIES",
            skills: [
                { name: "React", icon: <SiReact /> },
                { name: "Next.js", icon: <SiNextdotjs /> },
                { name: "Node.js", icon: <SiNodedotjs /> },
                { name: "Express.js", icon: <SiExpress /> },
                { name: "FastAPI", icon: <SiFastapi /> },
                { name: "Spring Boot", icon: <SiSpringboot /> },
                { name: "Socket.IO", icon: <SiSocketdotio /> },
                { name: "LangChain", icon: <SiLangchain /> },
                { name: "LangGraph", icon: <FaBrain /> },
            ],
        },
        {
            title: "DATABASES & SERVICES",
            skills: [
                { name: "MongoDB", icon: <SiMongodb /> },
                { name: "PostgreSQL", icon: <SiPostgresql /> },
                { name: "MySQL", icon: <SiMysql /> },
                { name: "Redis", icon: <SiRedis /> },
                { name: "Elasticsearch", icon: <SiElasticsearch /> },
            ],
        },
        {
            title: "DEVELOPER TOOLS",
            skills: [
                { name: "Git", icon: <SiGit /> },
                { name: "GitHub", icon: <SiGithub /> },
                { name: "Docker", icon: <SiDocker /> },
                { name: "CMake", icon: <SiCmake /> },
                { name: "Postman", icon: <SiPostman /> },
                { name: "Vercel", icon: <SiVercel /> },
                { name: "Render", icon: <SiRender /> },
            ],
        },
    ];

    return (
        <section className="py-20">
            {/* Core CS */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                className="mb-12"
            >
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-[var(--fg-faint)]">
                    Foundations
                </p>
                <h2 className="font-heading text-4xl text-[var(--fg)] sm:text-5xl mb-8">
                    <span className="brushstroke">Core</span>
                </h2>
                <div className="flex flex-wrap gap-3">
                    {coreSubjects.map((subject, i) => (
                        <Badge key={subject.name} {...subject} delay={i * 0.04} />
                    ))}
                </div>
            </motion.div>

            {/* Skills */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                className="mb-10 mt-16"
            >
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-[var(--fg-faint)]">
                    Toolkit
                </p>
                <h2 className="font-heading text-4xl text-[var(--fg)] sm:text-5xl">
                    <span className="brushstroke">Skills</span>
                </h2>
            </motion.div>

            <div className="space-y-10">
                {categories.map((category, catIndex) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: catIndex * 0.06 }}
                    >
                        <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--fg-faint)] mb-4">
                            {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {category.skills.map((skill, i) => (
                                <Badge key={skill.name} {...skill} delay={i * 0.03} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
