"use client";

import Navbar from "@/components/Navbar";
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
    <>
      <Navbar />
      <div className="pt-24 flex flex-col items-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Leaderboard</h1>

        {/* Search Bar */}
        <div className="w-full max-w-lg mb-4">
          <input
            type="text"
            placeholder="Search participant..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Leaderboard List */}
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          {loading ? (
            <p className="text-center text-gray-500">Loading leaderboard...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredData.length > 0 ? (
            filteredData.map((user, index) => (
              <div
                key={user.userGithubUsername}
                className={`flex items-center justify-between p-4 border-b ${
                  index === 0 ? "bg-yellow-200" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                {/* Profile Picture */}
                <img
                  src={`https://github.com/${user.userGithubUsername}.png?size=80`}
                  alt={`${user.userFullName}'s profile`}
                  className="h-10 w-10 rounded-full border-2 border-blue-400 mr-4"
                />

                {/* User Info */}
                <div className="flex flex-col flex-grow">
                  <span className="font-medium text-gray-900">{user.userFullName}</span>
                  <span className="text-gray-500 text-sm">@{user.userGithubUsername}</span>
                </div>

                {/* User Score */}
                <span className="font-semibold text-blue-600 text-lg">{user.totalScore}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No results found.</p>
          )}
        </div>
      </div>
    </>
  );
}
