import express from 'express';
import { getQuestions, postAddQuestion, postVerifyAnswers, postDeleteQuestion } from '../controllers/quizController.js';
import restrictedProtection from '../middleware/protectedAuth.js';
import regularProtection from '../middleware/regularAuth.js';

const router = express.Router();

router.get('/', regularProtection, getQuestions);
router.post('/add', restrictedProtection, postAddQuestion);
router.post('/verify', regularProtection, postVerifyAnswers)
router.post('/delete', postDeleteQuestion)
export default router;
