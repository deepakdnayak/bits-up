"use client";

import Image from "next/image";
import Link from "next/link";

export default function Quiz() {

    const quizzes = [
        { id: 1, category: "Math", description: "Solve complex equations.", image: "/image.png" },
        { id: 2, category: "Science", description: "Explore the world of physics.", image: "/image.png" },
        { id: 3, category: "History", description: "Dive into historical events.", image: "/image.png" },
        { id: 4, category: "Math", description: "Solve complex equations.", image: "/image.png" },
        { id: 5, category: "Science", description: "Explore the world of physics.", image: "/image.png" },
        { id: 6, category: "History", description: "Dive into historical events.", image: "/image.png" },
    ];

    return (
        <div className="pt-14">
            <p className="text-center text-5xl mt-5">Quizzes</p>
            <div className="p-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">

                {/* Mapping over quizzes array */}
                {quizzes.map((quiz) => (
                    <div key={quiz.id} className="border shadow-xl rounded-md overflow-hidden hover:shadow-2xl transition-transform duration-300 flex flex-col min-h-full">
                        <Image src={quiz.image} width={300} height={200} alt={quiz.category} className="w-full h-[200px] object-cover" />
                        <div className="px-4 py-3 flex-grow">
                            <p className="text-2xl font-bold mb-1">{quiz.category}</p>
                            <p className="text-lg text-gray-600">{quiz.description}</p>
                        </div>
                        <div className="px-4 py-3 flex justify-end">
                            <Link href="/PlayQuiz" className="rounded-2xl bg-blue-500 text-white py-2 px-4 text-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300">
                                Attempt
                            </Link>
                        </div>
                    </div>
                
                ))}

            </div>
        </div>
    );
}
