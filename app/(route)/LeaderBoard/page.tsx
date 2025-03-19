"use client";

import { useState, useEffect } from "react";

interface LeaderboardUser {
  userGithubUsername: string;
  userFullName: string;
  totalScore: number;
}

export default function LeaderBoard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/user/leaderboard"); // Ensure this API route exists
        const data = await response.json();

        if (data.success) {
          setLeaderboardData(data.leaderboard);
        } else {
          setError("Failed to fetch leaderboard");
        }
      } catch (err) {
        setError("Error fetching leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const filteredData = leaderboardData.filter((user) =>
    user.userGithubUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userFullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-16 flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-5xl font-bold mb-6">Leaderboard</h1>

      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-4">
        <input
          type="text"
          placeholder="Search username..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Leaderboard Table */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        {loading ? (
          <p className="text-center text-gray-500">Loading leaderboard...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left">Rank</th>
                <th className="p-3 text-left">GitHub Username</th>
                <th className="p-3 text-left">Full Name</th>
                <th className="p-3 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((user, index) => (
                  <tr
                    key={user.userGithubUsername}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                    } hover:bg-gray-200 transition`}
                  >
                    <td className="p-3 font-semibold">{index + 1}</td>
                    <td className="p-3">{user.userGithubUsername}</td>
                    <td className="p-3">{user.userFullName}</td>
                    <td className="p-3 font-semibold text-blue-600">{user.totalScore}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
