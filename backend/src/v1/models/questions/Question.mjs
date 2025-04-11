import mongoose from 'mongoose'
const { Schema } = mongoose

const optionSchema = new Schema({
	text: {
		type: String,
		required: [true, 'Required'],
		trim: true,
	},
})

const questionSchema = new Schema({
	text: {
		type: String,
		required: [true, 'Required'],
		trim: true,
	},
	options: {
		type: [optionSchema],
		validate: {
			validator(opts) {
				return opts.length === 4
			},
			message: 'Need 4 options',
		},
	},
	answer: {
		type: Schema.Types.ObjectId,
		required: [true, 'Required'],
		validate: {
			validator(value) {
				return this.options.some((opt) => opt._id.equals(value))
			},
			message: 'Invalid answer',
		},
	},
})

const Question = mongoose.model('Question', questionSchema)
export default Question
