"use client";

import { motion } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function AboutSection() {
    return (
        <section className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                className="mb-8"
            >
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-[var(--fg-faint)]">
                    Profile
                </p>
                <h2 className="font-heading text-4xl text-[var(--fg)] sm:text-5xl">
                    <span className="brushstroke">About</span>
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.1 }}
                className="max-w-3xl text-base leading-relaxed text-[var(--fg-soft)] sm:text-lg"
            >
                <p>
                    I live at the intersection of{" "}
                    <span className="rounded-md bg-black/[0.06] px-1.5 py-0.5 font-medium text-[var(--fg)] dark:bg-white/[0.08]">
                        DSA &amp; competitive programming
                    </span>
                    ,{" "}
                    <span className="rounded-md bg-black/[0.06] px-1.5 py-0.5 font-medium text-[var(--fg)] dark:bg-white/[0.08]">
                        full-stack engineering
                    </span>
                    , and{" "}
                    <span className="rounded-md bg-black/[0.06] px-1.5 py-0.5 font-medium text-[var(--fg)] dark:bg-white/[0.08]">
                        GenAI systems
                    </span>
                    . As a{" "}
                    <span className="rounded-md bg-black/[0.06] px-1.5 py-0.5 font-medium text-[var(--fg)] dark:bg-white/[0.08]">
                        Codeforces Expert
                    </span>{" "}
                    and LeetCode Guardian I solve problems daily — the same instinct shows
                    up when I design REST APIs, build real-time WebSocket systems, or
                    architect agentic RAG pipelines with LangGraph. I care about clean
                    algorithms, secure auth, and shipping AI features that don&apos;t
                    hallucinate in production.
                </p>
            </motion.div>
        </section>
    );
}
