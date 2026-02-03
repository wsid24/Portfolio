"use client";

import { motion } from "framer-motion";
import { FaTrophy, FaExternalLinkAlt, FaFilePdf } from "react-icons/fa";

interface AchievementCardProps {
    title: string;
    detail: string;
    metric?: string;
    proofLink?: string;
    certificateLink?: string;
    highlight?: "purple" | "cyan" | "none";
    index: number;
    isLarge?: boolean;
}

export default function AchievementCard({
    title,
    detail,
    metric,
    proofLink,
    certificateLink,
    highlight = "none",
    index,
    isLarge = false,
}: AchievementCardProps) {
    const highlightStyles = {
        purple: {
            border: "border-purple-500/40",
            glow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
            text: "text-purple-300",
            iconBg: "bg-purple-500/15",
        },
        cyan: {
            border: "border-cyan-500/40",
            glow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]",
            text: "text-cyan-300",
            iconBg: "bg-cyan-500/15",
        },
        none: {
            border: "border-white/10",
            glow: "hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]",
            text: "text-cyan-400",
            iconBg: "bg-cyan-500/10",
        },
    };

    const styles = highlightStyles[highlight];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -5 }}
            className={`rounded-xl border ${styles.border} bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 ${styles.glow} h-full flex flex-col`}
        >
            {/* Icon */}
            <div className="mb-4">
                <FaTrophy className={`text-3xl ${styles.text}`} />
            </div>

            {/* Title */}
            <h3 className={`mb-2 text-xl font-bold ${styles.text}`}>{title}</h3>

            {/* Metric */}
            {metric && <p className="mb-2 text-lg font-semibold text-white">{metric}</p>}

            {/* Detail */}
            <p className="mb-4 text-sm text-gray-400">{detail}</p>

            {/* Buttons */}
            <div className="mt-auto flex flex-wrap gap-3">
                {proofLink && (
                    <a
                        href={proofLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-lg border ${styles.border} ${styles.iconBg
                            } px-4 py-2 text-sm font-medium ${styles.text
                            } transition-all duration-300 hover:bg-opacity-30 ${styles.glow}`}
                    >
                        <FaExternalLinkAlt className="text-xs" />
                        <span>View Proof</span>
                    </a>
                )}

                {certificateLink && (
                    <a
                        href={certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-lg border ${styles.border} ${styles.iconBg
                            } px-4 py-2 text-sm font-medium ${styles.text
                            } transition-all duration-300 hover:bg-opacity-30 ${styles.glow}`}
                    >
                        <FaFilePdf className="text-xs" />
                        <span>View Certificate</span>
                    </a>
                )}
            </div>
        </motion.div>
    );
}
