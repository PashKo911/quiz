import express from 'express'

import authRoutes from './authRoutes.mjs'
import quizAttemptRoutes from './quizAttemptsRoutes.mjs'
import userRoutes from './userRoutes.mjs'

const router = express.Router()

router.use('/auth', authRoutes)

router.use('/quiz', quizAttemptRoutes)

router.use('/users', userRoutes)

export default router
