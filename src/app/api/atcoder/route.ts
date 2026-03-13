import { NextResponse } from "next/server";

export async function GET() {
    try {
        // AtCoder has a public contest history API
        const res = await fetch("https://atcoder.jp/users/w_SiD24/history/json", {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`AtCoder API returned ${res.status}`);
        }

        const history = await res.json();

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
