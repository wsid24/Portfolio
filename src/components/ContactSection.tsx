"use client";

import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaFileDownload, FaCopy, FaCheck } from "react-icons/fa";
import { useState } from "react";

interface ContactCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    link?: string;
    copyable?: boolean;
    download?: boolean;
    index: number;
}

function ContactCard({ icon, label, value, link, copyable, download, index }: ContactCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const content = (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -5 }}
            className="group relative flex h-40 flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]"
        >
            {/* Icon */}
            <div className="rounded-lg bg-cyan-500/15 p-3 text-cyan-400 transition-colors group-hover:bg-cyan-500/25">
                <div className="text-2xl">{icon}</div>
            </div>

            {/* Label */}
            <div className="text-center">
                <p className="text-sm font-medium text-gray-400">{label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{value}</p>
            </div>

            {/* Copy Button (for email/phone) */}
            {copyable && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleCopy();
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-400 transition-all duration-300 hover:bg-cyan-500/20"
                >
                    {copied ? <FaCheck className="text-xs" /> : <FaCopy className="text-xs" />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
            )}
        </motion.div>
    );

    if (link) {
        return (
            <a
                href={link}
                target={download ? undefined : "_blank"}
                rel={download ? undefined : "noopener noreferrer"}
                download={download}
            >
                {content}
            </a>
        );
    }

    return content;
}

export default function ContactSection() {
    const contacts = [
        {
            icon: <FaEnvelope />,
            label: "Email",
            value: "siddhantpwani@gmail.com",
            link: "mailto:siddhantpwani@gmail.com",
            copyable: true,
        },
        {
            icon: <FaPhone />,
            label: "Phone",
            value: "+91 8421036266",
            link: "tel:+918421036266",
            copyable: true,
        },
        {
            icon: <FaGithub />,
            label: "GitHub",
            value: "@wsid24",
            link: "https://github.com/wsid24",
        },
        {
            icon: <FaLinkedin />,
            label: "LinkedIn",
            value: "Siddhant Wani",
            link: "https://linkedin.com/in/siddhant-wani-6059972a5",
        },
        {
            icon: <FaFileDownload />,
            label: "Resume",
            value: "Download PDF",
            link: "/Resume_SiddhantWani.pdf",
            download: true,
        },
    ];

    return (
        <section className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
            >
                <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                    Get In Touch
                </h2>
                <p className="text-lg text-gray-400">
                    Open to internships and SDE opportunities
                </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {contacts.map((contact, index) => (
                    <ContactCard
                        key={contact.label}
                        icon={contact.icon}
                        label={contact.label}
                        value={contact.value}
                        link={contact.link}
                        copyable={contact.copyable}
                        download={contact.download}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}
