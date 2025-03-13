import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const { quizId } = await req.json();

    // Validate quizId format
    if (!quizId || !mongoose.Types.ObjectId.isValid(quizId)) {
      return NextResponse.json({ error: "Invalid quiz ID" }, { status: 400 });
    }

    await connectToDatabase();

    // Fetch the complete quiz details
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, quiz }, { status: 200 });

  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
