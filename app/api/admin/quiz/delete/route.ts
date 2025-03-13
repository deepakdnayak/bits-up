import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest) {
  try {
    const { quizId } = await req.json();

    // Validate quizId format
    if (!quizId || !mongoose.Types.ObjectId.isValid(quizId)) {
      return NextResponse.json({ error: "Invalid quiz ID" }, { status: 400 });
    }

    await connectToDatabase();

    // Attempt to delete the quiz
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

    if (!deletedQuiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Quiz deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting quiz:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
