import asyncHandler from "express-async-handler";
import Question from "../models/Question.js";
import Result from "../models/Result.js";
import User from "../models/User.js";

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

const postVerifyAnswers = asyncHandler(async (req, res) => {
  let score = 0;
  if (!req.body.userID || !req.body.answers || req.body.answers.length == 0) {
    res.status(400);
    throw new Error("invalid request body");
  }

  const isValidUser = await User.findById(req.body.userID);
  if (!isValidUser) {
    res.status(400);
    throw new Error("User with the given ID does not exist");
  }

  for (let q of req.body.answers) {
    const question = await Question.findById(q.questionID);
    if (!question) {
      throw new Error(
        "Error occured while processing the answers; question with given ID does not exist"
      );
    }
    for (let answer of question.answers) {
      if (answer.id == q.givenAnswerID && answer.isCorrect) {
        score += 1;
      }
    }
  }

  const result = await Result.create({
    userID: req.body.userID,
    score,
  });

  if (!result) {
    throw new Error("error while saving the result into the database");
  }

  res.json(result);
});


const postDeleteQuestion = asyncHandler(async (req, res) =>{
  const  id = req.body.id
  if(!id){
    res.status(400)
    throw new Error("no such request id")
  }

  const isExist = await Question.findByIdAndDelete(id)


});
export { getQuestions, postAddQuestion, postVerifyAnswers, postDeleteQuestion };
