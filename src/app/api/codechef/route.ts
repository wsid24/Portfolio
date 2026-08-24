import { NextResponse } from "next/server";

const USERNAME = "who_is_sid";

export async function GET() {
    try {
        // Try the community API first
        const res = await fetch(`https://competeapi.vercel.app/user/codechef/${USERNAME}`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`CodeChef API returned ${res.status}`);
        }

        const data = await res.json();
        const currentRating = data.rating_number || 2108;
        const maxRating = data.max_rank || 2108;
        const stars = data.rating ? parseInt(data.rating) : 5;

        // Try to scrape rating history from CodeChef profile page
        let ratingHistory: { contestName: string; rating: number; timestamp: number }[] = [];
        try {
            const profileRes = await fetch(`https://www.codechef.com/users/${USERNAME}`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
                    "Accept": "text/html",
                },
                next: { revalidate: 3600 },
            });
            if (profileRes.ok) {
                const html = await profileRes.text();
                const ratingMatch = html.match(/var\s+all_rating\s*=\s*(\[[\s\S]*?\]);/);
                if (ratingMatch) {
                    const ratingData = JSON.parse(ratingMatch[1]);
                    ratingHistory = ratingData.map((entry: {
                        name?: string; code?: string; rating?: string; end_date?: string;
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
            username: USERNAME,
            currentRating,
            highestRating: maxRating,
            stars,
            globalRank: parseInt(data.global_rank) || 1500,
            countryRank: parseInt(data.country_rank) || 1200,
            totalProblemsSolved: 100,
            contestsParticipated: ratingHistory.length || 40,
            ratingHistory,
        });
    } catch (error) {
        console.error("CodeChef API error:", error);
        return NextResponse.json({
            username: USERNAME,
            currentRating: 2108,
            highestRating: 2108,
            stars: 5,
            globalRank: 1500,
            countryRank: 1200,
            totalProblemsSolved: 100,
            contestsParticipated: 40,
            ratingHistory: [],
        });
    }
}
