"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronDown, FaMapMarkerAlt, FaBolt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import Image from "next/image";
import { useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
const ROLES = ["Full-Stack Engineer", "Competitive Programmer", "AI/ML Engineer"];

function useTypewriter(words: string[], speed = 75, pause = 2200) {
  const [displayed, setDisplayed] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[wi];
    let t: ReturnType<typeof setTimeout>;
    if (!del && ci < word.length) {
      t = setTimeout(() => { setDisplayed(word.slice(0, ci + 1)); setCi(c => c + 1); }, speed);
    } else if (!del && ci === word.length) {
      t = setTimeout(() => setDel(true), pause);
    } else if (del && ci > 0) {
      t = setTimeout(() => { setDisplayed(word.slice(0, ci - 1)); setCi(c => c - 1); }, speed / 2);
    } else {
      setDel(false);
      setWi(i => (i + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);

  return displayed;
}

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: true, timeZone: "Asia/Kolkata",
      }).toUpperCase());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

interface LCData {
  totalSolved: number;
  rating: number | null;
  ranking: number;
  contestsAttended: number;
  latestSolvedProblem?: { title: string; titleSlug: string } | null;
}

interface CFData {
  rating: number;
  rank: string;
}

export default function HeroSection() {
  const clock = useClock();
  const role = useTypewriter(ROLES);
  const [lcData, setLcData] = useState<LCData | null>(null);
  const [cfData, setCfData] = useState<CFData | null>(null);

  const [totals, setTotals] = useState({ solved: 1500, contests: 150 });

  useEffect(() => {
    Promise.all([
      fetch("/api/leetcode").then(r => r.json()).catch(() => null),
      fetch("/api/codeforces").then(r => r.json()).catch(() => null),
      fetch("/api/codechef").then(r => r.json()).catch(() => null),
      fetch("/api/atcoder").then(r => r.json()).catch(() => null),
    ]).then(([lc, cf, cc, ac]) => {
      if (lc) setLcData(lc);
      if (cf) setCfData(cf);
      
      let solved = 0;
      let contests = 0;

      if (lc) { solved += (lc.totalSolved || 0); contests += (lc.contestsAttended || 0); }
      if (cf) { contests += (cf.contests || 0); }
      if (cc) { solved += (cc.totalProblemsSolved || 0); contests += (cc.contestsParticipated || 0); }
      if (ac) { contests += (ac.contests || 0); }

      if (solved === 0) solved = 1299;
      if (contests === 0) contests = 120;

      setTotals({
        solved: Math.ceil(solved / 500) * 500,
        contests: Math.ceil(contests / 50) * 50
      });
    });
  }, []);

  const socials = [
    { icon: <FaGithub />,   href: "https://github.com/wsid24",                       label: "GitHub" },
    { icon: <SiLeetcode />, href: "https://leetcode.com/u/w_SiD24/",                label: "LeetCode" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/siddhant-wani/",label: "LinkedIn" },
    { icon: <FaXTwitter />, href: "https://x.com/w_SiD1024",                        label: "X" },
    { icon: <FaEnvelope />, href: "mailto:siddhantpwani@gmail.com",                 label: "Email" },
  ];

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="blob-drift-1 absolute -left-48 top-1/4 h-[30rem] w-[30rem] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, var(--blob-1) 0%, transparent 70%)" }} />
        <div className="blob-drift-2 absolute -right-48 bottom-1/4 h-[26rem] w-[26rem] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, var(--blob-2) 0%, transparent 70%)" }} />
      </div>

      <div className="w-full max-w-3xl">
        {/* Top bar — clock */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mb-3 flex items-center justify-between text-xs text-[var(--fg-faint)]"
        >
          <span className="font-mono-custom tracking-widest">{clock}</span>
          <span className="flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-[10px]" />
            GMT+5:30 · Pune, India
          </span>
        </motion.div>

        {/* Last solved widget */}
        <AnimatePresence>
          {lcData?.latestSolvedProblem && (
            <motion.a
              href={`https://leetcode.com/problems/${lcData.latestSolvedProblem.titleSlug}/`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
              className="mb-4 group flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-elev)]/80 px-3.5 py-2 backdrop-blur-sm transition-all hover:border-[var(--accent)]/30 w-fit"
            >
              <FaBolt className="text-[var(--accent-warm)] text-[11px] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--fg-faint)]">Last Solved</span>
                <span className="text-xs font-medium text-[var(--fg-soft)] group-hover:text-[var(--fg)] transition-colors truncate max-w-[260px]">
                  {lcData.latestSolvedProblem.title}
                </span>
              </div>
              <span className="ml-auto text-[10px] text-[var(--fg-dim)]">↗</span>
            </motion.a>
          )}
        </AnimatePresence>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)]/70 p-6 backdrop-blur-xl shadow-[0_24px_64px_-20px_rgba(0,0,0,0.5)]"
        >
          {/* Accent left bar */}
          <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full bg-gradient-to-b from-[var(--accent)] to-[var(--accent-warm)]" />

          {/* Social icons — top right */}
          <div className="absolute right-4 top-4 flex items-center gap-2">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-dim)] text-xs transition-all hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Card body */}
          <div className="mt-8 flex items-start gap-5 pl-4">
            {/* Circular profile photo */}
            <div className="relative shrink-0">
              <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-[var(--accent)]/30 shadow-[0_0_20px_var(--glow)] sm:h-32 sm:w-32">
                <Image
                  src="/profile2.jpg"
                  alt="Siddhant Wani"
                  width={96}
                  height={96}
                  priority
                  className="h-full w-full object-cover object-top"
                />
              </div>
              {/* Online dot */}
              <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[var(--bg-elev)] bg-emerald-500">
                <span className="ping-slow absolute h-full w-full rounded-full bg-emerald-500 opacity-60" />
              </span>
            </div>

            {/* Name + role */}
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="section-label text-[9px]">Software Engineer</span>
                <span className="h-px w-4 bg-[var(--border-strong)]" />
                <span className="text-[9px] font-medium uppercase tracking-widest text-[var(--fg-faint)]">Pune, India</span>
              </div>
              <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-[var(--fg)] sm:text-5xl">
                Siddhant Wani
              </h1>
              {/* Typewriter */}
              <div className="mt-1.5 flex items-center text-sm text-[var(--fg-soft)] sm:text-base">
                <span>{role}</span>
                <span className="cursor-blink ml-0.5 inline-block h-[1em] w-[2px] bg-[var(--accent)] align-middle" />
              </div>
              {/* Email */}
              <a
                href="mailto:siddhantpwani@gmail.com"
                className="mt-3 flex items-center gap-2 text-sm text-[var(--fg-faint)] transition-colors hover:text-[var(--fg-soft)]"
              >
                <FaEnvelope className="text-[12px]" />
                siddhantpwani@gmail.com
              </a>
            </div>
          </div>

          {/* Tagline */}
          <p className="mt-5 pl-4 text-base text-[var(--fg-soft)] leading-relaxed border-t border-[var(--border)] pt-4">
            Building scalable AI-powered systems · Codeforces Expert · LeetCode Guardian
          </p>
        </motion.div>

        {/* Stats pills — CF + LC */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
          className="mt-3 grid grid-cols-2 gap-3"
        >
          {[
            {
              icon: <SiCodeforces className="text-sm" />,
              label: cfData ? `CF ${cfData.rank.charAt(0).toUpperCase() + cfData.rank.slice(1)}` : "Codeforces",
              value: cfData ? cfData.rating.toString() : "1812",
              color: "#3b82f6",
            },
            {
              icon: <SiLeetcode className="text-sm" />,
              label: "LeetCode Guardian",
              value: lcData?.rating ? lcData.rating.toString() : "2228",
              color: "#f97316",
            },
            {
              icon: <span className="text-xs font-bold">📝</span>,
              label: "Problems Solved",
              value: `${totals.solved}+`,
              color: "#a78bfa",
            },
            {
              icon: <span className="text-xs">🏆</span>,
              label: "Contests",
              value: `${totals.contests}+`,
              color: "#fbbf24",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-elev)]/60 px-3 py-2.5 backdrop-blur-sm"
            >
              <span style={{ color: stat.color }}>{stat.icon}</span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[var(--fg)] leading-tight">{stat.value}</p>
                <p className="truncate text-[10px] text-[var(--fg-faint)] leading-tight">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll down */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--fg-dim)]">Scroll</span>
        <FaChevronDown className="scroll-bounce text-[var(--fg-dim)] text-xs" />
      </motion.div>
    </section>
  );
}
