"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCardProps {
    project: {
        name: string;
        description: string;
        techStack: string[];
        repoLink: string;
        liveLink?: string;
    };
    index: number;
    onClick: () => void;
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -5 }}
            onClick={onClick}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
        >
            <h3 className="mb-3 text-2xl font-bold text-white">{project.name}</h3>

            <p className="mb-4 text-gray-300 line-clamp-3">{project.description}</p>

            {/* Tech Stack */}
            <div className="mb-5 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                    <span
                        key={tech}
                        className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-medium text-cyan-300"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
                <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                >
                    <FaGithub />
                    <span>GitHub Repo</span>
                </a>

                {project.liveLink && (
                    <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    >
                        <FaExternalLinkAlt />
                        <span>Live Demo</span>
                    </a>
                )}
            </div>

            {/* Click indicator */}
            <p className="mt-4 text-xs text-gray-500 transition-colors group-hover:text-gray-400">
                Click for more details →
            </p>
        </motion.div>
    );
}
