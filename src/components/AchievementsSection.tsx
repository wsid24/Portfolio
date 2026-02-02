"use client";

import { motion } from "framer-motion";
import AchievementCard from "./AchievementCard";

export default function AchievementsSection() {
    const achievements = [
        {
            title: "Barclays Hack-O-Hire 2025 – Finalist",
            detail: "Selected from 25,000+ applicants nationwide",
            proofLink:
                "https://www.linkedin.com/posts/siddhant-wani-6059972a5_hackohire-teamgenify-barclayshackathon-activity-7323579470680932352-NIlh/",
            highlight: "purple" as const,
            isLarge: true,
        },
        {
            title: "Meta Hacker Cup – Semi-Finalist",
            detail: "Global Rank 186",
            certificateLink: "https://drive.google.com/file/d/1fyfoUT58o77GQvvdOLx5EOk-yZCI_JSN/view?usp=sharing",
            highlight: "cyan" as const,
            isLarge: true,
        },
        {
            title: "Codeforces Round 1054 (Div. 3)",
            metric: "Rank 765 / 35,000+",
            detail: "Solved complex algorithmic problems under time pressure",
            highlight: "none" as const,
        },
        {
            title: "CodeChef Starters 169",
            metric: "Rank 45 / 19,000+",
            detail: "Achieved top 0.24% ranking in competitive programming",
            highlight: "none" as const,
        },
        {
            title: "LeetCode Biweekly Contest 169",
            metric: "Rank 283 / 28,000+",
            detail: "Demonstrated strong problem-solving capabilities",
            highlight: "none" as const,
        },
    ];

    return (
        <section className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
            >
                <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                    Achievements
                </h2>
                <p className="text-lg text-gray-400">
                    Competitive programming accomplishments and recognitions
                </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {achievements.map((achievement, index) => (
                    <AchievementCard
                        key={achievement.title}
                        title={achievement.title}
                        detail={achievement.detail}
                        metric={achievement.metric}
                        proofLink={achievement.proofLink}
                        certificateLink={achievement.certificateLink}
                        highlight={achievement.highlight}
                        index={index}
                        isLarge={achievement.isLarge}
                    />
                ))}
            </div>
        </section>
    );
}
