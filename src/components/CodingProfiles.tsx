"use client";

import { motion } from "framer-motion";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";
import { FaCode, FaExternalLinkAlt, FaBolt, FaTrophy, FaSpinner } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

/* ──────────────── Types ──────────────── */

interface LeetCodeData {
    username: string;
    ranking: number;
    rating: number | null;
    maxRating: number | null;
    contestsAttended: number;
    globalRanking: number | null;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    heatmap: Record<string, number>;
    ratingHistory: { contestName: string; rating: number; timestamp: number }[];
    latestSolvedProblem?: { title: string; titleSlug: string; timestamp: number } | null;
}

interface CodeforcesData {
    handle: string;
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
    contests: number;
    solved?: number;
    ratingHistory: { contestName: string; newRating: number; timestamp: number }[];
}

interface CodeChefData {
    username: string;
    currentRating: number;
    highestRating: number;
    stars: number;
    globalRank: number;
    countryRank: number;
    totalProblemsSolved: number;
    contestsParticipated: number;
    ratingHistory: { contestName: string; rating: number; timestamp: number }[];
}

interface AtCoderData {
    username: string;
    currentRating: number;
    maxRating: number;
    contests: number;
    solved?: number;
    ratingHistory: { contestName: string; rating: number; timestamp: number }[];
}

/* ──────────── Shared sub-components ──────────── */

function StatBox({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-4 sm:p-5">
            <div className="mb-2 text-[var(--fg-faint)] text-sm">{icon}</div>
            <p className="text-xl sm:text-2xl font-bold text-[var(--fg)]">{value}</p>
            <p className="text-[11px] uppercase tracking-wider text-[var(--fg-faint)] mt-1">{label}</p>
        </div>
    );
}

function ProgressBar({ segments }: { segments: { color: string; width: number }[] }) {
    return (
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-[var(--bg-muted)]">
            {segments.map((seg, i) => (
                <div key={i} className="h-full transition-all duration-700" style={{ width: `${seg.width}%`, backgroundColor: seg.color }} />
            ))}
        </div>
    );
}

function MiniDonut({ solved, total, color, label }: { solved: number; total: number; color: string; label: string }) {
    const pct = total > 0 ? (solved / total) * 100 : 0;
    const circumference = 2 * Math.PI * 18;
    const strokeDasharray = `${(pct / 100) * circumference} ${circumference}`;

    return (
        <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3">
            <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90 shrink-0">
                <circle cx="22" cy="22" r="18" fill="none" stroke="var(--border-strong)" strokeWidth="4" />
                <circle cx="22" cy="22" r="18" fill="none" stroke={color} strokeWidth="4"
                    strokeDasharray={strokeDasharray} strokeLinecap="round" />
            </svg>
            <div>
                <p className="text-xs text-[var(--fg-faint)]">{label}</p>
                <p className="text-sm font-bold text-[var(--fg)]">
                    {solved}<span className="text-[var(--fg-faint)] font-normal text-xs">/{total}</span>
                </p>
            </div>
        </div>
    );
}

function LoadingCard() {
    return (
        <div className="flex items-center justify-center py-20 gap-3 text-[var(--fg-faint)]">
            <FaSpinner className="animate-spin" />
            <span className="text-sm">Loading live stats...</span>
        </div>
    );
}

function CardHeader({ icon, iconBg, platform, username, link }: {
    icon: React.ReactNode; iconBg: string; platform: string; username: string; link: string;
}) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
                    {icon}
                </div>
                <div>
                    <h3 className="font-bold text-[var(--fg)] text-lg">{platform}</h3>
                    <p className="text-xs text-[var(--fg-faint)]">@{username}</p>
                </div>
            </div>
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-[var(--fg-faint)] hover:text-[var(--fg)] transition-colors">
                <FaExternalLinkAlt className="text-sm" />
            </a>
        </div>
    );
}

