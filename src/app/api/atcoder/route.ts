import { NextResponse } from "next/server";

export async function GET() {
    try {
        // AtCoder has a public contest history API and Kenkoooo API for solved count
        const [historyRes, acRes] = await Promise.all([
            fetch("https://atcoder.jp/users/w_SiD24/history/json", {
                next: { revalidate: 3600 },
            }),
            fetch("https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=w_SiD24", {
                next: { revalidate: 3600 },
            }).catch(() => null),
        ]);

        if (!historyRes.ok) {
            throw new Error(`AtCoder API returned ${historyRes.status}`);
        }

        const history = await historyRes.json();
        let solved = 0;
        if (acRes && acRes.ok) {
            const acData = await acRes.json();
            solved = acData.count || 0;
        }

        const ratingHistory = history.map((entry: {
            ContestName: string;
            NewRating: number;
            EndTime: string;
        }) => ({
            contestName: entry.ContestName,
            rating: entry.NewRating,
            timestamp: new Date(entry.EndTime).getTime() / 1000,
        }));

        const currentRating = ratingHistory.length > 0
            ? ratingHistory[ratingHistory.length - 1].rating
            : 857;
        const maxRating = ratingHistory.length > 0
            ? Math.max(...ratingHistory.map((r: { rating: number }) => r.rating))
            : 857;

        return NextResponse.json({
            username: "w_SiD24",
            currentRating,
            maxRating,
            contests: ratingHistory.length,
            solved,
            ratingHistory,
        });
    } catch (error) {
        console.error("AtCoder API error:", error);
        return NextResponse.json({
            username: "w_SiD24",
            currentRating: 857,
            maxRating: 857,
            contests: 15,
            ratingHistory: [],
        });
    }
}
