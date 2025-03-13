import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import UserScore from "@/models/UserScore";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    // Fetch top 10 users sorted by totalScore (highest first)
    const topUsers = await UserScore.find({})
      .sort({ totalScore: -1 }) // Sort by score (descending)
      .limit(10) // Get top 10
      .select("userGithubUsername userFullName totalScore") // Fetch only necessary fields
      .lean(); // Optimize performance

    return NextResponse.json({ success: true, leaderboard: topUsers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
