import express from 'express'
import QuizAttemptController from '../controllers/quizAttemptsController.mjs'
import { authMiddleware } from '../../../middleware/authMiddleware.mjs'

const router = express.Router()

router.post('/attempt', authMiddleware, QuizAttemptController.startOrResumeQuiz)

router.post('/submit', authMiddleware, QuizAttemptController.submitQuizAnswers)

router.get('/result/:id', QuizAttemptController.getQuizResult)

export default router
