import express from "express";
import {
  getQuestions,
  postAddQuestion,
  postVerifyAnswers,
  deleteQuestion,
  getResults,
  getUserResults
} from "../controllers/quizController.js";
import restrictedProtection from "../middleware/protectedAuth.js";
import regularProtection from "../middleware/regularAuth.js";

const router = express.Router();

router.get("/", regularProtection, getQuestions);
router.get("/results", restrictedProtection, getResults);
router.get("/get-user-results", regularProtection, getUserResults);
router.post("/add", restrictedProtection, postAddQuestion);
router.post("/verify", regularProtection, postVerifyAnswers);
router.delete("/delete", restrictedProtection, deleteQuestion);
export default router;
