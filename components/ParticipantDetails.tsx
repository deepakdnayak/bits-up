'use client';

import Link from 'next/link';
import { useState } from 'react';

interface QuizStartProps {
    setMode: (mode: string) => void;
  }
  
  const ParticipantDetails: React.FC<QuizStartProps> = ({ setMode }) => {

  const [name, setName] = useState<string>('');
  const [githubId, setGithubId] = useState<string>('');
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleVerify = async (): Promise<void> => {
    if (!githubId.trim()) return;
    
    try {
      const response = await fetch(`https://api.github.com/users/${githubId}`, {
        method: "GET",
        headers: {
          "Accept": "application/vnd.github.v3+json"
        }
      });
      
      if (response.ok) {
        setVerified(true);
        setError('');
      } else {
        setVerified(false);
        setError('GitHub ID not found');
      }
    } catch (err) {
      setVerified(false);
      setError('Error verifying GitHub ID');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (name && githubId && verified) {
      alert('Form submitted successfully!');
    } else {
      alert('Please fill all fields and verify GitHub ID.');
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
              placeholder="Github ID"
              value={githubId}
              onChange={(e) => {
                setGithubId(e.target.value);
                setVerified(false);
                setError('');
              }}
              className={`flex-grow px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 ${verified ? 'border-green-500' : ''}`}
              required
            />
            <button
              type="button"
              onClick={handleVerify}
              className={`px-4 py-2 text-white rounded-md transition ${verified ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {verified ? '✔' : 'Verify'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
            <button
            onClick={()=> setMode("quizTime")}
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition"
            >
                Submit
            </button>
        </form>
      </div>
    </div>
  );
}

export default ParticipantDetails