"use client";

import { useState } from "react";

interface ParticipantDetailsProps {
  setMode: (mode: string) => void;
  setParticipantDetails: (participant: { name: string; githubId: string }) => void;
}

const ParticipantDetails: React.FC<ParticipantDetailsProps> = ({ setMode, setParticipantDetails }) => {
  const [name, setName] = useState("");
  const [githubId, setGithubId] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [githubProfile, setGithubProfile] = useState<{ avatar_url: string; name: string } | null>(null);

  const handleVerify = async (): Promise<void> => {
    if (!githubId.trim()) return;

    try {
      const response = await fetch(`https://api.github.com/users/${githubId}`, {
        method: "GET",
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVerified(true);
        setError("");
        setGithubProfile({ avatar_url: data.avatar_url, name: data.name || githubId });
      } else {
        setVerified(false);
        setError("GitHub ID not found");
        setGithubProfile(null);
      }
    } catch (err) {
      setVerified(false);
      setError("Error verifying GitHub ID");
      setGithubProfile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!name || !githubId || !verified) {
      alert("Please fill all fields and verify GitHub ID.");
      return;
    }

    try {
      const response = await fetch("/api/user/participant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, githubId }),
      });

      const data = await response.json();

      if (data.success) {
        setParticipantDetails({ name, githubId });
        setMode("quizTime");
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (err) {
      alert("Error submitting participant details.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Participant Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* GitHub ID Input with Verify Button */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="GitHub ID"
              value={githubId}
              onChange={(e) => {
                setGithubId(e.target.value);
                setVerified(false);
                setError("");
                setGithubProfile(null);
              }}
              className={`flex-grow px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 ${
                verified ? "border-green-500" : ""
              }`}
              required
            />
            <button
              type="button"
              onClick={handleVerify}
              className={`px-4 py-2 text-white rounded-md transition ${
                verified ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {verified ? "✔" : "Verify"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* GitHub Profile Preview (Visible After Verification) */}
          {verified && githubProfile && (
            <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-md shadow-md">
              <img src={githubProfile.avatar_url} alt="GitHub Avatar" className="w-10 h-10 rounded-full" />
              <p className="font-medium text-gray-700">{githubProfile.name}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParticipantDetails;
