import asyncHandler from "express-async-handler";
import Question from "../models/Question.js";

const getQuestions = asyncHandler(async (req, res) => {
  const numberOfQuestions = parseInt(req.query.num);
  if (!numberOfQuestions) {
    res.status(400);
    throw new Error("You haven't specified number of questions to be returned");
  }
  const randomQuestions = await Question.aggregate([
    { $sample: { size: numberOfQuestions } },
  ]);
  res.json(randomQuestions).status(200);
});

const postAddQuestion = asyncHandler(async (req, res) => {
  if (req.body.answers.length != 4) {
    res.status(400);
    throw new Error("Wrong request, you have to provide 4 possible answers");
  }

  let foundCorrectAnswer = false;

  req.body.answers.forEach((answer) => {
    if (answer.isCorrect) foundCorrectAnswer = true;
  });

  if (!foundCorrectAnswer) {
    res.status(400);
    throw new Error(
      "Wrong request, you have to provide at least one correct answer"
    );
  }

  const question = await Question.create({
    questionName: req.body.question,
    answers: req.body.answers,
  });

  res.status(200).json(question);
});
export { getQuestions, postAddQuestion };
