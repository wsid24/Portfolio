"use client";
import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiCplusplus,
  SiFramer,
  SiFirebase,
  SiMongodb,
  SiPostgresql,
  SiDocker,
} from "react-icons/si";

const TECH_STACK = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Python", icon: SiPython },
  { name: "C++", icon: SiCplusplus },
  { name: "Framer Motion", icon: SiFramer },
  { name: "Firebase", icon: SiFirebase },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Docker", icon: SiDocker },
];

export default function TechMarquee() {
  const row1Stack = [...TECH_STACK];
  const row2Stack = [...TECH_STACK].reverse();

  // Duplicating to create seamless marquee loop
  const row1 = [...row1Stack, ...row1Stack, ...row1Stack];
  const row2 = [...row2Stack, ...row2Stack, ...row2Stack];

  return (
    <div className="w-full border-y border-[var(--border)] py-6 fade-mask-x overflow-hidden flex flex-col gap-6 bg-transparent">
      {/* Row 1: Left scrolling */}
      <div className="flex w-max marquee-track-left">
        {row1.map((tech, i) => (
          <div
            key={`r1-${i}`}
            className="group flex w-48 flex-none items-center justify-center gap-3 px-4 transition-colors duration-300 hover:text-[var(--accent)] text-[var(--fg-dim)]"
          >
            <tech.icon className="text-xl transition-transform duration-300 group-hover:scale-110 group-hover:text-current" />
            <span className="text-sm font-medium tracking-wide">{tech.name}</span>
          </div>
        ))}
      </div>

      {/* Row 2: Right scrolling */}
      <div className="flex w-max marquee-track-right">
        {row2.map((tech, i) => (
          <div
            key={`r2-${i}`}
            className="group flex w-48 flex-none items-center justify-center gap-3 px-4 transition-colors duration-300 hover:text-[var(--accent)] text-[var(--fg-dim)]"
          >
            <tech.icon className="text-xl transition-transform duration-300 group-hover:scale-110 group-hover:text-current" />
            <span className="text-sm font-medium tracking-wide">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
