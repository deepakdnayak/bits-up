import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import UserScore from "@/models/UserScore";

export async function POST(req: NextRequest) {
  try {
    const { userGithubUsername, userFullName, quizId, userScoredPoints } = await req.json();

    if (!userGithubUsername || !userFullName || !quizId || typeof userScoredPoints !== "number") {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await UserScore.findOne({ userGithubUsername });

    if (existingUser) {
      // Check if user already attempted this quiz
      const existingAttempt = existingUser.quizAttempts.find(
        (attempt: { quizId: string; score: number; dateAttempted: Date }) => attempt.quizId === quizId
      );
      
      if (existingAttempt) {
        return NextResponse.json({ error: "User has already attempted this quiz" }, { status: 400 });
      }

      // Add new quiz attempt and update score
      existingUser.quizAttempts.push({ quizId, score: userScoredPoints, dateAttempted: new Date() });
      existingUser.totalScore += userScoredPoints;
      existingUser.lastUpdated = new Date();
      await existingUser.save();

      return NextResponse.json({ success: true, message: "Score updated", user: existingUser }, { status: 200 });
    } else {
      // Create a new user entry
      const newUser = await UserScore.create({
        userGithubUsername,
        userFullName,
        totalScore: userScoredPoints,
        quizAttempts: [{ quizId, score: userScoredPoints, dateAttempted: new Date() }],
        lastUpdated: new Date(),
      });

      return NextResponse.json({ success: true, message: "New user added", user: newUser }, { status: 201 });
    }
  } catch (error) {
    console.error("Error updating score:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
