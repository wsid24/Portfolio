"use client";

import { motion } from "framer-motion";
import {
    SiCplusplus, SiPython, SiJavascript, SiReact, SiNextdotjs,
    SiNodedotjs, SiExpress, SiSocketdotio, SiMongodb,
    SiGit, SiGithub, SiPostman, SiVercel, SiCmake, SiRender,
    SiTailwindcss, SiDocker
} from "react-icons/si";
import { FaJava, FaDatabase, FaNetworkWired, FaServer, FaCodeBranch, FaCubes } from "react-icons/fa";

interface SkillBadge {
    name: string;
    icon: React.ReactNode;
}

interface SkillCategory {
    title: string;
    skills: SkillBadge[];
}

function Badge({ name, icon }: SkillBadge) {
    return (
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3.5 py-2 text-sm text-gray-300 hover:bg-white/[0.06] transition-colors">
            <span className="text-base">{icon}</span>
            <span>{name}</span>
        </div>
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
    ];

    const categories: SkillCategory[] = [
        {
            title: "LANGUAGES",
            skills: [
                { name: "C++", icon: <SiCplusplus className="text-[#00599C]" /> },
                { name: "Java", icon: <FaJava className="text-[#007396]" /> },
                { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
                { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
            ],
        },
        {
            title: "FRAMEWORKS & LIBRARIES",
            skills: [
                { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
                { name: "Next.js", icon: <SiNextdotjs /> },
                { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
                { name: "Express.js", icon: <SiExpress /> },
                { name: "Socket.IO", icon: <SiSocketdotio /> },
                { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
            ],
        },
        {
            title: "DATABASES & SERVICES",
            skills: [
                { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
            ],
        },
        {
            title: "DEVELOPER TOOLS",
            skills: [
                { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
                { name: "GitHub", icon: <SiGithub /> },
                { name: "CMake", icon: <SiCmake className="text-[#064F8C]" /> },
                { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
                { name: "Vercel", icon: <SiVercel /> },
                { name: "Render", icon: <SiRender className="text-[#46E3B7]" /> },
                { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
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
                className="mb-16"
            >
                <h2 className="font-heading text-4xl text-white mb-8">
                    <span className="brushstroke text-teal-400">Core</span>
                </h2>
                <div className="flex flex-wrap gap-3">
                    {coreSubjects.map((subject) => (
                        <Badge key={subject.name} {...subject} />
                    ))}
                </div>
            </motion.div>

            {/* Skills */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-heading text-4xl text-white mb-10">
                    <span className="brushstroke text-teal-400">Skills</span>
                </h2>
            </motion.div>

            <div className="space-y-10">
                {categories.map((category, catIndex) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.05 }}
                    >
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">
                            {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {category.skills.map((skill) => (
                                <Badge key={skill.name} {...skill} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
