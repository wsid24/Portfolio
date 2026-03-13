"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";

interface Project {
    name: string;
    description: string;
    techStack: string[];
    repoLink: string;
    liveLink?: string;
    imageUrl?: string;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm grid grid-cols-1 md:grid-cols-2"
        >
            {/* Preview */}
            <div className="relative h-56 md:h-64 bg-gradient-to-br from-white/[0.03] to-white/[0.01] flex items-center justify-center overflow-hidden">
                {project.imageUrl ? (
                    <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-600">
                        <HiOutlinePhotograph className="text-4xl" />
                        <span className="text-xs uppercase tracking-wider">Preview</span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">{project.name}</h3>
                        <div className="flex items-center gap-2 ml-3 mt-1">
                            <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                <FaGithub className="text-lg" />
                            </a>
                            {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                    <FaExternalLinkAlt className="text-sm" />
                                </a>
                            )}
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="rounded-md border border-white/5 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-gray-400"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function ProjectsSection() {
    const projects: Project[] = [
        {
            name: "Rubik's Cube Solver",
            description:
                "Built virtual 3x3 cube simulator with optimized state representation. Implemented BFS, DFS, IDDFS and Korf's IDA* search algorithms. Solves most scrambles under 10 seconds.",
            techStack: ["C++", "CMake", "IDA*", "BFS", "DFS"],
            repoLink: "https://github.com/wsid24/rubiks_cube",
            imageUrl: "/rubik.jpg",
        },
        {
            name: "Real-Time Collaborative Whiteboard",
            description:
                "Multi-user real-time drawing board with WebSocket-based synchronization. Features JWT authentication, REST APIs with database persistence, and sub-second latency.",
            techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO"],
            repoLink: "https://github.com/wsid24/WB",
            liveLink: "https://collaborativewhiteboard-five.vercel.app",
            imageUrl: "/WB.png",
        },
    ];

    return (
        <section className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
            >
                <h2 className="font-heading text-4xl text-white">
                    <span className="brushstroke-underline text-red-400">Projects</span>
                </h2>
            </motion.div>

            <div className="space-y-6">
                {projects.map((project, index) => (
                    <ProjectCard key={project.name} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}
