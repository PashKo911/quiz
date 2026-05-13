import mongoose from 'mongoose'
const { Schema } = mongoose

const answerItemSchema = new Schema({
	question: {
		type: Schema.Types.ObjectId,
		ref: 'Question',
		required: true,
	},
	isCorrect: {
		type: Boolean,
	},
})

const quizAttemptSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	questions: {
		type: [Schema.Types.ObjectId],
		ref: 'Question',
		required: true,
	},
	answers: {
		type: [answerItemSchema],
		validate: {
			validator: function (v) {
				return v.length <= 5
			},
			message: 'You cannot answer more than 5 questions.',
		},
		default: [],
	},
	status: {
		type: String,
		enum: ['pending', 'completed'],
		default: 'pending',
	},
	startedAt: {
		type: Date,
		default: Date.now,
	},
})

const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema)
export default QuizAttempt
