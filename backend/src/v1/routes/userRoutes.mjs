import express from 'express'
import UserController from '../controllers/userController.mjs'
import { authMiddleware, checkAdmin } from '../../../middleware/authMiddleware.mjs'

const router = express.Router()

router.use(authMiddleware)
router.use(checkAdmin)

router.get('/users-with-attempts', UserController.getUsersWithAttempts)

router.delete('/:id', UserController.deleteUser)

export default router
