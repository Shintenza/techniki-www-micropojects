import mongoose from "mongoose";

const resultSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true
  },
});

const Result = new mongoose.model("Result", resultSchema);
export default Result;
