import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import UserScore from "@/models/UserScore";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { name, githubId } = await req.json();

    if (!name || !githubId) {
      return NextResponse.json({ success: false, error: "Name and GitHub ID are required." }, { status: 400 });
    }

    // Check if user exists by GitHub ID
    const existingUser = await UserScore.findOne({ userGithubUsername: githubId });

    if (existingUser) {
      // Update the name if the user exists
      await UserScore.updateOne({ userGithubUsername: githubId }, { userFullName: name });

      return NextResponse.json({ success: true, message: "User name updated successfully." }, { status: 200 });
    } else {
      // Create a new user if GitHub ID is new
      const newUser = new UserScore({
        userGithubUsername: githubId,
        userFullName: name,
        totalScore: 0, // Default score for new users
      });

      await newUser.save();
      return NextResponse.json({ success: true, message: "User registered successfully." }, { status: 201 });
    }
  } catch (error) {
    console.error("Error saving participant details:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}
