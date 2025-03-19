"use client";

import { useState } from "react";

interface QuizQuestion {
  question: string;
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
}

interface QuizTimeProps {
  setMode: (mode: string) => void;
  quizTitle: string;
  quizQuestion: QuizQuestion[];
  userAnswers: number[];
  setUserAnswers: (answers: number[]) => void;
  handleSubmitQuiz: () => void;
}

const QuizTime: React.FC<QuizTimeProps> = ({
  setMode,
  quizTitle,
  quizQuestion,
  userAnswers,
  setUserAnswers,
  handleSubmitQuiz,
}) => {
  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = optionIndex; // Store selected option index
    setUserAnswers(updatedAnswers);
    console.log(updatedAnswers)
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white mt-14">
      <h2 className="text-2xl font-bold text-center mb-6">{quizTitle}</h2>

      <div className="space-y-6">
        {quizQuestion.map((q, index) => {
          const options = [q.optionOne, q.optionTwo, q.optionThree, q.optionFour];

          return (
            <div key={index} className="border rounded-lg p-4 shadow-md">
              <p className="font-medium mb-3">{index + 1}. {q.question}</p>
              <div className="space-y-2">
                {options.map((option, i) => (
                  <label key={i} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={i}
                      checked={userAnswers[index] === i}
                      onChange={() => handleOptionSelect(index, i)}
                      className="w-4 h-4"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full flex justify-end mt-6">
        <button
          onClick={handleSubmitQuiz}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuizTime;
