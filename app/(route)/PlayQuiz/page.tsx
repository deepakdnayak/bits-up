"use client";

import ParticipantDetails from "@/components/ParticipantDetails";
import QuizStart from "@/components/QuizStart";
import QuizTime from "@/components/QuizTime";
import Results from "@/components/Results";
import { useState } from "react";



export default function PlayQuiz() {

    const [mode, setMode] = useState("quizStart");
    const [quiz] = useState({
        quizTitle: 'Sample Quiz',
        quizDescription: 'This is a sample quiz description.',
        quizImage: '/image.png',
        quizQuestion: [
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
            }
        ],
    })
    const [result] = useState({
        correctAnswers: 6,
        wrongAnswers: 4,
        quizQuestion: [
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
              correctOption: 2,
              selectedOption: 1,
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
              correctOption: 2,
              selectedOption: 1,
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
              correctOption: 2,
              selectedOption: 1,
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
              correctOption: 2,
              selectedOption: 1,
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
              correctOption: 2,
              selectedOption: 1,
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
              correctOption: 2,
              selectedOption: 1,
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
              correctOption: 2,
              selectedOption: 1,
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
              correctOption: 2,
              selectedOption: 1,
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
              correctOption: 2,
              selectedOption: 1,
            },
            {
              question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              options: ['a. Lorem', 'b. Ipsum', 'c. Dolor', 'd. Amet'],
              correctOption: 2,
              selectedOption: 1,
            }
        ],
    })

    return(
        <div>
            {mode==="quizStart" && <QuizStart setMode={setMode} quizTitle={quiz.quizTitle} quizDescription={quiz.quizDescription} quizImage={quiz.quizImage} />}
            {mode==="partitipantDetails" && <ParticipantDetails setMode={setMode} />}
            {mode==="quizTime" && <QuizTime setMode={setMode} quizTitle={quiz.quizTitle} quizQuestion={quiz.quizQuestion} />}
            {mode==="results" && <Results quizTitle={quiz.quizTitle} quizDescription={quiz.quizDescription} correctAnswers={result.correctAnswers} wrongAnswers={result.wrongAnswers} quizQuestion={result.quizQuestion} quizImage={quiz.quizImage} />}
        </div>
    )
}
