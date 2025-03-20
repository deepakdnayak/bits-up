"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ParticipantDetails from "@/components/ParticipantDetails";
import QuizStart from "@/components/QuizStart";
import QuizTime from "@/components/QuizTime";
import Results from "@/components/Results";

interface QuizQuestion {
  question: string;
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
  answer: string;
  _id: string;
}

interface EvaluatedQuestion {
  question: string;
  options: string[];
  correctOption: number;
  selectedOption: number;
}

interface Quiz {
  _id: string;
  quizCategory: string;
  quizDescription: string;
  quizDifficulty: string;
  quizQuestions: QuizQuestion[];
  dateAdded: string;
  imageUrl: string;
}

interface Participant {
  name: string;
  githubId: string;
}

function PlayQuizContent() {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quizId");

  const [mode, setMode] = useState("quizStart");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [participantDetails, setParticipantDetails] = useState<Participant | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [evaluatedQuestions, setEvaluatedQuestions] = useState<EvaluatedQuestion[]>([]);

  useEffect(() => {
    if (!quizId) {
      setError("Quiz ID is missing in the URL.");
      setLoading(false);
      return;
    }

    async function fetchQuiz() {
      try {
        const response = await fetch("/api/user/quiz/get", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quizId }),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch quiz.");
        }

        setQuiz(data.quiz);
        setUserAnswers(new Array(data.quiz.quizQuestions.length).fill(-1)); // Initialize user answers
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [quizId]);

  const handleSubmitQuiz = async () => {
    if (!quiz || !quizId || !participantDetails) return;

    try {
      const response = await fetch("api/user/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId,
          userGithubUsername: participantDetails.githubId,
          userFullName: participantDetails.name,
          userAnswers,
        }),
      });

      const result = await response.json();
      console.log("Quiz Results:", result);

      if (result.success) {
        setCorrectAnswers(result.correctAnswers);
        setWrongAnswers(result.wrongAnswers);
        setEvaluatedQuestions(result.quizQuestions);
      }

      setMode("results");
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!quiz) return <p>Quiz not found.</p>;

  return (
    <div>
      {mode === "quizStart" && (
        <QuizStart
          setMode={setMode}
          quizImage={quiz.imageUrl}
          quizTitle={quiz.quizCategory}
          quizDescription={quiz.quizDescription}
        />
      )}

      {mode === "participantDetails" && (
        <ParticipantDetails setMode={setMode} setParticipantDetails={setParticipantDetails} />
      )}

      {mode === "quizTime" && participantDetails && (
        <QuizTime
          setMode={setMode}
          quizTitle={quiz.quizCategory}
          quizQuestion={quiz.quizQuestions}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          handleSubmitQuiz={handleSubmitQuiz}
        />
      )}

      {mode === "results" && (
        <Results
          quizImage="/image.png"
          quizTitle={quiz.quizCategory}
          quizDescription={quiz.quizDescription}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          quizQuestion={evaluatedQuestions} // Pass evaluated questions from API
        />
      )}
    </div>
  );
}

export default function PlayQuiz() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PlayQuizContent />
    </Suspense>
  );
}
