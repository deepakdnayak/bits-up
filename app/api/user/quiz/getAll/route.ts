import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    // Fetch only required fields, excluding quizQuestions
    const quizzes = await Quiz.find({}, "quizCategory quizDescription quizDifficulty imageUrl");

    return NextResponse.json({ success: true, quizzes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
