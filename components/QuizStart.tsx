'use client';

import Link from 'next/link';
import { useState } from 'react';

interface QuizStartProps {
  setMode: (mode: string) => void;
  quizTitle: string;
  quizDescription: string;
  quizImage: string;
}

const QuizStart: React.FC<QuizStartProps> = ({ setMode, quizTitle, quizDescription, quizImage }) => {

  const [quiz] = useState({
    name: 'Sample Quiz',
    description: 'This is a sample quiz description.',
    rules: [
      'Each quiz consists of multiple-choice questions with four options, out of which only one is correct.',
      'There is no time limit for answering individual questions, but the overall quiz must be completed in one session.',
      'Once an answer is submitted, it cannot be changed.',
      'Skipping a question is not allowed; you must select an option before proceeding.',
      'Scores are mapped to your GitHub username and will be stored for leaderboard ranking.',
      'Any attempt to manipulate the system or use unfair means may result in disqualification.',
      'Admins reserve the right to add, modify, or remove quizzes at any time.',
    ],    
    image: '/image.png',
  });

  return (
    <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col rounded-xl shadow-lg max-w-5xl mx-auto p-6 bg-white border">
        {/* Quiz Info Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start w-full gap-6">
            <div className="w-40 h-40 bg-gray-300 rounded-lg flex items-center justify-center">
            {quiz.image ? (
                <img src={quizImage} alt="Quiz" className="w-full h-full object-cover rounded-lg" />
            ) : (
                <span className="text-gray-500">No Image</span>
            )}
            </div>
            <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-center lg:text-left">{quizTitle}</h2>
            <p className="text-gray-600 mt-2 text-lg text-center lg:text-left">{quizDescription}</p>
            </div>
        </div>
        
        {/* Rules Section */}
        <div className="border rounded-lg shadow-md p-6 mt-6 bg-gray-100">
            <h3 className="text-2xl font-bold text-center">RULES</h3>
            <ul className="mt-4 space-y-3 text-gray-700 text-lg">
            {quiz.rules.map((rule, index) => (
                <li key={index} className="text-base">▪️{rule}</li>
            ))}
            </ul>
        </div>
        
        {/* Continue Button */}
        <div className="w-full flex justify-end mt-6">
            <button onClick={()=> setMode("participantDetails")} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-lg">Continue →</button>
        </div>
        </div>
    </div>
  );
}

export default QuizStart