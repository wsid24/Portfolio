"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

interface Project {
    name: string;
    description: string;
    detailedDescription?: string;
    techStack: string[];
    repoLink: string;
    liveLink?: string;
}

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const projects: Project[] = [
        {
            name: "Rubik's Cube Solver",
            description:
                "Built virtual 3x3 cube simulator with optimized state representation. Implemented BFS, DFS, IDDFS and Korf's IDA* search algorithms. Solves most scrambles under 10 seconds.",
            detailedDescription: "", // Placeholder for later
            techStack: ["C++", "CMake", "IDA*", "BFS", "DFS"],
            repoLink: "https://github.com/wsid24/rubiks_cube",
        },
        {
            name: "Real-Time Collaborative Whiteboard",
            description:
                "Multi-user real-time drawing board with WebSocket-based synchronization. Features JWT authentication, REST APIs with database persistence, and sub-second latency. Deployed on Vercel and Render.",
            detailedDescription: "", // Placeholder for later
            techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO"],
            repoLink: "https://github.com/wsid24/WB",
            liveLink: "https://collaborativewhiteboard-five.vercel.app",
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
                <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">Projects</h2>
                <p className="text-lg text-gray-400">
                    Featured projects demonstrating technical expertise
                </p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.name}
                        project={project}
                        index={index}
                        onClick={() => setSelectedProject(project)}
                    />
                ))}
            </div>

            {/* Modal */}
            {selectedProject && (
                <ProjectModal
                    isOpen={!!selectedProject}
                    onClose={() => setSelectedProject(null)}
                    project={selectedProject}
                />
            )}
        </section>
    );
}
