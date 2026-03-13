"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from "react-icons/fa";

export default function Footer() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const formatted = now.toLocaleTimeString("en-IN", {
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZone: "Asia/Kolkata",
            });
            setTime(formatted.toUpperCase() + " IST");
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="border-t border-white/[0.06] py-16">
            <div className="flex flex-col items-center gap-8">
                {/* Social Icons + Resume */}
                <div className="flex items-center gap-5">
                    <a href="https://github.com/wsid24" target="_blank" rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors text-lg">
                        <FaGithub />
                    </a>
                    <a href="https://linkedin.com/in/siddhant-wani-6059972a5" target="_blank" rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors text-lg">
                        <FaLinkedin />
                    </a>
                    <a href="mailto:siddhantpwani@gmail.com"
                        className="text-gray-500 hover:text-white transition-colors text-lg">
                        <FaEnvelope />
                    </a>

                    <a
                        href="https://drive.google.com/file/d/1iURHR70w8TE5m4nsQcFbM0ehokiUtC_r/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 ml-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                    >
                        <FaFileAlt className="text-xs" />
                        Resume
                    </a>
                </div>

                {/* Live Clock */}
                <p className="font-mono text-lg text-gray-500 tracking-widest">{time}</p>

                {/* Copyright */}
                <p className="text-xs text-gray-600">© 2026 Siddhant Wani</p>
            </div>
        </footer>
    );
}
