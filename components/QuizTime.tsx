"use client";

import Link from 'next/link';
import { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
}

interface QuizStartProps {
  setMode: (mode: string) => void;
  quizTitle: string;
  quizQuestion: QuizQuestion[];
}

const QuizTime : React.FC<QuizStartProps> = ({ setMode, quizTitle, quizQuestion }) => {

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white mt-14">
      {/* Quiz Title */}
      <h2 className="text-2xl font-bold text-center mb-6">{quizTitle}</h2>
      
      {/* Questions */}
      <div className="space-y-6">
        {quizQuestion.map((q, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md">
            <p className="font-medium mb-3">{index + 1}. {q.question}</p>
            <div className="space-y-2">
              {q.options.map((option, i) => (
                <label key={i} className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name={`question-${index}`} className="w-4 h-4" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Continue Button */}
      <div className="w-full flex justify-end mt-6">
        <button onClick={()=> setMode("results")} className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-lg">Submit</button>
      </div>
    </div>
  );
}


export default QuizTime