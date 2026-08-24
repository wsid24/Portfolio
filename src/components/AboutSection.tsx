"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaCode, FaChartLine, FaFlag, FaRocket } from "react-icons/fa";

const EASE = [0.16, 1, 0.3, 1] as const;

function AnimatedNumber({
  value,
  suffix = "",
  duration = 1800,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

interface LiveStats {
  totalSolved?: number;
  cfRating?: number;
  lcContests?: number;
}

export default function AboutSection() {
  const [live, setLive] = useState<LiveStats>({});

  useEffect(() => {
    Promise.all([
      fetch("/api/leetcode").then(r => r.json()).catch(() => null),
      fetch("/api/codeforces").then(r => r.json()).catch(() => null),
      fetch("/api/codechef").then(r => r.json()).catch(() => null),
      fetch("/api/atcoder").then(r => r.json()).catch(() => null),
    ]).then(([lc, cf, cc, ac]) => {
      let solved = 0;
      let contests = 0;

      if (lc) { solved += (lc.totalSolved || 0); contests += (lc.contestsAttended || 0); }
      if (cf) contests += (cf.contests || 0);
      if (cc) { solved += (cc.totalProblemsSolved || 0); contests += (cc.contestsParticipated || 0); }
      if (ac) contests += (ac.contests || 0);

      if (solved === 0) solved = 1299;
      if (contests === 0) contests = 120;

      setLive({
        totalSolved: Math.ceil(solved / 500) * 500,
        lcContests: Math.ceil(contests / 50) * 50,
        cfRating: cf?.rating ?? 1812,
      });
    });
  }, []);

  const stats = [
    {
      label: "Problems Solved",
      value: live.totalSolved ?? 900,
      suffix: "+",
      icon: <FaCode />,
      color: "var(--accent)",
    },
    {
      label: "Codeforces Rating",
      value: live.cfRating ?? 1812,
      suffix: "",
      icon: <FaChartLine />,
      color: "#fbbf24",
    },
    {
      label: "Contests Participated",
      value: live.lcContests ?? 37,
      suffix: "+",
      icon: <FaFlag />,
      color: "#2dd4bf",
    },
    {
      label: "Hackathon Participations",
      value: 3,
      suffix: "",
      icon: <FaRocket />,
      color: "#f9a8d4",
    },
  ];

  const keywords = [
    "Data Structures", "Algorithms", "System Design",
    "Operating Systems", "DBMS", "Computer Networks",
    "React", "Node.js", "OOP", "AI/ML", "DSA",
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--accent)]" />
              <span className="section-label">About Me</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--fg)] mb-6 leading-tight">
              Building intelligent systems and{" "}
              <span className="relative inline-block">
                <span className="brushstroke-underline">optimizing algorithms.</span>
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[var(--fg-soft)] leading-relaxed mb-5">
              I am a{" "}
              <span className="text-[var(--fg)] font-semibold border-b border-[var(--accent)]/60">
                Full-Stack Engineer
              </span>{" "}
              and{" "}
              <span className="text-[var(--fg)] font-semibold border-b border-[var(--accent-warm)]/60">
                Competitive Programmer
              </span>{" "}
              focused on building scalable AI-powered systems and solving hard algorithmic problems. My journey started with a deep fascination for competitive programming — Codeforces Expert, LeetCode Guardian.
            </p>

            <p className="text-base sm:text-lg text-[var(--fg-soft)] leading-relaxed mb-8">
              I channel that analytical mindset into engineering fast, robust backend systems and intuitive full-stack applications — from RAG pipelines and AI agents to real-time collaborative tools.
            </p>

            <div className="flex flex-wrap gap-2">
              {keywords.map((kw, i) => (
                <motion.span
                  key={kw}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                  className="rounded-full border border-[var(--border)] bg-[var(--bg-soft)] px-3.5 py-1.5 text-xs font-medium text-[var(--fg-soft)]"
                >
                  {kw}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right column — stat cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: EASE }}
                className="flex flex-col p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] transition-all duration-300 hover:border-[var(--border-strong)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]"
              >
                <div
                  className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] text-sm"
                  style={{ color: stat.color }}
                >
                  {stat.icon}
                </div>
                <p className="font-heading text-3xl font-bold text-[var(--fg)] leading-none mb-1">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs font-medium text-[var(--fg-faint)] leading-snug">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
