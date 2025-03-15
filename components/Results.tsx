"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface QuizQuestion {
  question: string;
  options: string[];
  correctOption: number;
  selectedOption: number;
}

interface ResultsProps {
  quizTitle: string;
  quizDescription: string;
  quizImage: string,
  correctAnswers: number;
  wrongAnswers: number;
  quizQuestion: QuizQuestion[];
}

const ResultsPage: React.FC<ResultsProps> = ({
  quizTitle,
  quizDescription,
  quizImage,
  correctAnswers,
  wrongAnswers,
  quizQuestion,
}) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(Math.round((correctAnswers / quizQuestion.length) * 100));
  }, [correctAnswers, quizQuestion.length]);

  return (
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
            <CircularProgressbar
              value={score}
              text={`${score}%`}
              styles={buildStyles({
                textSize: "16px",
                pathColor: `#4caf50`,
                textColor: "#333",
              })}
            />
          </div>
          <p className="mt-4 font-semibold">No. of correct answers: {correctAnswers}</p>
          <p className="text-red-500">No. of wrong answers: {wrongAnswers}</p>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mt-6">
        {quizQuestion.map((answer, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg">
            <p className="font-semibold">{index + 1}. {answer.question}</p>
            <ul className="mt-2">
              {answer.options.map((option, i) => (
                <li
                  key={i}
                  className={`p-2 rounded ${i === answer.correctOption ? "text-green-600 font-bold" : ""} ${i === answer.selectedOption && i !== answer.correctOption ? "text-red-600 font-bold" : ""}`}
                >
                  ◉ {option}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <Link href="/LeaderBoard" className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">Leader Board</Link>
        <Link href="/" className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600">Home Page</Link>
      </div>
    </div>
  );
};

export default ResultsPage;
