import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
      <h1 className="text-5xl md:text-6xl font-bold">Welcome to BitsUp</h1>
      <p className="mt-4 text-lg md:text-xl max-w-2xl">
        Challenge yourself with exciting quizzes and improve your skills. Compete with your peers and climb the leaderboard!
      </p>
      <div className="mt-6 flex space-x-4">
        <Link href="/Quiz">
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-200">
            Start a Quiz
          </button>
        </Link>
        <Link href="/LeaderBoard">
          <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-gray-700">
            View Leaderboard
          </button>
        </Link>
      </div>
    </section>
  );
}
