import { NextResponse } from "next/server";

export async function GET() {
    try {
        const query = `
        {
            matchedUser(username: "w_SiD24") {
                username
                profile {
                    ranking
                }
                submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                }
                userCalendar {
                    submissionCalendar
                }
            }
            userContestRanking(username: "w_SiD24") {
                rating
                attendedContestsCount
                globalRanking
            }
            userContestRankingHistory(username: "w_SiD24") {
                attended
                rating
                contest {
                    title
                    startTime
                }
            }
        }`;

        const res = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Referer": "https://leetcode.com",
            },
            body: JSON.stringify({ query }),
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`LeetCode API returned ${res.status}`);
        }

        const data = await res.json();
        const user = data.data.matchedUser;
        const contest = data.data.userContestRanking;
        const contestHistory = data.data.userContestRankingHistory || [];

        // Parse submission stats
        const stats = user.submitStatsGlobal.acSubmissionNum;
        const allSolved = stats.find((s: { difficulty: string }) => s.difficulty === "All")?.count || 0;
        const easySolved = stats.find((s: { difficulty: string }) => s.difficulty === "Easy")?.count || 0;
        const mediumSolved = stats.find((s: { difficulty: string }) => s.difficulty === "Medium")?.count || 0;
        const hardSolved = stats.find((s: { difficulty: string }) => s.difficulty === "Hard")?.count || 0;

        // Parse heatmap
        const calendarRaw = user.userCalendar?.submissionCalendar;
        let heatmap: Record<string, number> = {};
        if (calendarRaw) {
            try {
                heatmap = JSON.parse(calendarRaw);
            } catch {
                heatmap = {};
            }
        }

        // Parse contest rating history (only attended contests)
        const ratingHistory = contestHistory
            .filter((c: { attended: boolean }) => c.attended)
            .map((c: { rating: number; contest: { title: string; startTime: number } }) => ({
                contestName: c.contest.title,
                rating: Math.round(c.rating),
                timestamp: c.contest.startTime,
            }));

        // Calculate max rating from history
        const maxRating = ratingHistory.length > 0
            ? Math.max(...ratingHistory.map((r: { rating: number }) => r.rating))
            : (contest?.rating ? Math.round(contest.rating) : null);

        return NextResponse.json({
            username: user.username,
            ranking: user.profile.ranking,
            rating: contest?.rating ? Math.round(contest.rating) : null,
            maxRating,
            contestsAttended: contest?.attendedContestsCount || 0,
            globalRanking: contest?.globalRanking || null,
            totalSolved: allSolved,
            easySolved,
            mediumSolved,
            hardSolved,
            heatmap,
            ratingHistory,
        });
    } catch (error) {
        console.error("LeetCode API error:", error);
        return NextResponse.json({
            username: "w_SiD24",
            ranking: 5244,
            rating: 2228,
            maxRating: 2239,
            contestsAttended: 37,
            globalRanking: 39712,
            totalSolved: 902,
            easySolved: 248,
            mediumSolved: 494,
            hardSolved: 160,
            heatmap: {},
            ratingHistory: [],
        });
    }
}
