import mongoose, { Schema, Document } from "mongoose";

// Define the user score schema
interface IUserScore extends Document {
  userGithubUsername: string;
  userFullName: string;
  userScoredPoints: number;
}

const UserScoreSchema = new Schema<IUserScore>({
  userGithubUsername: { type: String, required: true, unique: true },
  userFullName: { type: String, required: true },
  userScoredPoints: { type: Number, required: true, default: 0 },
});

// Export the model
export default mongoose.models.UserScore || mongoose.model<IUserScore>("UserScore", UserScoreSchema);
