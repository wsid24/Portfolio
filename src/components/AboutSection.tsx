"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <section className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-heading text-4xl text-white mb-8">
                    <span className="brushstroke text-teal-400">About</span>
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="max-w-3xl text-base sm:text-lg leading-relaxed text-gray-400"
            >
                <p>
                    I&apos;m a passionate{" "}
                    <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-white font-medium">
                        competitive programmer
                    </span>{" "}
                    and{" "}
                    <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-white font-medium">
                        AI & Data Science engineer
                    </span>{" "}
                    who loves solving complex algorithmic challenges and building{" "}
                    <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-white font-medium">
                        full-stack applications
                    </span>
                    . With a strong foundation in data structures, algorithms, and system design,
                    I aim to create scalable solutions that make a real-world impact.
                    Currently pursuing my degree while actively competing on platforms like
                    LeetCode, Codeforces, and CodeChef.
                </p>
            </motion.div>
        </section>
    );
}
