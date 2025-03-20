"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Quiz {
    _id: string;
    quizCategory: string;
    quizDescription: string;
}

export default function Quiz() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch("/api/user/quiz/getAll");
                const data = await response.json();
                if (data.success) {
                    setQuizzes(data.quizzes);
                } else {
                    console.error("Failed to fetch quizzes");
                }
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    return (
        <>
            <Navbar/>
            <div className="pt-14">
                <p className="text-center text-5xl mt-5">Quizzes</p>

                {loading ? (
                    <p className="text-center text-xl mt-10">Loading quizzes...</p>
                ) : (
                    <div className="p-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {quizzes.map((quiz) => (
                            <div key={quiz._id} className="border shadow-xl rounded-md overflow-hidden hover:shadow-2xl transition-transform duration-300 flex flex-col min-h-full">
                                <Image src="/image.png" width={300} height={200} alt={quiz.quizCategory} className="w-full h-[200px] object-cover" />
                                <div className="px-4 py-3 flex-grow">
                                    <p className="text-2xl font-bold mb-1">{quiz.quizCategory}</p>
                                    <p className="text-lg text-gray-600">{quiz.quizDescription}</p>
                                </div>
                                <div className="px-4 py-3 flex justify-end">
                                    <Link
                                        href={`/PlayQuiz?quizId=${quiz._id}`} 
                                        className="rounded-2xl bg-blue-500 text-white py-2 px-4 text-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300"
                                    >
                                        Attempt
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
