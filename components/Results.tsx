"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Navbar from "./Navbar";

interface QuizQuestion {
  question: string;
  options: string[];
  correctOption: number;
  selectedOption: number;
}

interface ResultsProps {
  quizTitle: string;
  quizDescription: string;
  quizImage: string;
  correctAnswers: number;
  wrongAnswers: number;
  quizQuestion?: QuizQuestion[]; // Make it optional to avoid undefined errors
}

const ResultsPage: React.FC<ResultsProps> = ({
  quizTitle,
  quizDescription,
  quizImage,
  correctAnswers,
  wrongAnswers,
  quizQuestion = [], // Provide a default empty array to prevent undefined errors
}) => {
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    console.log("quizQuestion in Results:", quizQuestion); // Debugging log

    if (quizQuestion.length > 0) {
      setScore(Math.round((correctAnswers / quizQuestion.length) * 100));
    }
  }, [correctAnswers, quizQuestion]);

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 mt-14">
      <h1 className="text-4xl font-bold mb-6">Results</h1>

      <div className="flex flex-wrap w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 flex flex-col items-center p-4">
          <Image src={quizImage} alt="Quiz Image" width={128} height={128} className="rounded-md" />
          <h2 className="text-2xl font-semibold mt-4">{quizTitle}</h2>
          <p className="text-gray-600 text-center mt-2">{quizDescription}</p>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center p-4">
          <div className="w-32 h-32">
            {score !== null ? (
              <CircularProgressbar
                value={score}
                text={`${score}%`}
                styles={buildStyles({
                  textSize: "16px",
                  pathColor: `#4caf50`,
                  textColor: "#333",
                })}
              />
            ) : (
              <p className="text-gray-600">Calculating score...</p>
            )}
          </div>
          <p className="mt-4 font-semibold">Correct Answers: {correctAnswers}</p>
          <p className="text-red-500">Wrong Answers: {wrongAnswers}</p>
        </div>
      </div>

      {/* Quiz Answers Section */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mt-6">
        {quizQuestion.length > 0 ? (
          quizQuestion.map((answer, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg">
              <p className="font-semibold">{index + 1}. {answer.question}</p>
              <ul className="mt-2">
                {answer.options.map((option, i) => {
                  const isCorrect = i === answer.correctOption;
                  const isSelected = i === answer.selectedOption;
                  const isWrong = isSelected && !isCorrect;

                  return (
                    <li
                      key={i}
                      className={`p-2 rounded 
                        ${isCorrect ? "text-green-600 font-bold" : ""}
                        ${isWrong ? "text-red-600 font-bold" : ""}
                        ${isSelected && !isWrong ? "bg-blue-100" : ""}`
                      }
                    >
                      ◉ {option}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No questions available.</p>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex gap-4 mt-6">
        <Link href="/LeaderBoard" className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
          Leader Board
        </Link>
        <Link href="/" className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600">
          Home Page
        </Link>
      </div>
    </div>
    </>
  );
};

export default ResultsPage;
