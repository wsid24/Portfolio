"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 600);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    key="scroll-top"
                    initial={{ opacity: 0, y: 16, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.85 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Scroll to top"
                    title="Back to top"
                    className="group fixed bottom-6 right-6 z-[55] flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--fg)] text-[var(--bg)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] backdrop-blur-md transition-transform hover:scale-110"
                >
                    <FaArrowUp className="text-sm transition-transform group-hover:-translate-y-0.5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
