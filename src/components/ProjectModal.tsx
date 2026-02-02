"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { useEffect } from "react";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        name: string;
        description: string;
        detailedDescription?: string;
        techStack: string[];
        repoLink: string;
        liveLink?: string;
    };
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900/95 p-8 shadow-2xl backdrop-blur-lg"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <FaTimes className="text-xl" />
                            </button>

                            {/* Content */}
                            <h2 className="mb-4 pr-8 text-3xl font-bold text-white">{project.name}</h2>

                            <p className="mb-6 text-lg text-gray-300">{project.description}</p>

                            {/* Detailed Description Placeholder */}
                            {project.detailedDescription && (
                                <div className="mb-6">
                                    <h3 className="mb-3 text-xl font-semibold text-cyan-300">Details</h3>
                                    <p className="text-gray-300 whitespace-pre-line">{project.detailedDescription}</p>
                                </div>
                            )}

                            {/* Tech Stack */}
                            <div className="mb-6">
                                <h3 className="mb-3 text-xl font-semibold text-cyan-300">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full bg-cyan-500/15 px-3 py-1.5 text-sm font-medium text-cyan-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Links */}
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={project.repoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-5 py-2.5 font-medium text-cyan-400 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                                >
                                    <FaGithub className="text-lg" />
                                    <span>View Repository</span>
                                </a>

                                {project.liveLink && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-5 py-2.5 font-medium text-cyan-400 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                                    >
                                        <FaExternalLinkAlt className="text-lg" />
                                        <span>Live Demo</span>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
