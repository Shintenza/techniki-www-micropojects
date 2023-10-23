import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  questionName: {
    type: String,
    required: true,
  },
  answers: [
    {
      answer: { type: String, requqired: true, minlength: 1 },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

const Question = new mongoose.model("Question", questionSchema);
export default Question;
