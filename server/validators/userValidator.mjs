class UserValidator {
	static userSchema = {
		username: {
			trim: true,
			notEmpty: {
				errorMessage: 'Username is required',
			},
			isLength: {
				options: { min: 3, max: 50 },
				errorMessage: 'Username min 3, max 50 chars',
			},
			escape: true,
		},

		password: {
			trim: true,
			notEmpty: {
				errorMessage: 'Required',
			},
			isLength: {
				options: { min: 6 },
				errorMessage: 'Password min 6 characters',
			},
			// matches: {
			// 	options: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/],
			// 	errorMessage: 'Password must contain at least one letter, one number, and one special character',
			// },
			escape: true,
		},
	}
}

export default UserValidator
