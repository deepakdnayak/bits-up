import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import UserScore from "@/models/UserScore";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase(); // Ensure DB is connected

    const { quizId, userGithubUsername, userFullName, userAnswers } = await req.json();

    if (!quizId || !userGithubUsername || !userFullName || !userAnswers) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    // Fetch quiz from DB
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return NextResponse.json({ success: false, error: "Quiz not found." }, { status: 404 });
    }

    // Evaluate score
    let correctAnswers = 0;
    const quizQuestions = quiz.quizQuestions.map((question: any, index: number) => {
      const correctOption = ["A", "B", "C", "D"].indexOf(question.answer); // Convert "A", "B", etc., to index (0-3)
      const selectedOption = userAnswers[index];

      if (selectedOption === correctOption) correctAnswers++;

      return {
        question: question.question,
        options: [question.optionOne, question.optionTwo, question.optionThree, question.optionFour],
        correctOption,
        selectedOption,
      };
    });

    // Fetch user details
    let user = await UserScore.findOne({ userGithubUsername });

    if (user) {
        const alreadyAttempted = user.quizAttempts.some((attempt: { quizId: string }) => attempt.quizId === quizId);

      if (!alreadyAttempted) {
        // First attempt → Update total score
        user.totalScore += correctAnswers;
      }

      // Store the attempt (whether first or reattempt)
      user.quizAttempts.push({ quizId, score: correctAnswers, dateAttempted: new Date() });

      user.lastUpdated = new Date();
      await user.save();
    } else {
      // First time user → Create new record & update score
      user = await UserScore.create({
        userGithubUsername,
        userFullName,
        totalScore: correctAnswers,
        quizAttempts: [{ quizId, score: correctAnswers, dateAttempted: new Date() }],
      });
    }

    return NextResponse.json({
      success: true,
      correctAnswers,
      wrongAnswers: quizQuestions.length - correctAnswers,
      quizQuestions,
    });

  } catch (error) {
    console.error("Quiz submission error:", error);
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
