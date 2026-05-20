"use client";

import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useRef } from "react";

interface Project {
    name: string;
    tagline: string;
    description: string;
    techStack: string[];
    repoLink: string;
    liveLink?: string;
    imageUrl?: string;
    badge?: string;
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const fromLeft = index % 2 === 0;
    const ref = useRef<HTMLElement | null>(null);

    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), {
        stiffness: 220, damping: 22, mass: 0.4,
    });
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), {
        stiffness: 220, damping: 22, mass: 0.4,
    });

    const spotlightX = useTransform(mouseX, (v) => `${v * 100}%`);
    const spotlightY = useTransform(mouseY, (v) => `${v * 100}%`);
    const spotlightBg = useMotionTemplate`radial-gradient(420px circle at ${spotlightX} ${spotlightY}, var(--spotlight-color), transparent 60%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, x: fromLeft ? -40 : 40, y: 24 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: index * 0.05 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                transformPerspective: 1200,
                ["--spotlight-color" as string]: "rgba(0,0,0,0.06)",
            }}
            className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)]/60 backdrop-blur-sm transition-[border-color,box-shadow] duration-500 hover:border-[var(--border-strong)] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.18)] dark:[--spotlight-color:rgba(255,255,255,0.08)] dark:hover:shadow-[0_30px_60px_-30px_rgba(255,255,255,0.12)]"
        >
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: spotlightBg }}
            />

            <div
                className="relative grid grid-cols-1 md:grid-cols-5"
                style={{ transform: "translateZ(40px)" }}
            >
                {/* Preview side */}
                <div className="relative h-56 overflow-hidden border-b border-[var(--border)] bg-gradient-to-br from-[var(--bg-soft)] to-transparent md:col-span-2 md:h-auto md:min-h-[280px] md:border-b-0 md:border-r">
                    {project.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.06]"
                        />
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] text-[var(--fg-faint)]">
                                <HiOutlinePhotograph className="text-2xl" />
                            </div>
                            <p className="font-heading text-2xl text-[var(--fg-soft)]">
                                {project.name.split(" ")[0]}
                            </p>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--fg-dim)]">
                                {project.badge ?? "Project"}
                            </p>
                        </div>
                    )}
                </div>

                {/* Info side */}
                <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 md:col-span-3">
                    <div>
                        <div className="mb-3 flex items-start justify-between gap-4">
                            <div>
                                {project.badge && (
                                    <p className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-soft)] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--fg-soft)]">
                                        <span className="h-1 w-1 rounded-full bg-[var(--fg-faint)]" />
                                        {project.badge}
                                    </p>
                                )}
                                <h3 className="font-heading text-2xl text-[var(--fg)] sm:text-3xl">
                                    {project.name}
                                </h3>
                                <p className="mt-1 text-sm text-[var(--fg-faint)]">{project.tagline}</p>
                            </div>

                            <div className="mt-1 flex shrink-0 items-center gap-2">
                                <a
                                    href={project.repoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub repository"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-soft)] text-[var(--fg-soft)] transition-all hover:border-[var(--border-strong)] hover:bg-[var(--bg-elev)] hover:text-[var(--fg)]"
                                >
                                    <FaGithub className="text-base" />
                                </a>
                                {project.liveLink && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Live demo"
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--fg)] text-[var(--bg)] transition-all hover:scale-110"
                                    >
                                        <FaExternalLinkAlt className="text-xs" />
                                    </a>
                                )}
                            </div>
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-[var(--fg-soft)]">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-md border border-[var(--border)] bg-[var(--bg-soft)] px-2.5 py-1 text-[11px] font-medium tracking-wide text-[var(--fg-soft)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

export default function ProjectsSection() {
    const projects: Project[] = [
        {
            name: "DBQueryGPT",
            tagline: "Natural-language → SQL agent",
            description:
                "Agentic RAG pipeline orchestrated by LangGraph with an LLM-as-Judge self-reflection loop and human-in-the-loop interrupts. Hybrid retrieval (BM25 + cosine) over ChromaDB with schema-aware pruning, sustaining 1,000+ daily queries at sub-100ms latency.",
            techStack: ["Python", "LangGraph", "LangChain", "Gemini", "ChromaDB", "FastAPI", "MySQL", "React"],
            repoLink: "https://github.com/wsid24/DBQueryGPT",
            imageUrl: "/dbquerygpt.png",
            badge: "AI / RAG",
        },
        {
            name: "CourseForge",
            tagline: "Text-to-Course generation platform",
            description:
                "Multi-stage GenAI pipeline that turns a free-text topic into a structured 3–6 module course with quizzes, code samples, and YouTube references. Provider fallback (Groq → Gemini) with circuit breakers, Redis caching, and Auth0-gated REST API. 99%+ JSON integrity across 500+ runs.",
            techStack: ["React", "Node.js", "Groq", "Gemini", "MongoDB", "Redis", "Auth0", "LangChain"],
            repoLink: "https://github.com/wsid24/Text-To-Course",
            liveLink: "https://text2course-nu.vercel.app",
            imageUrl: "/courseforge.png",
            badge: "Full-stack · GenAI",
        },
        {
            name: "Orchestrate AI Support Agent",
            tagline: "HackerRank Orchestrate Hackathon — Rank 151 / 1,349",
            description:
                "Production-grade support agent over HackerRank, Claude, and Visa docs only. Hybrid semantic + keyword retrieval, second-LLM self-audit before every reply, 3-strike escalation to a human, and per-tier model selection for cost. Built in 24h; defended in a 30-min AI-judge interview with full repo access.",
            techStack: ["Python", "LangChain", "ChromaDB", "Llama 3", "Groq", "Hybrid Retrieval"],
            repoLink: "https://github.com/wsid24/orchestrate_hackerrank",
            liveLink: "https://www.linkedin.com/feed/update/urn:li:activity:7460983995749715970/",
            imageUrl: "/orchestrate.png",
            badge: "Hackathon · AI Agent",
        },
        {
            name: "Collaborative Board — SLATE",
            tagline: "Think · sketch · ship — together",
            description:
                "Real-time multi-user infinite canvas with WebSocket-synced cursors, JWT-authenticated REST APIs, and room-based broadcast over Socket.IO. MongoDB-backed persistence supports 10+ concurrent editors with <1s sync latency on a free-tier Render + Vercel deploy.",
            techStack: ["React", "Node.js", "Express", "Socket.IO", "MongoDB", "JWT"],
            repoLink: "https://github.com/wsid24/WB",
            liveLink: "https://collaborativewhiteboard-five.vercel.app",
            imageUrl: "/slate.png",
            badge: "Full-stack · Real-time",
        },
        {
            name: "Rubik's Cube Solver",
            tagline: "IDA* search on a 3×3 state space",
            description:
                "Virtual 3×3 cube simulator with optimized bit-packed state representation. Implemented BFS, DFS, IDDFS and Korf's IDA* with pattern-database heuristics — solves most scrambles under 10 seconds.",
            techStack: ["C++", "CMake", "IDA*", "BFS", "DFS"],
            repoLink: "https://github.com/wsid24/rubiks_cube",
            imageUrl: "/rubik.jpg",
            badge: "Algorithms · C++",
        },
    ];

    return (
        <section className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                className="mb-12"
            >
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-[var(--fg-faint)]">
                    Selected Work
                </p>
                <h2 className="font-heading text-4xl text-[var(--fg)] sm:text-5xl">
                    <span className="brushstroke-underline">Projects</span>
                </h2>
            </motion.div>

            <div className="space-y-6 [perspective:1200px]">
                {projects.map((project, index) => (
                    <ProjectCard key={project.name} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}
