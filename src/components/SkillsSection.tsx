"use client";

import { motion } from "framer-motion";
import {
    SiCplusplus, SiPython, SiJavascript, SiReact,
    SiNodedotjs, SiExpress, SiSocketdotio, SiMongodb,
    SiGit, SiGithub, SiDocker,
    SiMysql, SiLangchain,
} from "react-icons/si";
import { FaBrain, FaDatabase, FaDesktop, FaServer, FaNetworkWired } from "react-icons/fa";
import TechSphere from "./TechSphere";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface SkillBadge {
    name: string;
    icon: React.ReactNode;
}

interface SkillCategory {
    title: string;
    color: string;
    skills: SkillBadge[];
}

function Badge({ name, icon, delay, color }: SkillBadge & { delay: number, color: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay }}
            whileHover={{ y: -2, scale: 1.02 }}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-elev)]/60 px-3.5 py-2 text-sm text-[var(--fg-soft)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--border-strong)] relative overflow-hidden group shadow-sm"
        >
            <div 
                className="absolute inset-y-0 left-0 w-1 transition-all duration-300 group-hover:w-full opacity-70 group-hover:opacity-[0.15] z-0" 
                style={{ backgroundColor: color }}
            />
            <span className="text-base z-10 transition-colors duration-300 drop-shadow-md" style={{ color: color }}>
                {icon}
            </span>
            <span className="z-10 font-medium group-hover:text-[var(--fg)] transition-colors duration-300">
                {name}
            </span>
        </motion.div>
    );
}

export default function SkillsSection() {
    const categories: SkillCategory[] = [
        {
            title: "LANGUAGES",
            color: "#a78bfa",
            skills: [
                { name: "C++",        icon: <SiCplusplus /> },
                { name: "Python",     icon: <SiPython /> },
                { name: "JavaScript", icon: <SiJavascript /> },
            ],
        },
        {
            title: "FRAMEWORKS & TOOLS",
            color: "#fbbf24",
            skills: [
                { name: "React",      icon: <SiReact /> },
                { name: "Node.js",    icon: <SiNodedotjs /> },
                { name: "Express.js", icon: <SiExpress /> },
                { name: "Socket.IO",  icon: <SiSocketdotio /> },
                { name: "LangChain",  icon: <SiLangchain /> },
                { name: "LangGraph",  icon: <FaBrain /> },
            ],
        },
        {
            title: "DATABASES",
            color: "#2dd4bf",
            skills: [
                { name: "MongoDB",    icon: <SiMongodb /> },
                { name: "MySQL",      icon: <SiMysql /> },
                { name: "ChromaDB",   icon: <FaDatabase /> },
            ],
        },
        {
            title: "DEVOPS & TOOLING",
            color: "#93c5fd",
            skills: [
                { name: "Git",    icon: <SiGit /> },
                { name: "GitHub", icon: <SiGithub /> },
                { name: "Docker", icon: <SiDocker /> },
            ],
        },
        {
            title: "CORE FUNDAMENTALS",
            color: "#f87171",
            skills: [
                { name: "Operating Systems", icon: <FaDesktop /> },
                { name: "DBMS",              icon: <FaServer /> },
                { name: "Computer Networks", icon: <FaNetworkWired /> },
            ],
        },
    ];

    return (
        <section className="py-24 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                className="mb-16 flex flex-col items-center text-center"
            >
                <p className="section-label mb-4">
                    Expertise
                </p>
                <h2 className="font-heading text-4xl text-[var(--fg)] sm:text-5xl">
                    <span className="brushstroke">Skills & Tools</span>
                </h2>
                
                <div className="mt-12 w-full flex justify-center">
                    <TechSphere />
                </div>
            </motion.div>

            <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6">
                {categories.map((category, catIndex) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: catIndex * 0.08 }}
                        className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden group transition-colors duration-500 hover:bg-[var(--bg-elev)]/80"
                    >
                        <div 
                            className="absolute top-0 left-0 bottom-0 w-1.5 opacity-80" 
                            style={{ backgroundColor: category.color }} 
                        />
                        <div 
                            className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-10 transition-opacity duration-500 group-hover:opacity-20 pointer-events-none"
                            style={{ backgroundColor: category.color }}
                        />
                        
                        <h3 
                            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-6 flex items-center gap-3" 
                            style={{ color: category.color }}
                        >
                            {category.title}
                            <span className="h-[1px] flex-1 opacity-20" style={{ backgroundColor: category.color }}></span>
                        </h3>
                        
                        <div className="flex flex-wrap gap-3 sm:gap-4 relative z-10">
                            {category.skills.map((skill, i) => (
                                <Badge key={skill.name} {...skill} delay={i * 0.04} color={category.color} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
