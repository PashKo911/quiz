import QuizAttemptDBService from '../models/quizAttempt/QuizAttemptDBService.mjs'
import QuestionDBService from '../models/questions/QuestionDBService.mjs'

class QuizAttemptController {
	static async startOrResumeQuiz(req, res) {
		try {
			let attempt = await QuizAttemptDBService.findOne({
				userId: req.user.id,
				status: 'pending',
			})
			if (!attempt) {
				const randomQuestions = await QuestionDBService.getRandomDocuments(5)

				if (!randomQuestions || randomQuestions.length < 5) {
					return res.status(404).json({ message: 'Not enough questions available' })
				}

				const questionIds = randomQuestions.map((q) => q._id)

				attempt = await QuizAttemptDBService.create({
					userId: req.user.id,
					questions: questionIds,
					answers: [],
					status: 'pending',
				})
			}

			const questions = await QuestionDBService.getList({ _id: { $in: attempt.questions } }, { answer: 0 })

			res.status(200).json({ attemptId: attempt._id, questions })
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: 'Server error while starting/resuming quiz attempt' })
		}
	}

	static async submitQuizAnswers(req, res) {
		try {
			const { attemptId, answers } = req.body

			const attempt = await QuizAttemptDBService.getById(attemptId)

			if (!attempt) {
				return res.status(404).json({ message: 'Quiz attempt not found' })
			}
			if (attempt.status === 'completed') {
				return res.status(400).json({ message: 'Quiz attempt already completed' })
			}

			const questionIds = attempt.questions.map((qId) => qId.toString())
			const questionIdsFromClient = answers.map((a) => a.questionId)

			const questionSet = new Set(questionIds)
			const questionIdsFromClientSet = new Set(questionIdsFromClient)

			const valid =
				questionSet.size === questionIdsFromClientSet.size &&
				[...questionSet].every((id) => questionIdsFromClientSet.has(id))

			if (!valid) {
				return res.status(400).json({ message: 'Invalid answers submitted' })
			}

			const rightAnswers = await QuestionDBService.getList({ _id: { $in: questionIds } }, { answer: 1 })

			const rightAnswerMap = {}
			rightAnswers.forEach((item) => {
				rightAnswerMap[item._id.toString()] = item.answer.toString()
			})

			const answersToSave = answers.map((item) => {
				const questionId = item.questionId
				const selectedAnswerId = item.answerId
				const correctAnswerId = rightAnswerMap[questionId]

				return {
					question: questionId,
					isCorrect: selectedAnswerId === correctAnswerId,
				}
			})

			attempt.answers = answersToSave
			attempt.status = 'completed'

			await attempt.save()

			res.status(200).json({ message: 'Quiz attempt result saved successfully' })
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: 'Server error while submitting quiz answers' })
		}
	}

	static async getQuizResult(req, res) {
		try {
			const { id } = req.params

			const quizAttemptResult = await QuizAttemptDBService.getById(id, { answers: 1 }, [
				{ path: 'answers.question', select: 'text' },
			])

			if (!quizAttemptResult) {
				return res.status(404).json({ message: 'Quiz attempt result not found' })
			}

			res.status(200).json(quizAttemptResult)
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: 'Error fetching quiz results' })
		}
	}
}

export default QuizAttemptController
