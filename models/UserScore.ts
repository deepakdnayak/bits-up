import mongoose, { Schema, Document } from "mongoose";

interface IQuizAttempt {
  quizId: string;
  score: number;
  dateAttempted: Date;
}

interface IUserScore extends Document {
  userGithubUsername: string;
  userFullName: string;
  totalScore: number;
  quizAttempts: IQuizAttempt[];
  lastUpdated: Date;
}

const UserScoreSchema = new Schema<IUserScore>({
  userGithubUsername: { type: String, required: true, unique: true },
  userFullName: { type: String, required: true },
  totalScore: { type: Number, required: true, default: 0 },
  quizAttempts: [
    {
      quizId: { type: String, required: true },
      score: { type: Number, required: true },
      dateAttempted: { type: Date, default: Date.now },
    },
  ],
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.models.UserScore || mongoose.model<IUserScore>("UserScore", UserScoreSchema);
