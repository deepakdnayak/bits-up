import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { quizCategory, quizDescription, quizDifficulty, quizQuestions } = await req.json();

    // Validation: Check if all required fields exist
    if (!quizCategory || !quizDescription || !quizDifficulty || !quizQuestions || !Array.isArray(quizQuestions)) {
      return NextResponse.json({ error: "Invalid input: Missing required fields" }, { status: 400 });
    }

    // Validate each question object
    for (const question of quizQuestions) {
      if (
        !question.question ||
        !question.optionOne ||
        !question.optionTwo ||
        !question.optionThree ||
        !question.optionFour ||
        !["A", "B", "C", "D"].includes(question.answer)
      ) {
        return NextResponse.json({ error: "Each question must have four options and a valid answer (A, B, C, or D)" }, { status: 400 });
      }
    }

    // Create and save the quiz
    const newQuiz = new Quiz({ quizCategory, quizDescription, quizDifficulty, quizQuestions });
    await newQuiz.save();

    return NextResponse.json({ success: true, message: "Quiz added successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error adding quiz:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
