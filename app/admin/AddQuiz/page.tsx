"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

const AddQuiz = () => {
  const router = useRouter();

  const [quizCategory, setQuizCategory] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizDifficulty, setQuizDifficulty] = useState("Easy");
  const [imageUrl, setImageUrl] = useState(""); // New Image URL state
  const [quizQuestions, setQuizQuestions] = useState(
    Array.from({ length: 10 }, () => ({
      question: "",
      optionOne: "",
      optionTwo: "",
      optionThree: "",
      optionFour: "",
      answer: "A",
    }))
  );

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const updatedQuestions = [...quizQuestions];
    (updatedQuestions as any)[index][field] = value;
    setQuizQuestions(updatedQuestions);
  };

  const handleAnswerChange = (index: number, answer: string) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[index].answer = answer;
    setQuizQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    if (!quizCategory || !quizDescription || !quizDifficulty || !imageUrl) {
      toast.error("Please fill all quiz details, including the image URL.");
      return;
    }

    if (!imageUrl.startsWith("http")) {
      toast.error("Please enter a valid image URL.");
      return;
    }

    if (
      quizQuestions.some(
        (q) => !q.question || !q.optionOne || !q.optionTwo || !q.optionThree || !q.optionFour
      )
    ) {
      toast.error("Please fill all question fields.");
      return;
    }

    const quizData = { quizCategory, quizDescription, quizDifficulty, imageUrl, quizQuestions };

    try {
      const res = await fetch("/api/admin/quiz/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Quiz added successfully!");
        setQuizCategory("");
        setQuizDescription("");
        setQuizDifficulty("Easy");
        setImageUrl(""); // Reset image URL field
        setQuizQuestions(
          Array.from({ length: 10 }, () => ({
            question: "",
            optionOne: "",
            optionTwo: "",
            optionThree: "",
            optionFour: "",
            answer: "A",
          }))
        );

        // Redirect to dashboard
        router.push("/admin/dashboard");
      } else {
        toast.error(data.error || "Failed to add quiz.");
      }
    } catch (error) {
      toast.error("Error adding quiz.");
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="flex h-screen justify-center">
        {/* Main Content */}
        <div className="w-4/5 p-6">
          <h1 className="text-4xl font-bold mb-4">Add Quiz</h1>

          {/* Quiz Details */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Quiz Title/Category"
              className="w-full p-2 border rounded"
              value={quizCategory}
              onChange={(e) => setQuizCategory(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full p-2 border rounded"
              value={quizDescription}
              onChange={(e) => setQuizDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="w-full p-2 border rounded"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <select
              className="w-full p-2 border rounded"
              value={quizDifficulty}
              onChange={(e) => setQuizDifficulty(e.target.value)}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Quiz Questions */}
          <div className="mt-6 border-t pt-4">
            {quizQuestions.map((q, index) => (
              <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
                <p className="font-semibold">Question {index + 1}</p>
                <input
                  type="text"
                  placeholder="Enter question"
                  className="w-full p-2 border rounded mt-2"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["optionOne", "optionTwo", "optionThree", "optionFour"].map((opt, optIndex) => (
                    <label key={optIndex} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`answer-${index}`}
                        checked={q.answer === String.fromCharCode(65 + optIndex)}
                        onChange={() => handleAnswerChange(index, String.fromCharCode(65 + optIndex))}
                      />
                      <input
                        type="text"
                        placeholder={`Option ${optIndex + 1}`}
                        className="p-2 border rounded w-full"
                        value={(q as any)[opt]}
                        onChange={(e) => handleQuestionChange(index, opt, e.target.value)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="my-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-400 hover:scale-105 transition-transform"
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default AddQuiz;
