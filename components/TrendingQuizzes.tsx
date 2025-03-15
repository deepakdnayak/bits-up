export default function TrendingQuizzes() {
    const quizzes = [
      { title: "JavaScript Mastery", category: "Programming" },
      { title: "Logical Reasoning", category: "Aptitude" },
      { title: "Data Structures & Algorithms", category: "CS Fundamentals" },
    ];
  
    return (
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Trending Quizzes</h2>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {quizzes.map((quiz, index) => (
            <div key={index} className="w-64 p-6 bg-white rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-blue-600">{quiz.title}</h3>
              <p className="mt-2 text-gray-600">{quiz.category}</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  }
  