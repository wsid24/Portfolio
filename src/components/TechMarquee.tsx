"use client";

import {
    SiCplusplus, SiPython, SiJavascript, SiReact, SiNextdotjs,
    SiNodedotjs, SiExpress, SiSocketdotio, SiMongodb,
    SiPostgresql, SiMysql, SiRedis, SiDocker, SiFastapi,
    SiLangchain, SiElasticsearch, SiVercel, SiGit, SiSpringboot
} from "react-icons/si";
import { FaJava, FaShieldAlt, FaBrain } from "react-icons/fa";

const items: { name: string; icon: React.ReactNode }[] = [
    { name: "C++", icon: <SiCplusplus /> },
    { name: "Python", icon: <SiPython /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "Java", icon: <FaJava /> },
    { name: "React", icon: <SiReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Node.js", icon: <SiNodedotjs /> },
    { name: "Express", icon: <SiExpress /> },
    { name: "FastAPI", icon: <SiFastapi /> },
    { name: "Spring Boot", icon: <SiSpringboot /> },
    { name: "Socket.IO", icon: <SiSocketdotio /> },
    { name: "LangChain", icon: <SiLangchain /> },
    { name: "LangGraph", icon: <FaBrain /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "PostgreSQL", icon: <SiPostgresql /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "Redis", icon: <SiRedis /> },
    { name: "Elasticsearch", icon: <SiElasticsearch /> },
    { name: "Docker", icon: <SiDocker /> },
    { name: "Git", icon: <SiGit /> },
    { name: "Vercel", icon: <SiVercel /> },
    { name: "OWASP Top 10", icon: <FaShieldAlt /> },
];

function Row() {
    return (
        <ul className="flex shrink-0 items-center gap-10 px-5">
            {items.map((it) => (
                <li
                    key={it.name}
                    className="flex items-center gap-2 text-sm text-[var(--fg-faint)] transition-colors hover:text-[var(--fg)]"
                >
                    <span className="text-base">{it.icon}</span>
                    <span className="tracking-wide">{it.name}</span>
                </li>
            ))}
        </ul>
    );
}

export default function TechMarquee() {
    return (
        <div className="relative my-16 w-full overflow-hidden border-y border-[var(--border)] py-5 fade-mask-x">
            <style>{`
                @keyframes marquee-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-track {
                    display: flex;
                    width: max-content;
                    animation: marquee-scroll 45s linear infinite;
                }
                .marquee-track:hover {
                    animation-play-state: paused;
                }
            `}</style>
            <div className="marquee-track">
                <Row />
                <Row />
            </div>
        </div>
    );
}
