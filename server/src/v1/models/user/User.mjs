import mongoose from 'mongoose'
import QuizAttemptDBService from '../quizAttempt/QuizAttemptDBService.mjs'
import bcrypt from 'bcryptjs'

const { Schema } = mongoose

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Required'],
		minlength: [3, 'Username min 3 chars'],
		maxlength: [50, 'Username max 50 chars'],
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		minlength: [6, 'Password min 6 characters'],

		// validate: {
		//   validator: function (v) {
		//     return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
		//       v
		//     )
		//   },
		//   message: (props) =>
		//     'Password must contain at least one letter, one number, and one special character',
		// },
	},
	role: {
		type: Schema.Types.ObjectId,
		ref: 'Role',
		default: new mongoose.Types.ObjectId('67434ecae0c00366f89f7189'),
	},
})

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next()
	}
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
	next()
})

userSchema.pre('deleteOne', async function (next) {
	try {
		const userId = this.getQuery()._id || this._conditions._id
		const res = await mongoose.model('QuizAttempt').deleteMany({ userId })
		next()
	} catch (error) {
		console.error(error)
		next(error)
	}
})

userSchema.methods.validPassword = async function (password) {
	const isMatch = await bcrypt.compare(password, this.password)

	return isMatch
}

const User = mongoose.model('User', userSchema)
export default User
