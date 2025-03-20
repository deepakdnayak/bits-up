"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Toaster, toast } from 'sonner'
import Image from "next/image";


interface Quiz {
  _id: string;
  quizCategory: string;
  quizDescription: string;
  quizDifficulty: string;
  dateAdded: string;
}

export default function AdminDashboard() {
  const { isAuthenticated } = useAdminAuth();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    } else {
      fetchQuizzes();
    }
  }, [isAuthenticated]);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/quiz/fetch");
      const data = await response.json();
      setQuizzes(data.quizzes || []);
    } catch (err) {
      setError("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (quizId: string) => {
      if (!confirm("Are you sure you want to delete this quiz?")) return;
      console.log(quizId);
    
      try {
        const response = await fetch("/api/admin/quiz/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quizId }),
        });
    
        // Check if response body is empty
        const text = await response.text();
        if (!text) {
          throw new Error("Empty response from server.");
        }
    
        const data = JSON.parse(text);
    
        if (data.success) {
          setQuizzes((quizzes) => quizzes.filter((quiz) => quiz._id !== quizId));
          toast.success("Quiz deleted successfully!");
        } else {
          toast.error(data.error || "Failed to delete quiz.");
        }
      } catch (err) {
        console.error("Error deleting quiz:", err);
        toast.error("Server error: " + err);
      }
    };
  

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ensures two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  };
  
  

  return isAuthenticated ? (
    <>
      <Toaster position="top-center" richColors />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-4">
          <div className="flex flex-col items-center">
            <Image src="/admin.png" width={80} height={80} alt="admin" className="w-20 h-20 bg-gray-300 rounded-full mb-4"/>
            <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-400 hover:scale-105 transition-transform"
                  onClick={() => router.push("/admin/AddQuiz")}
              >
                      Add Quiz
              </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-semibold text-gray-800">Quizzes</h1>

          {/* Quizzes Grid */}
          {loading ? (
            <p className="text-center mt-4">Loading quizzes...</p>
          ) : error ? (
            <p className="text-red-500 text-center mt-4">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <div key={quiz._id} className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-xl font-semibold">{quiz.quizCategory}</h2>
                    <p className="text-gray-600 mt-2">{quiz.quizDescription}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Difficulty: <span className="font-medium">{quiz.quizDifficulty}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Date Added: <span className="font-medium">{formatDate(quiz.dateAdded)}</span>
                    </p>
                    <button
                      onClick={() => handleDelete(quiz._id)}
                      className="mt-4 bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full">No quizzes available</p>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  ) : null;
}
