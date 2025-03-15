"use client";

import { useState } from "react";

export default function LeaderBoard() {
  const leaderboardData = [
    { position: 1, username: "Aarav", score: 95 },
    { position: 2, username: "Vivaan", score: 90 },
    { position: 3, username: "Sai", score: 85 },
    { position: 4, username: "Kiran", score: 80 },
    { position: 5, username: "Reyansh", score: 75 },
    { position: 6, username: "Ishaan", score: 70 },
    { position: 7, username: "Aryan", score: 65 },
    { position: 8, username: "Kabir", score: 60 },
    { position: 9, username: "Omkar", score: 55 },
    { position: 10, username: "Rudra", score: 50 },
  ];


  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = leaderboardData.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
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
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  } hover:bg-gray-200 transition`}
                >
                  <td className="p-3 font-semibold">{user.position}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3 font-semibold text-blue-600">
                    {user.score}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
