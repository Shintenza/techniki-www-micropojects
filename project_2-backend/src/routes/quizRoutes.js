import express from 'express';
import { getQuestions, postAddQuestion } from '../controllers/quizController.js';
import restrictedProtection from '../middleware/protectedAuth.js';
import regularProtection from '../middleware/regularAuth.js';

const router = express.Router();

router.get('/', regularProtection, getQuestions);
router.post('/add', restrictedProtection, postAddQuestion);

export default router;
