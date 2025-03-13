import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import UserScore from "@/models/UserScore";

export async function POST(req: NextRequest) {
  try {
    const { userGithubUsername, userFullName, userScoredPoints } = await req.json();

    // Validate request body
    if (!userGithubUsername || !userFullName || typeof userScoredPoints !== "number") {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }

    await connectToDatabase();

    // Find if user already exists
    const existingUser = await UserScore.findOne({ userGithubUsername });

    if (existingUser) {
      // Update existing user score
      existingUser.userScoredPoints += userScoredPoints;
      await existingUser.save();
      return NextResponse.json({ success: true, message: "Score updated", user: existingUser }, { status: 200 });
    } else {
      // Create a new user entry
      const newUser = await UserScore.create({
        userGithubUsername,
        userFullName,
        userScoredPoints,
      });
      return NextResponse.json({ success: true, message: "New user added", user: newUser }, { status: 201 });
    }
  } catch (error) {
    console.error("Error updating score:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
