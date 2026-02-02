"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaFileDownload, FaEnvelope } from "react-icons/fa";
import BackgroundLines from "./BackgroundLines";

export default function HeroSection() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
            <BackgroundLines />

            <div className="container relative z-10 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    {/* Left Column: Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex justify-center lg:justify-end"
                    >
                        <div className="relative group">
                            {/* Cyan Glow Effect */}
                            <div className="absolute -inset-4 rounded-full bg-cyan-500/20 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />

                            {/* Glass Border Ring */}
                            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 blur-sm" />

                            {/* Image Container */}
                            <div className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-500/30 md:h-80 md:w-80 lg:h-[320px] lg:w-[320px]">
                                <Image
                                    src="/profile.png"
                                    alt="Siddhant Wani"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Content */}
                    <div className="text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="max-w-3xl space-y-6"
                        >
                            <h1 className="mb-4 text-6xl font-bold tracking-tight text-white md:text-7xl">
                                Siddhant Wani
                            </h1>

                            <h2 className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 bg-clip-text text-lg font-semibold text-transparent md:text-xl lg:text-2xl">
                                AI & Data Science Engineer | Competitive Programmer | Full-Stack Developer
                            </h2>

                            <p className="text-base leading-relaxed text-gray-300 md:text-lg">
                                I am a third-year Artificial Intelligence and Data Science student passionate about solving complex algorithmic problems and building scalable real-world applications. With strong foundations in Data Structures & Algorithms and hands-on experience in C++ and the MERN stack, I enjoy combining efficient system design with practical implementation while mentoring peers and exploring emerging technologies like Large Language Models to build clean, impactful solutions.
                            </p>
                        </motion.div>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-wrap justify-center gap-4 pt-4 lg:justify-start"
                        >
                            <a
                                href="https://github.com/wsid24"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-6 py-3 font-medium text-cyan-400 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                            >
                                <FaGithub className="text-xl" />
                                <span>GitHub</span>
                            </a>

                            <a
                                href="https://linkedin.com/in/siddhant-wani-6059972a5"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-6 py-3 font-medium text-cyan-400 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                            >
                                <FaLinkedin className="text-xl" />
                                <span>LinkedIn</span>
                            </a>

                            <a
                                href="/Resume_SiddhantWani.pdf"
                                download
                                className="group inline-flex items-center gap-2 rounded-lg border border-purple-500/50 bg-purple-500/10 px-6 py-3 font-medium text-purple-400 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:bg-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                            >
                                <FaFileDownload className="text-xl" />
                                <span>Resume</span>
                            </a>

                            <button
                                onClick={() => {
                                    document.querySelector('#contact')?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="group inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            >
                                <FaEnvelope className="text-xl" />
                                <span>Contact</span>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
