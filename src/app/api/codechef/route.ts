import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Use a working community API for basic info
        const res = await fetch("https://competeapi.vercel.app/user/codechef/insane_007", {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`CodeChef API returned ${res.status}`);
        }

        const data = await res.json();
        const currentRating = data.rating_number || 1834;
        const maxRating = data.max_rank || 1834;
        const stars = data.rating ? parseInt(data.rating) : 4;

        // Try to scrape rating history from CodeChef profile page
        let ratingHistory: { contestName: string; rating: number; timestamp: number }[] = [];
        try {
            const profileRes = await fetch("https://www.codechef.com/users/insane_007", {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
                    "Accept": "text/html",
                },
                next: { revalidate: 3600 },
            });
            if (profileRes.ok) {
                const html = await profileRes.text();
                // CodeChef embeds rating data in a script tag as JSON
                const ratingMatch = html.match(/var\s+all_rating\s*=\s*(\[[\s\S]*?\]);/);
                if (ratingMatch) {
                    const ratingData = JSON.parse(ratingMatch[1]);
                    ratingHistory = ratingData.map((entry: {
                        name?: string; code?: string; rating?: string; end_date?: string; getyear?: string; getmonth?: string;
                    }) => ({
                        contestName: entry.name || entry.code || "Contest",
                        rating: parseInt(entry.rating || "0"),
                        timestamp: entry.end_date
                            ? new Date(entry.end_date).getTime() / 1000
                            : Date.now() / 1000,
                    }));
                }
            }
        } catch {
            // Rating history scraping failed, will use fallback
        }

        return NextResponse.json({
            username: "insane_007",
            currentRating,
            highestRating: maxRating,
            stars,
            globalRank: parseInt(data.global_rank) || 3946,
            countryRank: parseInt(data.country_rank) || 3254,
            totalProblemsSolved: 100,
            contestsParticipated: ratingHistory.length || 30,
            ratingHistory,
        });
    } catch (error) {
        console.error("CodeChef API error:", error);
        return NextResponse.json({
            username: "insane_007",
            currentRating: 1834,
            highestRating: 1834,
            stars: 4,
            globalRank: 3946,
            countryRank: 3254,
            totalProblemsSolved: 100,
            contestsParticipated: 30,
            ratingHistory: [],
        });
    }
}