/* ── Reusable Rating Graph ── */
function RatingGraph({ ratings, names, accentColor, gradientId, label, contestCount }: {
    ratings: number[];
    names: string[];
    accentColor: string;
    gradientId: string;
    label: string;
    contestCount: number;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    
    if (ratings.length < 2) return null;

    const minR = Math.min(...ratings) - 50;
    const maxR = Math.max(...ratings) + 50;
    const range = maxR - minR;
    
    const points = ratings.map((r, i) => {
        const x = (i / (ratings.length - 1)) * 100;
        const y = 100 - ((r - minR) / range) * 100;
        return { x, y, r };
    });
    
    const linePath = points.map((p, i, a) => {
        if (i === 0) return `M ${p.x},${p.y}`;
        const prev = a[i - 1];
        const cpX = (prev.x + p.x) / 2;
        return `C ${cpX},${prev.y} ${cpX},${p.y} ${p.x},${p.y}`;
    }).join(" ");
    const areaPath = `${linePath} L 100,100 L 0,100 Z`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const pct = Math.max(0, Math.min(1, x / rect.width));
        const idx = Math.round(pct * (ratings.length - 1));
        setHoveredIdx(idx);
    };

    const handleMouseLeave = () => {
        setHoveredIdx(null);
    };

    return (
        <div className="my-6">
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-[var(--fg-soft)]">{label}</p>
                <p className="text-sm text-[var(--fg-faint)]">{contestCount} contests</p>
            </div>
            <div className="relative flex">
                <div className="flex flex-col justify-between text-[10px] text-[var(--fg-faint)] pr-2 py-2 h-52 font-mono">
                    <span>{Math.round(maxR)}</span>
                    <span>{Math.round(minR)}</span>
                </div>
                <div 
                    ref={containerRef}
                    className="relative h-52 flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-0 overflow-visible cursor-crosshair"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <svg viewBox="0 -10 100 120" preserveAspectRatio="none" className="h-full w-full block">
                        <defs>
                            <linearGradient id={`${gradientId}-line-hover`} x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                        </defs>
                        <path 
                            d={linePath} 
                            fill="none" 
                            stroke={hoveredIdx !== null ? `url(#${gradientId}-line-hover)` : "var(--border-strong)"} 
                            strokeWidth="2" 
                            vectorEffect="non-scaling-stroke" 
                            className="transition-colors duration-300"
                        />
                        
                        {hoveredIdx !== null && (
                            <circle 
                                cx={points[hoveredIdx].x} 
                                cy={points[hoveredIdx].y} 
                                r="4" 
                                fill="var(--bg)" 
                                stroke="#10b981" 
                                strokeWidth="2" 
                                vectorEffect="non-scaling-stroke" 
                                className="pointer-events-none"
                            />
                        )}
                    </svg>

                    {hoveredIdx !== null && (
                        <div 
                            className="absolute pointer-events-none z-10 bottom-full mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--border-strong)] bg-[#111114] px-3 py-2 text-xs shadow-xl backdrop-blur-md"
                            style={{ 
                                left: `${points[hoveredIdx].x}%`,
                            }}
                        >
                            <p className="font-bold" style={{ color: "var(--accent)" }}>
                                Rating: {ratings[hoveredIdx]}
                            </p>
                            <p className="text-[var(--fg-faint)] mt-0.5">
                                {names[hoveredIdx]}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ── Max / Current Rating Header ── */
function RatingHeader({ maxRating, currentRating, maxLabel, currentLabel, color }: {
    maxRating: number | string;
    currentRating: number | string;
    maxLabel?: string;
    currentLabel?: string;
    color: string;
}) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
                <FaTrophy className="text-yellow-400 text-sm" />
                <p className="text-xs text-[var(--fg-faint)] uppercase tracking-wider">{maxLabel || "Max Rating"}</p>
            </div>
            <p className="text-4xl sm:text-5xl font-bold mb-2" style={{ color }}>
                {typeof maxRating === "number" ? maxRating.toLocaleString() : maxRating}
            </p>
            <div className="flex items-center gap-2">
                <FaBolt className="text-[var(--fg-faint)] text-xs" />
                <p className="text-xs text-[var(--fg-faint)] uppercase tracking-wider">{currentLabel || "Current Rating"}</p>
            </div>
            <p className="text-2xl font-bold text-[var(--fg-soft)]">
                {typeof currentRating === "number" ? currentRating.toLocaleString() : currentRating}
            </p>
        </div>
    );
}

/* ──────────── LeetCode Card ──────────── */

function LeetCodeCard() {
    const [data, setData] = useState<LeetCodeData | null>(null);

    useEffect(() => {
        fetch("/api/leetcode").then((r) => r.json()).then(setData).catch(() => { });
    }, []);

    if (!data) return <div className="glass-card p-6 sm:p-8"><LoadingCard /></div>;

    const totalProblems = data.easySolved + data.mediumSolved + data.hardSolved;
    const easyPct = totalProblems > 0 ? (data.easySolved / totalProblems) * 100 : 0;
    const medPct = totalProblems > 0 ? (data.mediumSolved / totalProblems) * 100 : 0;
    const hardPct = totalProblems > 0 ? (data.hardSolved / totalProblems) * 100 : 0;
    const totalEasy = 876, totalMedium = 1831, totalHard = 812;
    const ratings = data.ratingHistory.map((r) => r.rating);
    const names = data.ratingHistory.map((r) => r.contestName);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card hover:shadow-[0_0_30px_-5px_rgba(255,161,22,0.15)] transition-shadow duration-500 p-6 sm:p-8"
        >
            <CardHeader
                icon={<SiLeetcode className="text-xl text-orange-400" />}
                iconBg="bg-orange-500/10"
                platform="LeetCode"
                username={data.username}
                link={`https://leetcode.com/u/${data.username}/`}
            />

            {/* Prominent Banner */}
            <div className="mb-6 p-4 rounded-xl border border-orange-500/20 bg-orange-500/5 text-center">
                <p className="gradient-text font-bold text-lg sm:text-xl">
                    Contest Rating: {data.rating || "N/A"} | Global Rank: #{data.globalRanking?.toLocaleString() || "—"}
                </p>
            </div>

            {/* Max / Current Rating */}
            <RatingHeader
                maxRating={data.maxRating || "N/A"}
                currentRating={data.rating || "N/A"}
                color="#FFA116"
            />

            {/* Contest Rating Graph — LeetCode Guardian = orange/red */}
            <RatingGraph
                ratings={ratings}
                names={names}
                accentColor="#FFA116"
                gradientId="lcGrad"
                label="Contest Rating History"
                contestCount={data.contestsAttended}
            />

            {/* Stat boxes */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <StatBox icon={<span>◎</span>} value={data.totalSolved.toLocaleString()} label="Solved" />
                <StatBox icon={<span>#</span>} value={data.globalRanking?.toLocaleString() || "—"} label="Global" />
                <StatBox icon={<span>📝</span>} value={data.contestsAttended.toString()} label="Contests" />
            </div>

            {/* Problem Breakdown */}
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-[var(--fg-soft)]">Problem Breakdown</p>
                <p className="text-sm text-[var(--fg-faint)]">{totalProblems} solved</p>
            </div>

            <ProgressBar segments={[
                { color: "#14b8a6", width: easyPct },
                { color: "#eab308", width: medPct },
                { color: "#ec4899", width: hardPct },
            ]} />

            <div className="mt-3 mb-6 flex items-center gap-6 text-xs text-[var(--fg-soft)]">
                <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-teal-500" /> Easy <b className="text-[var(--fg)]">{data.easySolved}</b>
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-yellow-500" /> Medium <b className="text-[var(--fg)]">{data.mediumSolved}</b>
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-pink-500" /> Hard <b className="text-[var(--fg)]">{data.hardSolved}</b>
                </span>
            </div>

            {/* Donut charts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <MiniDonut solved={data.easySolved} total={totalEasy} color="#14b8a6" label="Easy" />
                <MiniDonut solved={data.mediumSolved} total={totalMedium} color="#eab308" label="Medium" />
                <MiniDonut solved={data.hardSolved} total={totalHard} color="#ec4899" label="Hard" />
            </div>

            {/* Latest Solved Problem */}
            {data.latestSolvedProblem && (
                <div className="mt-4 flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-4">
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-[var(--fg-faint)] mb-1">Latest Solved</p>
                        <a 
                            href={`https://leetcode.com/problems/${data.latestSolvedProblem.titleSlug}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[var(--fg)] hover:text-orange-400 transition-colors flex items-center gap-2"
                        >
                            {data.latestSolvedProblem.title}
                            <FaExternalLinkAlt className="text-[10px]" />
                        </a>
                    </div>
                    <div className="text-[10px] text-[var(--fg-faint)]">
                        {new Date(data.latestSolvedProblem.timestamp * 1000).toLocaleDateString()}
                    </div>
                </div>
            )}
        </motion.div>
    );
}

/* ──────────── Codeforces Card ──────────── */

function CodeforcesCard() {
    const [data, setData] = useState<CodeforcesData | null>(null);

    useEffect(() => {
        fetch(`/api/codeforces?t=${Date.now()}`).then((r) => r.json()).then(setData).catch(() => { });
    }, []);

    if (!data) return <div className="glass-card p-6 sm:p-8"><LoadingCard /></div>;

    const ratings = data.ratingHistory.map((r) => r.newRating);
    const names = data.ratingHistory.map((r) => r.contestName);

    const rankColors: Record<string, string> = {
        "newbie": "#808080", "pupil": "#008000", "specialist": "#03a89e",
        "expert": "#0000ff", "candidate master": "#aa00aa", "master": "#ff8c00",
        "international master": "#ff8c00", "grandmaster": "#ff0000",
    };
    const rankColor = rankColors[data.rank.toLowerCase()] || "#3b82f6";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] transition-shadow duration-500 p-6 sm:p-8"
        >
            <CardHeader
                icon={<SiCodeforces className="text-xl text-blue-400" />}
                iconBg="bg-blue-500/10"
                platform="Codeforces"
                username={data.handle}
                link={`https://codeforces.com/profile/${data.handle}`}
            />

            {/* Max / Current Rating */}
            <RatingHeader maxRating={data.maxRating} currentRating={data.rating} color={rankColor} />

            {/* Rank badges */}
            <div className="flex items-center gap-3 mb-4 text-sm">
                <span className="rounded-full px-3 py-1 border border-[var(--border)] bg-[var(--bg-soft)] capitalize font-medium" style={{ color: rankColor }}>
                    {data.rank}
                </span>
                <span className="text-xs text-[var(--fg-faint)]">
                    Max: <span className="capitalize font-medium" style={{ color: rankColors[data.maxRank.toLowerCase()] || "#22c55e" }}>{data.maxRank}</span>
                </span>
            </div>

            {/* Stat boxes */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <StatBox icon={<span>⚔</span>} value={data.contests.toString()} label="Contests" />
                <StatBox icon={<span>✓</span>} value={data.solved?.toString() || "0"} label="Solved" />
            </div>

            {/* Rating Graph — color follows Codeforces rank tier */}
            <RatingGraph
                ratings={ratings}
                names={names}
                accentColor={rankColor}
                gradientId="cfGrad"
                label="Rating History"
                contestCount={data.contests}
            />
        </motion.div>
    );
}

/* ──────────── CodeChef Card ──────────── */

function CodeChefCard() {
    const [data, setData] = useState<CodeChefData | null>(null);

    useEffect(() => {
        fetch("/api/codechef").then((r) => r.json()).then(setData).catch(() => { });
    }, []);

    if (!data) return <div className="glass-card p-6 sm:p-8"><LoadingCard /></div>;

    const ratings = data.ratingHistory.map((r) => r.rating);
    const names = data.ratingHistory.map((r) => r.contestName);

    // CodeChef star color tiers
    const getChefColor = (stars: number) => {
        if (stars >= 7) return "#FF0000"; // 7★ red
        if (stars >= 6) return "#CC00CC"; // 6★ purple
        if (stars >= 5) return "#FFBB00"; // 5★ yellow
        if (stars >= 4) return "#0000FF"; // 4★ blue
        if (stars >= 3) return "#3366FF"; // 3★ blue
        if (stars >= 2) return "#1E7D22"; // 2★ green
        return "#f59e0b"; // default amber
    };
    const chefColor = getChefColor(data.stars);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.15)] transition-shadow duration-500 p-6 sm:p-8"
        >
            <CardHeader
                icon={<SiCodechef className="text-xl text-amber-500" />}
                iconBg="bg-amber-500/10"
                platform="CodeChef"
                username={data.username}
                link={`https://www.codechef.com/users/${data.username}`}
            />

            {/* Max / Current Rating */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <FaTrophy className="text-yellow-400 text-sm" />
                    <p className="text-xs text-[var(--fg-faint)] uppercase tracking-wider">Max Rating</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-4xl sm:text-5xl font-bold" style={{ color: chefColor }}>{data.highestRating}</span>
                    <span className="flex items-center gap-0.5 text-lg">
                        {"⭐".repeat(data.stars)}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <FaBolt className="text-[var(--fg-faint)] text-xs" />
                    <p className="text-xs text-[var(--fg-faint)] uppercase tracking-wider">Current Rating</p>
                </div>
                <p className="text-2xl font-bold text-[var(--fg-soft)]">{data.currentRating}</p>
            </div>

            {/* Rating Graph — colored by current star tier */}
            <RatingGraph
                ratings={ratings}
                names={names}
                accentColor={chefColor}
                gradientId="ccGrad"
                label="Rating History"
                contestCount={data.contestsParticipated}
            />

            {/* Stat boxes */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <StatBox icon={<span>⚔</span>} value={data.contestsParticipated.toString()} label="Contests" />
                <StatBox icon={<span>✓</span>} value={data.totalProblemsSolved.toString()} label="Solved" />
                <StatBox icon={<span>🌍</span>} value={`#${data.globalRank.toLocaleString()}`} label="Global" />
            </div>
        </motion.div>
    );
}

/* ──────────── AtCoder Card ──────────── */

function AtCoderCard() {
    const [data, setData] = useState<AtCoderData | null>(null);

    useEffect(() => {
        fetch(`/api/atcoder?t=${Date.now()}`).then((r) => r.json()).then(setData).catch(() => { });
    }, []);

    if (!data) return <div className="glass-card p-6 sm:p-8"><LoadingCard /></div>;

    const ratings = data.ratingHistory.map((r) => r.rating);
    const names = data.ratingHistory.map((r) => r.contestName);

    // AtCoder rank color by rating
    const getAtcoderColor = (r: number) => {
        if (r < 400) return "#808080";
        if (r < 800) return "#804000";
        if (r < 1200) return "#008000";
        if (r < 1600) return "#00C0C0";
        if (r < 2000) return "#0000FF";
        return "#C0C000";
    };
    const getAtcoderRank = (r: number) => {
        if (r < 400) return "8 Kyu";
        if (r < 800) return "7 Kyu";
        if (r < 1200) return "6 Kyu";
        if (r < 1600) return "5 Kyu";
        if (r < 2000) return "4 Kyu";
        return "3 Kyu";
    };

    const acColor = getAtcoderColor(data.currentRating);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] transition-shadow duration-500 p-6 sm:p-8"
        >
            <CardHeader
                icon={<img src="/atcoder.png" alt="AtCoder" className="w-5 h-5 object-contain opacity-90" />}
                iconBg="bg-white/10"
                platform="AtCoder"
                username={data.username}
                link={`https://atcoder.jp/users/${data.username}`}
            />

            {/* Max / Current Rating */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <FaTrophy className="text-yellow-400 text-sm" />
                    <p className="text-xs text-[var(--fg-faint)] uppercase tracking-wider">Max Rating</p>
                </div>
                <p className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: getAtcoderColor(data.maxRating) }}>
                    {data.maxRating}
                    <span className="text-lg ml-2 opacity-70">{getAtcoderRank(data.maxRating)}</span>
                </p>
                <div className="flex items-center gap-2">
                    <FaBolt className="text-[var(--fg-faint)] text-xs" />
                    <p className="text-xs text-[var(--fg-faint)] uppercase tracking-wider">Current Rating</p>
                </div>
                <p className="text-2xl font-bold" style={{ color: acColor, opacity: 0.7 }}>
                    {data.currentRating}
                    <span className="text-sm ml-2">{getAtcoderRank(data.currentRating)}</span>
                </p>
            </div>

            {/* Stat boxes */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <StatBox icon={<span>⚔</span>} value={data.contests.toString()} label="Contests" />
                <StatBox icon={<span>✓</span>} value={data.solved?.toString() || "0"} label="Solved" />
            </div>

            {/* Rating Graph — colored by current AtCoder rank tier */}
            <RatingGraph
                ratings={ratings}
                names={names}
                accentColor={acColor}
                gradientId="acGrad"
                label="Rating History"
                contestCount={data.contests}
            />
        </motion.div>
    );
}

/* ──────────── Main Export ──────────── */

export default function CodingProfiles() {
    return (
        <section className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mb-10"
            >
                <p className="section-label">
                    Live Stats
                </p>
                <h2 className="font-heading text-4xl text-[var(--fg)] sm:text-5xl mt-3">
                    <span className="gradient-text">Competitive Programming</span>
                </h2>
                <p className="mt-3 text-sm text-[var(--fg-faint)]">Pulled live from each platform&apos;s API.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <LeetCodeCard />
                <CodeforcesCard />
                <CodeChefCard />
                <AtCoderCard />
            </div>
        </section>
    );
}
