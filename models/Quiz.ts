import mongoose, { Schema, model, models } from "mongoose";

const quizQuestionSchema = new Schema({
  question: { type: String, required: true },
  optionOne: { type: String, required: true },
  optionTwo: { type: String, required: true },
  optionThree: { type: String, required: true },
  optionFour: { type: String, required: true },
  answer: { type: String, required: true, enum: ["A", "B", "C", "D"] },
});

const quizSchema = new Schema({
  quizCategory: { type: String, required: true },
  quizDescription: { type: String, required: true },
  quizDifficulty: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true }, // ✅ New field for image URL
  quizQuestions: { type: [quizQuestionSchema], required: true },
});

const Quiz = models.Quiz || model("Quiz", quizSchema);
export default Quiz;
