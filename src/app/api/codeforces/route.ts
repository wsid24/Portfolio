import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Fetch user info, rating history, and submissions in parallel
        const [infoRes, ratingRes, statusRes] = await Promise.all([
            fetch("https://codeforces.com/api/user.info?handles=w_SiD24", {
                next: { revalidate: 3600 },
            }),
            fetch("https://codeforces.com/api/user.rating?handle=w_SiD24", {
                next: { revalidate: 3600 },
            }),
            fetch("https://codeforces.com/api/user.status?handle=w_SiD24", {
                next: { revalidate: 3600 },
            }),
        ]);

        if (!infoRes.ok || !ratingRes.ok) {
            throw new Error("Codeforces API error");
        }

        const infoData = await infoRes.json();
        const ratingData = await ratingRes.json();
        const statusData = await statusRes.json();

        const user = infoData.result[0];
        
        let solved = 0;
        if (statusData.status === "OK") {
            const uniqueProblems = new Set();
            for (const sub of statusData.result) {
                if (sub.verdict === "OK") {
                    uniqueProblems.add(`${sub.problem.contestId}-${sub.problem.index}`);
                }
            }
            solved = uniqueProblems.size;
        }
        const ratingHistory = ratingData.result.map((entry: {
            contestName: string;
            newRating: number;
            ratingUpdateTimeSeconds: number;
        }) => ({
            contestName: entry.contestName,
            newRating: entry.newRating,
            timestamp: entry.ratingUpdateTimeSeconds,
        }));

        return NextResponse.json({
            handle: user.handle,
            rating: user.rating,
            maxRating: user.maxRating,
            rank: user.rank,
            maxRank: user.maxRank,
            contests: ratingHistory.length,
            solved,
            ratingHistory,
        });
    } catch (error) {
        console.error("Codeforces API error:", error);
        return NextResponse.json({
            handle: "w_SiD24",
            rating: 1812,
            maxRating: 1812,
            rank: "expert",
            maxRank: "expert",
            contests: 50,
            ratingHistory: [],
        });
    }
}
