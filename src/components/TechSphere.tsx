"use client";

import { useEffect, useRef, useCallback } from "react";

import {
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
  SiDocker,
  SiGit,
  SiGithub,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiVercel,
  SiFastapi,
  SiOpenai,
  SiLinux,
  SiGnubash,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiFigma,
  SiPostman,
  SiVite
} from "react-icons/si";

interface Tag {
  Icon: React.ElementType;
  color: string;
}

const TAGS: Tag[] = [
  { Icon: SiCplusplus, color: "#00599C" },
  { Icon: SiPython, color: "#3776AB" },
  { Icon: SiJavascript, color: "#F7DF1E" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: SiReact, color: "#61DAFB" },
  { Icon: SiNextdotjs, color: "var(--fg)" },
  { Icon: SiNodedotjs, color: "#339933" },
  { Icon: SiExpress, color: "var(--fg)" },
  { Icon: SiSocketdotio, color: "var(--fg)" },
  { Icon: SiDocker, color: "#2496ED" },
  { Icon: SiGit, color: "#F05032" },
  { Icon: SiGithub, color: "var(--fg)" },
  { Icon: SiMongodb, color: "#47A248" },
  { Icon: SiMysql, color: "#4479A1" },
  { Icon: SiPostgresql, color: "#4169E1" },
  { Icon: SiRedis, color: "#DC382D" },
  { Icon: SiVercel, color: "var(--fg)" },
  { Icon: SiFastapi, color: "#009688" },
  { Icon: SiOpenai, color: "#10A37F" },
  { Icon: SiLinux, color: "#FCC624" },
  { Icon: SiGnubash, color: "#4EAA25" },
  { Icon: SiTailwindcss, color: "#06B6D4" },
  { Icon: SiFigma, color: "#F24E1E" },
  { Icon: SiPostman, color: "#FF6C37" },
  { Icon: SiVite, color: "#646CFF" },
];

const N = TAGS.length;
const RADIUS = 145;

// Fibonacci sphere — fixed base positions (unit sphere)
const BASE: { x: number; y: number; z: number }[] = TAGS.map((_, i) => {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
  const theta = golden * i;
  return {
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
});

export default function TechSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const rotRef = useRef(0);          // Y-rotation in radians
  const mouseRef = useRef({ dx: 0, dy: 0 }); // tilt from mouse (radians)
  const isHoveringRef = useRef(false);

  const project = useCallback((rotY: number, tiltX: number, tiltY: number) => {
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosX = Math.cos(tiltX);
    const sinX = Math.sin(tiltX);
    const cosYt = Math.cos(tiltY);
    const sinYt = Math.sin(tiltY);

    return BASE.map((b) => {
      // 1. Rotate around world Y (auto-spin)
      let x = b.x * cosY + b.z * sinY;
      let y = b.y;
      let z = -b.x * sinY + b.z * cosY;

      // 2. Tilt from mouse — X axis
      const y2 = y * cosX - z * sinX;
      const z2 = y * sinX + z * cosX;
      y = y2; z = z2;

      // 3. Tilt from mouse — Y axis
      const x3 = x * cosYt + z * sinYt;
      const z3 = -x * sinYt + z * cosYt;
      x = x3; z = z3;

      // Project: z in [-1,1] → opacity/scale
      const depth = (z + 1) / 2; // 0 = back, 1 = front
      return {
        x: x * RADIUS,
        y: y * RADIUS,
        z: z,
        opacity: 0.15 + depth * 0.85,
        scale: 0.6 + depth * 0.55,
      };
    });
  }, []);

  useEffect(() => {
    const tick = () => {
      if (!isHoveringRef.current) {
        rotRef.current += 0.004; // slow, smooth auto-rotate
      }
      const newProj = project(rotRef.current, mouseRef.current.dy, mouseRef.current.dx);
      
      newProj.forEach((p, i) => {
        const el = itemRefs.current[i];
        if (el) {
          el.style.transform = `translate(-50%, -50%) translate3d(${p.x}px, ${p.y}px, ${p.z}px) scale(${p.scale})`;
          el.style.opacity = p.opacity.toString();
          el.style.zIndex = Math.round(p.z * 100).toString();
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [project]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseRef.current = {
      dx: nx * 0.35,  // tilt strength
      dy: ny * -0.35,
    };
  };

  const handleMouseLeave = () => {
    // Smoothly return tilt to zero
    const ease = () => {
      mouseRef.current.dx *= 0.92;
      mouseRef.current.dy *= 0.92;
      if (Math.abs(mouseRef.current.dx) > 0.001 || Math.abs(mouseRef.current.dy) > 0.001) {
        requestAnimationFrame(ease);
      } else {
        mouseRef.current = { dx: 0, dy: 0 };
      }
    };
    isHoveringRef.current = false;
    ease();
  };

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-[350px] w-full max-w-[350px] items-center justify-center sm:h-[420px] sm:max-w-[420px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ perspective: "1200px" }}
    >
      {/* Central glow core */}
      <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/10 blur-[40px]" />
      
      {TAGS.map((tag, i) => {
        const { Icon, color } = tag;

        return (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="absolute top-1/2 left-1/2 flex items-center justify-center transition-all duration-300 hover:scale-125 drop-shadow-xl will-change-transform"
            style={{
              color: color,
              filter: `drop-shadow(0 0 8px ${color}60)`,
            }}
          >
            <Icon className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
        );
      })}
    </div>
  );
}
